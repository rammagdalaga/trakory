import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/word-to-pdf";
const TITLE = "Free Word to PDF Converter — DOCX to PDF | Trakory";
const DESC =
  "Convert DOCX to PDF free online. Searchable text, clean layout, instant download. 100% private — runs in your browser.";

export const Route = createFileRoute("/tools/word-to-pdf")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "word to pdf, docx to pdf, convert word to pdf, free word to pdf, doc to pdf converter, online word to pdf",
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
  component: WordToPdfPage,
});

function WordToPdfPage() {
  return (
    <ToolPageLayout
      title="Word to PDF Converter"
      description="Convert DOCX documents to clean, searchable PDFs in seconds. Free, private, browser-based."
    >
      <Converter tool="word-to-pdf" />
    </ToolPageLayout>
  );
}
