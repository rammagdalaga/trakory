import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { AdGateProvider } from "@/hooks/use-adgate";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trakory — Free Online Converter for Video, Audio, PDF, Images & More" },
      {
        name: "description",
        content:
          "Convert videos to MP3, audio to WAV, resize images, convert PDFs & Word files. 100% free, private, browser-based. No uploads, no signup required.",
      },
      {
        name: "keywords",
        content:
          "online converter, video converter, audio converter, image resizer, PDF converter, Word converter, mp3 converter, file conversion tools, free converter",
      },
      { name: "author", content: "Trakory" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "theme-color", content: "#0ea5b7" },
      { name: "application-name", content: "Trakory" },
      { property: "og:title", content: "Trakory — Free Multi-Format File Converter Tools" },
      {
        property: "og:description",
        content:
          "Convert videos, audio, PDFs, images and more instantly in your browser. 100% private & free.",
      },
      { property: "og:image", content: "https://trakory.com/logo/logo.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Trakory" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Trakory — Free Online File Converter" },
      {
        name: "twitter:description",
        content: "Convert videos, audio, images, PDFs & more. Fast, secure, and 100% free.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap",
      },
    ],
    scripts: [],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AdGateProvider>
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
    </AdGateProvider>
  );
}
