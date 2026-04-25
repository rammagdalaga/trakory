import { createFileRoute } from "@tanstack/react-router";
import { TikTokVideoDownloader } from "@/components/TikTokVideoDownloader";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/tiktok-video-downloader";
export const PAGE_TITLE = "TikTok Video Downloader — No Watermark MP4 Download | Trakory";
export const PAGE_DESC =
  "Download TikTok videos without watermark in HD quality. Free TikTok video downloader that works on mobile and desktop with no login required.";

export const Route = createFileRoute("/tools/tiktok-video-downloader")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "tiktok video downloader, download tiktok video, tiktok no watermark, tiktok mp4 download, tiktok video saver, download tiktok without watermark",
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
  component: TikTokVideoDownloaderPage,
});

export function TikTokVideoDownloaderPage() {
  return (
    <ToolPageLayout
      title="TikTok Video Downloader"
      description="Paste a TikTok link and download a watermark-free MP4 instantly. Free, fast, and works on mobile and desktop."
    >
      <TikTokVideoDownloader />
      <ToolPageDetails
        overview="Download TikTok videos as clean MP4 files from your browser. This free downloader removes extra steps, works on both mobile and desktop, and does not require login or apps."
        features={[
          "Download TikTok videos without watermark.",
          "Save MP4 clips in HD quality.",
          "Works on Android, iOS, and desktop browsers.",
          "No login or signup required.",
        ]}
        howTo={[
          "Open TikTok and copy the video link.",
          "Paste the link into the downloader box above.",
          "Click the Download button.",
          "Save the video to your device.",
        ]}
        benefits={[
          "Watch videos offline anytime.",
          "Save favorite TikTok clips without watermarks.",
          "Use downloaded content for editing or reference.",
          "Share videos across devices with ease.",
        ]}
        seoContent="This TikTok video downloader is built for fast, watermark-free MP4 downloads. It helps you save videos from TikTok without login, app installs, or extra steps, making the process simple and secure."
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
          "No TikTok account or login is required.",
          "The video downloads directly to your device.",
          "Free, secure, and private browser-based tool.",
        ]}
        faq={[
          {
            question: "Is this TikTok downloader free?",
            answer: "Yes. It is free to use with no signup required.",
          },
          {
            question: "Can I download videos without watermark?",
            answer:
              "Yes. The tool downloads the available TikTok video file without adding a watermark.",
          },
          {
            question: "Does it work on iPhone and Android?",
            answer: "Yes. It works on both mobile and desktop browsers.",
          },
          {
            question: "Do I need to install anything?",
            answer: "No installation is required. The downloader works directly in your browser.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
