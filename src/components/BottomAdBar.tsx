import { useState } from "react";
import { AdSlot } from "./AdSlot";

export function BottomAdBar() {
  const [closed, setClosed] = useState(false);
  
  if (closed) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 shadow-elevated backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-1 px-2 py-1 sm:gap-2 sm:px-3 sm:py-1.5">
        {/* "Ad" Label - Hidden on mobile */}
        <span className="hidden font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:inline whitespace-nowrap">
          Sponsored
        </span>

        {/* Ad Container - Responsive heights */}
        <div className="h-[50px] min-w-0 flex-1 overflow-hidden rounded-lg bg-muted/40 sm:h-[60px]">
          <AdSlot
            slot="3111160949"
            format="horizontal"
            style={{ 
              minHeight: "100%", 
              height: "100%", 
              maxHeight: "100%",
              width: "100%"
            }}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setClosed(true)}
          className="shrink-0 rounded-md px-1.5 py-1 text-sm font-semibold text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground active:bg-foreground/10"
          aria-label="Close ad"
          title="Close ad"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
