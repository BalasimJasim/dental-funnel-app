import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("Using API URL:", API_BASE_URL); // Debug log

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Debug interceptor
api.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      baseURL: config.baseURL,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data,
      });
    } else {
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 