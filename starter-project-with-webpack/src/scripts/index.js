// CSS imports
import '../styles/styles.css';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    navigationDrawer: document.getElementById('navigation-drawer'),
    drawerButton: document.getElementById('drawer-button'),
    content: document.getElementById('main-content'),
  });

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const hash = window.location.hash;
    
    // Redirect to login if trying to access protected routes without token
    if (!token && (hash === '#/add-story')) {
      window.location.hash = '#/login';
      return;
    }
    
    // Redirect to home if already logged in but trying to access auth pages
    if (token && (hash === '#/login' || hash === '#/register')) {
      window.location.hash = '#/';
      return;
    }
    
    app.renderPage();
  };

  window.addEventListener('hashchange', checkAuth);
  window.addEventListener('load', checkAuth);
});
