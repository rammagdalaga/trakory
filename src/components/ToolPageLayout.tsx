import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { TopAdBar } from "./TopAdBar";
import { BottomAdBar } from "./BottomAdBar";
import { InterstitialAd } from "./InterstitialAd";
import { ToolSwitcher } from "./ToolSwitcher";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  disableAds?: boolean;
}

export function ToolPageLayout({
  title,
  description,
  children,
  disableAds = true,
}: ToolPageLayoutProps) {
  const showAds = !disableAds;

  return (
    <div
      className="relative flex flex-1 flex-col overflow-x-clip bg-background"
      suppressHydrationWarning
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-[-10%] size-[320px] rounded-full bg-primary/15 blur-[120px] sm:size-[480px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-[-10%] size-[360px] rounded-full bg-accent/15 blur-[120px] sm:size-[520px]"
      />

      {showAds && <TopAdBar />}

      <header className="relative z-10 mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-6 sm:pt-6 lg:pt-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Trakory home">
          <span className="truncate text-lg font-semibold tracking-tight text-foreground">
            Trakory
          </span>
        </Link>
        <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-primary" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Engine ready
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mb-6 max-w-3xl text-center sm:mb-8">
          <h1 className="animate-float-up text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="animate-float-up delay-100 mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base">
            {description}
          </p>
        </div>

        <div className="animate-float-up delay-200 w-full px-2 sm:px-0">
          <ToolSwitcher />
        </div>

        <div className="w-full max-w-2xl animate-float-up delay-300 px-2 sm:px-0 mt-4 sm:mt-6">
          {children}
        </div>
      </main>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6">
        <ContactSection />
      </div>

      {showAds && <InterstitialAd />}
      {showAds && <BottomAdBar />}

      <Footer />
    </div>
  );
}
