import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { InterstitialAd } from "@/components/InterstitialAd";
import { BottomAdBar } from "@/components/BottomAdBar";
import { TopAdBar } from "@/components/TopAdBar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileVideo,
  FileAudio,
  FileText,
  FileImage,
  FileType,
  FileArchive,
  ShieldCheck,
  Zap,
  Heart,
  Globe,
  Sparkles,
  Lock,
  Gift,
} from "lucide-react";

const SITE_URL = "https://trakory.com";
const OG_TITLE =
  "Trakory — Free Online Converter: Video, Audio, PDF, Image & Word Converter";
const OG_DESC =
  "Trakory is a free online converter tool — convert MP3, video, audio, PDF and Word files in your browser. Free file converter with download support: convert video free, convert audio, PDF to Word, Word to PDF, compress PDF and compress Word.";
const SCHEMA_DESC =
  "Trakory is a free online converter tool and free file converter for video, audio, PDF and Word. Convert MP3, free convert video, file converter download, PDF to Word, Word to PDF, plus PDF and Word size compression — all in the browser.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Free Online Converter — Video, Audio, PDF, Image & Word Converter | Trakory",
      },
      { name: "description", content: OG_DESC },
      {
        name: "keywords",
        content:
          "converter, online converter, free converter, video converter, audio converter, pdf converter, word converter, image converter, document converter, file converter, mp4 to mp3, video to audio, video to mp3, mp3 converter, wav converter, flac converter, pdf to word, word to pdf, image resizer, jpg to png, png to jpg, free online tools, browser converter, private converter, no upload converter, fastest converter, best converter 2026, convert files online free",
      },
      {
        name: "robots",
        content:
          "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
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
      { rel: "icon", type: "image/png", href: "/logo/32x32.png", sizes: "32x32" },
      { rel: "icon", type: "image/png", href: "/logo/16x16.png", sizes: "16x16" },
      { rel: "shortcut icon", href: "/logo/logo.png" },
      { rel: "apple-touch-icon", href: "/logo/180x180.png", sizes: "180x180" },
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
          sameAs: ["https://twitter.com/Trakory"],
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
            "Video converter — MP4, MOV, MKV, WEBM, AVI",
            "Audio converter — MP3, WAV, FLAC, AAC, OGG",
            "PDF converter — PDF to Word, PDF to image, compress PDF",
            "Word converter — DOCX to PDF, DOC to DOCX",
            "Image converter — JPG, PNG, WEBP, resize and compress",
            "Document converter — TXT, RTF, ODT",
            "100% in-browser conversion with WebAssembly",
            "No file uploads required",
            "Fully private and secure",
            "Free forever, no account needed",
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
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
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
              name: "Is Trakory really a free online converter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Trakory is a 100% free online converter for video, audio, PDF, Word and image files. There are no hidden charges, paywalls, or account requirements. Ads only appear to support hosting so we can keep every converter free.",
              },
            },
            {
              "@type": "Question",
              name: "Are my files safe with this converter?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Absolutely. Every conversion runs locally in your browser using WebAssembly. Your files never get uploaded to a server, which makes Trakory one of the most private online converters available.",
              },
            },
            {
              "@type": "Question",
              name: "What file formats does the converter support?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Trakory supports a wide range of formats including video to audio (MP3, WAV, FLAC), MP4, MOV, MKV, WEBM, AVI, image resize (JPG, PNG, WEBP), PDF, Word documents and more — all from one tool.",
              },
            },
            {
              "@type": "Question",
              name: "How do I convert MP4 to MP3 for free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Drop your MP4 file into Trakory, choose MP3 and a bitrate (128, 192 or 320 kbps), then click Convert. Your audio is ready to download in seconds — no signup, no upload.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use Trakory on mobile?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Trakory works as an online converter on Android, iPhone, iPad, Windows, Mac and Linux — anywhere you have a modern browser.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to install software?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No installation. Trakory is a fully browser-based converter — no apps, no plugins, no extensions, no signup.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const TOOLS = [
  {
    icon: FileVideo,
    title: "Video Converter",
    body: "Convert MP4, MOV, MKV, WEBM and AVI to MP3, WAV or FLAC audio with full quality control.",
    available: true,
  },
  {
    icon: FileAudio,
    title: "Audio Converter",
    body: "Switch between MP3, WAV, FLAC, AAC and OGG. Adjust bitrate, sample rate and channels.",
    available: true,
  },
  {
    icon: FileText,
    title: "PDF Converter",
    body: "Convert PDF to Word, extract pages, compress and merge PDF files — privately in your browser.",
    available: false,
  },
  {
    icon: FileType,
    title: "Word Converter",
    body: "Turn DOCX into PDF, plain text or images. Convert legacy DOC files into modern formats.",
    available: false,
  },
  {
    icon: FileImage,
    title: "Image Converter",
    body: "Resize, compress and convert JPG, PNG, WEBP and HEIC images without losing quality.",
    available: false,
  },
  {
    icon: FileArchive,
    title: "Document Converter",
    body: "Convert TXT, RTF, ODT and more. Every document type — one fast, free converter.",
    available: false,
  },
];

