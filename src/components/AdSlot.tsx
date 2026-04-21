import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Google AdSense Client ID
export const ADSENSE_CLIENT = "ca-pub-7172866420926779";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSlotProps {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AdSlot({
  slot,
  format = "auto",
  responsive = true,
  className,
  style,
}: AdSlotProps) {
  const pushed = useRef(false);
  const [filled, setFilled] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet (dev / blocked) — silently ignore.
    }
    // Detect whether AdSense actually filled the slot. If not (dev, blocked,
    // or pending approval), keep our visible placeholder so ad areas are
    // never empty.
    const t = setTimeout(() => {
      const el = insRef.current;
      if (el && el.getAttribute("data-ad-status") === "filled") {
        setFilled(true);
      }
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const isPlaceholder = ADSENSE_CLIENT.includes("XXXX") || !filled;

  return (
    <div className={cn("relative w-full", className)} style={style}>
      {/* Google AdSense Ad Unit */}
      <ins
        ref={insRef}
        className="adsbygoogle block h-full w-full"
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      {/* Execute Google AdSense script */}
      <script
        ref={scriptRef}
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
      {isPlaceholder && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-soft text-center"
        >
          <div className="px-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Advertisement
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              Your ad could be here
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
