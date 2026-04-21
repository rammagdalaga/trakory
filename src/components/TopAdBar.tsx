import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Extend window type to include adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// AdSlot component (integrated)
interface AdSlotProps {
  slot: string;
  format?: "horizontal" | "vertical" | "square" | "auto";
  style?: React.CSSProperties;
}

function AdSlot({ slot, format = "auto", style }: AdSlotProps) {
  useEffect(() => {
    // Inject the main AdSense script once
    if ((window as any).adsbygoogle === undefined) {
      const script = document.createElement("script");
      script.async = true;
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7172866420926779";
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }

    // Push the ad
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          ...style,
        }}
        data-ad-client="ca-pub-7172866420926779"
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : ""}
        data-full-width-responsive={format === "auto" ? "true" : "false"}
      ></ins>
    </div>
  );
}

// Main TopAdBar component
export function TopAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-3 py-2 sm:px-4">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sponsored
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label={open ? "Hide top ad" : "Show top ad"}
            aria-expanded={open}
          >
            {open ? (
              <>
                <ChevronUp className="size-3.5" />
                <span>{isMobile ? "Hide" : "Hide ad"}</span>
              </>
            ) : (
              <>
                <ChevronDown className="size-3.5" />
                <span>{isMobile ? "Show" : "Show ad"}</span>
              </>
            )}
          </button>
        </div>

        <div
          className={
            "overflow-hidden rounded-lg bg-muted/40 transition-all duration-300 " +
            (open ? "max-h-[140px] opacity-100" : "max-h-0 opacity-0")
          }
        >
          <AdSlot
            slot="3250761747"
            format="auto"
            style={{ minHeight: isMobile ? 56 : 72 }}
          />
        </div>
      </div>
    </div>
  );
}
