const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://dental-funnel-9ey33hxcq-balasim-jasim-s-projects.vercel.app",
    "https://dental-funnel-app.vercel.app",
  ],
  credentials: false,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
