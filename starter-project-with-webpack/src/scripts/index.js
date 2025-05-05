// CSS imports
import '../styles/styles.css';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  
  // Cek apakah pengguna sudah login (token tersimpan di localStorage)
  const token = localStorage.getItem('token');
  
  // Jika belum login dan URL bukan ke halaman login atau register, redirect ke login
  if (!token && window.location.hash !== '#/login' && window.location.hash !== '#/register') {
    window.location.hash = '#/login';
  }
  
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    // Cek lagi saat URL berubah
    const currentToken = localStorage.getItem('token');
    const isAuthPage = window.location.hash === '#/login' || window.location.hash === '#/register';
    
    // Jika mencoba mengakses halaman selain login/register tanpa token, redirect ke login
    if (!currentToken && !isAuthPage && window.location.hash !== '') {
      window.location.hash = '#/login';
      return;
    }
    
    await app.renderPage();
  });
});
