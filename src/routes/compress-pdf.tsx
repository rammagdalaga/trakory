import { createFileRoute } from "@tanstack/react-router";
import { CompressPdfPage, ROUTE_URL, PAGE_TITLE, PAGE_DESC } from "./tools.compress-pdf";

const KEYWORDS =
  "compress pdf, pdf compressor, shrink pdf, reduce pdf size, online pdf compressor, free pdf compressor";

export const Route = createFileRoute("/compress-pdf")({
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
  component: CompressPdfPage,
});
