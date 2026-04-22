import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Interstitial: appears 5s after the user lands on the site.
 * Shows on every fresh page load so the ad placement is always present.
 */
export function InterstitialAd() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const adHeight = isMobile ? 200 : 280;
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem("trakory_interstitial_shown") === "1") return;
    } catch {
      // ignore
    }
    const t = setTimeout(() => {
      setOpen(true);
      try {
        sessionStorage.setItem("trakory_interstitial_shown", "1");
      } catch {
        // ignore
      }
    }, 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open || !adContainerRef.current) return;

    const container = adContainerRef.current;
    container.innerHTML = "";

    // Create and append script
    const script = document.createElement("script");
    script.src =
      "https://pl29211369.profitablecpmratenetwork.com/75/85/d5/7585d53822b64080f1cea75f11c02c14.js";
    script.async = true;
    container.appendChild(script);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-foreground/40 p-3 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      suppressHydrationWarning
    >
      <div
        className={`relative w-full ${isMobile ? "max-w-sm" : "max-w-xl"} overflow-hidden rounded-3xl border border-border bg-card shadow-elevated`}
        suppressHydrationWarning
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 z-10 rounded-lg bg-background/80 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Close"
        >
          Close
        </button>
        <div className={`bg-background ${isMobile ? "p-4" : "p-6"}`}>
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sponsored
          </p>
          <div
            className={`overflow-hidden rounded-2xl border border-dashed border-border bg-muted/40`}
            style={{ minHeight: adHeight }}
            ref={adContainerRef}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  );
}
