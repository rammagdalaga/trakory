// PDF <-> Word and compression utilities.
// All run fully in the browser (WASM/JS) — Cloudflare Worker safe.

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { PDFDocument } from "pdf-lib";
import jsPDF from "jspdf";
import mammoth from "mammoth";
import JSZip from "jszip";

export type ProgressFn = (ratio: number) => void;

// ----- pdf.js loader (worker via CDN to avoid bundler edge cases) -----
let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;
async function getPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((mod) => {
      // Use the matching versioned worker from the CDN.
      const v = (mod as unknown as { version: string }).version;
      mod.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${v}/build/pdf.worker.min.mjs`;
      return mod;
    });
  }
  return pdfjsPromise;
}

// ============================================================
//  PDF -> Word (.docx)  — renders pages with layout preservation
// ============================================================
interface PDFTextItem {
  str: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontName?: string;
  fontFamily?: string;
  color?: string;
  fontSize?: number;
}

interface PDFPageContent {
  text: PDFTextItem[];
  images: string[];
  width: number;
  height: number;
}

async function extractPDFPageContent(
  page: any,
  scale: number = 1.5,
): Promise<PDFPageContent> {
  const viewport = page.getViewport({ scale });
  const content = await page.getTextContent();

  // Extract text with positioning and styling
  const textItems: PDFTextItem[] = [];
  const itemsMap: Record<number, any[]> = {};

  // Group items by y-position (lines)
  for (const item of content.items) {
    const t = item as any;
    const y = Math.round(t.transform[5]);
    if (!itemsMap[y]) itemsMap[y] = [];
    itemsMap[y].push({
      str: t.str || "",
      x: t.transform[4],
      y: t.transform[5],
      width: t.width || 0,
      height: t.height || t.fontSize || 12,
      fontSize: t.fontSize || 12,
      fontName: t.fontName || "",
      color: t.color || "#000000",
    });
  }

  // Sort lines by Y position (top to bottom)
  const sortedYs = Object.keys(itemsMap)
    .map(Number)
    .sort((a, b) => b - a);

  for (const y of sortedYs) {
    const lineItems = itemsMap[y];
    lineItems.sort((a, b) => a.x - b.x);
    textItems.push(...lineItems);
  }

  // Extract images using canvas rendering
  const images: string[] = [];
  try {
    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport,
      };
      await (page as any).render(renderContext).promise;

      // Extract images from the rendered page
      try {
        const operatorList = await page.getOperatorList();
        if (operatorList?.fnArray) {
          for (let i = 0; i < operatorList.fnArray.length; i++) {
            // 83 = paintImageXObject operator
            if (operatorList.fnArray[i] === 83) {
              const imageName = operatorList.argsArray[i]?.[0];
              if (imageName && page.objs) {
                try {
                  const img = await page.objs.get(imageName);
                  if (img?.data && img.width && img.height) {
                    const imgCanvas = document.createElement("canvas");
                    imgCanvas.width = img.width;
                    imgCanvas.height = img.height;
                    const imgCtx = imgCanvas.getContext("2d");

                    if (imgCtx) {
                      const imageData = imgCtx.createImageData(img.width, img.height);
                      imageData.data.set(img.data);
                      imgCtx.putImageData(imageData, 0, 0);
                      images.push(imgCanvas.toDataURL("image/jpeg", 0.85));
                    }
                  }
                } catch (e) {
                  console.debug("Could not extract individual image:", e);
                }
              }
            }
          }
        }
      } catch (e) {
        console.debug("Image extraction from operators failed, will use canvas fallback");
      }

      // If no individual images found, save the full rendered page as fallback
      if (images.length === 0) {
        images.push(canvas.toDataURL("image/jpeg", 0.85));
      }
    }
  } catch (e) {
    console.debug("Could not render page for image extraction:", e);
  }

  return {
    text: textItems,
    images,
    width: viewport.width,
    height: viewport.height,
  };
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Handle various formats: #RRGGBB, rgb(r,g,b), RRGGBB
  let cleaned = hex.replace("#", "");

  const rgbMatch = hex.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    return {
      r: parseInt(rgbMatch[0]),
      g: parseInt(rgbMatch[1]),
      b: parseInt(rgbMatch[2]),
    };
  }

  if (cleaned.length === 6) {
    const r = parseInt(cleaned.substr(0, 2), 16);
    const g = parseInt(cleaned.substr(2, 2), 16);
    const b = parseInt(cleaned.substr(4, 2), 16);
    return { r, g, b };
  }

  return null;
}

export async function pdfToDocx(
  file: File,
  onProgress?: ProgressFn,
): Promise<Blob> {
  const pdfjs = await getPdfjs();
  const buf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buf }).promise;

  const allParagraphs: Paragraph[] = [];

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const pageContent = await extractPDFPageContent(page);
    onProgress?.(pageNum / (pdf.numPages * 2));

    // Group text items by vertical proximity (lines)
    const lines: PDFTextItem[][] = [];
    const yTolerance = 2;

    for (const item of pageContent.text) {
      let foundLine = false;
      for (const line of lines) {
        if (Math.abs(line[0].y - item.y) <= yTolerance) {
          line.push(item);
          foundLine = true;
          break;
        }
      }
      if (!foundLine) {
        lines.push([item]);
      }
    }

    // Process each line
    for (const line of lines) {
      line.sort((a, b) => a.x - b.x);

      // Reconstruct text with spacing awareness
      let fullText = "";
      let prevX = 0;
      const textRuns: Array<{ text: string; color?: string; fontSize?: number; bold?: boolean }> = [];
      let currentRun = { text: "", color: line[0]?.color, fontSize: line[0]?.fontSize };

      for (const item of line) {
        // Add spacing if there's a gap
        const gap = item.x - prevX;
        if (gap > item.height * 0.3 && fullText && !fullText.endsWith(" ")) {
          currentRun.text += " ";
          fullText += " ";
        }

        // Detect text style changes
        if (
          item.color !== currentRun.color ||
          item.fontSize !== currentRun.fontSize
        ) {
          if (currentRun.text) {
            textRuns.push({ ...currentRun });
          }
          currentRun = {
            text: item.str,
            color: item.color,
            fontSize: item.fontSize,
          };
        } else {
          currentRun.text += item.str;
        }

        fullText += item.str;
        prevX = item.x + item.width;
      }

      if (currentRun.text) {
        textRuns.push(currentRun);
      }

      const trimmedText = fullText.trim();
      if (!trimmedText) continue;

      // Detect heading (larger font, shorter text)
      const avgFontSize = line.reduce((sum, item) => sum + (item.fontSize || 12), 0) / line.length;
      const isHeading = avgFontSize > 14 && trimmedText.length < 120;

      // Build text runs with proper styling
      const runs = textRuns
        .filter((run) => run.text.trim())
        .map((run) => {
          const colorHex = run.color || "#000000";
          const rgb = hexToRgb(colorHex);
          const color = rgb
            ? rgb.r.toString(16).padStart(2, "0") +
              rgb.g.toString(16).padStart(2, "0") +
              rgb.b.toString(16).padStart(2, "0")
            : undefined;

          return new TextRun({
            text: run.text,
            size: isHeading ? 28 : Math.max(18, Math.round((run.fontSize || 12) * 2)),
            bold: isHeading,
            color,
          });
        });

      if (runs.length > 0) {
        allParagraphs.push(
          new Paragraph({
            heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
            children: runs,
            spacing: { after: isHeading ? 200 : 80 },
          }),
        );
      }
    }

    // Add extracted images
    if (pageContent.images.length > 0) {
      for (const imgData of pageContent.images) {
        allParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: " ",
              }),
            ],
            spacing: { after: 100 },
          }),
        );
      }
    }

    // Page break
    if (pageNum < pdf.numPages) {
      allParagraphs.push(
        new Paragraph({
          children: [new TextRun("")],
          pageBreakBefore: true,
        }),
      );
    }

    onProgress?.((pageNum / pdf.numPages) * 0.95 + 0.05);
  }

  if (allParagraphs.length === 0) {
    allParagraphs.push(
      new Paragraph({
        children: [
          new TextRun(
            "No selectable text found in this PDF. For PDFs with images only, layout conversion is limited in browser-only mode. Please try an image-based PDF with text.",
          ),
        ],
      }),
    );
  }

  const doc = new Document({
    sections: [{ properties: {}, children: allParagraphs }],
  });
  const blob = await Packer.toBlob(doc);
  onProgress?.(1);
  return blob;
}

// ============================================================
//  Word (.docx) -> PDF  — real text, selectable & searchable
// ============================================================
export async function docxToPdf(
  file: File,
  onProgress?: ProgressFn,
): Promise<Blob> {
  onProgress?.(0.1);
  const buf = await file.arrayBuffer();

  // Extract images from DOCX (ZIP file)
  const docxZip = await JSZip.loadAsync(buf);
  const imageMap: Record<string, string> = {};
  const mediaFiles = Object.keys(docxZip.files).filter((p) =>
    /^word\/media\/.+\.(png|jpe?g|gif)$/i.test(p),
  );

  for (const path of mediaFiles) {
    const blob = await docxZip.files[path].async("blob");
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
    const filename = path.split("/").pop() || "";
    imageMap[filename] = dataUrl;
  }

  // Extract semantic HTML to preserve headings, lists, bold/italic, colors.
  const { value: html } = await mammoth.convertToHtml({ arrayBuffer: buf });
  onProgress?.(0.4);

  // Render HTML into a hidden DOM node, then walk it to draw real text into jsPDF.
  const container = document.createElement("div");
  container.style.cssText =
    "position:absolute;left:-99999px;top:0;width:680px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:1.45;color:#000;";
  container.innerHTML = html;
  document.body.appendChild(container);

  const pdf = new jsPDF({ unit: "pt", format: "letter" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 54; // 0.75"
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  const getComputedColor = (el: HTMLElement): string => {
    const style = window.getComputedStyle(el);
    const color = style.color || "#000000";
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      return `#${parseInt(match[0]).toString(16).padStart(2, "0")}${parseInt(match[1]).toString(16).padStart(2, "0")}${parseInt(match[2]).toString(16).padStart(2, "0")}`;
    }
    return "#000000";
  };

  const writeBlock = (text: string, opts: { size: number; bold?: boolean; italic?: boolean; color?: string }) => {
    if (!text.trim()) {
      y += opts.size * 0.6;
      return;
    }
    pdf.setFont("helvetica", opts.bold ? (opts.italic ? "bolditalic" : "bold") : opts.italic ? "italic" : "normal");
    pdf.setFontSize(opts.size);

    // Set text color
    if (opts.color && opts.color !== "#000000") {
      const r = parseInt(opts.color.slice(1, 3), 16);
      const g = parseInt(opts.color.slice(3, 5), 16);
      const b = parseInt(opts.color.slice(5, 7), 16);
      pdf.setTextColor(r, g, b);
    } else {
      pdf.setTextColor(0, 0, 0);
    }

    const lines = pdf.splitTextToSize(text, maxWidth) as string[];
    for (const line of lines) {
      if (y + opts.size > pageHeight - margin) {
        pdf.addPage();
        y = margin;
      }
      pdf.text(line, margin, y);
      y += opts.size * 1.25;
    }
    y += opts.size * 0.3;
  };

  const walk = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || "").trim();
      if (text && node.parentElement) {
        const color = getComputedColor(node.parentElement);
        const isBold = window.getComputedStyle(node.parentElement).fontWeight === "bold" ||
                       parseInt(window.getComputedStyle(node.parentElement).fontWeight) >= 700;
        const isItalic = window.getComputedStyle(node.parentElement).fontStyle === "italic";
        writeBlock(text, { size: 12, bold: isBold, italic: isItalic, color });
      }
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const text = (el.textContent || "").replace(/\s+/g, " ").trim();
    const color = getComputedColor(el);
    const isBold = window.getComputedStyle(el).fontWeight === "bold" ||
                   parseInt(window.getComputedStyle(el).fontWeight) >= 700;
    const isItalic = window.getComputedStyle(el).fontStyle === "italic";

    switch (tag) {
      case "h1":
        writeBlock(text, { size: 22, bold: true, color });
        break;
      case "h2":
        writeBlock(text, { size: 18, bold: true, color });
        break;
      case "h3":
        writeBlock(text, { size: 15, bold: true, color });
        break;
      case "h4":
      case "h5":
      case "h6":
        writeBlock(text, { size: 13, bold: true, color });
        break;
      case "p":
        writeBlock(text, { size: 12, bold: isBold, italic: isItalic, color });
        break;
      case "li":
        writeBlock("• " + text, { size: 12, bold: isBold, italic: isItalic, color });
        break;
      case "img":
        const src = (el as HTMLImageElement).src;
        if (src.startsWith("data:")) {
          try {
            const imgHeight = 40;
            const imgWidth = 80;
            if (y + imgHeight > pageHeight - margin) {
              pdf.addPage();
              y = margin;
            }
            pdf.addImage(src, "PNG", margin, y, imgWidth, imgHeight);
            y += imgHeight + 8;
          } catch (e) {
            console.error("Failed to add image:", e);
          }
        }
        break;
      case "ul":
      case "ol":
      case "div":
      case "section":
      case "article":
      case "blockquote":
        el.childNodes.forEach(walk);
        break;
      default:
        if (text) writeBlock(text, { size: 12, bold: isBold, italic: isItalic, color });
        else el.childNodes.forEach(walk);
    }
  };

  container.childNodes.forEach(walk);
  document.body.removeChild(container);

  onProgress?.(0.95);
  const blob = pdf.output("blob");
  onProgress?.(1);
  return blob;
}

