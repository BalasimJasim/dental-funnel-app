import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const appointmentService = {
  getAvailableSlots: async (date) => {
    try {
      const response = await api.get(`/appointments/available-slots/${date}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching slots:', error);
      throw error;
    }
  },

  bookAppointment: async (appointmentData) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || 'Server error');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up request');
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