class StoryPresenter {
  constructor({ view, model, authModel }) {
    this._view = view;
    this._model = model;
    this._authModel = authModel;
  }

  async getAllStories() {
    this._view.showLoading();

    try {
      const token = this._authModel.getToken();
      const { stories, error, message, invalidToken } = await this._model.getStories(token);

      if (error) {
        if (invalidToken) {
          this._authModel.clearAuthData();
          window.location.hash = '#/login';
          return;
        }

        this._view.showError(message);
        return;
      }

      if (stories.length === 0) {
        this._view.showEmpty();
        return;
      }

      this._view.showStories(stories);
    } catch (error) {
      this._view.showError('Terjadi kesalahan saat memuat data');
    } finally {
      this._view.hideLoading();
    }
  }

  async addStory({ description, photo, lat, lon }) {
    try {
      const token = this._authModel.getToken();
      const response = await this._model.addStory({
        token,
        description,
        photo,
        lat,
        lon,
      });

      if (response.invalidToken) {
        this._authModel.clearAuthData();
        window.location.hash = '#/login';
        return;
      }

      if (!response.error) {
        this._view.showSuccess('Cerita berhasil ditambahkan!');
      } else {
        this._view.showError(`Error: ${response.message}`);
      }
    } catch (error) {
      this._view.showError('Terjadi kesalahan saat mengirim cerita');
      console.error(error);
    }
  }

  async deleteStory(id) {
    try {
      const response = await this._model.deleteStory(id);

      if (!response.error) {
        this._view.showSuccess(response.message);
        // Refresh data setelah menghapus
        await this.getAllStories();
      } else {
        this._view.showError(`Error: ${response.message}`);
      }
    } catch (error) {
      this._view.showError('Terjadi kesalahan saat menghapus cerita');
      console.error(error);
    }
  }
}

export default StoryPresenter;
