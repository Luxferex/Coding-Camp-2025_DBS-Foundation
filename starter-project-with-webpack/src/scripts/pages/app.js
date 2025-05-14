import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (!this.#navigationDrawer.contains(event.target) && !this.#drawerButton.contains(event.target)) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Gunakan View Transition API
      document.startViewTransition(async () => {
        const content = await page.render();

        if (typeof content === 'string') {
          this.#content.innerHTML = content;
        } else if (content instanceof Element) {
          this.#content.innerHTML = '';
          this.#content.appendChild(content);
        }

        await page.afterRender();
      });
    } else {
      const content = await page.render();

      if (typeof content === 'string') {
        this.#content.innerHTML = content;
      } else if (content instanceof Element) {
        this.#content.innerHTML = '';
        this.#content.appendChild(content);
      }

      await page.afterRender();
    }
  }
}

export default App;
