const CACHE_NAME = 'myapp-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  // Add more files you want to cache
];

// Install the service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
