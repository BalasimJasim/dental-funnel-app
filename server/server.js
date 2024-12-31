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

    // CORS configuration
    const corsOptions = {
      origin: function (origin, callback) {
        const allowedOrigins = [
          "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
          "http://localhost:5174",
          // Add this for Render's health checks
          undefined,
        ];

        if (allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("Blocked origin:", origin);
          callback(null, true); // Temporarily allow all origins for debugging
        }
      },
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
      ],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    };

    // Move CORS middleware before other middleware
    app.use(cors(corsOptions));
    app.use(express.json());

    // Add CORS debugging middleware
    app.use((req, res, next) => {
      console.log({
        url: req.url,
        method: req.method,
        origin: req.headers.origin,
        host: req.headers.host,
        referer: req.headers.referer,
      });
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
      console.log("CORS enabled for:", corsOptions.origin);
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