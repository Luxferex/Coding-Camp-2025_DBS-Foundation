import '../styles/styles.css';
import * as idb from 'idb';
window.idb = idb;

import App from './pages/app';
import { subscribeNotification } from './data/api';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    navigationDrawer: document.getElementById('navigation-drawer'),
    drawerButton: document.getElementById('drawer-button'),
    content: document.getElementById('main-content'),
  });

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const hash = window.location.hash;

    if (!token && hash === '#/add-story') {
      window.location.hash = '#/login';
      return;
    }

    if (token && (hash === '#/login' || hash === '#/register')) {
      window.location.hash = '#/';
      return;
    }

    app.renderPage();
  };

  window.addEventListener('hashchange', checkAuth);
  window.addEventListener('load', checkAuth);
});

// Register service worker
// Tambahkan import ini di bagian atas file
import { Workbox } from 'workbox-window';

// Ganti kode registrasi service worker yang ada dengan ini
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const wb = new Workbox('/sw.js');
      
      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          console.log('Service worker telah diperbarui');
          if (confirm('Aplikasi telah diperbarui. Muat ulang halaman untuk menggunakan versi terbaru?')) {
            window.location.reload();
          }
        } else {
          console.log('Service worker berhasil diinstal');
        }
      });

      wb.addEventListener('activated', (event) => {
        if (event.isUpdate) {
          console.log('Service worker telah diaktifkan setelah pembaruan');
        }
      });

      const registration = await wb.register();
      console.log('Service Worker terdaftar:', registration);

      // Jika PushManager tersedia, lakukan subscribe
      if ('PushManager' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          subscribeUserToPush(registration);
        }
      }
    } catch (error) {
      console.error('Service Worker gagal didaftarkan:', error);
    }
  });
}

// Fungsi subscribeUserToPush tetap sama seperti sebelumnya
async function subscribeUserToPush(registration) {
  const vapidPublicKey = 'BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk';
  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: convertedVapidKey,
    });

    // Dapatkan token dari localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Ekstrak endpoint dan keys dari subscription
      const { endpoint } = subscription;
      const keys = {
        p256dh: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh')))),
        auth: btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth')))),
      };

      // Kirim subscription ke server menggunakan API
      const result = await subscribeNotification({ token, endpoint, keys });
      console.log('Push Subscription berhasil dikirim ke server:', result);
    } else {
      console.log('User belum login, subscription tidak dikirim ke server');
      console.log('Push Subscription:', JSON.stringify(subscription));
    }
  } catch (error) {
    console.error('Gagal subscribe push:', error);
  }
}

// Helper untuk konversi VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
