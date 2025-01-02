export const clinicardsService = {
  async getAvailableSlots(date) {
    try {
      // For now, return default slots since API isn't ready
      return getDefaultSlots();

      // Uncomment this when API is ready
      /*
      const response = await fetch(
        `${CLINICARDS_API_URL}/available-slots?date=${date}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch available slots");
      }

      const data = await response.json();
      return data.slots;
      */
    } catch (error) {
      console.error("Error fetching available slots:", error);
      return getDefaultSlots();
    }
  },
};

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
