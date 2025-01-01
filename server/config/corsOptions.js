export const allowedOrigins = [
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-app.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Origin"],
  optionsSuccessStatus: 204,
};

export default corsOptions;
