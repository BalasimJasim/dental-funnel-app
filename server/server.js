import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import corsOptions from "./config/corsOptions.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initializeTwilioClient, testSMSConfig } from "./utils/smsService.js";

// Load env vars
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Initialize and test Twilio
    await initializeTwilioClient();
    await testSMSConfig();

    const app = express();

    // Handle preflight requests
    app.options("*", cors(corsOptions));

    // Apply CORS with specific configuration
    app.use(cors(corsOptions));

    // Basic middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Request logging
    app.use((req, res, next) => {
      console.log({
        timestamp: new Date().toISOString(),
        url: req.url,
        method: req.method,
        origin: req.headers.origin,
        path: req.path,
        headers: {
          "access-control-request-method":
            req.headers["access-control-request-method"],
          "access-control-request-headers":
            req.headers["access-control-request-headers"],
          origin: req.headers.origin,
        },
      });
      next();
    });

    // Health check
    app.get("/", (req, res) => {
      res.json({ status: "ok", message: "API is running" });
    });

    // API routes
    app.use(
      "/api/appointments",
      (await import("./routes/appointments.js")).default
    );
    app.use("/api/services", (await import("./routes/services.js")).default);
    app.use(
      "/api/service-guidance",
      (await import("./routes/guidance.js")).default
    );

    // Error Handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Environment:", process.env.NODE_ENV);
      console.log("CORS enabled for origins:", corsOptions.origin);
    });

    // Handle unhandled promise rejections
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