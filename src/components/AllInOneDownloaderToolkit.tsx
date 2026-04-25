import { useMemo, useState } from "react";
import {
  Loader2,
  Link2,
  Download,
  Copy,
  Sparkles,
  Scissors,
  Layers,
  AlertTriangle,
  Construction,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { fetchTikTokVideo, fetchTikTokProfilePicture, downloadFile } from "@/lib/tikwm";
import { resolveSocialDownload } from "@/lib/socialDownloader";
import { convertVideoToAudio, getFFmpeg } from "@/lib/ffmpeg";
import { useAdGate } from "@/hooks/use-adgate";

type Platform = "tiktok" | "youtube" | "instagram" | "facebook" | "twitter" | "unknown";
type FormatType = "mp4" | "mp3" | "image";

interface DownloadOption {
  label: string;
  format: FormatType;
  quality?: "360p" | "720p" | "1080p";
}

interface DownloadResult {
  platform: Platform;
  title: string;
  thumbnail: string;
  fallbackThumbnail?: string;
  url: string;
  sourceUrl: string;
  kind: "video" | "profile";
  options: DownloadOption[];
}

const IN_DEV_PLATFORMS_VIDEO: Platform[] = ["youtube", "twitter"];
const IN_DEV_PLATFORMS_PROFILE: Platform[] = ["instagram"];

const platformPatterns: Array<{ platform: Platform; regex: RegExp; icon: string }> = [
  { platform: "tiktok", regex: /(?:tiktok\.com|vt\.tiktok\.com)/i, icon: "🎵" },
  { platform: "youtube", regex: /(?:youtube\.com|youtu\.be)/i, icon: "▶️" },
  { platform: "instagram", regex: /instagram\.com/i, icon: "📸" },
  { platform: "facebook", regex: /(?:facebook\.com|fb\.watch)/i, icon: "📘" },
  { platform: "twitter", regex: /(?:twitter\.com|x\.com)/i, icon: "𝕏" },
];

function detectPlatform(url: string): { platform: Platform; icon: string } {
  const match = platformPatterns.find((item) => item.regex.test(url));
  return match
    ? { platform: match.platform, icon: match.icon }
    : { platform: "unknown", icon: "🔗" };
}

function getMockOptions(platform: Platform): DownloadOption[] {
  if (platform === "youtube") {
    return [
      { label: "Download MP4", format: "mp4", quality: "720p" },
      { label: "Download MP3", format: "mp3" },
    ];
  }

  if (platform === "instagram") {
    return [
      { label: "Download MP4", format: "mp4" },
      { label: "Download MP3", format: "mp3" },
    ];
  }

  if (platform === "facebook") {
    return [
      { label: "Download MP4", format: "mp4" },
      { label: "Download MP3", format: "mp3" },
    ];
  }

  if (platform === "twitter") {
    return [
      { label: "Download MP4", format: "mp4" },
      { label: "Download MP3", format: "mp3" },
    ];
  }

  return [
    { label: "Download MP4 720p", format: "mp4", quality: "720p" },
    { label: "Download MP3", format: "mp3" },
  ];
}

function fallbackAvatarUrl(label: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(label)}&background=0f172a&color=ffffff&size=512`;
}

function extractProfileIdentifier(
  input: string,
  platform: Exclude<Platform, "unknown">,
): string | null {
  const clean = input.trim();
  if (!clean) return null;

  if (clean.startsWith("@")) {
    if (platform === "facebook") return null;
    return clean.slice(1).trim() || null;
  }

  if (!/^https?:\/\/.+/i.test(clean)) {
    return null;
  }

  const url = clean;
  if (platform === "facebook") {
    const idMatch = url.match(/[?&]id=(\d+)/i);
    if (idMatch?.[1]) return idMatch[1];
    const slugMatch = url.match(/facebook\.com\/([^/?#]+)/i);
    if (slugMatch?.[1] && slugMatch[1] !== "profile.php") return slugMatch[1];
    return null;
  }

  if (platform === "youtube") {
    const handleMatch = url.match(/youtube\.com\/@([^/?#]+)/i);
    if (handleMatch?.[1]) return handleMatch[1];
    const channelMatch = url.match(/youtube\.com\/(?:channel|c|user)\/([^/?#]+)/i);
    if (channelMatch?.[1]) return channelMatch[1];
    return null;
  }

  const match = url.match(/(?:tiktok|instagram|twitter|x)\.com\/@?([^/?#]+)/i);
  return match?.[1] || null;
}

function buildProfileAvatarUrl(platform: Exclude<Platform, "unknown">, identifier: string) {
  if (platform === "twitter") return `https://unavatar.io/x/${encodeURIComponent(identifier)}`;
  return `https://unavatar.io/${platform}/${encodeURIComponent(identifier)}`;
}

