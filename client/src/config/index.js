const config = {
  // Base URLs
  mainWebsiteUrl:
    import.meta.env.VITE_MAIN_WEBSITE_URL || "https://herbiedental.com",

  // Navigation
  routes: {
    home: "/",
    mainWebsite: {
      home: "/home",
      services: "/services",
      contacts: "/contacts",
      about: "/about",
    },
  },

  // Branding
  clinic: {
    name: "Herbie Dental",
    phone: "+38 (012) 345-67-89",
    email: "info@herbiedental.com",
    address: "вул. Стоматологічна 123, Київ",
  },

  // Integration settings
  integration: {
    enableMainNav: false, // Will be true when integrated
    showMainHeader: false, // Will be true when integrated
    showMainFooter: false, // Will be true when integrated
  },
};

export default config;
