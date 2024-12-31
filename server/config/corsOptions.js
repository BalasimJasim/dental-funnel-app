const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
      "http://localhost:5174",
    ];

    // For development/testing - allow requests with no origin
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],
  optionsSuccessStatus: 200,
};

export default corsOptions;
