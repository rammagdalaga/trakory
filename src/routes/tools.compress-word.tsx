import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/compress-word";
export const PAGE_TITLE = "Word Compressor Online — Reduce DOCX Size Free | Trakory";
export const PAGE_DESC =
  "Compress DOCX files instantly in your browser. Free Word compressor that preserves formatting and reduces file size without uploads or signup.";

export const Route = createFileRoute("/tools/compress-word")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "word compressor, compress docx, reduce docx size, shrink word document, online word compressor, free word tool",
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
  component: CompressWordPage,
});

export function CompressWordPage() {
  return (
    <ToolPageLayout
      title="Word Compressor"
      description="Reduce DOCX file size instantly without uploading. Free, private compression for Word documents that keeps text and layout intact."
      disableAds
    >
      <Converter tool="compress-word" disableAds />
      <ToolPageDetails
        overview="Compress Word documents directly in your browser to make large DOCX files easier to share. This free tool optimizes embedded images and reduces file size while preserving your content."
        features={[
          "Shrink DOCX file size for faster sharing.",
          "Keep formatting intact while compressing.",
          "Browser-based compression with no upload.",
          "Free to use with no signup required.",
        ]}
        howTo={[
          "Upload your DOCX file above.",
          "Click Compress to optimize the document.",
          "Download the smaller DOCX file.",
          "Use the compressed file for email or upload.",
        ]}
        benefits={[
          "Send resumes, reports, and proposals more easily.",
          "Store Word files using less cloud or device space.",
          "Speed up uploads to email and collaboration tools.",
          "Keep your document private by compressing locally.",
        ]}
        seoContent="Use this Word compressor to reduce DOCX file size faster and easier. The tool is perfect for document sharing, storage, and sending without losing layout or quality."
        relatedLinks={[
          { label: "Try Video to MP3 converter to extract audio from video for free!", href: "/video-to-audio" },
          { label: "Try Audio Converter to convert MP3, WAV, FLAC for free!", href: "/audio-converter" },
          { label: "Try PDF Compressor to reduce PDF files for free!", href: "/compress-pdf" },
          { label: "Try Word Compressor to shrink DOCX files for free!", href: "/compress-word" },
          { label: "Try PDF to Word converter to convert PDF files to Word for free!", href: "/pdf-to-word" },
          { label: "Try Word to PDF converter to convert Word files to PDF for free!", href: "/word-to-pdf" },
          { label: "Try TikTok Video Downloader to save TikTok videos for free!", href: "/tiktok-video-downloader" },
          { label: "Try TikTok Profile Picture Downloader to save profile pictures for free!", href: "/tiktok-profile-downloader" },
        ]}
        trustSignals={[
          "Your DOCX file stays in the browser, not on our server.",
          "No installation or account is required.",
          "Free, private Word compression anytime.",
        ]}
        faq={[
          {
            question: "Does the compressor keep my document layout?",
            answer: "Yes. It compresses embedded content while preserving formatting.",
          },
          {
            question: "Is this service free?",
            answer: "Yes. Word compression is free and requires no account.",
          },
          {
            question: "Will the document stay private?",
            answer: "Yes. Processing happens locally in your browser.",
          },
          {
            question: "What file formats are supported?",
            answer: "This tool supports DOCX Word documents.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
