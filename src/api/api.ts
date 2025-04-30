import axios from 'axios';
import Cookies from 'js-cookie';

interface DataResponse<T> {
  items?: Array<T>;
}

interface StatusResponse {
  name: string;
  message: string;
  code: number;
  status: number;
  type?: string;
}

export interface Response<T = any> {
  data?: DataResponse<T>;
  status?: StatusResponse;
}

export const api = axios.create({
  baseURL: 'https://rest-test.machineheads.ru',
  timeout: 5 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const formData = new FormData();
        formData.append('refresh_token', Cookies.get('refresh_token') || '');

        const response = await api.post('/auth/token-refresh', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const newAccessToken = response.data.access_token;

        Cookies.set('access_token', newAccessToken, {
          expires: new Date(response.data.access_expired_at * 1000),
          secure: true,
        });

        api.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
      }
    }

    throw error;
  }
);
