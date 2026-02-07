const CACHE_NAME = 'app-v2'; // version বাড়ালাম যাতে নতুন SW activate হয়
const urlsToCache = [
  '/',
  '/index.html'
];

// INSTALL
self.addEventListener('install', (event) => {
  self.skipWaiting(); // immediately activate
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.map((name) => name !== CACHE_NAME && caches.delete(name)))
    ).then(() => self.clients.claim()) // TAKE CONTROL IMMEDIATELY
  );
});

// FETCH
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
        return res;
      })
      .catch(() => caches.match(event.request).then((res) => res || caches.match('/index.html')))
  );
});
