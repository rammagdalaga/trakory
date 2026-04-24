import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/pdf-to-word";
export const PAGE_TITLE = "PDF to Word Converter — Editable DOCX Output | Trakory";
export const PAGE_DESC =
  "Convert PDF to editable Word DOCX directly in your browser. Free PDF to Word converter with no upload, no signup, and private local processing.";

export const Route = createFileRoute("/tools/pdf-to-word")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "pdf to word, pdf to docx, convert pdf to word, free pdf to word, online pdf to word converter, editable pdf file",
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
  component: PdfToWordPage,
});

export function PdfToWordPage() {
  return (
    <ToolPageLayout
      title="PDF to Word Converter"
      description="Convert PDFs into editable DOCX files instantly. Free, private, and browser-based — no upload required."
      disableAds
    >
      <Converter tool="pdf-to-word" disableAds />
      <ToolPageDetails
        overview="Convert PDF documents to editable Word files directly in your browser. This free tool helps you reuse and edit PDF content without uploading your document to a server."
        features={[
          "Turn PDFs into editable DOCX files.",
          "Preserve text and layout where possible.",
          "Browser-based conversion with no upload.",
          "Free to use without an account.",
        ]}
        howTo={[
          "Upload your PDF file using the converter above.",
          "Wait for the file to convert to Word format.",
          "Download the editable DOCX file.",
          "Open it in Microsoft Word or compatible editors.",
        ]}
        benefits={[
          "Edit PDF content without retyping it manually.",
          "Reuse reports, invoices, and articles in Word.",
          "Save time on document updates and revisions.",
          "Keep your file private as conversion occurs locally.",
        ]}
        seoContent="This PDF to Word converter is ideal for anyone who needs editable DOCX output from PDF files. It delivers fast, private results in the browser, so you can continue working without uploading sensitive documents."
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
          "No PDFs are uploaded to our servers.",
          "Your document is converted in the browser.",
          "Free conversion with no registration needed.",
        ]}
        faq={[
          {
            question: "Will the Word file keep PDF formatting?",
            answer:
              "The converter preserves layout and text structure as much as possible while producing an editable DOCX.",
          },
          {
            question: "Do I need to upload my PDF?",
            answer: "No. Conversion happens locally in your browser.",
          },
          {
            question: "What types of PDFs work best?",
            answer: "Text-based PDFs convert best; scanned image-only PDFs may be less accurate.",
          },
          {
            question: "Is this converter free?",
            answer: "Yes. It is free to use with no signup required.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
