import routes from '../routes/routes';

class App {
  constructor({ navigationDrawer, drawerButton, content }) {
    this._navigationDrawer = navigationDrawer;
    this._drawerButton = drawerButton;
    this._content = content;
    this._initialAppShell();
  }

  _initialAppShell() {
    // Implementasi drawer menu
    this._drawerButton.addEventListener('click', (event) => {
      this._navigationDrawer.classList.toggle('open');
      event.stopPropagation();
    });

    // Tutup drawer saat klik di luar drawer
    document.addEventListener('click', (event) => {
      if (!this._navigationDrawer.contains(event.target) && !this._drawerButton.contains(event.target)) {
        this._navigationDrawer.classList.remove('open');
      }
    });
  }

  async renderPage() {
    try {
      const url = this._parseActiveUrlWithCombiner();
      const page = this._getPage(url);
      this._content.innerHTML = await page.render();
      await page.afterRender();

      // Scroll ke atas saat halaman baru dimuat
      window.scrollTo(0, 0);

      // Tutup drawer setelah navigasi
      this._navigationDrawer.classList.remove('open');
    } catch (error) {
      console.error('Error rendering page:', error);
      // Redirect ke halaman not found jika terjadi error
      window.location.hash = '#/not-found';
    }
  }

  _parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  }

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  }

  _getPage(url) {
    // Untuk rute dengan parameter ID seperti /story/:id
    if (url.resource === 'story' && url.id) {
      return routes['/story/:id']();
    }

    // Untuk rute standar
    const parsedUrl = `/${url.resource || ''}`;
    const page = routes[parsedUrl];

    if (page) {
      return page();
    }

    // Jika rute tidak ditemukan, tampilkan halaman not found
    return routes['/not-found']();
  }
}

export default App;
