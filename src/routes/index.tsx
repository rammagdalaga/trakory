import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { NavDropdown } from "@/components/NavDropdown";
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
  AlertTriangle,
  GraduationCap,
  Briefcase,
  Video,
  Laptop,
} from "lucide-react";

// ─── SEO constants ────────────────────────────────────────────────────────────
const SITE_URL = "https://trakory.com";

// Title: under 60 chars, natural, brand-first
const PAGE_TITLE = "Trakory — Free Online File Converter for Video, Audio & PDF";

// Description: 150–155 chars, readable sentence, no keyword stuffing
const META_DESC =
  "Convert video, audio, PDF and Word files free — right in your browser. No uploads, no signup, total privacy. Fast, easy file conversion for everyone.";

// Schema description: one clear sentence
const SCHEMA_DESC =
  "Trakory is a free, browser-based file converter for video, audio, PDF, Word and image files. All conversions run locally — no uploads, no signup required.";

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: META_DESC },
      {
        name: "keywords",
        content:
          "free online converter, convert video to MP3, PDF to Word, Word to PDF, compress PDF, MP4 to MP3, audio converter, file converter, browser converter, no upload converter",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "author", content: "Trakory" },
      { name: "theme-color", content: "#0ea5b7" },
      { name: "application-name", content: "Trakory" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      // Open Graph
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: META_DESC },
      { property: "og:image", content: `${SITE_URL}/logo/logo.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Trakory" },
      { property: "og:url", content: SITE_URL },
      { property: "og:locale", content: "en_US" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: META_DESC },
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
      // AdSense — standalone, NOT inside any JSON-LD block
      {
        src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7172866420926779",
        async: true,
        crossOrigin: "anonymous",
      },
      // Schema: Organization
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
      // Schema: WebApplication — no fake aggregateRating
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
            "Video converter — MP4, MOV, MKV, WEBM, AVI to audio",
            "Audio converter — MP3, WAV, FLAC, AAC, OGG",
            "PDF to Word converter — preserves formatting",
            "Word to PDF converter — DOCX and DOC support",
            "PDF compressor — reduce size up to 80%",
            "Word compressor — reduce size up to 75%",
            "TikTok video downloader — no watermark",
            "100% in-browser conversion with WebAssembly",
            "No file uploads — fully private",
            "Free forever, no account needed",
          ],
          potentialAction: {
            "@type": "UseAction",
            target: `${SITE_URL}/#tools`,
            name: "Start Converting",
          },
        }),
      },
      // Schema: BreadcrumbList
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
              item: `${SITE_URL}/#tools`,
            },
          ],
        }),
      },
      // Schema: FAQPage — valid array, no script tags inside
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
                text: "Yes. Trakory is completely free — no hidden charges, paywalls, or account requirements. Ads help cover hosting so every converter stays free.",
              },
            },
            {
              "@type": "Question",
              name: "Are my files safe when I use Trakory?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Every conversion runs locally in your browser using WebAssembly. Your files are never uploaded to any server.",
              },
            },
            {
              "@type": "Question",
              name: "What formats does Trakory support?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Trakory supports MP4, MOV, MKV, WEBM, AVI, MP3, WAV, FLAC, AAC, OGG, JPG, PNG, WEBP, PDF, DOCX, DOC and more.",
              },
            },
            {
              "@type": "Question",
              name: "How do I convert MP4 to MP3 for free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Click the Video → Audio tab, drop your MP4 file, choose MP3 and a bitrate, then click Convert. Your file downloads in seconds — no signup needed.",
              },
            },
            {
              "@type": "Question",
              name: "Can Trakory make mistakes or produce errors?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, sometimes. Trakory is a free, community-maintained browser tool — not a paid professional service. Most conversions work well, but complex or unusual files may not convert perfectly. Always review the result before important use.",
              },
            },
            {
              "@type": "Question",
              name: "Can I use Trakory on mobile?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Trakory works on Android, iPhone, iPad, Windows, Mac and Linux — anywhere you have a modern browser.",
              },
            },
            {
              "@type": "Question",
              name: "Do I need to install anything?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "No. Trakory runs entirely in your browser — no apps, no plugins, no extensions required.",
              },
            },
            {
              "@type": "Question",
              name: "Is there a file size limit?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can convert files up to 500 MB. Conversion speed depends on your device since everything runs locally.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const TOOLS = [
  {
    icon: FileVideo,
    title: "Video Converter",
    body: "Convert MP4, MOV, MKV, WEBM and AVI files to MP3, WAV or FLAC audio. Choose your bitrate and get a clean audio extraction in seconds.",
    available: true,
  },
  {
    icon: FileAudio,
    title: "Audio Converter",
    body: "Switch between MP3, WAV, FLAC, AAC and OGG. Adjust bitrate, sample rate and channels for the exact quality you need.",
    available: true,
  },
  {
    icon: FileText,
    title: "PDF to Word",
    body: "Turn PDF documents into editable DOCX files with text and paragraph structure preserved. Open the result directly in Microsoft Word.",
    available: true,
  },
  {
    icon: FileType,
    title: "Word to PDF",
    body: "Convert DOCX and DOC files to clean, searchable PDFs. Keeps formatting intact for sharing and printing.",
    available: true,
  },
  {
    icon: FileArchive,
    title: "Compress Files",
    body: "Shrink PDFs by up to 80% and Word documents by up to 75%. Useful for email attachments and cloud storage limits.",
    available: true,
  },
  {
    icon: FileImage,
    title: "Image Converter",
    body: "Resize, compress and convert JPG, PNG, WEBP and HEIC images — coming soon.",
    available: false,
  },
];

