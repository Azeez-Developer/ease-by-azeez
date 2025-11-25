// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // your backend URL
  withCredentials: false
});

// ✅ Always read token from sessionStorage
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
