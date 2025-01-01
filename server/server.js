import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import corsOptions, { allowedOrigins } from "./config/corsOptions.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load env vars
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const app = express();

    // Enable CORS for all requests
    app.use(cors(corsOptions));

    // Basic middleware
    app.use(express.json());

    // Debug logging
    app.use((req, res, next) => {
      console.log({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        origin: req.headers.origin,
        headers: req.headers,
      });
      next();
    });

    // Routes
    app.get("/", (req, res) => {
      res.json({ status: "ok", message: "API is running" });
    });

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
      console.log("Allowed origins:", allowedOrigins);
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