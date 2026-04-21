import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function TopAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const adHeight = isMobile ? 50 : 90;
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !adContainerRef.current) return;

    const container = adContainerRef.current;
    container.innerHTML = "";

    // Create and append the ad script
    const adScript = document.createElement("script");
    adScript.async = true;
    adScript.dataset.cfasync = "false";
    adScript.src =
      "https://pl29211370.profitablecpmratenetwork.com/88d8b73197a7a675ab90013771bb9e26/invoke.js";
    container.appendChild(adScript);

    // Create the ad container div
    const adDiv = document.createElement("div");
    adDiv.id = "container-88d8b73197a7a675ab90013771bb9e26";
    container.appendChild(adDiv);
  }, [open]);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-full flex-col px-0 py-2">
        {/* Header - Always visible */}
        <div className="flex items-center justify-between gap-3 px-3 sm:px-4">
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

        {/* Ad Container - Full width with smooth animation */}
        <div
          className="overflow-hidden bg-muted/40 transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? adHeight + 12 : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 8 : 0,
          }}
        >
          <div
            className="flex w-full items-center justify-center px-3 py-2 sm:px-4"
            ref={adContainerRef}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  );
}
