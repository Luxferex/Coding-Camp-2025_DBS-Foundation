// Nama cache untuk aplikasi
const CACHE_NAME = 'dicoding-story-v1';

// Daftar aset yang akan di-cache (Application Shell)
const assetsToCache = [
  '/',
  '/index.html',
  '/app.bundle.js',
  '/favicon.png',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

// Event install - caching aset statis
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  // Tunggu hingga cache selesai
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching App Shell...');
      return cache.addAll(assetsToCache);
    })
  );
});

// Event activate - membersihkan cache lama
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            console.log(`Service Worker: Deleting old cache ${cacheName}`);
            return caches.delete(cacheName);
          })
      );
    })
  );

  return self.clients.claim();
});

// Event fetch - strategi Cache First, kemudian Network
self.addEventListener('fetch', (event) => {
  // Skip permintaan yang tidak menggunakan http(s)
  if (!event.request.url.startsWith('http')) return;

  // Skip permintaan API
  if (event.request.url.includes('/v1/')) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response dari cache
      if (response) {
        return response;
      }

      // Buat clone dari request
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Periksa apakah response valid
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Buat clone dari response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Event fetch - strategi Cache First, kemudian Network
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return;

  // Jangan cache permintaan API
  if (event.request.url.includes('/v1/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/offline.html');
        }

        return new Response(
          JSON.stringify({
            error: true,
            message: 'Tidak dapat terhubung ke server. Anda sedang offline.',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('/offline.html');
          }
        });
    })
  );
});

// Event push untuk notifikasi
self.addEventListener('push', function (event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }
  const title = data.title || 'Dicoding Story';
  const options = {
    body: data.body || 'Ada cerita baru di Dicoding Story!',
    icon: 'favicon.png',
    badge: 'favicon.png',
    data: data.url || '/',
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Event notificationclick
self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));
});