const POPULAR_TOOLS = [
  {
    title: "PDF to Word Converter",
    desc: "Convert PDF documents into fully editable Word files. Preserves text layout and paragraph structure. Ideal for editing documents you received as PDFs.",
    link: "/tools/pdf-to-word",
    tag: "Most used",
  },
  {
    title: "Word to PDF Converter",
    desc: "Turn DOCX and DOC files into professional PDFs. Perfect for sharing, archiving, and keeping formatting consistent across all devices.",
    link: "/tools/word-to-pdf",
    tag: null,
  },
  {
    title: "PDF Compressor",
    desc: "Reduce PDF file size by up to 80% while maintaining readability. Great for email attachments and cloud storage limits.",
    link: "/tools/compress-pdf",
    tag: null,
  },
  {
    title: "Word Compressor",
    desc: "Shrink DOCX and DOC files by up to 75%. Useful when documents are too large to email or share.",
    link: "/tools/compress-word",
    tag: null,
  },
  {
    title: "TikTok Video Downloader",
    desc: "Download TikTok videos without a watermark in MP4 format. Paste a link, click fetch, save the video instantly.",
    link: "/tools/tiktok-video-downloader",
    tag: null,
  },
  {
    title: "TikTok Profile Picture Downloader",
    desc: "Save any TikTok profile picture in full HD. Enter a username and download the avatar — no app needed.",
    link: "/tools/tiktok-profile-downloader",
    tag: null,
  },
];

const FEATURES = [
  {
    icon: Lock,
    title: "Stays on your device",
    body: "Files never touch a server. Every conversion runs locally using WebAssembly.",
  },
  {
    icon: Sparkles,
    title: "Quality output",
    body: "MP3 at 128/192/320 kbps, lossless WAV, compressed FLAC — you choose the quality.",
  },
  {
    icon: Zap,
    title: "Fast & free",
    body: "No accounts, no queues, no watermarks. Drop a file and convert.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Zero uploads. Zero tracking of file content. Nothing leaves your browser.",
  },
  {
    icon: Globe,
    title: "Works everywhere",
    body: "Use Trakory on iPhone, Android, Windows, Mac and Linux — any modern browser.",
  },
  {
    icon: Heart,
    title: "Built with care",
    body: "Made by a small team focused on one thing: making file conversion simple and reliable.",
  },
];

const USE_CASES = [
  {
    icon: GraduationCap,
    title: "Students",
    body: "Convert lecture recordings to MP3 for offline listening, or turn PDF handouts into editable Word documents for note-taking.",
  },
  {
    icon: Briefcase,
    title: "Freelancers",
    body: "Deliver files in whatever format clients need — PDF, DOCX, MP3 — and compress documents before sending them over email.",
  },
  {
    icon: Video,
    title: "Content creators",
    body: "Extract audio from video files, download TikTok clips for repurposing, and convert between formats without dedicated software.",
  },
  {
    icon: Laptop,
    title: "Remote workers",
    body: "Compress PDFs and Word files to fit email size limits and cloud storage quotas without losing document quality.",
  },
];

