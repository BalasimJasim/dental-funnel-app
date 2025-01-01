const corsOptions = {
  origin: true, // Allow all origins temporarily for debugging
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  exposedHeaders: ["Content-Length", "Content-Type"],
  maxAge: 86400, // 24 hours
  optionsSuccessStatus: 200,
};

export default corsOptions;
