// Media conversion powered by Mediabunny (pure JS, no WASM, no native deps).
// Runs in the browser using WebCodecs and bundles cleanly for Cloudflare.
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
  canEncodeAudio,
} from "mediabunny";

export type AudioFormat = "mp3" | "wav" | "flac";
export type Bitrate = "128" | "192" | "320";

export interface ConvertOptions {
  format: AudioFormat;
  bitrate: Bitrate;
  onProgress?: (ratio: number) => void;
}

export interface ConvertResult {
  blob: Blob;
  /** Format actually produced (may differ from requested if encoder unavailable). */
  format: AudioFormat;
  /** True when we had to fall back from the requested format. */
  fellBack: boolean;
}

// Kept for API compatibility with the previous ffmpeg.wasm implementation.
// Mediabunny needs no async engine load, so this is a no-op.
export async function getFFmpeg(): Promise<void> {
  return;
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

async function pickFormat(requested: AudioFormat): Promise<AudioFormat> {
  // WAV uses PCM and is always encodable in any browser.
  if (requested === "wav") return "wav";
  // MP3 / FLAC require WebCodecs encoders that aren't present in every browser
  // (notably MP3 is missing in Chrome/Firefox today).
  try {
    if (await canEncodeAudio(requested)) return requested;
  } catch {
    // ignore — treat as unsupported
  }
  // Fall back to WAV (lossless, always available).
  return "wav";
}

export async function convertVideoToAudio(
  file: File,
  { format, bitrate, onProgress }: ConvertOptions,
): Promise<ConvertResult> {
  const targetFormat = await pickFormat(format);
  const fellBack = targetFormat !== format;

  const input = new Input({
    formats: ALL_FORMATS,
    source: new BlobSource(file),
  });

  const output = new Output({
    format: makeOutputFormat(targetFormat),
    target: new BufferTarget(),
  });

  const conversion = await Conversion.init({
    input,
    output,
    video: { discard: true }, // strip video, we only want audio
    audio:
      targetFormat === "mp3"
        ? { codec: "mp3", bitrate: Number(bitrate) * 1000 }
        : targetFormat === "flac"
          ? { codec: "flac" }
          : undefined, // wav: let Mediabunny pick PCM defaults
  });

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .filter((t) => t.track.type === "audio")
      .map((t) => t.reason)
      .join("; ");
    throw new Error(
      reasons
        ? `Couldn't extract audio from this file (${reasons}). Try a different video.`
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
    blob: new Blob([buffer], { type: mimeFor(targetFormat) }),
    format: targetFormat,
    fellBack,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
