import { createFileRoute } from "@tanstack/react-router";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { AllInOneDownloaderToolkit } from "@/components/AllInOneDownloaderToolkit";
import { generateFaqSchema, generateHowToSchema } from "@/lib/seo";

const ROUTE_URL = "https://trakory.com/all-in-one-downloader";
const PAGE_TITLE = "All-in-One Social Media Downloader & Creator Toolkit (Free & Online) | Trakory";
const PAGE_DESC =
  "Download videos, extract audio, generate hashtags, trim clips, and process bulk content — all in one place. Supports TikTok, YouTube, Instagram, Facebook, and X (Twitter).";

const FAQS = [
  {
    question: "Is this downloader free to use?",
    answer: "Yes, all features are available for free with no signup required.",
  },
  {
    question: "Do I need to install anything?",
    answer: "No. Everything works directly in your browser.",
  },
  {
    question: "Can I download from all platforms?",
    answer: "Most major platforms are supported, but some features may still be in development.",
  },
  {
    question: "Why did my download fail?",
    answer: "Some content may be restricted or incompatible depending on the platform or format.",
  },
  {
    question: "Is it safe to use?",
    answer: "Yes. No files are uploaded — processing happens locally or through secure methods.",
  },
  {
    question: "Can I download MP4 and MP3?",
    answer: "Yes. The toolkit supports MP4 downloads and MP3 extraction flows.",
  },
];

export const Route = createFileRoute("/all-in-one-downloader")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "all in one social media downloader, video downloader online, tiktok downloader, youtube video downloader, instagram downloader, facebook video downloader, twitter video downloader, hashtag generator, bulk tiktok downloader, video trimmer online",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: ROUTE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
    ],
    links: [{ rel: "canonical", href: ROUTE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(generateFaqSchema(FAQS)),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(
          generateHowToSchema({
            title: "How to use All-in-One Social Media Downloader",
            description: "Paste a URL, detect platform, choose output format, and download media.",
            image: "https://trakory.com/logo/logo.png",
            steps: [
              { name: "Paste URL", description: "Paste social media URL into the input box." },
              {
                name: "Detect Platform",
                description:
                  "Tool auto-detects TikTok, YouTube, Instagram, Facebook, or Twitter/X.",
              },
              { name: "Choose Format", description: "Select MP4, MP3, or image where available." },
              {
                name: "Download",
                description: "Click a download button and save your media file.",
              },
            ],
          }),
        ),
      },
    ],
  }),
  component: AllInOneDownloaderPage,
});

function AllInOneDownloaderPage() {
  return (
    <ToolPageLayout
      title="All-in-One Social Media Downloader & Creator Toolkit (Free & Online)"
      description="Download videos, extract audio, generate hashtags, trim clips, and process bulk content — all in one place. Supports TikTok, YouTube, Instagram, Facebook, and X (Twitter)."
    >
      <AllInOneDownloaderToolkit />

      <div className="mt-10 space-y-10 rounded-2xl border border-border/60 bg-card/90 p-6">
        <section>
          <h2 className="text-xl font-semibold text-foreground">
            All-in-One Social Media Downloader &amp; Creator Toolkit (Free &amp; Online)
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Download videos, extract audio, generate hashtags, trim clips, and process bulk content
            — all in one place. This all-in-one social media downloader supports TikTok, YouTube,
            Instagram, Facebook, and X (Twitter), making it easy to manage and create content
            without switching tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">🚀 What This Tool Does</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This toolkit combines downloading and creator features into a single workflow:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Download videos in MP4 format</li>
            <li>Extract audio as MP3</li>
            <li>Save images and profile pictures</li>
            <li>Generate hashtags for content</li>
            <li>Trim videos directly in your browser</li>
            <li>Process multiple TikTok links in bulk</li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Everything runs online with no installation required.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">⚡ How to Use the Downloader</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Choose a mode: Video Downloader or Profile Picture Downloader</li>
            <li>Paste a video/post URL or enter a profile username</li>
            <li>Select format or processing option</li>
            <li>Download the result instantly</li>
          </ol>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            You can continue using built-in creator tools after downloading.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">🌐 Supported Platforms</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>TikTok (video, profile, bulk processing)</li>
            <li>YouTube (video and audio extraction)</li>
            <li>Instagram (posts, reels, stories)</li>
            <li>Facebook (video downloads)</li>
            <li>X / Twitter (videos and GIFs)</li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Some features may still be in development depending on platform support.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">🧠 Creator Tools Included</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">Hashtag Generator</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Generate 20–30 relevant hashtags based on your topic. Perfect for TikTok and
                Instagram growth.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Video Trimmer</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Trim clips directly in your browser without uploading files. Select start and end
                points, preview, and export.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">Bulk TikTok Downloader</h3>
              <p className="text-sm leading-7 text-muted-foreground">
                Paste multiple TikTok links and process them in batches. Track progress and retry
                failed downloads easily.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">⚠️ Important Notes</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This tool is built as a free browser-based system. While most downloads and features
            work reliably, some platforms or formats may occasionally produce errors depending on
            content restrictions, file complexity, or browser limitations.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Certain features like YouTube or X downloads and Instagram profile images may still be
            in development and can be updated over time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            📊 Why Use an All-in-One Downloader?
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Instead of switching between multiple websites, this toolkit lets you:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Download and prepare content in one workflow</li>
            <li>Save time with bulk processing</li>
            <li>Optimize posts with hashtags instantly</li>
            <li>Edit videos without extra software</li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This improves efficiency for creators, editors, and everyday users.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">🔗 Explore Related Tools</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            You can also enhance your workflow using tools like:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>
              Convert video files using our{" "}
              <a href="/tools/video-to-audio" className="text-primary hover:underline">
                Video to Audio Converter
              </a>
            </li>
            <li>
              Process audio formats using our{" "}
              <a href="/tools/audio-converter" className="text-primary hover:underline">
                Audio Converter
              </a>
            </li>
            <li>
              Optimize documents with our{" "}
              <a href="/tools/compress-pdf" className="text-primary hover:underline">
                PDF Compressor
              </a>
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            These tools are designed to work together for a smoother experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">❓ Frequently Asked Questions</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Is this downloader free to use?
              </summary>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Yes, all features are available for free with no signup required.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Do I need to install anything?
              </summary>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                No. Everything works directly in your browser.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Can I download from all platforms?
              </summary>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Most major platforms are supported, but some features may still be in development.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Why did my download fail?
              </summary>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Some content may be restricted or incompatible depending on the platform or format.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-background p-4">
              <summary className="cursor-pointer text-sm font-semibold text-foreground">
                Is it safe to use?
              </summary>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Yes. No files are uploaded — processing happens locally or through secure methods.
              </p>
            </details>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            🔍 About This Social Media Downloader
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This page targets high-demand use cases such as TikTok video download, YouTube to MP3
            conversion, Instagram media download, Facebook video saving, and Twitter/X video
            extraction. It also integrates creator tools like hashtag generation, browser-based
            video trimming, and bulk TikTok processing.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            By combining these features into one platform, users can download, edit, and optimize
            content efficiently without switching between multiple tools.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">
            🚀 Simple, Fast, and Built for Creators
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            This all-in-one toolkit is designed to simplify content workflows. Whether you're
            downloading videos, generating hashtags, or preparing media for posting, everything is
            accessible in one place with a clean and efficient experience.
          </p>
        </section>
      </div>
    </ToolPageLayout>
  );
}
