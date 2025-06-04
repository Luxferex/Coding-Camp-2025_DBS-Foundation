import StoryModel from '../../data/story-model';
import StoryPresenter from '../../presenter/story-presenter';
import AuthModel from '../../data/auth-model';

export default class HomePage {
  constructor() {
    this._storyModel = new StoryModel();
    this._authModel = new AuthModel();
    this._storyPresenter = new StoryPresenter({
      view: this,
      model: this._storyModel,
      authModel: this._authModel,
    });

    this._stories = [];
    this._map = null;
    this._markers = [];
    this._isOffline = !navigator.onLine;

    // Tambahkan event listener untuk status online/offline
    window.addEventListener('online', () => {
      this._isOffline = false;
      this._updateOfflineStatus();
      this._storyPresenter.getAllStories();
    });

    window.addEventListener('offline', () => {
      this._isOffline = true;
      this._updateOfflineStatus();
    });
  }

  async render() {
    return `
      <section class="container">
        <h1>Cerita Terbaru</h1>
        
        <div id="offline-status" class="offline-status">
          <p>Anda sedang offline. Menampilkan data dari penyimpanan lokal.</p>
        </div>
        
        <div id="loading" class="loading-indicator">
          <p>Memuat data...</p>
        </div>
        
        <div id="error-container" class="error-container"></div>
        
        <div id="stories-container" class="stories-container"></div>
        
        <div id="map" class="map-container"></div>
      </section>
    `;
  }

  async afterRender() {
    this._updateOfflineStatus();
    this._initMap();
    await this._storyPresenter.getAllStories();
  }

  _updateOfflineStatus() {
    const offlineStatus = document.getElementById('offline-status');
    if (offlineStatus) {
      offlineStatus.style.display = this._isOffline ? 'block' : 'none';
    }
  }

  _initMap() {
    try {
      this._map = L.map('map').setView([-2.5489, 118.0149], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this._map);
    } catch (error) {
      console.error('Error initializing map:', error);
      document.getElementById('map').innerHTML = '<p>Peta tidak dapat dimuat saat offline</p>';
    }
  }

  showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error-container').style.display = 'none';
    document.getElementById('stories-container').style.display = 'none';
  }

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = `<p>${message}</p>`;
    errorContainer.style.display = 'block';
    document.getElementById('stories-container').style.display = 'none';
  }

  showEmpty() {
    const storiesContainer = document.getElementById('stories-container');
    storiesContainer.innerHTML = '<p class="empty-message">Tidak ada cerita yang tersedia</p>';
    storiesContainer.style.display = 'block';
  }

  showStories(stories) {
    this._stories = stories;
    const storiesContainer = document.getElementById('stories-container');

    let storiesHTML = '';
    stories.forEach((story) => {
      storiesHTML += this._createStoryItemTemplate(story);

      if (this._map && story.lat && story.lon) {
        try {
          const marker = L.marker([story.lat, story.lon]).addTo(this._map);
          marker.bindPopup(`
            <div class="map-popup">
              <h3>${story.name}</h3>
              <img src="${story.photoUrl}" alt="${story.name}" width="150">
              <p>${story.description.substring(0, 100)}...</p>
              <a href="#/story/${story.id}">Lihat Detail</a>
            </div>
          `);
          this._markers.push(marker);
        } catch (error) {
          console.error('Error adding marker:', error);
        }
      }
    });

    storiesContainer.innerHTML = storiesHTML;
    storiesContainer.style.display = 'block';

    // Tambahkan view-transition-name pada setiap story-item
    document.querySelectorAll('.story-item').forEach((item, index) => {
      item.style.viewTransitionName = `story-item-${index}`;
    });

    // Tambahkan event listener untuk tombol hapus cerita lokal
    document.querySelectorAll('.delete-local-story').forEach((button) => {
      button.addEventListener('click', async (event) => {
        event.preventDefault();
        const storyId = button.dataset.id;
        await this._storyPresenter.deleteStory(storyId);
      });
    });
  }

  _createStoryItemTemplate(story) {
    const fromCache = story.fromCache ? '<span class="cached-badge">Cached</span>' : '';
    const deleteButton = story.fromCache ? `<button class="delete-local-story" data-id="${story.id}">Hapus dari Penyimpanan Lokal</button>` : '';

    return `
      <div class="story-item" data-id="${story.id}">
        <div class="story-image">
          <img src="${story.photoUrl}" alt="${story.name}" style="view-transition-name: img-${story.id}">
          ${fromCache}
        </div>
        <div class="story-content">
          <h2 class="story-name" style="view-transition-name: title-${story.id}">${story.name}</h2>
          <p class="story-date">${new Date(story.createdAt).toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
          <p class="story-description">${story.description.substring(0, 150)}...</p>
          <a href="#/story/${story.id}" class="story-link">Baca Selengkapnya</a>
          ${deleteButton}
        </div>
      </div>
    `;
  }
}
