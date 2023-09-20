import api from './api';

const dashboardService = {
  deleteUser: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.delete(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.status;
      }
    } catch (error) {
      return error;
    }
  },
  getByIdUsers: async (id: number) => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.get(`/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data;
      }
    } catch (error) {
      return error;
    }
  },
  getUsers: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data;
      }
    } catch (error: any) {
      return error;
    }
  },
  getCategories: async () => {
    try {
      const res = await api.get('/categories');
      return res.data;
    } catch (error: any) {
      return error;
    }
  },
  getClassifications: async () => {
    try {
      const res = await api.get('/gender');
      return res.data;
    } catch (error: any) {
      return error;
    }
  },
  getEpisodes: async () => {
    try {
      const token = sessionStorage.getItem('nekoanimes-token-admin');
      if (token) {
        const res = await api.get('/episodes/all', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return res.data;
      }
    } catch (error: any) {
      return error;
    }
  }
};
export default dashboardService;
