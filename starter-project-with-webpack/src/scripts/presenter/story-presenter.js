class StoryPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    
    this._token = localStorage.getItem('token');
  }
  
  async getAllStories() {
    this._view.showLoading();
    
    try {
      const { stories, error, message } = await this._model.getStories(this._token);
      
      if (error) {
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
}

export default StoryPresenter;