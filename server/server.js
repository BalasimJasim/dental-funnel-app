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

    // Enable CORS for all routes
    app.use(cors(corsOptions));

    // Basic middleware
    app.use(express.json());

    // Request logging
    app.use((req, res, next) => {
      // Log the request
      console.log({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        origin: req.headers.origin,
        headers: req.headers,
      });

      // Add CORS headers manually if needed
      res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
      );
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

      if (req.method === "OPTIONS") {
        return res.status(204).send();
      }
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