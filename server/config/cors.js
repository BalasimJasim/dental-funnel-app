const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5174",
      "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
      "https://dental-funnel-app.vercel.app",
    ];

    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

export default corsOptions;
