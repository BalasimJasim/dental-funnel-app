export const allowedOrigins = [
  "http://localhost:5173",
  "https://dental-funnel-9ey33hxcq-balasim-jasim-s-projects.vercel.app",
  "https://dental-funnel-app.vercel.app",
];

export const corsOptions = {
  origin: allowedOrigins,
  credentials: false,
  optionsSuccessStatus: 200,
};
