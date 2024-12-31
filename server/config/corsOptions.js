const allowedOrigins = [
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "http://localhost:5174",
  undefined, // Allow requests with no origin
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
  optionsSuccessStatus: 204,
  preflightContinue: false,
};

export default corsOptions;
