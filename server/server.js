import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import corsOptions from "./config/corsOptions.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Load env vars
dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const app = express();

    // Logging middleware
    app.use((req, res, next) => {
      console.log({
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.url,
        origin: req.headers.origin,
        headers: {
          "access-control-request-method":
            req.headers["access-control-request-method"],
          "access-control-request-headers":
            req.headers["access-control-request-headers"],
          origin: req.headers.origin,
        },
      });

      // Log response headers after they're set
      const oldEnd = res.end;
      res.end = function (...args) {
        console.log("Response headers:", res.getHeaders());
        oldEnd.apply(res, args);
      };

      next();
    });

    // Handle OPTIONS preflight
    app.options("*", (req, res, next) => {
      console.log("Handling OPTIONS request");
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Accept"
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.status(204).end();
    });

    // Apply CORS middleware
    app.use(cors(corsOptions));

    // Parse JSON bodies
    app.use(express.json());

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

    // Error handling
    app.use((err, req, res, next) => {
      console.error("Error:", err);
      if (err.message.includes("not allowed by CORS")) {
        res.status(403).json({
          error: "CORS Error",
          message: err.message,
          origin: req.headers.origin,
        });
      } else {
        next(err);
      }
    });

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