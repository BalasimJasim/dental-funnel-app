const corsOptions = {
  origin: [
    "https://funnel-web-28ivxyhak-balasim-jasim-s-projects.vercel.app",
    "https://funnel-web-app.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://dental-funnel-app.onrender.com",
    "https://funnel-web-app-git-boost-balasim-jasim-s-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
