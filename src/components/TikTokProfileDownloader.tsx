import { useState } from "react";
import { cn } from "@/lib/utils";
import { UserCircle2, Download, Loader2 } from "lucide-react";
import { AdGateModal } from "./AdGateModal";
import { fetchTikTokProfilePicture, downloadFile } from "@/lib/tikwm";

interface TikTokProfileDownloaderProps {
  disableAds?: boolean;
}

export function TikTokProfileDownloader({ disableAds = true }: TikTokProfileDownloaderProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    avatar: string;
    nickname: string;
    uniqueId: string;
  } | null>(null);
  const [adGateOpen, setAdGateOpen] = useState(false);

  const handleFetch = async () => {
    if (!username.trim()) {
      setError("Please enter a TikTok username (e.g. @charlidamelio).");
      return;
    }
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await fetchTikTokProfilePicture(username.trim());
      const user = res.data?.user;
      const avatar = user?.avatarLarger || user?.avatarMedium || user?.avatarThumb;
      if (res.code !== 0 || !avatar) {
        throw new Error(res.msg || "Profile not found. Check the username.");
      }
      setResult({
        avatar,
        nickname: user?.nickname || username,
        uniqueId: user?.uniqueId || username.replace("@", ""),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch profile.");
    } finally {
      setLoading(false);
    }
  };

  const triggerDownload = async () => {
    if (!result) return;
    const safe = result.uniqueId.replace(/[^a-z0-9-_]+/gi, "_");
    await downloadFile(result.avatar, `${safe}.trakory.jpg`);
  };

  const reset = () => {
    setUsername("");
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-20 h-64 bg-gradient-glow blur-2xl"
        />

        <div className="relative rounded-3xl border border-border/60 bg-card/90 p-1 shadow-elevated backdrop-blur-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-gradient-soft p-3 sm:p-5 lg:p-6">
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/60 p-6 text-center sm:p-10">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-soft">
                <UserCircle2 className="size-7 text-primary-foreground" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  TikTok Profile Picture Downloader
                </h2>
                <p className="text-sm text-muted-foreground">
                  Type a username — get the full-size profile picture in HD.
                </p>
              </div>
              <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Free · No signup
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="@username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                  "Fetch Profile"
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
                <div className="flex items-center gap-4">
                  <img
                    src={result.avatar}
                    alt={`${result.nickname} TikTok profile picture`}
                    className="size-24 rounded-full border-2 border-border object-cover shadow-soft"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-foreground">
                      {result.nickname}
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      @{result.uniqueId}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={reset}
                    className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
                  >
                    Search another
                  </button>
                  <button
                    onClick={disableAds ? triggerDownload : () => setAdGateOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated active:scale-[0.98]"
                  >
                    <Download className="size-4" />
                    Download Picture
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!disableAds && (
        <AdGateModal
          open={adGateOpen}
          durationSec={8}
          onComplete={() => {
            setAdGateOpen(false);
            triggerDownload();
          }}
          onClose={() => setAdGateOpen(false)}
        />
      )}
    </div>
  );
}
