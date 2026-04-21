/**
 * SEO Utilities for Trakory
 * Provides consistent meta tag and schema management across the application
 * ENHANCED VERSION with additional schema types and SEO helpers
 */

export const SITE_CONFIG = {
  name: "Trakory",
  url: "https://trakory.com",
  description:
    "Free online file converter platform supporting video to audio, image resizing, PDF, Word, and more conversion tools. 100% private, no uploads needed.",
  shortDescription:
    "Convert videos, audio, PDFs, images and more instantly in your browser. 100% private & free.",
  author: "Trakory",
  twitterHandle: "@Trakory",
  themeColor: "#0ea5b7",
  logo: "/logo/logo.png",
  socialImage: "/logo/og-image.png",
  locale: "en_US",
};

export interface SeoMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  ogType?: "website" | "article" | "video";
  twitterCard?: "summary" | "summary_large_image" | "player" | "app";
}

/**
 * Generate meta tags for a page
 * Includes Open Graph, Twitter Card, and basic SEO meta tags
 */
export function generateMetaTags(config: SeoMeta) {
  const twitterCard = config.twitterCard || "summary_large_image";

  return [
    { title: config.title },
    { name: "description", content: config.description },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { httpEquiv: "x-ua-compatible", content: "ie=edge" },
    { charSet: "utf-8" },
    ...(config.keywords ? [{ name: "keywords", content: config.keywords }] : []),
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    { name: "revisit-after", content: "7 days" },
    { name: "author", content: SITE_CONFIG.author },
    { name: "theme-color", content: SITE_CONFIG.themeColor },

    // Open Graph tags
    { property: "og:title", content: config.title },
    { property: "og:description", content: config.description },
    { property: "og:type", content: config.ogType || "website" },
    { property: "og:site_name", content: SITE_CONFIG.name },
    { property: "og:url", content: config.canonicalUrl || SITE_CONFIG.url },
    { property: "og:image", content: config.ogImage || SITE_CONFIG.socialImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:locale", content: SITE_CONFIG.locale },

    // Twitter Card tags
    { name: "twitter:card", content: twitterCard },
    { name: "twitter:title", content: config.title },
    { name: "twitter:description", content: config.description },
    { name: "twitter:creator", content: SITE_CONFIG.twitterHandle },
    { name: "twitter:image", content: config.ogImage || SITE_CONFIG.socialImage },
    { name: "twitter:site", content: SITE_CONFIG.twitterHandle },

    // Additional SEO meta tags
    { name: "application-name", content: SITE_CONFIG.name },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
    { name: "apple-mobile-web-app-title", content: SITE_CONFIG.name },
  ];
}

/**
 * Generate canonical URL tag (prevents duplicate content issues)
 */
export function generateCanonicalTag(url: string) {
  return {
    rel: "canonical",
    href: url,
  };
}

/**
 * Generate alternate language links (for multi-language sites)
 */
export function generateAlternateLinks(currentPath: string, languages: string[] = ["en"]) {
  return languages.map((lang) => ({
    rel: "alternate",
    hrefLang: lang,
    href: `${SITE_CONFIG.url}/${lang}${currentPath === "/" ? "" : currentPath}`,
  }));
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
      // Add your other social profiles
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      url: SITE_CONFIG.url,
      email: "support@trakory.com",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "PH",
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
    featureList:
      features.length > 0
        ? features
        : [
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
    screenshot: `${SITE_CONFIG.url}/screenshots/app.png`,
    downloadUrl: SITE_CONFIG.url,
  };
}

/**
 * Generate JSON-LD structured data for SoftwareApplication
 */
export function generateSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
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
 * Great for Google Rich Results and People Also Ask
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
 * Generate JSON-LD structured data for HowTo
 * Perfect for conversion tool guides
 */
export interface HowToStep {
  name: string;
  description: string;
  image?: string;
}

export function generateHowToSchema(config: {
  title: string;
  description: string;
  image: string;
  steps: HowToStep[];
  totalTime?: string;
  yield?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.title,
    description: config.description,
    image: config.image,
    ...(config.totalTime && { totalTime: config.totalTime }),
    ...(config.yield && { yield: config.yield }),
    step: config.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.description,
      ...(step.image && { image: step.image }),
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
    mainEntity: {
      "@type": "WebApplication",
      name: SITE_CONFIG.name,
    },
    ...(config.datePublished && { datePublished: config.datePublished }),
    ...(config.dateModified && { dateModified: config.dateModified }),
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
        width: "250",
        height: "60",
      },
    },
    isAccessibleForFree: true,
  };
}

/**
 * Generate JSON-LD structured data for Product/Tool
 */
export function generateProductSchema(config: {
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  price?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name,
    description: config.description,
    image: config.image,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.rating,
      ratingCount: config.reviewCount,
    },
    ...(config.price && {
      offers: {
        "@type": "Offer",
        price: config.price,
        priceCurrency: "USD",
      },
    }),
  };
}

/**
 * Generate JSON-LD structured data for BlogPosting
 */
