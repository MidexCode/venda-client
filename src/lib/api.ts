import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

let getTokenFn: (() => Promise<string | null>) | null = null;

export const setTokenFn = (fn: () => Promise<string | null>) => {
  getTokenFn = fn;
};

api.interceptors.request.use(async (config) => {
  try {
    if (getTokenFn) {
      const token = await getTokenFn();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // no token
  }
  return config;
});

export default api;
