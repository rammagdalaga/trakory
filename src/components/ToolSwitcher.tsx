import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  Film,
  Music,
  FileText,
  FileType2,
  Minimize2,
  FileMinus,
  Video,
  UserCircle2,
} from "lucide-react";

export const TOOL_ROUTES = [
  { to: "/tools/video-to-audio", short: "Video → Audio", icon: Film },
  { to: "/tools/audio-converter", short: "Audio", icon: Music },
  { to: "/tools/pdf-to-word", short: "PDF → Word", icon: FileText },
  { to: "/tools/word-to-pdf", short: "Word → PDF", icon: FileType2 },
  { to: "/tools/compress-pdf", short: "Compress PDF", icon: FileMinus },
  { to: "/tools/compress-word", short: "Compress DOCX", icon: Minimize2 },
  { to: "/tools/tiktok-video-downloader", short: "TikTok Video", icon: Video },
  { to: "/tools/tiktok-profile-downloader", short: "TikTok Profile", icon: UserCircle2 },
] as const;

export function ToolSwitcher() {
  const { pathname } = useLocation();

  return (
    <div
      role="tablist"
      aria-label="Choose converter tool"
      className="mx-auto w-full max-w-3xl flex gap-1.5 overflow-x-auto rounded-2xl border border-border bg-card/70 p-1.5 shadow-soft backdrop-blur scrollbar-none"
    >
      {TOOL_ROUTES.map((t) => {
        const Icon = t.icon;
        const active = pathname === t.to;
        return (
          <Link
            key={t.to}
            to={t.to}
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
            <span className="whitespace-nowrap">{t.short}</span>
          </Link>
        );
      })}
    </div>
  );
}
