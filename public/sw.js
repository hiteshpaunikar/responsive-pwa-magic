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
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  
  // First check if url exists and includes doctor.json
  if (url && url.includes('doctor.json')) {
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
            
            const cache = await caches.open(CACHE_NAME);
            await cache.delete(event.request.url);
            await cache.put(event.request, response.clone());
          }
          
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request)
            .then(response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  console.log('Service Worker activated');
});

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New notification from ISRO SAC',
      icon: '/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png',
      badge: '/lovable-uploads/14c17238-81e6-4488-b71a-daad286afffa.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
        url: data.url || '/'
      },
      actions: [
        {
          action: 'explore',
          title: 'View Details'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'ISRO SAC Update', options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
