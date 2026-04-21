import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function BottomAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const adHeight = isMobile ? 50 : 60;
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !adContainerRef.current) return;

    const container = adContainerRef.current;
    container.innerHTML = "";

    // Create and inject link
    const link = document.createElement("a");
    link.href =
      "https://www.profitablecpmratenetwork.com/kz8t2s35nt?key=167bbbb0298f11541ca9ac312849d65b";
    link.textContent = "View Ad";
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.style.display = "block";
    link.style.width = "100%";
    link.style.height = "100%";

    container.appendChild(link);
  }, [open]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 w-full border-t border-border bg-card/95 shadow-elevated backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-2 sm:px-4">
        {/* Header - Always visible */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sponsored
          </span>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            aria-label={open ? "Hide bottom ad" : "Show bottom ad"}
            aria-expanded={open}
          >
            {open ? (
              <>
                <ChevronDown className="size-3.5" />
                <span>{isMobile ? "Hide" : "Hide ad"}</span>
              </>
            ) : (
              <>
                <ChevronUp className="size-3.5" />
                <span>{isMobile ? "Show" : "Show ad"}</span>
              </>
            )}
          </button>
        </div>

        {/* Ad Container - With smooth animation */}
        <div
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? adHeight + 12 : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 8 : 0,
          }}
        >
          <div className="rounded-lg bg-muted/40" ref={adContainerRef} />
        </div>
      </div>
    </div>
  );
}