const FAQS = [
  {
    q: "How do I convert a video to MP3 with this free online converter?",
    a: "Drop your video into the Trakory converter above, select MP3 and pick a bitrate (128, 192 or 320 kbps), then click Convert. Your MP3 download is ready in seconds — no upload, no signup, no watermark.",
  },
  {
    q: "Is Trakory really a free and private converter?",
    a: "Yes — Trakory is free forever and runs entirely in your browser using WebAssembly. Your video, audio, PDF, Word and image files never leave your device, which makes it one of the safest online converters you can use.",
  },
  {
    q: "What video, audio and document formats are supported?",
    a: "MP4, MOV, MKV, WEBM, AVI, MP3, WAV, FLAC, AAC, OGG, JPG, PNG, WEBP, PDF, DOCX, DOC, TXT and most common formats your browser can read.",
  },
  {
    q: "Can I use Trakory on iPhone, Android, Windows or Mac?",
    a: "Yes. Trakory works on any device with a modern browser — Chrome, Safari, Firefox, Edge, Brave. The same converter, same speed, on every platform.",
  },
  {
    q: "Why are there ads on a free converter?",
    a: "Trakory is built by a small team. The ads simply help cover hosting and development so we can keep every video converter, audio converter, PDF converter and image converter completely free for everyone.",
  },
  {
    q: "Is there a file size limit?",
    a: "You can convert files up to 500 MB. Because everything runs locally, conversion speed depends on your device — modern phones and laptops handle large files easily.",
  },
];

