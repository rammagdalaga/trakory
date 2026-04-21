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

  useEffect(() => {
    if (pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (e) {
      console.log("Adsense not ready yet");
    }

    const t = setTimeout(() => {
      const el = insRef.current;
      if (el?.getAttribute("data-ad-status") === "filled") {
        setFilled(true);
      }
    }, 1500);

    return () => clearTimeout(t);
  }, []);

  const isPlaceholder = !filled;

  return (
    <div className={cn("relative w-full", className)} style={style}>
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={{ display: "block", ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />

      {isPlaceholder && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-muted/40 text-center">
          <p className="text-xs text-muted-foreground">Loading ad...</p>
        </div>
      )}
    </div>
  );
}
