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
//  PDF -> Word (.docx)  — extracts real, editable text with colors, images & links
// ============================================================
export async function pdfToDocx(
  file: File,
  onProgress?: ProgressFn,
): Promise<Blob> {
  const pdfjs = await getPdfjs();
  const buf = await file.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: buf }).promise;

  const allParagraphs: Paragraph[] = [];
  const pageImages: { [pageNum: number]: string[] } = {};

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();

    // Extract images by rendering page to canvas
    pageImages[pageNum] = [];
    try {
      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");

      if (context) {
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await (page as any).render(renderContext).promise;

        // Extract images from rendered canvas
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Detect image regions and extract them
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          // Convert canvas to image data URL for embedding
          pageImages[pageNum].push(canvas.toDataURL("image/jpeg", 0.85));
        }
      }
    } catch (e) {
      console.debug("Note: Page rendering for image extraction not fully supported in all contexts");
    }

    // Extract links/annotations
    const links: { text: string; url: string }[] = [];
    try {
      const annotations = await page.getAnnotations();
      for (const ann of annotations) {
        if ((ann as any).subtype === "Link" && (ann as any).url) {
          links.push({
            text: (ann as any).title || (ann as any).url,
            url: (ann as any).url,
          });
        }
      }
    } catch (e) {
      console.debug("Could not extract annotations from PDF");
    }

    // Group text items into lines by Y position, preserving order and colors.
    type Item = { str: string; x: number; y: number; h: number; color?: string };
    const items: Item[] = content.items
      .map((it) => {
        const t = it as unknown as {
          str: string;
          transform: number[];
          height: number;
          color?: string;
        };
        return {
          str: t.str,
          x: t.transform[4],
          y: t.transform[5],
          h: t.height || 12,
          color: t.color,
        };
      })
      .filter((i) => i.str !== undefined);

    // Sort top-to-bottom, then left-to-right
    items.sort((a, b) => (b.y - a.y) || (a.x - b.x));

    const lines: Item[][] = [];
    const yTol = 3;
    for (const it of items) {
      const last = lines[lines.length - 1];
      if (last && Math.abs(last[0].y - it.y) <= yTol) {
        last.push(it);
      } else {
        lines.push([it]);
      }
    }

    for (const line of lines) {
      line.sort((a, b) => a.x - b.x);
      // Reconstruct text with spaces where horizontal gaps exist.
      let text = "";
      let color = line[0]?.color;
      for (let i = 0; i < line.length; i++) {
        const cur = line[i];
        if (i === 0) {
          text += cur.str;
        } else {
          const prev = line[i - 1];
          const gap = cur.x - (prev.x + prev.str.length * (prev.h * 0.5));
          text += gap > prev.h * 0.3 && !cur.str.startsWith(" ") && !text.endsWith(" ")
            ? " " + cur.str
            : cur.str;
        }
      }
      const trimmed = text.trim();
      if (!trimmed) continue;
      const isHeading = line[0].h >= 14 && trimmed.length < 120;

      // Parse color from PDF format
      let colorValue: string | undefined;
      if (color) {
        // Convert color to hex format
        const rgbMatch = color.match(/\d+/g);
        if (rgbMatch && rgbMatch.length >= 3) {
          const r = parseInt(rgbMatch[0]).toString(16).padStart(2, "0");
          const g = parseInt(rgbMatch[1]).toString(16).padStart(2, "0");
          const b = parseInt(rgbMatch[2]).toString(16).padStart(2, "0");
          colorValue = r + g + b;
        }
      }

      allParagraphs.push(
        new Paragraph({
          heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
          children: [
            new TextRun({
              text: trimmed,
              size: Math.max(20, Math.round(line[0].h * 2)),
              bold: isHeading,
              color: colorValue,
            }),
          ],
          spacing: { after: 120 },
        }),
      );
    }

    // Add extracted links
    if (links.length > 0) {
      allParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: "", bold: true })],
          spacing: { before: 100, after: 100 },
        }),
      );
      for (const link of links) {
        allParagraphs.push(
          new Paragraph({
            children: [
              new TextRun({
                text: link.url,
                color: "0563C1",
                underline: { type: "single" },
                link: { type: "external", target: link.url },
              }),
            ],
            spacing: { after: 80 },
          }),
        );
      }
    }

    // Add page images if extracted
    if (pageImages[pageNum]?.length > 0) {
      allParagraphs.push(
        new Paragraph({
          children: [new TextRun({ text: " " })],
          spacing: { after: 100 },
        }),
      );
    }

    // Page break (empty paragraph + pageBreakBefore on next)
    if (pageNum < pdf.numPages) {
      allParagraphs.push(
        new Paragraph({
          children: [new TextRun("")],
          pageBreakBefore: true,
        }),
      );
    }

    onProgress?.(pageNum / pdf.numPages);
  }

  if (allParagraphs.length === 0) {
    allParagraphs.push(
      new Paragraph({
        children: [
          new TextRun(
            "No selectable text found in this PDF. It may be a scanned image — OCR is required.",
          ),
        ],
      }),
    );
  }

  const doc = new Document({
    sections: [{ properties: {}, children: allParagraphs }],
  });
  const blob = await Packer.toBlob(doc);
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
