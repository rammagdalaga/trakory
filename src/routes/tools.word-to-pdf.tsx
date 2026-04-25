import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/word-to-pdf";
export const PAGE_TITLE = "Word to PDF Converter — DOCX to PDF Online | Trakory";
export const PAGE_DESC =
  "Convert DOCX files to searchable PDF instantly in your browser. Free Word to PDF converter with no upload, no signup, and private processing.";

export const Route = createFileRoute("/tools/word-to-pdf")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "word to pdf, docx to pdf, convert word to pdf, free word to pdf, online word to pdf converter, docx to pdf converter",
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
  component: WordToPdfPage,
});

export function WordToPdfPage() {
  return (
    <ToolPageLayout
      title="Word to PDF Converter"
      description="Convert DOCX documents to clean, searchable PDFs in seconds. Free, private, and browser-based."
    >
      <Converter tool="word-to-pdf" />
      <ToolPageDetails
        overview="Create polished PDF files from Word documents in your browser. This free converter preserves text and layout while generating a searchable PDF for sharing, printing, or archiving."
        features={[
          "Convert DOCX documents to PDF instantly.",
          "Create searchable PDF files with clean formatting.",
          "No upload needed — conversion happens locally.",
          "Free and easy to use with no registration.",
        ]}
        howTo={[
          "Upload your DOCX file using the tool above.",
          "Click Convert to create the PDF.",
          "Download the finished PDF file.",
          "Share or print your new PDF instantly.",
        ]}
        benefits={[
          "Send resumes, reports, and forms as PDF.",
          "Create professional documents for sharing.",
          "Generate searchable PDF archives from Word files.",
          "Keep the conversion private in your browser.",
        ]}
        seoContent="This Word to PDF converter is perfect for turning DOCX files into ready-to-share PDFs fast. The browser-based tool works without uploads, giving you secure PDF output for business, school, and personal use."
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
          "DOCX files are converted locally in the browser.",
          "No files are stored on Trakory servers.",
          "Free use with no signup required.",
        ]}
        faq={[
          {
            question: "Does the converted PDF keep formatting?",
            answer:
              "Yes. The tool preserves your document layout and formatting as it converts DOCX to PDF.",
          },
          {
            question: "Do I need to upload my file?",
            answer: "No. Conversion occurs in your browser for privacy.",
          },
          {
            question: "Is this service free?",
            answer: "Yes. Word to PDF conversion is free and does not require an account.",
          },
          {
            question: "What file types are supported?",
            answer: "This tool supports DOCX files for conversion to PDF.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
