interface FFmpeg {
  load: (opts: any) => Promise<void>;
  exec: (args: string[]) => Promise<number>;
  writeFile: (name: string, data: Uint8Array) => Promise<void>;
  readFile: (name: string) => Promise<Uint8Array>;
  deleteFile: (name: string) => Promise<void>;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback: (data: any) => void) => void;
}

let ffmpegInstance: FFmpeg | null = null;
let loadPromise: Promise<FFmpeg> | null = null;

const CORE_VERSION = "0.12.9";
const CORE_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/umd/ffmpeg-core.js`;
const WASM_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${CORE_VERSION}/dist/umd/ffmpeg-core.wasm`;

/**
 * Load FFmpeg from CDN using esm.sh
 * Avoids native binding issues with Cloudflare Pages by using pre-built WASM
 */
export async function getFFmpeg(
  onLog?: (msg: string) => void,
): Promise<FFmpeg> {
  if (ffmpegInstance) return ffmpegInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      console.log("[FFmpeg] Loading FFmpeg from CDN...");
      
      // Import FFmpeg directly from esm.sh (proper ES module from CDN)
      const FFmpegModule = await import("https://esm.sh/@ffmpeg/ffmpeg@0.12.15");

      const FFmpegClass = FFmpegModule.FFmpeg;
      if (!FFmpegClass) {
        console.error("[FFmpeg] Available exports:", Object.keys(FFmpegModule));
        throw new Error("FFmpeg class not available from import");
      }

      console.log("[FFmpeg] Creating FFmpeg instance...");
      const ffmpeg = new FFmpegClass();

      ffmpeg.on("log", ({ message }: { message: string }) => {
        console.log("[ffmpeg]", message);
        onLog?.(message);
      });

      console.log("[FFmpeg] Loading FFmpeg core from", CORE_URL);
      await ffmpeg.load({
        coreURL: CORE_URL,
        wasmURL: WASM_URL,
      });

      console.log("[FFmpeg] FFmpeg loaded successfully!");
      ffmpegInstance = ffmpeg;
      return ffmpeg;
    } catch (error) {
      console.error("[FFmpeg] Failed to load FFmpeg:", error);
      throw new Error(`Failed to initialize FFmpeg: ${error}`);
    }
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

  const inputName = `input_${Date.now()}_${file.name || "source"}`;
  const outputName = `output_${Date.now()}.${format}`;

  try {
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
    await ffmpeg.deleteFile(inputName).catch(() => {});
    await ffmpeg.deleteFile(outputName).catch(() => {});
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
