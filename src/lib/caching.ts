/**
 * Cache Configuration & Headers for Cloudflare
 * Optimizes file caching and performance on Cloudflare Pages
 */

/**
 * Cloudflare Page Rules Configuration
 * These rules should be configured in Cloudflare dashboard for optimal performance
 *
 * Rule 1: Cache Static Assets Long-term
 * Pattern: trakory.com/assets/*
 * Cache Level: Cache Everything
 * Browser Cache TTL: 1 year
 * Edge Cache TTL: 1 year
 *
 * Rule 2: Cache JS & CSS Aggressively
 * Pattern: trakory.com/*.js
 * Cache Level: Cache Everything
 * Browser Cache TTL: 30 days
 * Edge Cache TTL: 30 days
 *
 * Rule 3: Network HTML (with shorter cache)
 * Pattern: trakory.com/
 * Cache Level: Standard
 * Browser Cache TTL: 30 minutes
 *
 * Rule 4: SVG & Font Caching
 * Pattern: trakory.com/*.{svg,woff2,woff}
 * Cache Level: Cache Everything
 * Browser Cache TTL: 1 year
 * Edge Cache TTL: 1 year
 */

/**
 * Cache Headers Map for Different File Types
 * Used to set appropriate Cache-Control headers
 */
export const CACHE_HEADERS = {
  // Static assets - cache for 1 year (immutable)
  assets: 'public, max-age=31536000, immutable',

  // JS/CSS bundles - cache for 30 days
  bundle: 'public, max-age=2592000, immutable',

  // Fonts - cache for 1 year
  fonts: 'public, max-age=31536000, immutable',

  // Images - cache for 30 days
  images: 'public, max-age=2592000',

  // SVG - cache for 1 year
  svg: 'public, max-age=31536000, immutable',

  // HTML pages - shorter cache (validation-based)
  html: 'public, max-age=1800, must-revalidate',

  // Service Worker - never cache
  serviceWorker: 'no-cache, no-store, must-revalidate',

  // API responses - no cache by default
  api: 'no-cache, no-store, must-revalidate',
};

/**
 * Get appropriate cache header based on file extension
 */
export function getCacheHeader(pathname: string): string {
  const ext = pathname.split('.').pop()?.toLowerCase();

  const mapping: Record<string, string> = {
    // Bundle files
    js: CACHE_HEADERS.bundle,
    css: CACHE_HEADERS.bundle,

    // Fonts
    woff: CACHE_HEADERS.fonts,
    woff2: CACHE_HEADERS.fonts,
    ttf: CACHE_HEADERS.fonts,

    // Images
    jpg: CACHE_HEADERS.images,
    jpeg: CACHE_HEADERS.images,
    png: CACHE_HEADERS.images,
    webp: CACHE_HEADERS.images,
    gif: CACHE_HEADERS.images,

    // Vector
    svg: CACHE_HEADERS.svg,

    // Others
    html: CACHE_HEADERS.html,
    json: CACHE_HEADERS.api,
  };

  return mapping[ext || ''] || CACHE_HEADERS.html;
}

/**
 * Cloudflare _redirects configuration
 * This file should be in the public folder
 */
export const REDIRECTS_CONFIG = `
# Redirect www to non-www
https://www.trakory.com/* https://trakory.com/:splat 301

# Cache control headers for assets
/assets/* Cache-Control: public, max-age=31536000, immutable

# Cache control for JS/CSS
/*.js Cache-Control: public, max-age=2592000, immutable
/*.css Cache-Control: public, max-age=2592000, immutable

# Cache control for fonts
/*.woff Cache-Control: public, max-age=31536000, immutable
/*.woff2 Cache-Control: public, max-age=31536000, immutable

# Cache control for images
/logo/* Cache-Control: public, max-age=2592000

# Don't cache service worker
/sw.js Cache-Control: no-cache, no-store, must-revalidate

# HTML pages - cache for 30 minutes
/*.html Cache-Control: public, max-age=1800, must-revalidate
/ Cache-Control: public, max-age=1800, must-revalidate
`;
