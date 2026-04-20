import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { AdSlot } from "./AdSlot";

export function TopAdBar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="sticky top-0 z-40 w-full border-b border-border bg-card/95 shadow-soft backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-1.5 sm:px-4">
        <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
          Ad
        </span>
        <div
          className={
            "flex-1 overflow-hidden rounded-lg bg-muted/40 transition-all duration-300 " +
            (open ? "max-h-[120px] opacity-100" : "max-h-0 opacity-0")
          }
        >
          <AdSlot
            slot="1122334455"
            format="horizontal"
            style={{ minHeight: 60 }}
          />
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label={open ? "Hide top ad" : "Show top ad"}
          aria-expanded={open}
        >
          {open ? (
            <>
              <ChevronUp className="size-3.5" />
              <span className="hidden sm:inline">Hide</span>
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5" />
              <span className="hidden sm:inline">Show ad</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
