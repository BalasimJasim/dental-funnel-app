import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

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
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
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