const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://funnel-web-app.vercel.app"]
      : ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

export default corsOptions;
