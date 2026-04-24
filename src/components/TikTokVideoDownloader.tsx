import { useState } from "react";
import { cn } from "@/lib/utils";
import { Video, Download, Loader2 } from "lucide-react";
import { AdGateModal } from "./AdGateModal";
import { fetchTikTokVideo, downloadFile } from "@/lib/tikwm";

export function TikTokVideoDownloader() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    play: string;
    title: string;
    author: string;
  } | null>(null);
  const [adGateOpen, setAdGateOpen] = useState(false);

  const handleFetch = async () => {
    if (!url.trim()) {
      setError("Please paste a TikTok video URL.");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetchTikTokVideo(url.trim());
      if (res.code !== 0 || !res.data?.play) {
        throw new Error(res.msg || "Could not fetch this video. Check the link.");
      }
      setResult({
        play: res.data.play,
        title: res.data.title || "tiktok-video",
        author: res.data.author?.unique_id || "tiktok",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch video.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = async () => {
    if (!result) return;
    const safeName = `${result.author}-${result.title}`.replace(/[^a-z0-9-_]+/gi, "_").slice(0, 80);
    await downloadFile(result.play, `${safeName}.trakory.mp4`);
  };

  const reset = () => {
    setUrl("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-20 h-64 bg-gradient-glow blur-2xl"
        />

        <div className="relative rounded-3xl border border-border/60 bg-card/90 p-1 shadow-elevated backdrop-blur-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-gradient-soft p-3 sm:p-5 lg:p-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/60 p-6 text-center sm:p-10">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-soft">
                <Video className="size-7 text-primary-foreground" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  TikTok Video Downloader
                </h2>
                <p className="text-sm text-muted-foreground">
                  Paste a TikTok video link — get the MP4 with no watermark.
                </p>
              </div>
              <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Free · No signup
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="url"
                inputMode="url"
                placeholder="https://www.tiktok.com/@user/video/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
              />
              <button
                onClick={handleFetch}
                disabled={loading}
                className={cn(
                  "rounded-xl px-6 py-3 text-sm font-semibold transition-all",
                  loading
                    ? "cursor-not-allowed bg-foreground/10 text-muted-foreground"
                    : "bg-gradient-brand text-primary-foreground shadow-soft hover:shadow-elevated active:scale-[0.98]",
                )}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> Fetching…
                  </span>
                ) : (
                  "Fetch Video"
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {result && (
              <div className="mt-6 space-y-4 rounded-2xl border border-border bg-background/80 p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">@{result.author}</p>
                  <p className="line-clamp-2 text-xs text-muted-foreground">{result.title}</p>
                </div>
                <video
                  src={result.play}
                  controls
                  playsInline
                  className="aspect-[9/16] w-full max-h-[60vh] rounded-xl bg-black object-contain"
                />
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={reset}
                    className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
                  >
                    Download another
                  </button>
                  <button
                    onClick={() => setAdGateOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated active:scale-[0.98]"
                  >
                    <Download className="size-4" />
                    Download MP4
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdGateModal
        open={adGateOpen}
        durationSec={8}
        onComplete={() => {
          setAdGateOpen(false);
          triggerDownload();
        }}
        onClose={() => setAdGateOpen(false)}
      />
    </div>
  );
}
