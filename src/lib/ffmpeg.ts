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
} from "mediabunny";

export type AudioFormat = "mp3" | "wav" | "flac";
export type Bitrate = "128" | "192" | "320";

export interface ConvertOptions {
  format: AudioFormat;
  bitrate: Bitrate;
  onProgress?: (ratio: number) => void;
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

export async function convertVideoToAudio(
  file: File,
  { format, bitrate, onProgress }: ConvertOptions,
): Promise<Blob> {
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
    video: { discard: true }, // strip video, we only want audio
    audio:
      format === "mp3"
        ? { codec: "mp3", bitrate: Number(bitrate) * 1000 }
        : undefined, // wav/flac: let Mediabunny pick sensible defaults
  });

  if (!conversion.isValid) {
    const reasons = conversion.discardedTracks
      .map((t) => `${t.track.type}: ${t.reason}`)
      .join("; ");
    throw new Error(
      `This file can't be converted${reasons ? ` (${reasons})` : ""}.`,
    );
  }

  if (onProgress) {
    conversion.onProgress = (p: number) => onProgress(Math.min(Math.max(p, 0), 1));
  }

  await conversion.execute();

  const buffer = (output.target as BufferTarget).buffer;
  if (!buffer) throw new Error("Conversion produced no output.");

  return new Blob([buffer], { type: mimeFor(format) });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
