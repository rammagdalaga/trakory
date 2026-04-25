export interface CobaltSuccessResponse {
  status: "stream" | "redirect" | "tunnel";
  url: string;
  filename?: string;
}

export interface CobaltErrorResponse {
  status: "error";
  text?: string;
  error?: { code?: string };
}

export type CobaltResponse = CobaltSuccessResponse | CobaltErrorResponse;

const COBALT_API = "https://downloadapi.stuff.solutions/api/json";

interface ResolveCobaltOptions {
  url: string;
  mode?: "auto" | "audio" | "mute";
  audioFormat?: "mp3" | "ogg" | "wav" | "opus" | "best";
  videoQuality?: "360" | "720" | "1080" | "max";
}

function cleanProviderMessage(message: string) {
  return message
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function resolveSocialDownload(options: ResolveCobaltOptions): Promise<string> {
  const response = await fetch(COBALT_API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: options.url,
      downloadMode: options.mode || "auto",
      audioFormat: options.audioFormat || "mp3",
      videoQuality: options.videoQuality || "1080",
      youtubeHLS: true,
      tiktokFullAudio: true,
      alwaysProxy: true,
    }),
  });

  const data = (await response.json()) as CobaltResponse;

  if (!response.ok || data.status === "error") {
    const message =
      data.status === "error" ? data.text || data.error?.code || "Provider returned an unknown error." : "Failed to resolve media URL.";
    throw new Error(cleanProviderMessage(message));
  }

  return data.url;
}
