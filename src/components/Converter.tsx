import { useCallback, useEffect, useRef, useState } from "react";
import {
  convertVideoToAudio,
  formatBytes,
  getFFmpeg,
  type AudioFormat,
  type Bitrate,
} from "@/lib/ffmpeg";
import { cn } from "@/lib/utils";
import { AdGateModal } from "./AdGateModal";

const SITE_NAME = "trakory";

type Status = "idle" | "ready" | "loading" | "converting" | "done" | "error";

const FORMATS: { value: AudioFormat; label: string }[] = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "flac", label: "FLAC" },
];

const BITRATES: Bitrate[] = ["128", "192", "320"];

export function Converter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<AudioFormat>("mp3");
  const [bitrate, setBitrate] = useState<Bitrate>("192");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; blob: Blob } | null>(
    null,
  );
  const [dragOver, setDragOver] = useState(false);
  const [adGateOpen, setAdGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const handleFile = useCallback((f: File | null) => {
    if (!f) return;
    if (!f.type.startsWith("video/") && !f.type.startsWith("audio/")) {
      setError("Please select a video or audio file.");
      setStatus("error");
      return;
    }
    if (f.size > 500 * 1024 * 1024) {
      setError("File too large. Max 500 MB for in-browser processing.");
      setStatus("error");
      return;
    }
    setError(null);
    setResult(null);
    setProgress(0);
    setFile(f);
    setStatus("ready");
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setError(null);
    setProgress(0);
    setResult(null);
    try {
      setStatus("loading");
      await getFFmpeg();
      setStatus("converting");
      const res = await convertVideoToAudio(file, {
        format,
        bitrate,
        onProgress: (r) => setProgress(r),
      });
      const url = URL.createObjectURL(res.blob);
      setResult({ url, blob: res.blob });
      if (res.fellBack) {
        setFormat(res.format);
        setError(
          `Your browser can't encode ${format.toUpperCase()} — exported as ${res.format.toUpperCase()} instead.`,
        );
      }
      setProgress(1);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "Conversion failed. Please try again.",
      );
      setStatus("error");
    }
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setResult(null);
    setProgress(0);
    setError(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadName =
    file && result
      ? `${file.name.replace(/\.[^.]+$/, "")}.${SITE_NAME}.${format}`
      : `audio.${SITE_NAME}.${format}`;

  const triggerDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -top-20 h-64 bg-gradient-glow blur-2xl"
        />

        <div className="relative rounded-3xl border border-border/60 bg-card/90 p-1 shadow-elevated backdrop-blur-xl">
          <div className="rounded-[calc(1.5rem-2px)] bg-gradient-soft p-3 sm:p-5 lg:p-6">
            {/* Drop zone */}
            {!file ? (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
                  className={cn(
                    "group relative flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/60 p-6 text-center transition-all hover:border-primary/50 hover:bg-primary-soft/40 sm:p-10 lg:p-12",
                  dragOver && "border-primary bg-primary-soft/60",
                )}
              >
                <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-soft">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="size-7 text-primary-foreground"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 8 5-5 5 5" />
                    <path d="M5 21h14" />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Drop a video here
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    or click to choose from your device · MP4, MOV, WebM, MKV…
                  </p>
                </div>
                <span className="mt-2 rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  100% private · runs in your browser
                </span>
              </button>
            ) : (
              <div className="flex flex-col gap-3 rounded-2xl border border-border bg-background/80 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="size-5 text-primary"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="6" width="20" height="12" rx="2" />
                      <path d="m10 9 5 3-5 3z" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {file.name}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="self-start rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground sm:self-auto"
                >
                  Change
                </button>
              </div>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="video/*,audio/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {/* Settings */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="px-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Format
                </label>
                <div className="flex rounded-xl border border-border bg-background/70 p-1">
                  {FORMATS.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFormat(f.value)}
                      className={cn(
                        "flex-1 rounded-lg py-2 text-xs font-semibold transition-all",
                        format === f.value
                          ? "bg-gradient-brand text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="px-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Bitrate {format !== "mp3" && "(MP3 only)"}
                </label>
                <div
                  className={cn(
                    "flex rounded-xl border border-border bg-background/70 p-1 font-mono",
                    format !== "mp3" && "opacity-50",
                  )}
                >
                  {BITRATES.map((b) => (
                    <button
                      key={b}
                      disabled={format !== "mp3"}
                      onClick={() => setBitrate(b)}
                      className={cn(
                        "flex-1 rounded-lg py-2 text-[11px] font-bold transition-all",
                        bitrate === b && format === "mp3"
                          ? "bg-primary-soft text-primary ring-1 ring-primary/30"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {b}k
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Status / Progress */}
            {(status === "loading" ||
              status === "converting" ||
              status === "done") && (
              <div className="mt-6 space-y-3">
                <div className="flex items-end justify-between px-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {status === "loading" && "Loading engine…"}
                    {status === "converting" && "Extracting audio…"}
                    {status === "done" && "Complete"}
                  </p>
                  <p className="font-mono text-sm font-semibold text-primary tabular-nums">
                    {Math.round(progress * 100)}%
                  </p>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/5">
                  <div
                    className="h-full bg-gradient-brand transition-all duration-300"
                    style={{
                      width: `${status === "loading" ? 8 : Math.max(progress * 100, 2)}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="mt-6 space-y-4 rounded-2xl border border-border bg-background/80 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      Ready to download
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {downloadName} · {formatBytes(result.blob.size)}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                    ✓ Done
                  </span>
                </div>
                <audio
                  src={result.url}
                  controls
                  className="w-full"
                  preload="metadata"
                />
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {result ? (
                <>
                  <button
                    onClick={reset}
                    className="rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground/5"
                  >
                    Convert another
                  </button>
                  <button
                    onClick={() => setAdGateOpen(true)}
                    className="rounded-xl bg-gradient-brand px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated active:scale-[0.98]"
                  >
                    Download {format.toUpperCase()}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConvert}
                  disabled={
                    !file || status === "loading" || status === "converting"
                  }
                  className={cn(
                    "rounded-xl px-6 py-3 text-sm font-semibold transition-all",
                    !file || status === "loading" || status === "converting"
                      ? "cursor-not-allowed bg-foreground/10 text-muted-foreground"
                      : "bg-gradient-brand text-primary-foreground shadow-soft hover:shadow-elevated active:scale-[0.98]",
                  )}
                >
                  {status === "loading"
                    ? "Loading engine…"
                    : status === "converting"
                      ? "Converting…"
                      : "Convert to audio"}
                </button>
              )}
            </div>
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
