import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// Fallback untuk navigasi yang tidak ditemukan
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/not-found.html');
      })
    );
  }
});

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ request }) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'dicoding-story-pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'dicoding-story-assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'dicoding-story-images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// Cache font dengan Cache First strategy
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'dicoding-story-fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 tahun
      }),
    ],
  })
);

// Khusus untuk API, gunakan NetworkFirst dengan fallback ke offline page
registerRoute(
  ({ url }) => url.pathname.startsWith('/v1/'),
  new NetworkFirst({
    cacheName: 'dicoding-story-api',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
    networkTimeoutSeconds: 3,
  })
);

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
