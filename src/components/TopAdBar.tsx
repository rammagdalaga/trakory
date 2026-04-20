import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { AdSlot } from "./AdSlot";

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
            slot="1122334455"
            format="horizontal"
            style={{ minHeight: isMobile ? 56 : 72 }}
          />
        </div>
      </div>
    </div>
  );
}
