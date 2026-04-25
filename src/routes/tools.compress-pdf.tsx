import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/compress-pdf";
export const PAGE_TITLE = "PDF Compressor Online — Reduce PDF Size Free | Trakory";
export const PAGE_DESC =
  "Compress PDF files quickly in your browser. Free PDF compressor with no upload, no signup, and private processing for fast sharing and storage.";

export const Route = createFileRoute("/tools/compress-pdf")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "compress pdf, pdf compressor, shrink pdf, reduce pdf size, online pdf compressor, free pdf compressor",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: ROUTE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: ROUTE_URL }],
  }),
  component: CompressPdfPage,
});

export function CompressPdfPage() {
  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Reduce PDF file size instantly in your browser. Free, private, and no upload — compress PDFs for email, storage, or sharing."
    >
      <Converter tool="compress-pdf" />
      <ToolPageDetails
        overview="Shrink PDF files without losing readability. This free browser-based compressor helps you reduce document size for easier sharing and faster upload while keeping your PDF private."
        features={[
          "Reduce PDF size for email and cloud sharing.",
          "Preserve readability while shrinking the file.",
          "Browser-based compression with no upload.",
          "Free to use without registration.",
        ]}
        howTo={[
          "Upload your PDF file using the button above.",
          "Wait for the compressor to process your document.",
          "Download the optimized PDF file.",
          "Use the smaller PDF for email, storage, or sharing.",
        ]}
        benefits={[
          "Send PDFs faster by reducing attachment size.",
          "Save cloud and device storage space.",
          "Share documents more easily with smaller files.",
          "Keep your PDF content private in the browser.",
        ]}
        seoContent="Use this PDF compressor to shrink large documents instantly. The tool reduces PDF size while keeping your content intact, so you can share forms, reports, and scans faster without uploading them to a server."
        relatedLinks={[
          {
            label: "Try Video to MP3 converter to extract audio from video for free!",
            href: "/video-to-audio",
          },
          {
            label: "Try Audio Converter to convert MP3, WAV, FLAC for free!",
            href: "/audio-converter",
          },
          { label: "Try PDF Compressor to reduce PDF files for free!", href: "/compress-pdf" },
          { label: "Try Word Compressor to shrink DOCX files for free!", href: "/compress-word" },
          {
            label: "Try PDF to Word converter to convert PDF files to Word for free!",
            href: "/pdf-to-word",
          },
          {
            label: "Try Word to PDF converter to convert Word files to PDF for free!",
            href: "/word-to-pdf",
          },
          {
            label: "Try TikTok Video Downloader to save TikTok videos for free!",
            href: "/tiktok-video-downloader",
          },
          {
            label: "Try TikTok Profile Picture Downloader to save profile pictures for free!",
            href: "/tiktok-profile-downloader",
          },
        ]}
        trustSignals={[
          "PDF files are processed locally in your browser.",
          "No document uploads are required.",
          "Free and private PDF optimization tool.",
        ]}
        faq={[
          {
            question: "Will my PDF quality drop after compression?",
            answer:
              "The compressor reduces file size while preserving readability; results depend on the original document.",
          },
          {
            question: "Is this tool private?",
            answer:
              "Yes. Processing happens in your browser and your file is not uploaded to our servers.",
          },
          {
            question: "Does it add a watermark?",
            answer: "No. The output PDF remains watermark-free.",
          },
          {
            question: "What file size is supported?",
            answer: "This tool supports PDF files up to 500 MB.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
