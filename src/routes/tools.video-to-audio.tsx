import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/video-to-audio";
const TITLE = "Free Video to MP3 Converter — Extract Audio from Any Video | Trakory";
const DESC =
  "Free video to audio converter. Convert MP4, MOV, MKV, WEBM, AVI to MP3, WAV or FLAC right in your browser. No upload, no signup, total privacy.";

export const Route = createFileRoute("/tools/video-to-audio")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "video to audio, video to mp3, mp4 to mp3, free video converter, extract audio from video, mkv to mp3, mov to mp3, webm to mp3, online video to audio converter",
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
  component: VideoToAudioPage,
});

function VideoToAudioPage() {
  return (
    <ToolPageLayout
      title="Video to MP3 Converter"
      description="Drop any video — MP4, MOV, MKV, WEBM, AVI — and grab the audio in MP3, WAV or FLAC. 100% in your browser, free forever."
    >
      <Converter tool="video-to-audio" />
    </ToolPageLayout>
  );
}
