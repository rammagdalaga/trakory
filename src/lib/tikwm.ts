// TikWM API integration utilities

export interface VideoDownloadResponse {
  code: number;
  msg: string;
  data?: {
    play?: string;
    title?: string;
    author?: {
      unique_id: string;
      nickname: string;
    };
  };
}

export interface ProfilePictureResponse {
  code: number;
  msg: string;
  data?: {
    user?: {
      avatarLarger?: string;
      avatarMedium?: string;
      avatarThumb?: string;
      uniqueId?: string;
      nickname?: string;
    };
  };
}

export async function fetchTikTokVideo(url: string): Promise<VideoDownloadResponse> {
  const apiUrl = `https://tikwm.com/api/?url=${encodeURIComponent(url)}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Failed to fetch video info");
  return await response.json();
}

export async function fetchTikTokProfilePicture(
  username: string,
): Promise<ProfilePictureResponse> {
  const cleanUsername = username.replace("@", "").trim();
  const apiUrl = `https://www.tikwm.com/api/user/info?unique_id=${encodeURIComponent(cleanUsername)}`;
  const response = await fetch(apiUrl);
  if (!response.ok) throw new Error("Failed to fetch profile info");
  return await response.json();
}

export async function downloadFile(url: string, filename: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
}
