// Browser-native video → audio conversion.
// Uses Web Audio API to decode (any format the browser can play: MP4/AAC,
// WebM/Opus, MOV, etc.) and encodes WAV/FLAC-as-WAV directly, MP3 via lamejs.
// Zero WASM, zero CDN, fully Cloudflare-compatible.

export type AudioFormat = "mp3" | "wav" | "flac";
export type Bitrate = "128" | "192" | "320";

export interface ConvertOptions {
  format: AudioFormat;
  bitrate: Bitrate;
  onProgress?: (ratio: number) => void;
}

// Kept for API compatibility with the previous ffmpeg-based implementation.
export async function getFFmpeg(): Promise<void> {
  // Nothing to load — Web Audio API is built into the browser.
  return;
}

function getAudioContextCtor(): typeof AudioContext {
  const w = window as unknown as {
    AudioContext?: typeof AudioContext;
    webkitAudioContext?: typeof AudioContext;
  };
  const Ctor = w.AudioContext ?? w.webkitAudioContext;
  if (!Ctor) throw new Error("Web Audio API is not supported in this browser.");
  return Ctor;
}

async function decodeFile(file: File, onProgress?: (r: number) => void): Promise<AudioBuffer> {
  onProgress?.(0.05);
  const arrayBuffer = await file.arrayBuffer();
  onProgress?.(0.25);

  const Ctor = getAudioContextCtor();
  const ctx = new Ctor();
  try {
    const buffer = await ctx.decodeAudioData(arrayBuffer.slice(0));
    onProgress?.(0.6);
    return buffer;
  } catch (err) {
    throw new Error(
      "Couldn't decode this file. Try MP4, WebM, MOV, M4A, or another format your browser supports.",
    );
  } finally {
    ctx.close().catch(() => {});
  }
}

function encodeWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length * numChannels * 2 + 44;
  const arr = new ArrayBuffer(length);
  const view = new DataView(arr);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeString(0, "RIFF");
  view.setUint32(4, length - 8, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, length - 44, true);

  const channels: Float32Array[] = [];
  for (let i = 0; i < numChannels; i++) channels.push(buffer.getChannelData(i));

  let offset = 44;
  for (let i = 0; i < buffer.length; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  return new Blob([arr], { type: "audio/wav" });
}

async function encodeMp3(
  buffer: AudioBuffer,
  bitrate: number,
  onProgress?: (r: number) => void,
): Promise<Blob> {
  const lamejs = await import("@breezystack/lamejs");
  const Mp3Encoder = (lamejs as any).Mp3Encoder ?? (lamejs as any).default?.Mp3Encoder;
  if (!Mp3Encoder) throw new Error("MP3 encoder unavailable.");

  const numChannels = Math.min(buffer.numberOfChannels, 2);
  const sampleRate = buffer.sampleRate;
  const encoder = new Mp3Encoder(numChannels, sampleRate, bitrate);

  const left = buffer.getChannelData(0);
  const right = numChannels > 1 ? buffer.getChannelData(1) : left;

  const toInt16 = (f32: Float32Array) => {
    const out = new Int16Array(f32.length);
    for (let i = 0; i < f32.length; i++) {
      const s = Math.max(-1, Math.min(1, f32[i]));
      out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
    }
    return out;
  };

  const leftInt = toInt16(left);
  const rightInt = numChannels > 1 ? toInt16(right) : leftInt;

  const blockSize = 1152;
  const chunks: Uint8Array[] = [];
  const total = leftInt.length;

  for (let i = 0; i < total; i += blockSize) {
    const lChunk = leftInt.subarray(i, i + blockSize);
    const rChunk = rightInt.subarray(i, i + blockSize);
    const mp3buf =
      numChannels > 1
        ? encoder.encodeBuffer(lChunk, rChunk)
        : encoder.encodeBuffer(lChunk);
    if (mp3buf.length > 0) chunks.push(new Uint8Array(mp3buf));
    if (onProgress && i % (blockSize * 64) === 0) {
      onProgress(0.6 + 0.38 * (i / total));
    }
    // Yield occasionally so the UI stays responsive.
    if (i % (blockSize * 256) === 0) await new Promise((r) => setTimeout(r, 0));
  }

  const flush = encoder.flush();
  if (flush.length > 0) chunks.push(new Uint8Array(flush));

  return new Blob(chunks as BlobPart[], { type: "audio/mpeg" });
}

export async function convertVideoToAudio(
  file: File,
  { format, bitrate, onProgress }: ConvertOptions,
): Promise<Blob> {
  const buffer = await decodeFile(file, onProgress);

  if (format === "mp3") {
    const blob = await encodeMp3(buffer, parseInt(bitrate, 10), onProgress);
    onProgress?.(1);
    return blob;
  }

  // WAV — and FLAC falls back to WAV (lossless PCM) since native FLAC encoding
  // requires WASM. Container differs but quality is identical.
  onProgress?.(0.85);
  const wav = encodeWav(buffer);
  onProgress?.(1);
  if (format === "flac") {
    return new Blob([await wav.arrayBuffer()], { type: "audio/wav" });
  }
  return wav;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
