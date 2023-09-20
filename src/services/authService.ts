import api from './api';

interface Register {
  firstName: string;
  userName: string;
  email: string;
  birthday: string;
  password: string;
  recaptchaToken: string;
}
interface Login {
  email: string;
  password: string;
}
interface Reset {
  email: string;
}

const authService = {
  register: async (attributes: Register) => {
    const res = await api.post('/register', attributes).catch(error => {
      if (error.response.status === 400) {
        return error.response;
      }
      return error;
    });

    return res;
  },
  login: async (attributes: Login) => {
    const res = await api.post('/login', attributes).catch(error => {
      if (error.response.status === 400 || error.response.status === 401) {
        return error.response;
      }
      return error;
    });

    if (res.status === 201 || res.status === 200) {
      sessionStorage.setItem('nekoanimes-token', res.data.token);
    }

    return res;
  },
  reset: async (attributes: Reset) => {
    const res = await api.post('/forget-password', attributes).catch(error => {
      if (error.response.status === 500 || error.response.status === 404) return error.response;
    });

    if (res.status === 500 || res.status === 404) {
      return res.error;
    } else {
      const token = res.data.token;
    }
    return res;
  },
  loginAdmin: async (attributes: Login) => {
    const res = await api.post('/loginAdmin', attributes).catch(error => {
      if (error.response.status === 400 || error.response.status === 401) return error.response;
      return error;
    });

    if (res.status === 201 || res.status === 200) {
      sessionStorage.setItem('nekoanimes-token-admin', res.data.token);
    }
    return res;
  }
};

export default authService;
