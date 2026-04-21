import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { InterstitialAd } from "@/components/InterstitialAd";
import { BottomAdBar } from "@/components/BottomAdBar";
import { TopAdBar } from "@/components/TopAdBar";

const SITE_URL = "https://trakory.com";
const OG_TITLE = "Trakory — Free Online File Converter Tools";
const OG_DESC =
  "Convert videos to MP3, resize images, convert PDFs to Word, compress files & more. 100% free, fast, and private. All conversions happen in your browser. No uploads, no signup.";
const SCHEMA_DESC = "Free online converter platform supporting video to audio conversion, image resizing, PDF conversion, Word document conversion, and more. Browser-based conversion with no uploads or registration required.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free Online Converter: Video, Audio, PDF, Images, Word & More | Trakory" },
      {
        name: "description",
        content: OG_DESC,
      },
      {
        name: "keywords",
        content:
          "online converter, file converter, video to audio, mp3 converter, image resizer, PDF converter, word converter, audio converter, free online tools, browser converter, private conversion, no upload required, video converter, format converter, media converter, document converter",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "author", content: "Trakory" },
      { name: "theme-color", content: "#0ea5b7" },
      { name: "application-name", content: "Trakory" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { property: "og:title", content: OG_TITLE },
      { property: "og:description", content: OG_DESC },
      { property: "og:image", content: `${SITE_URL}/logo/logo.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Trakory" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: OG_TITLE },
      { name: "twitter:description", content: OG_DESC },
      { name: "twitter:image", content: `${SITE_URL}/logo/logo.png` },
      { name: "twitter:creator", content: "@Trakory" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      // Website icon (favicon)
      { rel: "icon", type: "image/png", href: "/logo/32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/logo/16x16.png", sizes: "16x16" },

      // Main shortcut icon (fallback)
      { rel: "shortcut icon", href: "/logo/logo.png" },

      // Apple devices icon
      { rel: "apple-touch-icon", href: "/logo/180x180.png", sizes: "180x180" },
      
      // Preconnect for better performance
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Trakory",
          url: SITE_URL,
          logo: `${SITE_URL}/logo/logo.png`,
          description: SCHEMA_DESC,
          sameAs: [
            "https://twitter.com/Trakory",
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "Customer Support",
            url: SITE_URL,
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Trakory",
          url: SITE_URL,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any (Web Browser)",
          description: SCHEMA_DESC,
          offers: { 
            "@type": "Offer", 
            price: "0", 
            priceCurrency: "USD",
            availability: "https://schema.org/InStock",
          },
          featureList: [
            "Convert video to MP3, WAV, FLAC",
            "Convert video to audio",
            "Resize images",
            "Convert PDF files",
            "Convert Word documents",
            "100% in-browser conversion",
            "No file uploads required",
            "Fully private & secure",
            "Browser-based processing",
            "Multiple format support",
            "Batch conversion ready",
            "No account needed",
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "1280",
            bestRating: "5",
            worstRating: "1",
          },
          potentialAction: {
            "@type": "UseAction",
            target: `${SITE_URL}/#converter`,
            name: "Convert Files",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: SITE_URL,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Converter Tools",
              item: `${SITE_URL}/#converter`,
            },
          ],
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
              name: "Is Trakory really free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Trakory is 100% free with no hidden charges, ads interruption, or account requirements.",
              },
            },
            {
              "@type": "Question",
              name: "Are my files secure and private?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. All conversion runs locally in your browser using WebAssembly. Your files never leave your device and are never uploaded to any server.",
              },
            },
            {
              "@type": "Question",
              name: "What file formats does Trakory support?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Trakory supports multiple formats including video to audio (MP3, WAV, FLAC), image resizing, PDF conversion, Word document conversion, and more.",
              },
            },
            {
              "@type": "Question",
              name: "What is the maximum file size for conversion?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can convert files up to 500 MB in size, all processed directly in your browser for maximum privacy.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to create an account?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Trakory requires no account creation or login. Just visit, select your file, and convert instantly.",
              },
            },
            {
              "@type": "Question",
              name: "Can I convert multiple files at once?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, Trakory supports batch conversion for efficient processing of multiple files.",
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
    <div className="relative min-h-dvh overflow-x-clip bg-background pb-24 sm:pb-28">
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

      <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-6 lg:pt-8">
        <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Trakory home">
          <span className="truncate text-lg font-semibold tracking-tight text-foreground">
            Trakory
          </span>
        </a>
        <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Engine ready
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mb-4 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur sm:mb-5">
            Private · In-browser · No uploads
          </span>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            Free Video to Audio Converter —{" "}
            <span className="text-gradient-brand">MP3, WAV, FLAC</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
            Convert MP4, MOV, MKV and WEBM videos into high-quality audio
            directly in your browser. No uploads, no signup, 100% private.
          </p>
        </div>

        <Converter />

        <section
          aria-label="Why Trakory"
            className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-3 sm:gap-4"
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
        className="relative z-10 mx-auto mt-2 w-full max-w-3xl px-4 pb-10 sm:px-6 sm:pb-12"
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

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-6 text-center sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Trakory · Sound, distilled
        </p>
      </footer>

      <InterstitialAd />
      <BottomAdBar />
    </div>
  );
}
