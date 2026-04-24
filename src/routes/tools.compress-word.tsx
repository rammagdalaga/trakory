import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/compress-word";
const TITLE = "Free Word Compressor — Reduce DOCX File Size | Trakory";
const DESC =
  "Compress Word DOCX files up to 75% smaller. Free, private, browser-based — no signup, no uploads.";

export const Route = createFileRoute("/tools/compress-word")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "compress word, word compressor, compress docx, reduce docx size, shrink word document, free word compressor",
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
  component: CompressWordPage,
});

function CompressWordPage() {
  return (
    <ToolPageLayout
      title="Word Compressor"
      description="Reduce DOCX file size by shrinking embedded images. Free, private, instant — no upload."
    >
      <Converter tool="compress-word" />
    </ToolPageLayout>
  );
}
