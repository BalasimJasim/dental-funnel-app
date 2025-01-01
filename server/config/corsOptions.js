const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
      "https://dental-funnel-app.vercel.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(null, true); // Temporarily allow all origins for debugging
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
};

export default corsOptions;
