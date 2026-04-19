import { FFmpeg } from "@ffmpeg/ffmpeg";

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = "0.12.9";
const CORE_BASE = `https://unpkg.com/@ffmpeg/core@${CORE_VERSION}/dist/umd`;
const CORE_URL = `${CORE_BASE}/ffmpeg-core.js`;
const WASM_URL = `${CORE_BASE}/ffmpeg-core.wasm`;

export async function getFFmpeg(
  onLog?: (msg: string) => void,
): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    ffmpeg.on("log", ({ message }) => {
      console.log("[ffmpeg]", message);
      onLog?.(message);
    });

    await ffmpeg.load({
      coreURL: CORE_URL,
      wasmURL: WASM_URL,
    });

    ffmpegInstance = ffmpeg;
    return ffmpeg;
  })();

  try {
    return await loadPromise;
  } catch (err) {
    loadPromise = null;
    throw err;
  }
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
    onProgress?.(Math.min(Math.max(progress, 0), 1));
  };
  ffmpeg.on("progress", progressHandler);

  const mountDir = `/input-${Date.now()}`;
  const inputName = `${mountDir}/${file.name || "source"}`;
  const outputName = `output_${Date.now()}.${format}`;

  try {
    await ffmpeg.createDir(mountDir);
    await ffmpeg.mount("WORKERFS" as never, { files: [file] }, mountDir);

    const args = ["-i", inputName, "-vn"];
    if (format === "mp3") {
      args.push("-c:a", "libmp3lame", "-b:a", `${bitrate}k`);
    } else if (format === "wav") {
      args.push("-c:a", "pcm_s16le");
    } else {
      args.push("-c:a", "flac");
    }
    args.push(outputName);

    const exitCode = await ffmpeg.exec(args);
    if (exitCode !== 0) {
      throw new Error("Conversion failed. Try a smaller or different video file.");
    }

    const data = (await ffmpeg.readFile(outputName)) as Uint8Array;
    const mime =
      format === "mp3"
        ? "audio/mpeg"
        : format === "wav"
          ? "audio/wav"
          : "audio/flac";

    return new Blob([data.slice().buffer], { type: mime });
  } finally {
    ffmpeg.off("progress", progressHandler);
    await ffmpeg.deleteFile(outputName).catch(() => {});
    await ffmpeg.unmount(mountDir).catch(() => {});
    await ffmpeg.deleteDir(mountDir).catch(() => {});
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
