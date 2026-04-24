import { createFileRoute } from "@tanstack/react-router";
import { AudioConverterPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.audio-converter";

const KEYWORDS =
  "audio converter, mp3 converter, wav converter, flac converter, convert mp3 to wav, online audio converter, free audio converter";

export const Route = createFileRoute("/audio-converter")({
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
  component: AudioConverterPage,
});
