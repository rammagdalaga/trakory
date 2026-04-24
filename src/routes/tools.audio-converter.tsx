import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/audio-converter";
export const PAGE_TITLE = "Audio Converter Online — MP3, WAV, FLAC | Trakory";
export const PAGE_DESC =
  "Convert audio files between MP3, WAV and FLAC instantly in your browser. Free, private audio converter with bitrate control and no upload required.";

export const Route = createFileRoute("/tools/audio-converter")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "audio converter, mp3 converter, wav converter, flac converter, convert mp3 to wav, online audio converter, free audio converter",
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
  component: AudioConverterPage,
});

export function AudioConverterPage() {
  return (
    <ToolPageLayout
      title="Audio Converter"
      description="Convert between MP3, WAV, and FLAC in your browser. No upload, no signup, private audio conversion for desktop and mobile."
      disableAds
    >
      <Converter tool="audio" disableAds />
      <ToolPageDetails
        overview="Convert audio files quickly and privately in your browser. This free audio converter supports MP3, WAV, and FLAC output, so you can switch formats for editing, playback, or storage without uploading your file."
        features={[
          "Convert MP3, WAV, and FLAC instantly.",
          "Choose bitrate settings for better quality or smaller size.",
          "Runs locally in your browser for privacy.",
          "No signup, no uploads, no watermark.",
        ]}
        howTo={[
          "Upload or drop the audio file above.",
          "Pick the format you want to convert to.",
          "Click Convert and wait for the file to finish.",
          "Download your new audio file instantly.",
        ]}
        benefits={[
          "Prepare audio for editing, sharing, or playback.",
          "Convert files for compatibility with different players.",
          "Keep private recordings on your own device.",
          "Use the tool on any browser without installing software.",
        ]}
        seoContent="This free online audio converter makes it easy to change formats without losing quality. Convert MP3 to WAV, WAV to FLAC, or export audio for podcasts and projects while keeping everything private and fast."
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
          "All audio conversions happen locally in your browser.",
          "No files are stored on Trakory servers.",
          "Free tool with no registration required.",
        ]}
        faq={[
          {
            question: "Is this audio converter really free?",
            answer: "Yes. You can convert audio formats for free without signing up.",
          },
          {
            question: "Will my audio file be uploaded?",
            answer: "No. The conversion runs in your browser, keeping your file private.",
          },
          {
            question: "What formats can I convert?",
            answer: "You can switch between MP3, WAV, and FLAC formats.",
          },
          {
            question: "Can I use this on mobile?",
            answer: "Yes. The audio converter works on both desktop and mobile browsers.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
