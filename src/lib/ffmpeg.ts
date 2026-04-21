// Media conversion powered by Mediabunny (pure JS, no native deps).
// Runs in the browser, bundles cleanly for Cloudflare Workers.
import {
  Input,
  Output,
  Conversion,
  BlobSource,
  BufferTarget,
  ALL_FORMATS,
  Mp3OutputFormat,
  WavOutputFormat,
  FlacOutputFormat,
} from "mediabunny";
import { registerMp3Encoder } from "@mediabunny/mp3-encoder";

// Register the LAME-based WASM MP3 encoder so MP3 export works in every browser
// (browser WebCodecs implementations don't ship an MP3 encoder).
// Idempotent — safe to call once at module load.
let mp3Registered = false;
function ensureMp3Encoder() {
  if (mp3Registered) return;
  try {
    registerMp3Encoder();
    mp3Registered = true;
  } catch {
    // already registered or unsupported environment — ignore
  }
}

export type AudioFormat = "mp3" | "wav" | "flac";
export type Bitrate = "128" | "192" | "320";

export interface ConvertOptions {
  format: AudioFormat;
  bitrate: Bitrate;
  onProgress?: (ratio: number) => void;
}

export interface ConvertResult {
  blob: Blob;
  format: AudioFormat;
  fellBack: boolean;
}

// Kept for API compatibility; nothing to load.
export async function getFFmpeg(): Promise<void> {
  ensureMp3Encoder();
}

function makeOutputFormat(format: AudioFormat) {
  if (format === "mp3") return new Mp3OutputFormat();
  if (format === "wav") return new WavOutputFormat();
  return new FlacOutputFormat();
}

function mimeFor(format: AudioFormat): string {
  if (format === "mp3") return "audio/mpeg";
  if (format === "wav") return "audio/wav";
  return "audio/flac";
}

export async function convertVideoToAudio(
  file: File,
  { format, bitrate, onProgress }: ConvertOptions,
): Promise<ConvertResult> {
  ensureMp3Encoder();

  const input = new Input({
    formats: ALL_FORMATS,
    source: new BlobSource(file),
  });

  const output = new Output({
    format: makeOutputFormat(format),
    target: new BufferTarget(),
  });

  const conversion = await Conversion.init({
    input,
    output,
    video: { discard: true },
    audio:
      format === "mp3"
        ? { codec: "mp3", bitrate: Number(bitrate) * 1000 }
        : format === "flac"
          ? { codec: "flac" }
          : undefined, // wav: PCM defaults
  });

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .filter((t) => t.track.type === "audio")
      .map((t) => t.reason)
      .join("; ");
    throw new Error(
      reasons
        ? `Couldn't extract audio (${reasons}). Try a different file.`
        : "This file doesn't contain a convertible audio track.",
    );
  }

  if (onProgress) {
    conversion.onProgress = (p: number) =>
      onProgress(Math.min(Math.max(p, 0), 1));
  }

  await conversion.execute();

  const buffer = (output.target as BufferTarget).buffer;
  if (!buffer) throw new Error("Conversion produced no output.");

  return {
    blob: new Blob([buffer], { type: mimeFor(format) }),
    format,
    fellBack: false,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
