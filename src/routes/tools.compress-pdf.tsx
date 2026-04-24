import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/compress-pdf";
const TITLE = "Free PDF Compressor — Reduce PDF File Size Online | Trakory";
const DESC =
  "Compress PDF up to 80% smaller without losing quality. Free PDF compressor — no upload, no signup, fully private browser tool.";

export const Route = createFileRoute("/tools/compress-pdf")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "compress pdf, pdf compressor, reduce pdf size, shrink pdf, free pdf compressor, online pdf compressor",
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
  component: CompressPdfPage,
});

function CompressPdfPage() {
  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Shrink PDFs for email and storage. Free, private, no upload — your file never leaves your device."
    >
      <Converter tool="compress-pdf" />
    </ToolPageLayout>
  );
}
