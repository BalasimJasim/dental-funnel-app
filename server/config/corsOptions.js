export const allowedOrigins = [
  "https://dental-funnel-nvoc4saot-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-app.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Checking origin:", origin);

    // Allow requests with no origin (like health checks)
    if (!origin) {
      callback(null, true);
      return;
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked origin:", origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: false,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Accept",
    "X-Origin",
    "Origin",
  ],
  optionsSuccessStatus: 204,
};

export default corsOptions;