const FAQS = [
  {
    q: "How do I convert a video to MP3?",
    a: "Click the Video → Audio tab, drop your video file (MP4, MOV, MKV, WEBM or AVI), pick MP3 and a bitrate, then click Convert. Your audio file is ready to download in seconds — no signup, no upload.",
  },
  {
    q: "Is Trakory really free and private?",
    a: "Yes. Trakory is free forever and runs entirely in your browser using WebAssembly. Your files never leave your device. Ads help cover hosting costs so every tool stays free.",
  },
  {
    q: "Can Trakory make mistakes or errors?",
    a: "Yes, sometimes. Trakory is a free, community-maintained browser tool — not a paid professional service. Most everyday conversions work well, but complex files (heavily formatted PDFs, large videos, or scanned documents) may produce imperfect results. Always review converted files before important use.",
  },
  {
    q: "How accurate is the PDF to Word conversion?",
    a: "Simple text-based PDFs convert with high accuracy. Scanned PDFs or documents with complex layouts, tables, or embedded images may lose some formatting. This is a known limitation of all browser-based converters, not specific to Trakory.",
  },
  {
    q: "What formats are supported?",
    a: "MP4, MOV, MKV, WEBM, AVI, MP3, WAV, FLAC, AAC, OGG, JPG, PNG, WEBP, PDF, DOCX, DOC, TXT and most common formats your browser can handle.",
  },
  {
    q: "Does Trakory work on iPhone, Android, Windows and Mac?",
    a: "Yes. Trakory works on any device with a modern browser — Chrome, Safari, Firefox, Edge and Brave. Same speed and privacy on every platform.",
  },
  {
    q: "Why are there ads?",
  a: (
    <>
      Trakory is built by a small team. Ads help cover hosting and development costs so every converter stays completely free for everyone.{" "}
      <a
        href="https://ko-fi.com/trakory"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-400 underline font-medium"
      >
        You can buy us a coffee if you want to support us and keep the tools free
      </a>.
    </>
  ),
  },
  {
    q: "Is there a file size limit?",
    a: "You can convert files up to 500 MB. Since everything runs locally, conversion speed depends on your device — most modern phones and laptops handle large files without issues.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

function Index() {
  return (
    <div
      className="relative flex flex-1 flex-col overflow-x-clip bg-background pt-0"
      suppressHydrationWarning
    >
      {/* Ambient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-10%] size-[320px] rounded-full bg-primary/15 blur-[120px] sm:size-[480px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-[-10%] size-[360px] rounded-full bg-accent/15 blur-[120px] sm:size-[520px]"
      />

      {/* ── Header ── */}
      <header className="relative z-50 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-6 lg:pt-8">
        <a href="/" className="flex min-w-0 items-center gap-2.5" aria-label="Trakory home">
          <span className="truncate text-lg font-semibold tracking-tight text-foreground">
            Trakory
          </span>
        </a>
        <NavDropdown />
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
        {/* ── Hero ── */}
        <div className="mb-6 max-w-3xl text-center sm:mb-8 lg:mb-10">
          <span className="animate-float-up mb-5 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur sm:mb-6">
            Private · In-browser · No uploads
          </span>
          <h1 className="animate-float-up delay-100 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
            The free online converter for{" "}
            <span className="text-gradient-brand">video, audio, PDF, Word & images</span>
          </h1>
          <p className="animate-float-up delay-200 mx-auto mt-6 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-8 sm:text-base md:text-lg">
            Trakory converts your files directly in the browser — no uploads, no accounts, total
            privacy. Pick a tool below, drop your file, and download the result instantly.
          </p>
        </div>

        {/* ── How it works ── */}
        <section aria-labelledby="how-heading" className="mt-20 w-full sm:mt-24 lg:mt-28">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              How it works
            </span>
            <h2
              id="how-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Three steps, <span className="text-gradient-brand">no complications</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Pick your tool",
                body: "Choose from video, audio, PDF, Word or image converters using the tabs above.",
              },
              {
                step: "02",
                title: "Drop your file",
                body: "Drag and drop or click to select. Your file stays on your device — nothing is uploaded.",
              },
              {
                step: "03",
                title: "Download instantly",
                body: "Your converted file is ready in seconds. No account or signup required.",
              },
            ].map((s, i) => (
              <div
                key={s.step}
                className="animate-float-up relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-mono text-4xl font-bold text-primary/20 select-none">
                  {s.step}
                </span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>

          {/* Accuracy disclaimer */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4 backdrop-blur">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden />
            <p className="text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-foreground">Accuracy note:</strong> Trakory is a
              free, community-maintained browser tool — not a paid professional service. Most
              everyday conversions work well, but complex or unusual files may not convert
              perfectly. Always review results before important use.
            </p>
          </div>
        </section>

        {/* ── Tools overview ── */}
        <section aria-labelledby="tools-heading" className="mt-20 w-full sm:mt-24 lg:mt-28">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Available & Coming Soon
            </span>
            <h2
              id="tools-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Every converter you need, <span className="text-gradient-brand">in one place</span>
            </h2>
            <p className="animate-float-up delay-200 mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              From video and audio to PDF and Word — all running locally in your browser with no
              file uploads and no account required.
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

        {/* ── Popular tools (individual pages) ── */}
        <section aria-labelledby="popular-heading" className="mt-20 w-full sm:mt-24 lg:mt-28">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Popular Tools
            </span>
            <h2
              id="popular-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Dedicated tools for <span className="text-gradient-brand">specific tasks</span>
            </h2>
            <p className="animate-float-up delay-200 mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Each tool is optimised for one job with its own focused interface and settings.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {POPULAR_TOOLS.map((tool, i) => (
              <article
                key={tool.title}
                className="group animate-float-up relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card/80 to-card/50 p-6 shadow-soft backdrop-blur hover:shadow-elevated transition-all duration-300 hover:border-primary/40"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-base font-semibold text-foreground">{tool.title}</h3>
                    {tool.tag && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary">
                        {tool.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{tool.desc}</p>
                  <a
                    href={tool.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    Open Tool
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7m0 0l-7 7m7-7H5"
                      />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Features & benefits (single merged section) ── */}
        <section aria-labelledby="features-heading" className="mt-20 w-full sm:mt-24 lg:mt-28">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Features & Benefits
            </span>
            <h2
              id="features-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Why people use Trakory as their{" "}
              <span className="text-gradient-brand">go-to converter</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => {
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

        {/* ── Who uses Trakory ── */}
        <section aria-labelledby="usecases-heading" className="mt-20 w-full sm:mt-24 lg:mt-28">
          <div className="mb-10 text-center sm:mb-14">
            <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
              Who uses Trakory
            </span>
            <h2
              id="usecases-heading"
              className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
            >
              Built for <span className="text-gradient-brand">everyone</span>
            </h2>
            <p className="animate-float-up delay-200 mx-auto mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">
              From students and freelancers to content creators and remote teams — Trakory handles
              everyday file conversion without the fuss.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {USE_CASES.map((u, i) => {
              const Icon = u.icon;
              return (
                <div
                  key={u.title}
                  className="animate-float-up group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur hover:shadow-elevated transition-all duration-300 hover:border-primary/40"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-brand opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-brand text-primary-foreground shadow-soft transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">{u.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{u.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SEO prose block (natural, non-stuffed) ── */}
        <section className="mt-20 w-full max-w-4xl mx-auto sm:mt-24 lg:mt-28">
          <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur sm:p-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 sm:text-2xl">
              About Trakory
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                Trakory is a free, browser-based file converter built for people who need to convert
                files quickly without installing software or uploading sensitive documents to a
                third-party server. Whether you're extracting audio from a video, converting a PDF
                into an editable Word document, or shrinking a large file before sending it by
                email, Trakory has a dedicated tool for the job.
              </p>
              <p>
                Every conversion runs locally using WebAssembly, which means your files stay on your
                device from start to finish. There are no accounts, no queues, and no watermarks.
                Trakory is supported by ads so the tools can stay free for everyone — no paywalls,
                no usage limits.
              </p>
              <p>
                Trakory is a community-maintained project and not a paid professional service.
                Results are generally accurate for everyday files, but complex or unusual documents
                may not always convert perfectly. We recommend reviewing converted files before
                relying on them for important work.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── FAQ ── */}
      <section
        aria-label="Frequently asked questions"
        className="relative z-10 mx-auto mt-20 w-full max-w-3xl px-4 pb-16 sm:mt-24 sm:px-6 sm:pb-20 lg:mt-28 lg:pb-24"
      >
        <div className="mb-10 text-center sm:mb-14">
          <span className="mb-3 inline-block animate-float-up rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            FAQ
          </span>
          <h2 className="animate-float-up delay-100 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Frequently asked questions
          </h2>
          <p className="animate-float-up delay-200 mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Common questions about Trakory's tools, accuracy, privacy and supported formats.
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

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
