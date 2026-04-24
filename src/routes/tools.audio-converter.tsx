import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/audio-converter";
const TITLE = "Free Audio Converter — MP3, WAV, FLAC | Trakory";
const DESC =
  "Free online audio converter. Switch between MP3, WAV and FLAC with full bitrate control. 100% private, runs in your browser.";

export const Route = createFileRoute("/tools/audio-converter")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "audio converter, mp3 converter, wav converter, flac converter, online audio converter, free audio converter, convert mp3 to wav",
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
  component: AudioConverterPage,
});

function AudioConverterPage() {
  return (
    <ToolPageLayout
      title="Audio Converter"
      description="Convert audio between MP3, WAV and FLAC with full bitrate control. Free, private, browser-based — no upload required."
    >
      <Converter tool="audio" />
    </ToolPageLayout>
  );
}
