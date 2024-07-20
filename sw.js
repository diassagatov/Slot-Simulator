const CACHE_NAME = 'slot-simulator-cache-v1';
const urlsToCache = [
  '/Slot_simulator/',
  '/Slot_simulator/index.html',
  '/Slot_simulator/style.css',
  '/Slot_simulator/project.js',
  '/Slot_simulator/manifest.json',
  '/Slot_simulator/sound/deposit.wav',
  '/Slot_simulator/sound/reel-click.wav',
  '/Slot_simulator/icons/icon-192x192.png',
  '/Slot_simulator/icons/icon-512x512.png'
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
