import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("Using API URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

// Debug interceptor
api.interceptors.request.use(
  (config) => {
    // Add origin header for debugging
    config.headers["X-Origin"] = window.location.origin;

    // Log full request details
    console.log("Making request:", {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Response Error:", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data
      });
    } else if (error.request) {
      console.error("Request Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 