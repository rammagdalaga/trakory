import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  Film,
  Music,
  FileText,
  FileType2,
  Minimize2,
  FileMinus,
  DownloadCloud,
} from "lucide-react";

const MAIN_TOOLS = [
  { to: "/tools/video-to-audio", short: "Video → Audio", icon: Film },
  { to: "/tools/audio-converter", short: "Audio", icon: Music },
  { to: "/tools/pdf-to-word", short: "PDF → Word", icon: FileText },
  { to: "/tools/word-to-pdf", short: "Word → PDF", icon: FileType2 },
  { to: "/tools/compress-pdf", short: "Compress PDF", icon: FileMinus },
  { to: "/tools/compress-word", short: "Compress DOCX", icon: Minimize2 },
] as const;

const SOCIAL_TOOLKIT_TOOLS = [
  { to: "/all-in-one-downloader", short: "Downloader", icon: DownloadCloud },
] as const;

export const TOOL_ROUTES = [...MAIN_TOOLS, ...SOCIAL_TOOLKIT_TOOLS] as const;

function ToolTab({
  tool,
  active,
}: {
  tool: (typeof MAIN_TOOLS)[number] | (typeof SOCIAL_TOOLKIT_TOOLS)[number];
  active: boolean;
}) {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.to}
      role="tab"
      aria-selected={active}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-all",
        active
          ? "bg-gradient-brand text-primary-foreground shadow-soft"
          : "text-muted-foreground hover:text-foreground hover:bg-foreground/5",
      )}
    >
      <Icon className="size-3.5" />
      <span className="whitespace-nowrap">{tool.short}</span>
    </Link>
  );
}

export function ToolSwitcher() {
  const { pathname } = useLocation();

  return (
    <div className="space-y-4">
      {/* Main Tools Section */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-1 mx-auto text-center">Tools</h3>
        <div
          role="tablist"
          aria-label="Choose converter tool"
          className="mx-auto w-full max-w-3xl flex gap-1.5 overflow-x-auto rounded-2xl border border-border bg-card/70 p-1.5 shadow-soft backdrop-blur scrollbar-none"
        >
          {MAIN_TOOLS.map((t) => {
            const active = pathname === t.to;
            return <ToolTab key={t.to} tool={t} active={active} />;
          })}
        </div>
      </div>

      {/* Social Toolkit Section */}
      <div>
        <h3 className="text-xs font-semibold text-muted-foreground mb-2 px-1 text-center">
          All-in-One Social Media Downloader + Creator Toolkit
        </h3>
        <div
          role="tablist"
          aria-label="Choose social toolkit tool"
          className="mx-auto w-full max-w-3xl flex gap-1.5 overflow-x-auto rounded-2xl border border-border bg-card/70 p-1.5 shadow-soft backdrop-blur scrollbar-none"
        >
          {SOCIAL_TOOLKIT_TOOLS.map((t) => {
            const active = pathname === t.to;
            return <ToolTab key={t.to} tool={t} active={active} />;
          })}
        </div>
      </div>
    </div>
  );
}
