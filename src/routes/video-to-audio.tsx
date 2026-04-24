import { createFileRoute } from "@tanstack/react-router";
import { VideoToAudioPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.video-to-audio";

const KEYWORDS =
  "video to mp3, convert video to audio, mp4 to mp3, extract audio from video, online video converter, free video to audio converter";

export const Route = createFileRoute("/video-to-audio")({
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
  component: VideoToAudioPage,
});
