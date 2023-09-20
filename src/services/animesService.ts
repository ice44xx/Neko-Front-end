import api from './api';
import { AnotherType, CategoryType } from './categoriesService';
import { CommentsType } from './commentService';
import { GenderType } from './genderService';
import { SeasonType } from './seasonsService';

export type EpisodesType = {
  id: number;
  name: string;
  episodeOrder: number;
  videoUrl: string;
  comments?: CommentsType[];
};

export type AnimeType = {
  id: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  categories?: CategoryType;
  featured?: boolean;
  anothers?: AnotherType;
  gender?: GenderType;
  seasons?: SeasonType[];
  episodes?: EpisodesType[];
};
export type CreateAnimeType = {
  id?: number;
  name: string;
  thumbnailUrl: string;
  synopsis: string;
  categoryId?: number;
  featured?: boolean;
  anotherId?: number;
  genderId?: number;
};

const animeService = {
  getNewestAnimes: async () => {
    try {
      const res = await api.get('/animes/newest');
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  getFeaturedAnimes: async () => {
    try {
      const res = await api.get('/animes/featured');
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  getFavorites: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.get('/favorites', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  favorite: async (animeId: number | string) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post(
        '/favorites',
        { animeId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  like: async (animeId: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post(
        '/likes',
        { animeId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  removeLike: async (animeId: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/likes/${animeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  removeFavorite: async (animeId: number | string) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.delete(`/favorites/${animeId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res;
    } catch (error: any) {
      return error.response;
    }
  },
  findAll: async () => {
    try {
      const res = await api.get('/animes');
      return res;
    } catch (error: any) {
      return error;
    }
  },
  getSearch: async (name: string) => {
    try {
      const res = await api.get(`/animes/search/${name}`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getAnime: async (name: string) => {
    try {
      const res = await api.get(`/animes/details/${name}`);
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getAnimeId: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      const res = await api.get(`/animes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getAnimePopular: async () => {
    try {
      const res = await api.get('/animes/popular');
      return res;
    } catch (error) {
      return error;
    }
  },
  dashboard: async () => {
    try {
      const res = await api.get('/dashboard/animes');
      return res;
    } catch (error: any) {
      return error;
    }
  },
  update: async (id: number, attributes: any) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.put(`/anime/${id}`, attributes, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.status;
      }
    } catch (error: any) {
      return error.response;
    }
  },
  create: async (attributes: CreateAnimeType) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.post('/animes', attributes, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.status;
      }
    } catch (error: any) {
      return error.response;
    }
  },
  delete: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const res = await api.delete(`/animes/${id}`, { headers });
      return res.data;
    } catch (error: any) {
      return error.response;
    }
  }
};

export default animeService;
