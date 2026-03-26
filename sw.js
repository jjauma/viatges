const CACHE = 'viatges-v2';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  // Pass through — no caching, always fresh
  if (e.request.url.includes('script.google.com')) return;
  e.respondWith(fetch(e.request));
});
