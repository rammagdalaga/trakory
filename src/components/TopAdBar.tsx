import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function TopAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const adHeight = isMobile ? 50 : 60;
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Create config script and append to body
    const configScript = document.createElement("script");
    configScript.textContent = `
      atOptions = {
        'key' : '3f22fa6031a61d2f5c0f26c81ba99787',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;
    document.body.appendChild(configScript);

    // Create invoke script and append to body
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/3f22fa6031a61d2f5c0f26c81ba99787/invoke.js";
    invokeScript.async = true;
    document.body.appendChild(invokeScript);

    return () => {
      // Cleanup scripts from body on unmount or when closed
      document.body.removeChild(configScript);
      if (invokeScript.parentNode) {
        document.body.removeChild(invokeScript);
      }
    };
  }, [open]);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-2 sm:px-4">
        {/* Header - Always visible */}
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

        {/* Ad Container - With smooth animation */}
        <div
          className="overflow-hidden rounded-lg bg-muted/40 transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? adHeight + 12 : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 8 : 0,
          }}
          ref={adContainerRef}
          suppressHydrationWarning
        />
      </div>
    </div>
  );
}
