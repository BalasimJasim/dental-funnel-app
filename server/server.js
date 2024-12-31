import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { initializeTwilioClient, testSMSConfig } from './utils/smsService.js';

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

    // Basic middleware
    app.use(express.json());

    // CORS middleware
    app.use((req, res, next) => {
      // Allow specific origins
      const allowedOrigins = [
        "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
        "http://localhost:5174",
      ];
      const origin = req.headers.origin;

      if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
      }

      // Request headers you wish to allow
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

      // Request methods you wish to allow
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );

      // Set to true if you need the website to include cookies in the requests
      res.header("Access-Control-Allow-Credentials", "true");

      // Handle preflight
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Max-Age", "86400");
        res.sendStatus(200);
        return;
      }

      next();
    });

    // Routes
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

    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on("unhandledRejection", (err, promise) => {
      console.log(`Error: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer(); 