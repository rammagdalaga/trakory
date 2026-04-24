import { createFileRoute } from "@tanstack/react-router";
import { WordToPdfPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.word-to-pdf";

const KEYWORDS =
  "word to pdf, docx to pdf, convert word to pdf, free word to pdf, online word to pdf converter, docx to pdf converter";

export const Route = createFileRoute("/word-to-pdf")({
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
  component: WordToPdfPage,
});
