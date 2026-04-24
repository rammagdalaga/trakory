import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AdGateModal } from "./AdGateModal";
import {
  convertVideoToAudio,
  formatBytes,
  getFFmpeg,
  type AudioFormat,
  type Bitrate,
} from "@/lib/ffmpeg";
import { pdfToDocx, docxToPdf, compressPdf, compressDocx, extOf } from "@/lib/docConvert";
import { Film, Music, FileText, FileType2, Minimize2, FileMinus } from "lucide-react";

const SITE_NAME = "trakory";

export type ConverterToolId =
  | "video-to-audio"
  | "audio"
  | "pdf-to-word"
  | "word-to-pdf"
  | "compress-pdf"
  | "compress-word";

type Status = "idle" | "ready" | "loading" | "converting" | "done" | "error";

interface ToolDef {
  id: ConverterToolId;
  label: string;
  icon: React.ElementType;
  accept: string;
  hint: string;
  outExt: string;
  outMime: string;
  validate: (f: File) => string | null;
}

const TOOLS: Record<ConverterToolId, ToolDef> = {
  "video-to-audio": {
    id: "video-to-audio",
    label: "Video → Audio",
    icon: Film,
    accept: "video/*",
    hint: "MP4, MOV, MKV, WEBM, AVI",
    outExt: "mp3",
    outMime: "audio/mpeg",
    validate: (f) =>
      f.type.startsWith("video/") || f.type.startsWith("audio/")
        ? null
        : "Please choose a video file.",
  },
  audio: {
    id: "audio",
    label: "Audio Converter",
    icon: Music,
    accept: "audio/*,video/*",
    hint: "MP3, WAV, FLAC",
    outExt: "mp3",
    outMime: "audio/mpeg",
    validate: (f) =>
      f.type.startsWith("audio/") || f.type.startsWith("video/")
        ? null
        : "Please choose an audio file.",
  },
  "pdf-to-word": {
    id: "pdf-to-word",
    label: "PDF → Word",
    icon: FileText,
    accept: "application/pdf,.pdf",
    hint: "Editable .docx output",
    outExt: "docx",
    outMime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    validate: (f) =>
      extOf(f.name) === "pdf" || f.type === "application/pdf" ? null : "Please choose a PDF file.",
  },
  "word-to-pdf": {
    id: "word-to-pdf",
    label: "Word → PDF",
    icon: FileType2,
    accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    hint: "Selectable text in PDF",
    outExt: "pdf",
    outMime: "application/pdf",
    validate: (f) => (extOf(f.name) === "docx" ? null : "Please choose a .docx file."),
  },
  "compress-pdf": {
    id: "compress-pdf",
    label: "Compress PDF",
    icon: FileMinus,
    accept: "application/pdf,.pdf",
    hint: "Reduce PDF file size",
    outExt: "pdf",
    outMime: "application/pdf",
    validate: (f) =>
      extOf(f.name) === "pdf" || f.type === "application/pdf" ? null : "Please choose a PDF file.",
  },
  "compress-word": {
    id: "compress-word",
    label: "Compress Word",
    icon: Minimize2,
    accept: ".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    hint: "Shrink images inside DOCX",
    outExt: "docx",
    outMime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    validate: (f) => (extOf(f.name) === "docx" ? null : "Please choose a .docx file."),
  },
};

const FORMATS: { value: AudioFormat; label: string }[] = [
  { value: "mp3", label: "MP3" },
  { value: "wav", label: "WAV" },
  { value: "flac", label: "FLAC" },
];

const BITRATES: Bitrate[] = ["128", "192", "320"];

interface ConverterProps {
  tool: ConverterToolId;
  disableAds?: boolean;
}

export function Converter({ tool, disableAds = true }: ConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<AudioFormat>("mp3");
  const [bitrate, setBitrate] = useState<Bitrate>("192");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    url: string;
    blob: Blob;
    ext: string;
  } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [adGateOpen, setAdGateOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current = TOOLS[tool];
  const isAudioTool = tool === "video-to-audio" || tool === "audio";

  useEffect(() => {
    setFile(null);
    setResult(null);
    setProgress(0);
    setError(null);
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  }, [tool]);

  useEffect(() => {
    return () => {
      if (result) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  const handleFile = useCallback(
    (f: File | null) => {
      if (!f) return;
      const err = current.validate(f);
      if (err) {
        setError(err);
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
    },
    [current],
  );

  const handleConvert = async () => {
    if (!file) return;
    setError(null);
    setProgress(0);
    setResult(null);

    try {
      setStatus("loading");
      let blob: Blob;
      let ext = current.outExt;

      if (isAudioTool) {
        await getFFmpeg();
        setStatus("converting");
        const res = await convertVideoToAudio(file, {
          format,
          bitrate,
          onProgress: (r) => setProgress(r),
        });
        blob = res.blob;
        ext = res.format;
        if (res.fellBack) setFormat(res.format);
      } else {
        setStatus("converting");
        const onP = (r: number) => setProgress(r);
        if (tool === "pdf-to-word") blob = await pdfToDocx(file, onP);
        else if (tool === "word-to-pdf") blob = await docxToPdf(file, onP);
        else if (tool === "compress-pdf") blob = await compressPdf(file, onP);
        else blob = await compressDocx(file, onP);
      }

      const url = URL.createObjectURL(blob);
      setResult({ url, blob, ext });
      setProgress(1);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Conversion failed. Please try a different file.");
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
      ? `${file.name.replace(/\.[^.]+$/, "")}.${SITE_NAME}.${result.ext}`
      : `output.${SITE_NAME}.${current.outExt}`;

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
    <div className="flex min-h-full items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
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
                  <current.icon className="size-7 text-primary-foreground" />
                </div>
                <div className="space-y-1.5">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Drop a file for {current.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    or click to choose · {current.hint}
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
                    <current.icon className="size-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
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
              key={tool}
              type="file"
              accept={current.accept}
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />

            {/* Audio settings */}
            {isAudioTool && (
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
            )}

            {(status === "loading" || status === "converting" || status === "done") && (
              <div className="mt-6 space-y-3">
                <div className="flex items-end justify-between px-1">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {status === "loading" && "Loading engine…"}
                    {status === "converting" && "Working…"}
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

            {result && (
              <div className="mt-6 space-y-4 rounded-2xl border border-border bg-background/80 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">Ready to download</p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {downloadName} · {formatBytes(result.blob.size)}
                      {file && (tool === "compress-pdf" || tool === "compress-word") && (
                        <>
                          {" "}
                          · saved{" "}
                          {Math.max(0, Math.round((1 - result.blob.size / file.size) * 100))}%
                        </>
                      )}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-primary-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-primary">
                    ✓ Done
                  </span>
                </div>
                {isAudioTool && (
                  <audio src={result.url} controls className="w-full" preload="metadata" />
                )}
              </div>
            )}

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
                    onClick={disableAds ? triggerDownload : () => setAdGateOpen(true)}
                    className="rounded-xl bg-gradient-brand px-6 py-3 text-center text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated active:scale-[0.98]"
                  >
                    Download {result.ext.toUpperCase()}
                  </button>
                </>
              ) : (
                <button
                  onClick={handleConvert}
                  disabled={!file || status === "loading" || status === "converting"}
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
                      : `Run ${current.label}`}
                </button>
              )}
            </div>
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
