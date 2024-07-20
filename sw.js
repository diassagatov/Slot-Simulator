const CACHE_NAME = 'slot-simulator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/project.js',
  '/manifest.json',
  '/sound/deposit.wav',
  '/sound/reel-click.wav',
  // Add other assets you want to cache
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});