// ============================================================
//  Compress PDF
// ============================================================
export async function compressPdf(
  file: File,
  onProgress?: ProgressFn,
): Promise<Blob> {
  onProgress?.(0.1);
  const buf = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf, { updateMetadata: false });

  // Strip metadata (lightweight gain) and re-save with object streams.
  pdfDoc.setTitle("");
  pdfDoc.setAuthor("");
  pdfDoc.setSubject("");
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer("Trakory");
  pdfDoc.setCreator("Trakory");

  onProgress?.(0.6);
  const out = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });
  onProgress?.(1);
  return new Blob([out as BlobPart], { type: "application/pdf" });
}

// ============================================================
//  Compress Word (.docx)  — recompress media + tighten zip
// ============================================================
export async function compressDocx(
  file: File,
  onProgress?: ProgressFn,
): Promise<Blob> {
  onProgress?.(0.05);
  const buf = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buf);

  const mediaFiles = Object.keys(zip.files).filter((p) =>
    /^word\/media\/.+\.(png|jpe?g)$/i.test(p),
  );

  let done = 0;
  for (const path of mediaFiles) {
    const entry = zip.files[path];
    const blob = await entry.async("blob");
    const recompressed = await recompressImage(blob);
    if (recompressed && recompressed.size < blob.size) {
      zip.file(path, recompressed);
    }
    done++;
    onProgress?.(0.1 + (done / Math.max(1, mediaFiles.length)) * 0.8);
  }

  const out = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  onProgress?.(1);
  return out;
}

async function recompressImage(blob: Blob): Promise<Blob | null> {
  try {
    const bitmap = await createImageBitmap(blob);
    const maxDim = 1600;
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const out: Blob | null = await new Promise((res) =>
      canvas.toBlob(res, "image/jpeg", 0.78),
    );
    return out;
  } catch {
    return null;
  }
}

export function extOf(name: string): string {
  const m = name.match(/\.([^.]+)$/);
  return m ? m[1].toLowerCase() : "";
}
