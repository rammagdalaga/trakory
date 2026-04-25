const FOOTER_COLS = [
  {
    heading: "Video & Audio",
    links: [
      { label: "Video to MP3", href: "/tools/video-to-audio" },
      { label: "Video to WAV", href: "/tools/video-to-audio" },
      { label: "Video to FLAC", href: "/tools/video-to-audio" },
      { label: "MP3 Converter", href: "/tools/audio" },
      { label: "Audio to MP3", href: "/tools/audio" },
      { label: "MP3 to WAV", href: "/tools/audio" },
    ],
  },
  {
    heading: "PDF Tools",
    links: [
      { label: "PDF to Word", href: "/tools/pdf-to-word" },
      { label: "Word to PDF", href: "/tools/word-to-pdf" },
      { label: "Compress PDF", href: "/tools/compress-pdf" },
    ],
  },
  {
    heading: "Word Tools",
    links: [
      { label: "Compress Word", href: "/tools/compress-word" },
      { label: "DOCX to PDF", href: "/tools/word-to-pdf" },
    ],
  },
  {
    heading: "TikTok Tools",
    links: [
      { label: "TikTok Downloader", href: "/tools/tiktok-video-downloader" },
      { label: "Profile Picture", href: "/tools/tiktok-profile-downloader" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Contact", href: "mailto:trakory.contact@gmail.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur mt-auto">
      {/* Main link grid */}
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
          {/* Brand */}
          <a
            href="/"
            aria-label="Trakory home"
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            <span className="size-2 rounded-full bg-primary" />
            Trakory
          </a>

          {/* Contact */}
          <a
            href="mailto:trakory.contact@gmail.com"
            className="font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            trakory.contact@gmail.com
          </a>

          {/* Copyright */}
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            © 2026 Trakory · Free converter for everyone
          </p>
        </div>
      </div>
    </footer>
  );
}
