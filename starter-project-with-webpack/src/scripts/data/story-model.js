import { getAllStories, addNewStory, getStoryDetail } from './api';
import IdbService from './idb-service';

class StoryModel {
  constructor() {
    this._stories = [];
  }

  async getStories(token, page = 1, size = 10, location = 1) {
    try {
      const response = await getAllStories({ token, page, size, location });

      if (!response.error) {
        this._stories = response.listStory || [];

        await IdbService.saveStories(this._stories);

        return {
          stories: this._stories,
          error: false,
        };
      }

      if (response.message && (response.message.includes('token') || response.message.includes('jwt'))) {
        return {
          stories: [],
          error: true,
          message: response.message,
          invalidToken: true,
        };
      }

      const storiesFromIdb = await IdbService.getStories();

      if (storiesFromIdb.length > 0) {
        return {
          stories: storiesFromIdb,
          error: false,
          fromCache: true,
        };
      }

      return {
        stories: [],
        error: true,
        message: response.message,
      };
    } catch (error) {
      try {
        const storiesFromIdb = await IdbService.getStories();

        if (storiesFromIdb.length > 0) {
          return {
            stories: storiesFromIdb,
            error: false,
            fromCache: true,
          };
        }
      } catch (idbError) {
        console.error('Error accessing IndexedDB:', idbError);
      }

      return {
        stories: [],
        error: true,
        message: 'Terjadi kesalahan saat mengambil data cerita',
      };
    }
  }

  async getStoryDetail(token, id) {
    try {
      const response = await getStoryDetail({ token, id });

      if (!response.error && response.story) {
        await IdbService.saveStory(response.story);
      }

      if (response.error && response.message && (response.message.includes('token') || response.message.includes('jwt'))) {
        return {
          error: true,
          message: response.message,
          invalidToken: true,
        };
      }

      return response;
    } catch (error) {
      try {
        const storyFromIdb = await IdbService.getStoryById(id);

        if (storyFromIdb) {
          return {
            error: false,
            story: storyFromIdb,
            fromCache: true,
          };
        }
      } catch (idbError) {
        console.error('Error accessing IndexedDB:', idbError);
      }

      return {
        error: true,
        message: 'Terjadi kesalahan saat mengambil detail cerita',
      };
    }
  }

  async addStory({ token, description, photo, lat, lon }) {
    try {
      const response = await addNewStory({ token, description, photo, lat, lon });

      if (!response.error && response.story) {
        await IdbService.saveStory(response.story);
      }

      if (response.error && response.message && (response.message.includes('token') || response.message.includes('jwt'))) {
        return {
          error: true,
          message: response.message,
          invalidToken: true,
        };
      }

      return response;
    } catch (error) {
      return {
        error: true,
        message: 'Terjadi kesalahan saat menambahkan cerita',
      };
    }
  }

  async deleteStory(id) {
    try {
      await IdbService.deleteStory(id);
      return {
        error: false,
        message: 'Cerita berhasil dihapus dari penyimpanan lokal',
      };
    } catch (error) {
      return {
        error: true,
        message: 'Terjadi kesalahan saat menghapus cerita',
      };
    }
  }
}

export default StoryModel;
