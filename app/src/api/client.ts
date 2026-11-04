import axios from 'axios';

// Hub dùng chung backend SHMS; API nằm dưới /shms/api/v1, auth/hub là namespace Hub.
const BASE = import.meta.env.BASE_URL.replace(/\/docs\/?$/, '').replace(/\/$/, '');
export const api = axios.create({ baseURL: `${BASE}/api/v1` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('shms_hub_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('shms_hub_token');
      const loginPath = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/login`;
      if (location.pathname !== loginPath) location.href = loginPath;
    }
    return Promise.reject(err);
  },
);

export function apiError(err: unknown): string {
  if (axios.isAxiosError(err)) return err.response?.data?.error?.message || err.message;
  return 'Lỗi không xác định';
}
