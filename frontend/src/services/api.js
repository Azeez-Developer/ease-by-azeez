import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // comes from .env
  withCredentials: false
});

// Optional: inject token automatically if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
