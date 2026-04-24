import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/video-to-audio";
export const PAGE_TITLE = "Video to MP3 Converter — Free Video to Audio Tool | Trakory";
export const PAGE_DESC =
  "Convert MP4, MOV, MKV, WEBM and AVI to MP3, WAV, or FLAC in your browser. No upload, no signup — extract audio from video instantly and privately.";

export const Route = createFileRoute("/tools/video-to-audio")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "video to mp3, convert video to audio, mp4 to mp3, extract audio from video, online video converter, free video to audio converter",
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
  component: VideoToAudioPage,
});

export function VideoToAudioPage() {
  return (
    <ToolPageLayout
      title="Video to MP3 Converter"
      description="Convert video files to MP3, WAV, or FLAC instantly in your browser. Free, private, and no upload required."
      disableAds
    >
      <Converter tool="video-to-audio" disableAds />
      <ToolPageDetails
        overview="Extract audio from any supported video file without sending it to a server. This browser-based tool converts MP4, MOV, MKV, WEBM, and AVI into MP3, WAV or FLAC while keeping your file private."
        features={[
          "Convert videos to audio in MP3, WAV, or FLAC.",
          "Supports MP4, MOV, MKV, WEBM, AVI and more.",
          "Runs fully in your browser with no upload.",
          "Free to use with no signup or watermark.",
        ]}
        howTo={[
          "Drop or choose your video file above.",
          "Select the audio format you want.",
          "Click Convert to extract the track.",
          "Download the finished MP3, WAV, or FLAC file.",
        ]}
        benefits={[
          "Save lectures, music, podcasts, and voice recordings.",
          "Create audio files for offline listening.",
          "Extract soundtrack clips for editing and production.",
          "Keep your files private by converting locally.",
        ]}
        seoContent="This video to MP3 converter makes it easy to extract audio from video files without uploading anything. Convert MP4 to MP3 or export WAV and FLAC while keeping your media private, fast, and accessible on desktop or mobile."
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
          "No files are uploaded to our servers.",
          "Your conversion stays private and local.",
          "Free tool with no registration required.",
        ]}
        faq={[
          {
            question: "What video formats are supported?",
            answer: "The tool supports MP4, MOV, MKV, WEBM, AVI and other common video formats.",
          },
          {
            question: "Is this tool free to use?",
            answer: "Yes. Converting video to audio is free and does not require registration.",
          },
          {
            question: "Does my video leave my device?",
            answer:
              "No. Conversion runs locally in your browser so your video file remains private.",
          },
          {
            question: "Can I download audio in different formats?",
            answer: "Yes, you can export your audio as MP3, WAV, or FLAC.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
