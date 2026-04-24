import { createFileRoute } from "@tanstack/react-router";
import { TikTokVideoDownloaderPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.tiktok-video-downloader";

const KEYWORDS =
  "tiktok video downloader, download tiktok video, tiktok no watermark, tiktok mp4 download, tiktok video saver, download tiktok without watermark";

export const Route = createFileRoute("/tiktok-video-downloader")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { name: "keywords", content: KEYWORDS },
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
