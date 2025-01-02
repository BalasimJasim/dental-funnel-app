const corsOptions = {
  origin: [
    "https://funnel-web-app.vercel.app",
    "https://funnel-web-3l0p0td40-balasim-jasim-s-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
