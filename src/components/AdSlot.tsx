import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Your AdSense account ID and ad slots
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
  const [mounted, setMounted] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);

  // Mark as mounted on first client render only
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || pushed.current) return;
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
  }, [mounted]);

  const isPlaceholder = ADSENSE_CLIENT.includes("XXXX") || !filled;

  // Only render on client after hydration
  if (!mounted) return <div className={cn("relative w-full", className)} style={style} />;

  return (
    <div 
      className={cn("relative w-full", className)} 
      style={{
        // Ensure placeholder has minimum ad dimensions for testing
        minHeight: format === "auto" ? "90px" : "250px",
        minWidth: "100%",
        ...style 
      }} 
      suppressHydrationWarning
    >
      <ins
        ref={insRef}
        className="adsbygoogle block h-full w-full"
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
      {isPlaceholder && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-dashed border-muted-foreground/30 text-center"
        >
          <div className="px-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-semibold">
              📢 Advertisement
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              {format === "auto" ? "728×90" : "300×250"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
