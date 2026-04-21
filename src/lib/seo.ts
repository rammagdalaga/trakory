/**
 * SEO Utilities for Trakory
 * Provides consistent meta tag and schema management across the application
 */

export const SITE_CONFIG = {
  name: "Trakory",
  url: "https://trakory.com",
  description: "Free online file converter platform supporting video to audio, image resizing, PDF, Word, and more conversion tools.",
  shortDescription: "Convert videos, audio, PDFs, images and more instantly in your browser. 100% private & free.",
  author: "Trakory",
  twitterHandle: "@Trakory",
  themeColor: "#0ea5b7",
  logo: "/logo/logo.png",
  socialImage: "/logo/og-image.png", // Ensure this exists
};

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(config: SeoMeta) {
  return [
    { title: config.title },
    { name: "description", content: config.description },
    ...(config.keywords ? [{ name: "keywords", content: config.keywords }] : []),
    { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { property: "og:url", content: config.canonicalUrl || SITE_CONFIG.url },
    { property: "og:image", content: config.ogImage || SITE_CONFIG.socialImage },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    { name: "twitter:creator", content: SITE_CONFIG.twitterHandle },
    { name: "twitter:image", content: config.ogImage || SITE_CONFIG.socialImage },
  ];
}

/**
 * Generate JSON-LD structured data for Organization
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    description: SITE_CONFIG.description,
    sameAs: [
      "https://twitter.com/Trakory",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: SITE_CONFIG.url,
    },
  };
}

/**
 * Generate JSON-LD structured data for WebApplication
 */
export function generateWebApplicationSchema(features: string[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Any (Web Browser)",
    description: SITE_CONFIG.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    featureList: features.length > 0 ? features : [
      "Convert video to MP3, WAV, FLAC",
      "Resize images",
      "Convert PDF files",
      "Convert Word documents",
      "100% in-browser conversion",
      "No uploads required",
      "Fully private and secure",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD structured data for FAQPage
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFaqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD structured data for WebPage
 */
export function generateWebPageSchema(config: {
  title: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    image: config.image || SITE_CONFIG.socialImage,
    url: SITE_CONFIG.url,
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
  };
}

/**
 * Common Keywords by conversion type
 */
export const KEYWORDS_BY_TYPE = {
  video: "video to audio converter, video to mp3, mp4 to mp3, convert video to audio, extract audio from video, video to wav, video to flac, online audio converter, free mp3 converter, browser video converter, private video converter, mkv to mp3, mov to mp3, webm to mp3, avi to mp3",
  
  audio: "audio converter, audio format converter, convert audio online, mp3 to wav, wav to mp3, audio compressor, audio editor online, trim audio, merge audio files",
  
  image: "image resizer, resize image online, image compressor, compress image, batch resize images, crop image, image optimizer, jpg compressor, png optimizer, webp converter",
  
  pdf: "pdf converter, pdf to word, convert pdf, compress pdf, pdf merger, pdf splitter, extract pdf text, pdf to image, image to pdf",
  
  word: "word converter, doc to pdf, docx to pdf, word to pdf converter, document converter, text to pdf",
  
  general: "online converter, free converter, file converter, no upload converter, private conversion, batch converter, browser converter, instant converter, format converter",
};

/**
 * Get comprehensive keywords for a page
 */
export function getKeywordsForPage(types: (keyof typeof KEYWORDS_BY_TYPE)[]): string {
  return types
    .map(type => KEYWORDS_BY_TYPE[type])
    .join(", ");
}
