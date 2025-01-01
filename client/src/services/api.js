import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;
console.log("Environment:", {
  mode: import.meta.env.MODE,
  apiUrl: API_BASE_URL,
});

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
    console.log("Making request:", {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Create the appointment service
export const appointmentService = {
  bookAppointment: async (appointmentData) => {
    try {
      const response = await api.post("/appointments", appointmentData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, error };
    }
  },

  getAvailableSlots: async (date) => {
    try {
      const response = await api.get(`/appointments/slots?date=${date}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("API Error:", error);
      return { success: false, error };
    }
  },
};

export default api; 