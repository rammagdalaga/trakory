import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/tools/audio-converter";
export const PAGE_TITLE = "Audio Converter Online (MP3, WAV, FLAC) — Free & Private | Trakory";
export const PAGE_DESC =
  "Convert audio files between MP3, WAV, and FLAC directly in your browser. Free audio converter with no uploads, no signup, and full privacy on mobile and desktop.";

export const Route = createFileRoute("/tools/audio-converter")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "audio converter, mp3 converter, wav converter, flac converter, convert mp3 to wav, convert wav to flac, online audio converter, free audio converter, browser audio converter, no upload audio converter",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: ROUTE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: ROUTE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is this audio converter free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, all conversions are completely free with no signup required.",
              },
            },
            {
              "@type": "Question",
              name: "Are my files uploaded to a server?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Files are processed locally in your browser for full privacy.",
              },
            },
            {
              "@type": "Question",
              name: "What formats are supported?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can convert between MP3, WAV, and FLAC formats.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use this on mobile devices?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, it works on modern mobile browsers including Android and iPhone.",
              },
            },
            {
              "@type": "Question",
              name: "Why did my audio not convert perfectly?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Some files may have encoding complexities that affect conversion. This is a limitation of browser-based processing, and improvements are ongoing.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: AudioConverterPage,
});

export function AudioConverterPage() {
  return (
    <ToolPageLayout
      title="Audio Converter Online"
      description="Convert audio files between MP3, WAV, and FLAC directly in your browser — no uploads, no signup, and full privacy on mobile and desktop."
    >
      <Converter tool="audio" />
      <ToolPageDetails
        overview="Trakory's audio converter helps you switch between popular formats like MP3, WAV, and FLAC for better compatibility, quality, or smaller file size. Whether you're preparing audio for editing, streaming, or sharing, everything happens locally on your device — nothing is ever uploaded to a server."
        features={[
          "Convert MP3 to WAV, WAV to FLAC, and more format combinations.",
          "Adjustable bitrate options: 128k, 192k, and 320k.",
          "Fast processing entirely in your browser — no waiting.",
          "No uploads — your files stay private on your device.",
          "Works on mobile, tablet, and desktop browsers.",
        ]}
        howTo={[
          "Upload or drag your audio file into the converter above.",
          "Choose the output format: MP3, WAV, or FLAC.",
          "Select a bitrate if needed for quality or size control.",
          "Click Convert, then download your file instantly.",
        ]}
        benefits={[
          "MP3 is best for smaller file size and easy sharing.",
          "WAV offers high-quality uncompressed audio for editing.",
          "FLAC provides lossless compression for better storage efficiency.",
          "Convert files for compatibility across different devices and players.",
          "Keep private recordings on your own device — no cloud involved.",
        ]}
        seoContent="This free online audio converter makes it easy to change formats without losing quality. Convert MP3 to WAV for editing, WAV to FLAC for archiving, or prepare audio for podcasts and content creation — all while keeping everything private and fast. No installation or signup required. This tool runs entirely in your browser and is provided free of charge. While most conversions work reliably, some files may occasionally produce errors depending on file complexity, size, or browser limitations. If this happens, try adjusting settings or using a different format."
        relatedLinks={[
          {
            label: "Extract audio from video files with our Video to Audio Converter — free!",
            href: "/tools/video-to-audio",
          },
          {
            label:
              "Convert PDF files to editable Word documents with our PDF to Word Converter — free!",
            href: "/tools/pdf-to-word",
          },
          {
            label: "Turn Word documents into PDFs with our Word to PDF Converter — free!",
            href: "/tools/word-to-pdf",
          },
          {
            label: "Reduce PDF size by up to 80% with our PDF Compressor — free!",
            href: "/tools/compress-pdf",
          },
          {
            label:
              "Save TikTok videos without a watermark using our TikTok Video Downloader — free!",
            href: "/tools/tiktok-video-downloader",
          },
        ]}
        trustSignals={[
          "All audio conversions happen locally in your browser using WebAssembly.",
          "No files are stored on Trakory servers — ever.",
          "Free tool with no registration or account required.",
        ]}
        faq={[
          {
            question: "Is this audio converter free?",
            answer: "Yes, all conversions are completely free with no signup required.",
          },
          {
            question: "Are my files uploaded to a server?",
            answer: "No. Files are processed locally in your browser for full privacy.",
          },
          {
            question: "What formats are supported?",
            answer: "You can convert between MP3, WAV, and FLAC formats.",
          },
          {
            question: "Can I use this on mobile devices?",
            answer: "Yes, it works on modern mobile browsers including Android and iPhone.",
          },
          {
            question: "Why did my audio not convert perfectly?",
            answer:
              "Some files may have encoding complexities that affect conversion. This is a limitation of browser-based processing, and improvements are ongoing.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
