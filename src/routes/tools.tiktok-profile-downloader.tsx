import { createFileRoute } from "@tanstack/react-router";
import { TikTokProfileDownloader } from "@/components/TikTokProfileDownloader";
import { ToolPageLayout } from "@/components/ToolPageLayout";

const URL = "https://trakory.com/tools/tiktok-profile-downloader";
const TITLE = "Free TikTok Profile Picture Downloader — HD Avatar | Trakory";
const DESC =
  "Download any TikTok profile picture in HD. Type a username, get the full-size avatar. Free, instant, no signup.";

export const Route = createFileRoute("/tools/tiktok-profile-downloader")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      {
        name: "keywords",
        content:
          "tiktok profile picture downloader, tiktok avatar downloader, download tiktok profile pic, tiktok dp downloader, tiktok hd profile picture",
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
  component: TikTokProfileDownloaderPage,
});

function TikTokProfileDownloaderPage() {
  return (
    <ToolPageLayout
      title="TikTok Profile Picture Downloader"
      description="Grab anyone's TikTok profile picture in HD. Free, instant, no signup — works for any public TikTok username."
    >
      <TikTokProfileDownloader />
    </ToolPageLayout>
  );
}
