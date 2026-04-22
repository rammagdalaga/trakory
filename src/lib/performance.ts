/**
 * Service Worker Registration & Performance Utilities
 * Handles caching, lazy loading, and performance optimization
 */

/**
 * Register service worker for offline support and caching
 */
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('✓ Service Worker registered', registration);
        })
        .catch((error) => {
          console.log('✗ Service Worker registration failed:', error);
        });
    });
  }
}

/**
 * Prefetch resources for better performance
 */
export function prefetchResources() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Prefetch critical resources
      const links = [
        { rel: 'prefetch', href: '/src/routes/__root.tsx' },
        { rel: 'dns-prefetch', href: '//cdn.jsdelivr.net' },
      ];

      links.forEach(({ rel, href }) => {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        document.head.appendChild(link);
      });
    });
  }
}

/**
 * Lazy load images with Intersection Observer
 */
export function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-lazy]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.lazy || '';
          img.removeAttribute('data-lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

/**
 * Monitor Web Vitals for performance tracking
 */
export function monitorWebVitals() {
  if ('PerformanceObserver' in window) {
    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            console.log('CLS:', (entry as any).value);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          console.log('FID:', (entry as any).processingDuration);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Silently fail if observers not supported
    }
  }
}

/**
 * Optimize FFmpeg loading
 */
export function optimizeFFmpegLoading() {
  // FFmpeg is lazy-loaded on demand in Converter component
  // This ensures it doesn't block initial page load
  return;
}

/**
 * Initialize all performance optimizations
 */
export function initializePerformanceOptimizations() {
  registerServiceWorker();
  prefetchResources();
  setupLazyLoading();
  monitorWebVitals();
  optimizeFFmpegLoading();
}
