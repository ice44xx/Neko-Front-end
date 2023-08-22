import api from './api';

export type WatchType = {
  userId: number;
  EpisodeId: number;
  name: string;
  videoUrl?: string;
  thumbnailUrl: string;
  ordem: number;
};

const watchService = {
  getClickedItems: async (): Promise<WatchType[]> => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const response = await api.get('/watchclick', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data as WatchType[];
    } catch (error: any) {
      throw new Error(error.response.data.error);
    }
  },
  getClick: async (episodeId: number, ordem: number, name: string, videoUrl: string, thumbnailUrl: string) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token');
      const res = await api.post(
        '/watchtime',
        { episodeId, ordem, name, videoUrl, thumbnailUrl },
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
  }
};

export default watchService;