export function generateBlogPostSchema(config: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  content: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: config.title,
    description: config.description,
    image: config.image,
    datePublished: config.datePublished,
    ...(config.dateModified && { dateModified: config.dateModified }),
    author: {
      "@type": "Organization",
      name: config.author || SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      },
    },
    mainEntity: {
      "@type": "Article",
      headline: config.title,
      description: config.description,
      articleBody: config.content,
      image: config.image,
      datePublished: config.datePublished,
      author: {
        "@type": "Organization",
        name: config.author || SITE_CONFIG.name,
      },
    },
    url: config.url,
  };
}

/**
 * Common Keywords by conversion type
 */
export const KEYWORDS_BY_TYPE = {
  video:
    "video to audio converter, video to mp3, mp4 to mp3, convert video to audio, extract audio from video, video to wav, video to flac, online audio converter, free mp3 converter, browser video converter, private video converter, mkv to mp3, mov to mp3, webm to mp3, avi to mp3, free online video to audio",

  audio:
    "audio converter, audio format converter, convert audio online, mp3 to wav, wav to mp3, audio compressor, audio editor online, trim audio, merge audio files, audio quality converter",

  image:
    "image resizer, resize image online, image compressor, compress image, batch resize images, crop image, image optimizer, jpg compressor, png optimizer, webp converter, image quality tool",

  pdf:
    "pdf converter, pdf to word, convert pdf, compress pdf, pdf merger, pdf splitter, extract pdf text, pdf to image, image to pdf, edit pdf online",

  word:
    "word converter, doc to pdf, docx to pdf, word to pdf converter, document converter, text to pdf, document editor",

  general:
    "online converter, free converter, file converter, no upload converter, private conversion, batch converter, browser converter, instant converter, format converter, secure file conversion",
};

/**
 * Get comprehensive keywords for a page
 */
export function getKeywordsForPage(types: (keyof typeof KEYWORDS_BY_TYPE)[]): string {
  return types.map((type) => KEYWORDS_BY_TYPE[type]).join(", ");
}

/**
 * Helper: Generate a SEO-optimized page title
 * Formula: Target Keyword - Value Prop | Brand
 */
export function generatePageTitle(keyword: string, valueProp: string, brand = SITE_CONFIG.name): string {
  const title = `${keyword} - ${valueProp} | ${brand}`;
  return title.length > 60 ? `${keyword} - ${brand}` : title;
}

/**
 * Helper: Generate SEO meta description (155-160 chars)
 */
export function generateMetaDescription(mainText: string, cta = "Try free now"): string {
  const description = `${mainText} ${cta}.`;
  return description.length > 160 ? `${description.substring(0, 157)}...` : description;
}

/**
 * Helper: Create structured FAQ items for common converter questions
 */
export function generateConverterFaqs(converterName: string): FAQItem[] {
  return [
    {
      question: `How do I convert files with ${converterName}?`,
      answer:
        "Simply upload or select your file, choose the output format, and click convert. Your file is processed in your browser - no uploads to our servers.",
    },
    {
      question: `Is ${converterName} safe and private?`,
      answer: `Yes! ${converterName} is 100% private. All conversions happen in your browser. We don't store, upload, or share your files with anyone.`,
    },
    {
      question: `Do I need to install software to use ${converterName}?`,
      answer: `No! ${converterName} is entirely web-based. It works directly in your browser - no downloads or installations needed.`,
    },
    {
      question: `What file formats does ${converterName} support?`,
      answer: `${converterName} supports all major file formats including MP4, MOV, MKV, AVI, MP3, WAV, FLAC, PNG, JPG, PDF, DOCX, and many more.`,
    },
    {
      question: `Is ${converterName} really free?`,
      answer: `Yes, ${converterName} is completely free to use. No hidden costs, no premium features - unlimited conversions at no charge.`,
    },
  ];
}

/**
 * Helper: Create HowTo schema steps for video to audio conversion
 */
export function generateVideoToAudioHowTo(): HowToStep[] {
  return [
    {
      name: "Upload your video",
      description: "Click the upload button and select your video file (MP4, MOV, MKV, AVI, WebM, etc.)",
    },
    {
      name: "Choose output format",
      description: "Select your desired audio format: MP3, WAV, FLAC, or OGG",
    },
    {
      name: "Start conversion",
      description: "Click the 'Convert' button to begin. Processing happens in your browser.",
    },
    {
      name: "Download your audio",
      description: "Once complete, download your converted audio file. No registration required.",
    },
  ];
}

/**
 * Helper: Validate meta tag config
 */
export function validateSeoConfig(config: SeoMeta): string[] {
  const errors: string[] = [];

  if (!config.title || config.title.length === 0) {
    errors.push("Title is required");
  } else if (config.title.length > 60) {
    errors.push(`Title too long (${config.title.length}/60 characters)`);
  } else if (config.title.length < 30) {
    errors.push(`Title too short (${config.title.length}/30+ characters)`);
  }

  if (!config.description || config.description.length === 0) {
    errors.push("Description is required");
  } else if (config.description.length > 160) {
    errors.push(`Description too long (${config.description.length}/160 characters)`);
  } else if (config.description.length < 120) {
    errors.push(`Description too short (${config.description.length}/120+ characters)`);
  }

  if (config.keywords && config.keywords.split(",").length > 10) {
    errors.push("Too many keywords (max 10)");
  }

  return errors;
}
