import { createFileRoute } from "@tanstack/react-router";
import { CompressWordPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.compress-word";

const KEYWORDS =
  "word compressor, compress docx, reduce docx size, shrink word document, online word compressor, free word tool";

export const Route = createFileRoute("/compress-word")({
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
  component: CompressWordPage,
});
