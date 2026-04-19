import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = "0.12.10";
const CORE_BASE = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;

export async function getFFmpeg(
  onLog?: (msg: string) => void,
): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    if (onLog) ffmpeg.on("log", ({ message }) => onLog(message));

    await ffmpeg.load({
      coreURL: await toBlobURL(`${CORE_BASE}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${CORE_BASE}/ffmpeg-core.wasm`,
        "application/wasm",
      ),
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  return loadPromise;
}

export type AudioFormat = "mp3" | "wav" | "flac";
export type Bitrate = "128" | "192" | "320";

export interface ConvertOptions {
  format: AudioFormat;
  bitrate: Bitrate;
  onProgress?: (ratio: number) => void;
}

export async function convertVideoToAudio(
  file: File,
  { format, bitrate, onProgress }: ConvertOptions,
): Promise<Blob> {
  const ffmpeg = await getFFmpeg();

  const progressHandler = ({ progress }: { progress: number }) => {
    if (onProgress) onProgress(Math.min(Math.max(progress, 0), 1));
  };
  ffmpeg.on("progress", progressHandler);

  try {
    const inputName = `input_${Date.now()}`;
    const outputName = `output_${Date.now()}.${format}`;

    const buf = new Uint8Array(await file.arrayBuffer());
    await ffmpeg.writeFile(inputName, buf);

    const args = ["-i", inputName, "-vn"];
    if (format === "mp3") {
      args.push("-c:a", "libmp3lame", "-b:a", `${bitrate}k`);
    } else if (format === "wav") {
      args.push("-c:a", "pcm_s16le");
    } else {
      args.push("-c:a", "flac");
    }
    args.push(outputName);

    await ffmpeg.exec(args);

    const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
    const mime =
      format === "mp3"
        ? "audio/mpeg"
        : format === "wav"
          ? "audio/wav"
          : "audio/flac";

    await ffmpeg.deleteFile(inputName).catch(() => {});
    await ffmpeg.deleteFile(outputName).catch(() => {});

    return new Blob([data.slice().buffer], { type: mime });
  } finally {
    ffmpeg.off("progress", progressHandler);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
