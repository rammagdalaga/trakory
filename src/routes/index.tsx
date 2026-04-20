import { createFileRoute } from "@tanstack/react-router";
import { Converter } from "@/components/Converter";
import { InterstitialAd } from "@/components/InterstitialAd";
import { BottomAdBar } from "@/components/BottomAdBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trakory — Convert your videos to audio in your browser" },
      {
        name: "description",
        content:
          "Trakory turns your own video files into MP3, WAV or FLAC audio — fast, private, and 100% in-browser. No uploads, no accounts.",
      },
      { property: "og:title", content: "Trakory — Video to Audio Converter" },
      {
        property: "og:description",
        content:
          "Convert your videos to MP3, WAV or FLAC right in your browser. Private by design.",
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
        className="pointer-events-none absolute -left-40 top-[-10%] size-[480px] rounded-full bg-primary/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-[-10%] size-[520px] rounded-full bg-accent/15 blur-[120px]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-8">
        <a href="/" className="flex items-center gap-2.5">
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

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-16 sm:py-20">
        <div className="mb-12 max-w-2xl text-center">
          <span className="mb-5 inline-block rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            Private · In-browser · No uploads
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Turn your videos into{" "}
            <span className="text-gradient-brand">crisp audio</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Drop in a video from your device and Trakory extracts a clean MP3,
            WAV, or FLAC — right inside your browser. Nothing ever leaves your
            computer.
          </p>
        </div>

        <Converter />

        <section className="mt-20 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
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

      <footer className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Trakory · Sound, distilled
        </p>
      </footer>

      <InterstitialAd />
      <BottomAdBar />
    </div>
  );
}
