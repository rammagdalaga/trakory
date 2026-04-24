import { createFileRoute } from "@tanstack/react-router";
import { TikTokVideoDownloader } from "@/components/TikTokVideoDownloader";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/tiktok-video-downloader";
const TITLE = "Free TikTok Video Downloader — No Watermark MP4 | Trakory";
const DESC =
  "Download TikTok videos free with no watermark. Paste a TikTok link, get the MP4 instantly. No signup, no app, works on any device.";

export const Route = createFileRoute("/tools/tiktok-video-downloader")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "tiktok video downloader, tiktok downloader, download tiktok video, tiktok no watermark, tiktok mp4, save tiktok video, tiktok video saver",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: TikTokVideoDownloaderPage,
});

function TikTokVideoDownloaderPage() {
  return (
    <ToolPageLayout
      title="TikTok Video Downloader"
      description="Paste a TikTok link and download the MP4 with no watermark. Free, fast, works on phone and desktop."
    >
      <TikTokVideoDownloader />
    </ToolPageLayout>
  );
}
