import { useState } from "react";
import { AdSlot } from "./AdSlot";

export function BottomAdBar() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 shadow-elevated backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4">
        <span className="hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:inline">
          Ad
        </span>
        <div className="min-h-[56px] min-w-0 flex-1 overflow-hidden rounded-lg bg-muted/40 sm:min-h-[60px]">
          <AdSlot
            slot="9988776655"
            format="horizontal"
            style={{ minHeight: 56 }}
          />
        </div>
        <button
          onClick={() => setClosed(true)}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
          aria-label="Close ad"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
