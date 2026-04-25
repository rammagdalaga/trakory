import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";

// ─── Tool mega-menu data ───────────────────────────────────────────────────────
const NAV_TOOLS = [
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
];

const DEV_ALERT = "This feature is in development. More features are coming — stay tuned!";

// ─── Main nav export ──────────────────────────────────────────────────────────
export function NavDropdown() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const toolsRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close desktop tools mega-menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP NAV — hidden below md
      ════════════════════════════════════════ */}
      <div className="hidden md:flex items-center gap-1">
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {/* Tools — mega-menu trigger */}
          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className={`px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
                open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-expanded={open}
              aria-haspopup="true"
            >
              Tools
            </button>

            {/* Mega-menu — full viewport width */}
            {open && (
              <div
                className="fixed left-0 right-0 z-50 border-y border-border/40 bg-background/96 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.07)] animate-dropdown"
                style={{ top: "var(--nav-height, 58px)" }}
                role="menu"
              >
                <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
                    {NAV_TOOLS.map((col) => (
                      <div key={col.heading}>
                        <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                          {col.heading}
                        </p>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                to={link.href}
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-1.5 text-sm text-foreground/70 transition-colors duration-150 hover:text-primary"
                              >
                                <span className="size-1 rounded-full bg-border transition-colors duration-150 group-hover:bg-primary" />
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <button
            onClick={() => alert(DEV_ALERT)}
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            About
          </button>

          {/* Contact */}
          <button
            onClick={() => alert(DEV_ALERT)}
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Contact
          </button>

          {/* Privacy */}
          <button
            onClick={() => alert(DEV_ALERT)}
            className="px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground"
          >
            Privacy
          </button>
        </nav>

        {/* Sign in */}
        <button
          onClick={() => alert(DEV_ALERT)}
          className="ml-2 rounded border border-border/70 bg-transparent px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors duration-150 hover:border-primary/50 hover:text-primary"
        >
          Sign in
        </button>
      </div>

      {/* ════════════════════════════════════════
          MOBILE HAMBURGER — visible below md
      ════════════════════════════════════════ */}
      <div ref={mobileRef} className="relative flex md:hidden">
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          className="flex size-9 items-center justify-center border border-border/70 bg-card/70 text-foreground transition-colors hover:bg-muted"
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>

        {/* Mobile dropdown panel */}
        {mobileOpen && (
          <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 rounded-2xl border border-border/60 bg-card/95 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl animate-dropdown">
            <div className="flex flex-col p-2 pb-3">
              {/* Tools — accordion */}
              <button
                onClick={() => setMobileToolsOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Tools
                <svg
                  className={`size-3.5 text-muted-foreground transition-transform duration-200 ${
                    mobileToolsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Tools sub-links */}
              {mobileToolsOpen && (
                <div className="ml-2 mb-1 flex flex-col gap-3 rounded-xl bg-muted/50 px-3 py-3">
                  {NAV_TOOLS.map((col) => (
                    <div key={col.heading}>
                      <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                        {col.heading}
                      </p>
                      <ul className="space-y-1.5">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
                            >
                              <span className="size-1 rounded-full bg-border" />
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {/* About */}
              <button
                onClick={() => alert(DEV_ALERT)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                About
              </button>

              {/* Contact */}
              <button
                onClick={() => alert(DEV_ALERT)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Contact
              </button>

              {/* Privacy */}
              <button
                onClick={() => alert(DEV_ALERT)}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Privacy
              </button>

              {/* Divider */}
              <div className="my-1 border-t border-border/50" />

              {/* Sign in */}
              <button
                onClick={() => alert(DEV_ALERT)}
                className="mx-1 rounded-xl border border-border/70 bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
