const allowedOrigins = [
  "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
  "http://localhost:5173",
  // Add any other allowed origins here
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
