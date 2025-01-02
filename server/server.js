import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsOptions } from "./config/corsOptions.js";
import { corsMiddleware } from "./middleware/cors.middleware.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import appointmentsRouter from "./routes/appointments.js";
import servicesRouter from "./routes/services.js";
import guidanceRouter from "./routes/guidance.js";

// Load env vars
dotenv.config();

// Verify environment variables
const requiredEnvVars = ['MONGO_URI', 'NODE_ENV'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
  process.exit(1);
}

const startServer = async () => {
  try {
    console.log('Environment variables loaded:', {
      NODE_ENV: process.env.NODE_ENV,
      MONGO_URI: process.env.MONGO_URI ? '[DEFINED]' : '[MISSING]'
    });

    // Connect to MongoDB first
    await connectDB();

    const app = express();

    // Debug logging middleware - before CORS
    app.use((req, res, next) => {
      console.log("Incoming Request:", {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        origin: req.headers.origin,
        headers: req.headers,
      });
      next();
    });

    // Use only one CORS handler
    app.use(corsMiddleware);
    app.use(cors(corsOptions));

    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.get("/", (req, res) => {
      res.json({ status: "ok", message: "API is running" });
    });

    app.use("/api/appointments", appointmentsRouter);
    app.use("/api/services", servicesRouter);
    app.use("/api/service-guidance", guidanceRouter);

    // Error Handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Environment:", process.env.NODE_ENV);
      console.log("Allowed origins:", corsOptions.origin);
    });

    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
