import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export function BottomAdBar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(true);

  const adHeight = 50;
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !adContainerRef.current) return;

    const container = adContainerRef.current;
    container.innerHTML = "";

    // 1. Config script
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      atOptions = {
        key: "9d6896f36660d53be6f272eb9f58b806",
        format: "iframe",
        height: 50,
        width: 320,
        params: {}
      };
    `;

    // 2. Invoke script
    const invokeScript = document.createElement("script");
    invokeScript.src =
      "https://www.highperformanceformat.com/9d6896f36660d53be6f272eb9f58b806/invoke.js";
    invokeScript.async = true;

    container.appendChild(configScript);
    container.appendChild(invokeScript);

    return () => {
      container.innerHTML = "";
    };
  }, [open]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 w-full border-t border-border bg-card/95 shadow-elevated backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-2 sm:px-4">

        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Sponsored
          </span>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
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

        {/* Ad Container */}
        <div
          className="flex justify-center overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: open ? adHeight + 12 : 0,
            opacity: open ? 1 : 0,
            marginTop: open ? 8 : 0,
          }}
        >
          <div
            ref={adContainerRef}
            className="flex justify-center items-center rounded-lg bg-muted/40"
            style={{
              width: 320,
              height: 50,
            }}
          />
        </div>
      </div>
    </div>
  );
}
