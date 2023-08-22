import api from './api';
import { AnimeType } from './animesService';

export type CategoryType = {
  id: number;
  name: string;
  position: number;
  animes?: AnimeType[];
};

export type AnotherType = {
  id: number;
  name: string;
  position: number;
  animes?: AnimeType[];
};

const categoriesService = {
  getCategories: async () => {
    try {
      const res = await api.get('/categories');
      return res;
    } catch (error: any) {
      return error;
    }
  },
  getAnimes: async (name: string | number) => {
    try {
      const res = await api.get(`categories/${name}`);
      return res;
    } catch (error: any) {
      return error;
    }
  },
  getAnother: async (name: string | number) => {
    try {
      const res = await api.get(`another/${name}`);
      return res;
    } catch (error: any) {
      return error;
    }
  }
};

export default categoriesService;
