import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("Response:", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Response Error:", error);
    return Promise.reject(error);
  }
);

export const appointmentService = {
  getAvailableSlots: async (date) => {
    try {
      const response = await api.get(`/appointments/available-slots/${date}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching slots:", error);
      throw error;
    }
  },

  async bookAppointment(appointmentData) {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      if (error.response) {
        throw new Error(error.response.data.message || "Server error");
      } else if (error.request) {
        throw new Error("Network error - no response received");
      } else {
        throw new Error("Error setting up request");
      }
    }
  }
};

export const serviceService = {
  getAllServices: async () => {
    const response = await api.get('/services');
    return response.data;
  },

  getServicesByCategory: async (category) => {
    const response = await api.get(`/services/category/${category}`);
    return response.data;
  }
};

export const guidanceService = {
  getRecommendation: async (answers) => {
    const response = await api.post('/service-guidance', { answers });
    return response.data;
  }
};

export default api; 