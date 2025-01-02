import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log("API Base URL:", API_BASE_URL); // Debug log

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
  async create(appointmentData) {
    try {
      // Increase timeout to 15 seconds
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: "Невідома помилка сервера",
        }));
        throw new Error(errorData.message || "Помилка при створенні запису");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      if (error.name === 'AbortError') {
        throw new Error("Сервер тимчасово перевантажений. Будь ласка, спробуйте за хвилину.");
      }
      if (error.message === "Failed to fetch") {
        throw new Error(
          "Не вдалося з'єднатися з сервером. Перевірте підключення до інтернету."
        );
      }
      throw error;
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