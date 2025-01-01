const allowedOrigins = [
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-app.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
  // Add any other origins you need
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 200,
};

export default corsOptions;
