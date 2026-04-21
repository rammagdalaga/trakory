import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdSlot } from "./AdSlot";

export function BottomAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);
  const adHeight = isMobile ? 50 : 60;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 w-full border-t border-border bg-card/95 shadow-elevated backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-3 py-2 sm:px-4">
        {/* Header with Sponsored label and Toggle button */}
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

        {/* Ad Container with smooth collapse animation */}
        <div
          className={
            "overflow-hidden rounded-lg bg-muted/40 transition-all duration-300 " +
            (open ? "max-h-[50px] opacity-100 sm:max-h-[70px]" : "max-h-0 opacity-0")
          }
        >
          <AdSlot
            slot="3111160949"
            format="horizontal"
            style={{ minHeight: adHeight, height: adHeight, maxHeight: adHeight }}
          />
        </div>
      </div>
    </div>
  );
}
