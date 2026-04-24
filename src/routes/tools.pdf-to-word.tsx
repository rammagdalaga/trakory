import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/pdf-to-word";
const TITLE = "Free PDF to Word Converter — Editable .docx Output | Trakory";
const DESC =
  "Convert PDF to Word (.docx) free online. Fully editable text in Microsoft Word, no signup, no upload — 100% private browser conversion.";

export const Route = createFileRoute("/tools/pdf-to-word")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "pdf to word, pdf to docx, convert pdf to word, free pdf to word, pdf to word converter online, editable pdf to word",
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
  component: PdfToWordPage,
});

function PdfToWordPage() {
  return (
    <ToolPageLayout
      title="PDF to Word Converter"
      description="Turn any PDF into a fully editable Word .docx document. Free, private, instant — no signup or upload."
    >
      <Converter tool="pdf-to-word" />
    </ToolPageLayout>
  );
}