function Index() {
  return (
    <div
      className="relative min-h-dvh overflow-x-clip bg-background pb-24 sm:pb-28 md:pb-32 pt-0"
      suppressHydrationWarning
    >
      {/* Ambient gradient blobs */}
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

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="mb-6 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <span className="animate-float-up mb-5 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur sm:mb-6">
            Private · In-browser · No uploads
          </span>
          <h1 className="animate-float-up delay-100 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            The free online converter for{" "}
            <span className="text-gradient-brand">video, audio, PDF, Word & images</span>
          </h1>
          <p className="animate-float-up delay-200 mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base md:text-lg">
            Convert MP4 to MP3, video to audio, PDF to Word, resize images and more — directly in
            your browser. Trakory is a free file converter built for everyone. No signup, no
            uploads, no limits, 100% private.
          </p>
        </div>

        <div id="converter" className="w-full max-w-2xl mx-auto animate-float-up delay-300 px-4 sm:px-0 mt-4 sm:mt-6">
          <Converter />
        </div>

        {/* Mission / About */}
        <section
          aria-labelledby="mission-heading"
          className="mt-20 w-full max-w-4xl text-center sm:mt-24 lg:mt-28"
        >
          <div className="animate-float-up">
            <span className="mb-3 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Our mission
            </span>
          </div>
          <h2
            id="mission-heading"
            className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl"
          >
            Small team. <span className="text-gradient-brand">Big impact.</span>
          </h2>
          <p className="animate-float-up delay-200 mx-auto mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base md:text-lg">
            Trakory exists to give everyone — students, creators, freelancers, businesses — a fast,
            free, and private online converter that just works. Whether you need a video converter
            for MP4 to MP3, an audio converter for FLAC to WAV, a PDF converter to turn PDFs into
            Word documents, or an image converter to resize JPG and PNG files, every tool lives in
            one place. We may be a small team, but our goal is huge: solve real problems with
            simple, beautiful tools that respect your privacy. The ads you see only help keep this
            converter running — the tools themselves will always be free.
          </p>
        </section>

        {/* Tools showcase */}
        <section
          aria-labelledby="tools-heading"
          className="mt-20 w-full sm:mt-24 lg:mt-28"
        >
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Available & Coming Soon
            </span>
            <h2
              id="tools-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Every converter you need,{" "}
              <span className="text-gradient-brand">in one place</span>
            </h2>
            <p className="animate-float-up delay-200 mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              From video converter and audio converter to PDF converter, Word converter and image
              converter — Trakory is the all-in-one online file converter for 2026.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((t, i) => {
              const Icon = t.icon;
              return (
                <article
                  key={t.title}
                  className="group hover-lift animate-float-up relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur transition-all duration-300 hover:shadow-elevated hover:border-primary/40"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                      {t.title}
                      {!t.available && (
                        <span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                          Soon
                        </span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Why Trakory */}
        <section
          aria-labelledby="why-heading"
          className="mt-20 w-full sm:mt-24 lg:mt-28"
        >
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Features & Benefits
            </span>
            <h2
              id="why-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Why people pick Trakory as their{" "}
              <span className="text-gradient-brand">go-to converter</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Lock,
                title: "Stays on your device",
                body: "Files never touch a server. Conversion happens locally with WebAssembly.",
              },
              {
                icon: Sparkles,
                title: "Studio-quality output",
                body: "MP3 at 128/192/320 kbps, lossless WAV, compressed FLAC and more.",
              },
              {
                icon: Zap,
                title: "Fast & free",
                body: "No accounts, no queues, no watermarks. Just drop and convert.",
              },
              {
                icon: ShieldCheck,
                title: "Private by default",
                body: "Zero uploads. Zero tracking of file content. Total privacy guaranteed.",
              },
              {
                icon: Globe,
                title: "Works everywhere",
                body: "Use the converter on iPhone, Android, Windows, Mac and Linux browsers.",
              },
              {
                icon: Heart,
                title: "Built with care",
                body: "Crafted by a small team with one goal — make file conversion delightful.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="hover-lift animate-float-up group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur transition-all duration-300 hover:shadow-elevated hover:border-primary/40"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <Icon className="mb-4 size-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                    <h3 className="text-base font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Comprehensive SEO Content Section - Enhanced with Cards */}
        <section
          aria-labelledby="comprehensive-heading"
          className="mt-16 w-full sm:mt-20"
        >
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Why choose Trakory
            </span>
            <h2
              id="comprehensive-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              The ultimate online converter for <span className="text-gradient-brand">every file type</span>
            </h2>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {[
              {
                icon: FileVideo,
                title: "Video Converter",
                desc: "MP4, MOV, MKV, WEBM, AVI to MP3 & audio formats",
              },
              {
                icon: FileAudio,
                title: "Audio Converter",
                desc: "MP3, WAV, FLAC, AAC, OGG with quality control",
              },
              {
                icon: FileText,
                title: "PDF Converter",
                desc: "Transform PDFs to Word, images, compress & merge",
              },
              {
                icon: FileType,
                title: "Document Converter",
                desc: "DOCX, DOC, TXT, RTF, ODT formats supported",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="animate-float-up group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-4 shadow-soft backdrop-blur hover:shadow-elevated transition-all duration-300 hover:border-primary/40"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-gradient-brand text-primary-foreground shadow-soft mb-3 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Main Content Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {[
              {
                title: "100% Private & Secure",
                desc: "Trakory is a free online converter designed to solve all your file conversion needs in one place. Unlike other online converter tools, Trakory keeps everything 100% private — your files never leave your device because conversions run directly in your browser using WebAssembly technology.",
                icon: Lock,
              },
              {
                title: "Complete Format Support",
                desc: "Our image converter lets you resize, compress and convert JPG, PNG, WEBP and HEIC images without quality loss. We support document converters for TXT, RTF, ODT and dozens of other formats. Whether you're converting a video for TikTok or resizing images for your blog, Trakory handles everything.",
                icon: Sparkles,
              },
              {
                title: "Free Forever",
                desc: "As a small team with big goals, we built Trakory to be the most trusted converter on the internet. The video converter, audio converter, PDF converter, Word converter and image converter are completely free forever. Ads only help us cover hosting costs so we can keep improving.",
                icon: Gift,
              },
              {
                title: "Works Everywhere",
                desc: "Just fast, private, browser-based conversion that works on Chrome, Safari, Firefox, Edge and Brave across iPhone, Android, Windows, Mac and Linux. No signup, no upload delays, no hidden charges — everything you need in one all-in-one converter.",
                icon: Globe,
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="animate-float-up group relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/50 p-6 shadow-soft backdrop-blur hover:shadow-elevated transition-all duration-300 hover:border-primary/40"
                  style={{ animationDelay: `${(i + 4) * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center size-14 rounded-xl bg-gradient-brand text-primary-foreground shadow-soft flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="size-7" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </section>

      </main>

      {/* FAQ — fixed z-index to stay below modals but above background */}
      <section
        aria-label="Frequently asked questions"
        className="relative z-10 mx-auto mt-20 w-full max-w-3xl px-4 pb-24 sm:mt-24 sm:px-6 sm:pb-28 lg:mt-28 lg:pb-32"
      >
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            FAQ
          </span>
          <h2 className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Frequently asked questions about our free converter
          </h2>
          <p className="animate-float-up delay-200 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Learn more about Trakory's video converter, audio converter, PDF converter, image converter and other tools.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="rounded-2xl border border-border bg-card/70 px-4 shadow-soft backdrop-blur sm:px-6"
        >
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border last:border-b-0">
              <AccordionTrigger className="text-left text-sm font-semibold text-foreground sm:text-base py-4">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 text-center border-t border-border/40 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Trakory · Free converter for everyone · © 2026
        </p>
      </footer>

      <InterstitialAd />
      <BottomAdBar />
    </div>
  );
}
