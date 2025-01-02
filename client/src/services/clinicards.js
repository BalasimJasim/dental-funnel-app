const CLINICARDS_API_URL = import.meta.env.VITE_CLINICARDS_API_URL;

export const clinicardsService = {
  async getAvailableSlots(date) {
    try {
      // This is a placeholder until we have the actual Clinicards API credentials
      const response = await fetch(
        `${CLINICARDS_API_URL}/available-slots?date=${date}`,
        {
          headers: {
            "Content-Type": "application/json",
            // Add authorization headers when available
            // "Authorization": `Bearer ${CLINICARDS_API_KEY}`
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }

      const data = await response.json();
      return data.slots;
    } catch (error) {
      console.error("Error fetching available slots:", error);
      // Return default slots for now
      return getDefaultSlots();
    }
  },
};

// Temporary function to provide default slots until Clinicards integration
const getDefaultSlots = () => {
  const defaultSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
  ];
  return defaultSlots;
};
