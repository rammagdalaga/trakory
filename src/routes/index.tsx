import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { InterstitialAd } from "@/components/InterstitialAd";
import { BottomAdBar } from "@/components/BottomAdBar";
import { TopAdBar } from "@/components/TopAdBar";

const SITE_URL = "https://trakory.app";
const OG_TITLE = "Trakory — Free Video to Audio Converter (MP3, WAV, FLAC)";
const OG_DESC =
  "Convert MP4, MOV, MKV, WEBM and more to MP3, WAV or FLAC instantly in your browser. 100% private — no uploads, no signup, no watermark. Free forever.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Video to Audio Converter — MP3, WAV, FLAC | Trakory" },
      {
        name: "description",
        content: OG_DESC,
      },
      {
        name: "keywords",
        content:
          "video to audio converter, video to mp3, mp4 to mp3, convert video to audio, extract audio from video, video to wav, video to flac, online audio converter, free mp3 converter, browser video converter, private video converter",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Trakory" },
      { name: "theme-color", content: "#0ea5b7" },
      { name: "application-name", content: "Trakory" },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESC },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Trakory" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESC },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Trakory",
          url: SITE_URL,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any (Web Browser)",
          description: OG_DESC,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          featureList: [
            "Convert video to MP3",
            "Convert video to WAV",
            "Convert video to FLAC",
            "100% in-browser conversion",
            "No uploads, fully private",
            "Supports MP4, MOV, MKV, WEBM, AVI",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "1280",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is Trakory free to use?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Trakory is 100% free with no account required.",
              },
            },
            {
              "@type": "Question",
              name: "Are my video files uploaded to a server?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. All conversion runs locally in your browser using WebAssembly. Your files never leave your device.",
              },
            },
            {
              "@type": "Question",
              name: "What audio formats can I export to?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can export MP3 (128/192/320 kbps), lossless WAV, or compressed FLAC.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      {/* Ambient gradient blobs (soft, no rainbow) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-10%] size-[320px] rounded-full bg-primary/15 blur-[120px] sm:size-[480px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-[-10%] size-[360px] rounded-full bg-accent/15 blur-[120px] sm:size-[520px]"
      />

      <TopAdBar />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5 sm:px-6 sm:pt-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Trakory home">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-brand shadow-soft">
            <span className="font-mono text-sm font-bold text-primary-foreground">
              T
            </span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Trakory
          </span>
        </a>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Engine ready
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 sm:py-16 lg:py-20">
        <div className="mb-10 max-w-2xl text-center sm:mb-12">
          <span className="mb-4 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur sm:mb-5">
            Private · In-browser · No uploads
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Free Video to Audio Converter —{" "}
            <span className="text-gradient-brand">MP3, WAV, FLAC</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
            Convert MP4, MOV, MKV and WEBM videos into high-quality audio
            directly in your browser. No uploads, no signup, 100% private.
          </p>
        </div>

        <Converter />

        <section
          aria-label="Why Trakory"
          className="mt-14 grid w-full max-w-4xl grid-cols-1 gap-3 sm:mt-20 sm:grid-cols-3 sm:gap-4"
        >
          {[
            {
              title: "Stays on your device",
              body: "Files never touch a server. Conversion happens locally with WebAssembly.",
            },
            {
              title: "Studio-quality output",
              body: "Choose MP3 at 128/192/320 kbps, lossless WAV, or compressed FLAC.",
            },
            {
              title: "Fast & free",
              body: "No accounts, no queues, no watermarks. Just drop and convert.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-card/70 p-5 shadow-soft backdrop-blur"
            >
              <h3 className="text-sm font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {f.body}
              </p>
            </div>
          ))}
        </section>
      </main>

      <section
        aria-label="Frequently asked questions"
        className="relative z-10 mx-auto mt-4 w-full max-w-3xl px-4 pb-12 sm:px-6"
      >
        <h2 className="mb-6 text-center text-xl font-semibold text-foreground sm:text-2xl">
          Frequently asked questions
        </h2>
        <div className="space-y-3">
          {[
            {
              q: "How do I convert a video to MP3?",
              a: "Drop your video file into Trakory, pick MP3 and a bitrate (128, 192 or 320 kbps), then click Convert. Your audio is ready to download in seconds.",
            },
            {
              q: "Is Trakory really free and private?",
              a: "Yes. Trakory is free forever and runs entirely in your browser using WebAssembly. Your files never leave your device.",
            },
            {
              q: "What video formats are supported?",
              a: "MP4, MOV, MKV, WEBM, AVI and most common containers your browser can read.",
            },
          ].map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-card/70 p-4 shadow-soft backdrop-blur"
            >
              <summary className="cursor-pointer list-none text-sm font-semibold text-foreground sm:text-base">
                {f.q}
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-28 text-center sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Trakory · Sound, distilled
        </p>
      </footer>

      <InterstitialAd />
      <BottomAdBar />
    </div>
  );
}
