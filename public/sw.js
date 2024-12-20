const CACHE_NAME = 'isro-sac-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/src/main.tsx',
  '/src/data/doctor.json',
  '/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png'
];

let currentDoctorVersion = null;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('doctor.json')) {
    event.respondWith(
      fetch(event.request)
        .then(async response => {
          const clone = response.clone();
          const data = await clone.json();
          
          // Check if version has changed
          if (currentDoctorVersion === null) {
            currentDoctorVersion = data.version;
          } else if (currentDoctorVersion !== data.version) {
            // Version changed, only update doctor.json in cache
            currentDoctorVersion = data.version;
            
            // Get the cache and only remove doctor.json
            const cache = await caches.open(CACHE_NAME);
            await cache.delete(event.request.url);
          }
          
          // Update cache with new doctor.json response
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
          
          return response;
        })
        .catch(() => {
          // If fetch fails, try to return from cache
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});