import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdSlot } from "./AdSlot";

interface AdGateModalProps {
  open: boolean;
  durationSec?: number;
  onComplete: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

/**
 * Rewarded-style ad gate. User must wait `durationSec` seconds before the
 * "Continue" action unlocks. Closing early calls onClose without unlocking.
 */
export function AdGateModal({
  open,
  durationSec = 8,
  onComplete,
  onClose,
  title = "Your download is almost ready",
  description = "Please watch this short ad to support Trakory. Your download will start automatically.",
}: AdGateModalProps) {
  const isMobile = useIsMobile();
  const [remaining, setRemaining] = useState(durationSec);
  const adHeight = isMobile ? 180 : 250;

  useEffect(() => {
    if (!open) {
      setRemaining(durationSec);
      return;
    }
    setRemaining(durationSec);
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          clearInterval(id);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [open, durationSec]);

  if (!open) return null;

  const done = remaining === 0;
  const progress = ((durationSec - remaining) / durationSec) * 100;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-3 sm:p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
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
            {description}
          </p>
        </div>

        <div className={`bg-background ${isMobile ? "p-4" : "p-6"}`}>
          <div
            className="overflow-hidden rounded-2xl border border-dashed border-border bg-muted/40"
            style={{ minHeight: adHeight }}
          >
            <AdSlot
              slot="5081658672"
              format="square"
              style={{ minHeight: adHeight, height: adHeight, maxHeight: adHeight }}
            />
          </div>

          <div className="mt-5 space-y-3">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
              <div
                className="h-full bg-gradient-brand transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div
              className={`flex ${isMobile ? "flex-col gap-2" : "items-center justify-between gap-3"}`}
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {done ? "Ad complete" : `Please wait ${remaining}s…`}
              </p>
              <button
                onClick={onComplete}
                disabled={!done}
                className={`w-full sm:w-auto rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                  done
                    ? "bg-gradient-brand text-primary-foreground shadow-soft hover:shadow-elevated active:scale-[0.98]"
                    : "cursor-not-allowed bg-foreground/10 text-muted-foreground"
                }`}
              >
                {done ? "Start download" : "Locked"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
