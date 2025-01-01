export const allowedOrigins = [
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-app.vercel.app",
  "http://localhost:5173",
  "http://localhost:5174",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
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