function deriveTitleFromUrl(platform: Platform, input: string) {
  const url = input.trim();
  if (platform === "instagram") {
    const m = url.match(/instagram\.com\/(?:reel|p|tv)\/([^/?#]+)/i);
    return m?.[1] ? `Instagram ${m[1]}` : "Instagram video";
  }
  if (platform === "facebook") {
    const m = url.match(/[?&]v=([^&]+)/i);
    return m?.[1] ? `Facebook video ${m[1]}` : "Facebook video";
  }
  if (platform === "twitter") {
    const m = url.match(/status\/(\d+)/i);
    return m?.[1] ? `X post ${m[1]}` : "X video";
  }
  if (platform === "youtube") {
    const m = url.match(/[?&]v=([^&]+)/i) || url.match(/youtu\.be\/([^?&/]+)/i);
    return m?.[1] ? `YouTube video ${m[1]}` : "YouTube video";
  }
  return "Social media video";
}

async function fetchVideoMetadata(url: string, platform: Platform) {
  if (platform === "youtube") {
    const res = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`,
    );
    if (!res.ok) throw new Error("Could not fetch YouTube metadata.");
    const data = (await res.json()) as { title?: string; thumbnail_url?: string };
    return {
      title: data.title || deriveTitleFromUrl(platform, url),
      thumbnail: data.thumbnail_url || "",
    };
  }

  if (platform === "twitter") {
    const res = await fetch(
      `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}&omit_script=1`,
    );
    if (!res.ok) throw new Error("Could not fetch X metadata.");
    const data = (await res.json()) as { author_name?: string };
    return {
      title: data.author_name
        ? `X video by ${data.author_name}`
        : deriveTitleFromUrl(platform, url),
      thumbnail: "",
    };
  }

  return {
    title: deriveTitleFromUrl(platform, url),
    thumbnail: "",
  };
}

function InDevelopmentNotice({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-border bg-background/60 p-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-soft">
        <Construction className="size-7 text-primary-foreground" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">
          This feature is currently in development. Stay tuned for updates!
        </p>
      </div>
      <span className="rounded-full bg-foreground/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Coming Soon
      </span>
    </div>
  );
}

export function AllInOneDownloaderToolkit() {
  const [url, setUrl] = useState("");
  const [profilePlatform, setProfilePlatform] = useState<Exclude<Platform, "unknown">>("tiktok");
  const [downloadMode, setDownloadMode] = useState<"video" | "profile">("video");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DownloadResult | null>(null);
  const [mp3Loading, setMp3Loading] = useState(false);
  const { triggerAdGate } = useAdGate();

  const detected = useMemo(() => detectPlatform(url), [url]);

  const processDownload = async () => {
    const clean = url.trim();
    if (!clean) {
      setError("Paste a social media link or profile input first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      if (downloadMode === "profile") {
        // Check if platform is in development
        if (IN_DEV_PLATFORMS_PROFILE.includes(profilePlatform)) {
          throw new Error(
            `${profilePlatform.charAt(0).toUpperCase() + profilePlatform.slice(1)} profile download is currently in development. Please check back later!`,
          );
        }

        const identifier = extractProfileIdentifier(clean, profilePlatform);
        if (!identifier) {
          if (profilePlatform === "facebook") {
            throw new Error("For Facebook profile mode, paste the Facebook profile link.");
          }
          throw new Error("Invalid profile input. Use @username or a valid profile link.");
        }

        if (profilePlatform === "tiktok") {
          const profile = await fetchTikTokProfilePicture(identifier);
          const avatarUrl =
            profile.data?.user?.avatarLarger ||
            profile.data?.user?.avatarMedium ||
            profile.data?.user?.avatarThumb;

          if (!avatarUrl) {
            throw new Error("TikTok profile image is unavailable for this username.");
          }

          const label = `@${profile.data?.user?.uniqueId || identifier}`;
          setResult({
            platform: "tiktok",
            title: label,
            thumbnail: avatarUrl,
            fallbackThumbnail: fallbackAvatarUrl(label),
            url: avatarUrl,
            sourceUrl: clean,
            kind: "profile",
            options: [{ label: "Download Profile Image", format: "image" }],
          });
          return;
        }

        const label = `@${identifier}`;
        const avatarUrl = buildProfileAvatarUrl(profilePlatform, identifier);
        const alwaysWorksFallback = fallbackAvatarUrl(label);
        setResult({
          platform: profilePlatform,
          title: label,
          thumbnail: avatarUrl,
          fallbackThumbnail: alwaysWorksFallback,
          url: avatarUrl,
          sourceUrl: clean,
          kind: "profile",
          options: [{ label: "Download Profile Image", format: "image" }],
        });
        return;
      }

      if (!/^https?:\/\/.+/i.test(clean)) {
        setError("Invalid URL. Video mode requires a full social media URL.");
        return;
      }

      const info = detectPlatform(clean);
      if (info.platform === "unknown") {
        setError(
          "Unsupported platform. Please use TikTok, YouTube, Instagram, Facebook, or Twitter/X links.",
        );
        return;
      }

      // Check if platform video download is in development
      if (IN_DEV_PLATFORMS_VIDEO.includes(info.platform)) {
        throw new Error(
          `${info.platform.charAt(0).toUpperCase() + info.platform.slice(1)} video download is currently in development. Please check back later!`,
        );
      }

      if (info.platform === "tiktok") {
        const isProfileUrl = /tiktok\.com\/@[^/]+\/?$/i.test(clean);
        if (isProfileUrl) {
          throw new Error(
            "This is a TikTok profile link. Switch to Profile mode to download profile image.",
          );
        }

        const res = await fetchTikTokVideo(clean);
        if (res.code !== 0 || !res.data?.play) {
          throw new Error("This TikTok content may be private or unavailable.");
        }

        setResult({
          platform: "tiktok",
          title: res.data.title || "TikTok Video",
          thumbnail: res.data.play,
          url: res.data.play,
          sourceUrl: clean,
          kind: "video",
          options: [
            { label: "Download MP4", format: "mp4", quality: "720p" },
            { label: "Download MP3", format: "mp3" },
          ],
        });
        return;
      }

      const streamUrl = await resolveSocialDownload({
        url: clean,
        mode: "auto",
      });
      const meta = await fetchVideoMetadata(clean, info.platform).catch(() => ({
        title: deriveTitleFromUrl(info.platform, clean),
        thumbnail: "",
      }));

      setResult({
        platform: info.platform,
        title: meta.title,
        thumbnail:
          meta.thumbnail || "https://dummyimage.com/1200x675/0f172a/ffffff.png&text=Video+Preview",
        url: streamUrl,
        sourceUrl: clean,
        kind: "video",
        options: getMockOptions(info.platform),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to process this URL.");
    } finally {
      setLoading(false);
    }
  };

  const handleResultDownload = async (option: DownloadOption) => {
    if (!result) return;
    const safeName = result.title.replace(/[^a-z0-9-_]+/gi, "_").slice(0, 60);
    try {
      if (result.platform === "tiktok" && option.format === "mp4") {
        await downloadFile(result.url, `${safeName}.mp4`);
        return;
      }

      if (result.kind === "profile" && option.format === "image") {
        await downloadFile(result.url, `${safeName}.jpg`);
        return;
      }

      if (option.format === "mp3") {
        setMp3Loading(true);
        setError(null);
        try {
          // Fetch the video as a File for client-side audio extraction
          const videoResponse = await fetch(result.url);
          if (!videoResponse.ok) {
            throw new Error(`Failed to fetch video: ${videoResponse.status}`);
          }
          const videoBlob = await videoResponse.blob();
          const videoFile = new File([videoBlob], "video.mp4", {
            type: videoBlob.type || "video/mp4",
          });

          // Ensure the MP3 encoder is loaded
          await getFFmpeg();

          // Extract audio using the same engine as the Converter component
          const { blob: mp3Blob } = await convertVideoToAudio(videoFile, {
            format: "mp3",
            bitrate: "192",
          });

          // Download the extracted MP3
          const mp3Url = URL.createObjectURL(mp3Blob);
          const a = document.createElement("a");
          a.href = mp3Url;
          a.download = `${safeName}.trakory.mp3`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(mp3Url);
          return;
        } catch (mp3Err) {
          setError(
            mp3Err instanceof Error
              ? `Audio extraction failed: ${mp3Err.message}`
              : "Audio extraction failed. Try downloading the MP4 video instead.",
          );
          return;
        } finally {
          setMp3Loading(false);
        }
      }

      await downloadFile(result.url, `${safeName}.mp4`);
    } catch {
      if (result.kind === "profile" && result.fallbackThumbnail) {
        try {
          const safeName = result.title.replace(/[^a-z0-9-_]+/gi, "_").slice(0, 60);
          await downloadFile(result.fallbackThumbnail, `${safeName}.jpg`);
          setError(
            "Original profile image source blocked download. Downloaded fallback profile image instead.",
          );
          return;
        } catch {
          // Continue to open in new tab.
        }
      }
      // Fallback for providers that don't allow fetch/CORS blobs.
      window.open(result.url, "_blank", "noopener,noreferrer");
      setError(
        "Direct file download is blocked by source. Opened media in a new tab so you can save it.",
      );
    }
  };

  return (
    <>
      <Tabs defaultValue="downloader" className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2 gap-2 p-2 sm:grid-cols-4">
          <TabsTrigger value="downloader">Downloader</TabsTrigger>
          <TabsTrigger value="hashtags">Hashtag Generator</TabsTrigger>
          <TabsTrigger value="trimmer">Video Trimmer</TabsTrigger>
          <TabsTrigger value="bulk">Bulk TikTok</TabsTrigger>
        </TabsList>

        <TabsContent
          value="downloader"
          className="rounded-2xl border border-border/60 bg-card/90 p-4 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link2 className="size-4" /> Smart URL Detection
          </div>
          <div className="mb-3 grid gap-3 sm:grid-cols-2">
            <select
              value={downloadMode}
              onChange={(e) => setDownloadMode(e.target.value as "video" | "profile")}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary"
            >
              <option value="video">Video Downloader Mode</option>
              <option value="profile">Profile Picture Downloader Mode</option>
            </select>
            <select
              value={profilePlatform}
              onChange={(e) => setProfilePlatform(e.target.value as Exclude<Platform, "unknown">)}
              className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm text-foreground outline-none focus:border-primary disabled:opacity-60"
              disabled={downloadMode === "video"}
            >
              <option value="tiktok">TikTok profile</option>
              <option value="youtube">YouTube profile</option>
              <option value="instagram">Instagram profile</option>
              <option value="facebook">Facebook profile (profile link)</option>
              <option value="twitter">X (Twitter) profile</option>
            </select>
          </div>
          <div className="mb-3 grid gap-3 sm:grid-cols-[1fr_220px]">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
              placeholder={
                downloadMode === "video"
                  ? "Paste TikTok/YouTube/Instagram/Facebook/X video URL"
                  : profilePlatform === "facebook"
                    ? "Paste Facebook profile link"
                    : "Type @username or paste profile link"
              }
            />
            <div className="rounded-xl border border-border bg-background px-3 py-3 text-xs text-muted-foreground">
              {downloadMode === "video"
                ? "Video mode: paste post/video URL."
                : profilePlatform === "facebook"
                  ? "Facebook profile mode: use profile link."
                  : "Profile mode: @username or profile link."}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={processDownload}
              disabled={loading}
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-70 sm:w-auto"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : "Download"}
            </button>
          </div>
          <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            <p>
              Detected platform:{" "}
              <span className="font-semibold text-foreground">
                {detected.icon} {detected.platform.toUpperCase()}
              </span>
            </p>
            <p>
              Guide: Video mode needs URL. Profile mode supports @username
              (TikTok/YouTube/Instagram/X) and Facebook profile link.
            </p>
            <p>Note: YouTube and X (Twitter) video downloads are currently in development.</p>
            <p>Note: Instagram profile picture download is currently in development.</p>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
              <AlertTriangle className="mr-2 inline size-4" />
              {error}
            </div>
          )}

          {result && (
            <div className="mt-5 rounded-2xl border border-border bg-background p-4">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {result.platform}
                </p>
                <h3 className="text-lg font-semibold text-foreground">{result.title}</h3>
              </div>
              {result.kind === "video" ? (
                <video
                  src={result.url}
                  controls
                  playsInline
                  preload="metadata"
                  poster={result.thumbnail}
                  className="mb-4 aspect-video w-full rounded-lg bg-black object-contain"
                />
              ) : (
                <img
                  src={result.thumbnail}
                  alt={`${result.platform} preview thumbnail`}
                  className="mb-4 aspect-video w-full rounded-lg object-cover bg-muted"
                  loading="lazy"
                  onError={(e) => {
                    if (!result.fallbackThumbnail) return;
                    const img = e.currentTarget;
                    if (img.dataset.fallbackApplied === "true") return;
                    img.dataset.fallbackApplied = "true";
                    img.src = result.fallbackThumbnail;
                  }}
                />
              )}
              <div className="grid gap-2 sm:grid-cols-2">
                {result.options.map((option) => {
                  const isMp3Button = option.format === "mp3";
                  const isLoading = isMp3Button && mp3Loading;
                  return (
                    <button
                      key={option.label}
                      onClick={() => triggerAdGate(() => handleResultDownload(option))}
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-60"
                    >
                      {isLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <Download className="size-4" />
                      )}
                      {isLoading ? "Extracting audio…" : option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="hashtags"
          className="rounded-2xl border border-border/60 bg-card/90 p-4 sm:p-6"
        >
          <InDevelopmentNotice title="Hashtag Generator" />
        </TabsContent>

        <TabsContent
          value="trimmer"
          className="rounded-2xl border border-border/60 bg-card/90 p-4 sm:p-6"
        >
          <InDevelopmentNotice title="Video Trimmer" />
        </TabsContent>

        <TabsContent
          value="bulk"
          className="rounded-2xl border border-border/60 bg-card/90 p-4 sm:p-6"
        >
          <InDevelopmentNotice title="Bulk TikTok Downloader" />
        </TabsContent>
      </Tabs>
    </>
  );
}
