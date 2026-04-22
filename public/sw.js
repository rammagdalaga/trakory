const CACHE_NAME = 'trakory-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/logo/favicon.ico',
  '/logo/logo.svg',
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS).catch(() => {
        // Fail silently if some files can't be cached
        return;
      });
    })
  );
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - cache-first strategy for static assets, network-first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first for assets
  if (
    request.url.includes('.js') ||
    request.url.includes('.css') ||
    request.url.includes('.svg') ||
    request.url.includes('.png') ||
    request.url.includes('.jpg') ||
    request.url.includes('.jpeg') ||
    request.url.includes('.webp') ||
    request.url.includes('/logo/')
  ) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request)
            .then((res) => {
              if (!res.ok) return res;
              const cache = caches.open(CACHE_NAME);
              cache.then((c) => c.put(request, res.clone()));
              return res;
            })
            .catch(() => {
              // Return a fallback if offline
              return caches.match(request);
            })
        );
      })
    );
    return;
  }

  // Network-first for HTML
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (!response.ok) return response;
        const cache = caches.open(CACHE_NAME);
        cache.then((c) => c.put(request, response.clone()));
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
