import { createFileRoute } from "@tanstack/react-router";
import { TikTokProfileDownloader } from "@/components/TikTokProfileDownloader";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { ToolPageDetails } from "@/components/ToolPageDetails";

export const ROUTE_URL = "https://trakory.com/tiktok-profile-downloader";
export const PAGE_TITLE = "TikTok Profile Picture Downloader — HD Avatar Download | Trakory";
export const PAGE_DESC =
  "Download TikTok profile pictures in HD instantly. Free avatar downloader for public TikTok usernames, no login, no signup, and no app required.";

export const Route = createFileRoute("/tools/tiktok-profile-downloader")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "tiktok profile picture downloader, download tiktok avatar, tiktok profile pic downloader, tiktok dp saver, download tiktok profile image",
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
  component: TikTokProfileDownloaderPage,
});

export function TikTokProfileDownloaderPage() {
  return (
    <ToolPageLayout
      title="TikTok Profile Picture Downloader"
      description="Download public TikTok profile pictures in HD. Free, instant, and browser-based — no login or signup needed."
      disableAds
    >
      <TikTokProfileDownloader disableAds />
      <ToolPageDetails
        overview="Download TikTok profile pictures in high resolution without extra apps or login. This free browser tool fetches public profile avatars quickly and privately."
        features={[
          "Download HD TikTok avatars instantly.",
          "Works with public usernames only.",
          "No login, no signup, no app needed.",
          "Free and private browser-based download.",
        ]}
        howTo={[
          "Enter the public TikTok username above.",
          "Click Download to fetch the profile image.",
          "Save the HD avatar to your device.",
          "Use the image for planning or reference.",
        ]}
        benefits={[
          "Save profile pictures for mood boards or marketing.",
          "Preview TikTok avatars before following creators.",
          "Keep a local copy of public profile images.",
          "Avoid installing extra apps or extensions.",
        ]}
        seoContent="This TikTok profile picture downloader makes it easy to save public avatars in HD. The tool is free, simple, and avoids any login requirements while keeping your image download process fast and secure."
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
          "Only public profiles are supported.",
          "No pictures are stored on our servers.",
          "Free and private TikTok profile image download.",
        ]}
        faq={[
          {
            question: "Do I need a TikTok account?",
            answer: "No account is needed to download public TikTok profile pictures.",
          },
          {
            question: "Is this tool free?",
            answer: "Yes. It is free to use with no registration.",
          },
          {
            question: "Will this work for private profiles?",
            answer: "No. Only public TikTok profiles are supported.",
          },
          {
            question: "Does it download high-resolution images?",
            answer: "Yes. The tool retrieves the best available profile picture resolution.",
          },
        ]}
      />
    </ToolPageLayout>
  );
}
