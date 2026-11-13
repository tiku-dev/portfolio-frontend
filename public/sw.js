// tiku dev Portfolio Service Worker
const CACHE_NAME = 'tiku-dev-cache-v3';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/pwa-icon.svg',
  '/pwa-icon-192.png',
  '/pwa-icon-512.png',
  '/pwa-icon-maskable-192.png',
  '/pwa-icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/favicon-32.png',
  '/favicon-64.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let API requests bypass the static cache and go to network/proxy
  if (event.request.url.includes('/api/')) {
    return;
  }

  // Network-first for navigation requests so updates show immediately
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => caches.match('/') || caches.match('/index.html'))
    );
    return;
  }

  // Stale-while-revalidate or cache-first for other assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

