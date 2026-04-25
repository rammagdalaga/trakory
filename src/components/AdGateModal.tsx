import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdGateModalProps {
  open: boolean;
  onComplete: () => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

// 👉 Replace with your Smartlink (NOT .js)
const AD_LINK = "https://www.profitablecpmratenetwork.com/uxdyhvk6?key=e11479dbf206b08b8a2e1697b36d16d4";

// ⚠️ Keep this at 1 for safety
const REQUIRED_CLICKS = 2;

export function AdGateModal({
  open,
  onComplete,
  onClose,
  title = "Your download is almost ready",
  description = "Click the button below to continue. This helps keep Trakory free.",
}: AdGateModalProps) {
  const isMobile = useIsMobile();
  const [clicks, setClicks] = useState(0);

  if (!open) return null;

  const done = clicks >= REQUIRED_CLICKS;
  const progress = (clicks / REQUIRED_CLICKS) * 100;

  const handleAdClick = () => {
    window.open(AD_LINK, "_blank", "noopener,noreferrer");

    setClicks((c) => Math.min(c + 1, REQUIRED_CLICKS));
  };

  const handleDownload = () => {
    onComplete();
    setClicks(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-3 sm:p-4 backdrop-blur-sm">
      <div
        className={`relative w-full ${
          isMobile ? "max-w-sm" : "max-w-lg"
        } overflow-hidden rounded-3xl border border-border bg-card shadow-elevated`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-lg px-3 py-1 text-xs font-semibold text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
        >
          Close
        </button>

        <div className={`${isMobile ? "px-4 py-4" : "px-6 py-5"} border-b border-border`}>
          <h3 className={`${isMobile ? "text-base" : "text-lg"} font-semibold`}>
            {title}
          </h3>
          <p className={`mt-1 ${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>
            {description}{" "}
            <a
              href="https://ko-fi.com/trakory"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Support us
            </a>
          </p>
        </div>

        <div className={`${isMobile ? "p-4" : "p-6"}`}>
          <div className="space-y-5">
            {/* Progress */}
            <div>
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>{clicks}/{REQUIRED_CLICKS}</span>
              </div>
              <div className="h-2 mt-2 bg-foreground/5 rounded-full">
                <div
                  className="h-full bg-gradient-brand transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Buttons */}
            {!done ? (
              <button
                onClick={handleAdClick}
                className="w-full rounded-xl bg-primary/10 px-5 py-3 text-sm font-semibold text-primary hover:bg-primary/20"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleDownload}
                className="w-full rounded-xl bg-gradient-brand px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Start download
              </button>
            )}

            <p className="text-center text-[11px] text-muted-foreground">
              {done
                ? "Ready to download."
                : "Opens a new tab. You can return here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
