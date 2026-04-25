import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdGateModalProps {
  open: boolean;
  onComplete: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

const AD_SCRIPT_URL =
  "https://pl29211369.profitablecpmratenetwork.com/75/85/d5/7585d53822b64080f1cea75f11c02c14.js";
const REQUIRED_CLICKS = 2;

/**
 * Click-based ad gate. User must click the ad button `REQUIRED_CLICKS` times.
 * Each click opens the ad script in a new tab so the current page is preserved.
 * After enough clicks the "Start download" button unlocks.
 */
export function AdGateModal({
  open,
  onComplete,
  onClose,
  title = "Your download is almost ready",
  description = "Click the button below to support Trakory. Each click opens a quick ad in a new tab.",
}: AdGateModalProps) {
  const isMobile = useIsMobile();
  const [clicks, setClicks] = useState(0);
  const scriptContainerRef = useRef<HTMLDivElement>(null);

  // Inject ad script into modal when it opens
  useEffect(() => {
    if (!open || !scriptContainerRef.current) return;

    const container = scriptContainerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = AD_SCRIPT_URL;
    script.async = true;
    container.appendChild(script);
  }, [open]);

  if (!open) return null;

  const done = clicks >= REQUIRED_CLICKS;
  const progress = (clicks / REQUIRED_CLICKS) * 100;

  const handleAdClick = () => {
    // Open the ad script in a new tab so the user never leaves the current page
    window.open(AD_SCRIPT_URL, "_blank", "noopener,noreferrer");
    setClicks((c) => Math.min(c + 1, REQUIRED_CLICKS));
  };

  const handleDownload = () => {
    onComplete();
    // Reset clicks for next time
    setClicks(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-3 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      suppressHydrationWarning
    >
      <div
        className={`relative w-full ${isMobile ? "max-w-sm" : "max-w-lg"} overflow-hidden rounded-3xl border border-border bg-card shadow-elevated`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg px-3 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Close ad"
        >
          Close
        </button>

        <div
          className={`border-b border-border bg-gradient-soft ${isMobile ? "px-4 py-4" : "px-6 py-5"}`}
        >
          <h3 className={`${isMobile ? "text-base" : "text-lg"} font-semibold text-foreground`}>
            {title}
          </h3>
          <p className={`mt-1 ${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>
            {description}{" "}
            <a
              href="https://ko-fi.com/trakory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 underline font-medium"
            >
              You can buy us a coffee if you want to support us and keep the tools free
            </a>
            .
          </p>
        </div>

        <div className={`bg-background ${isMobile ? "p-4" : "p-6"}`}>
          {/* Hidden script injection container */}
          <div ref={scriptContainerRef} className="hidden" suppressHydrationWarning />

          <div className="mt-2 space-y-5">
            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                  Progress
                </p>
                <p className="font-mono text-xs font-bold text-primary">
                  {clicks}/{REQUIRED_CLICKS}
                </p>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/5">
                <div
                  className="h-full bg-gradient-brand transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {!done ? (
                <button
                  onClick={handleAdClick}
                  className="w-full rounded-xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20 active:scale-[0.98]"
                >
                  Progress {clicks}/{REQUIRED_CLICKS} — Click to continue
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  className="w-full rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated active:scale-[0.98]"
                >
                  Start download
                </button>
              )}

              <p className="text-center text-[11px] text-muted-foreground">
                {done
                  ? "You're all set! Click below to download your file."
                  : "Each click opens a new tab. You can return here anytime."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
