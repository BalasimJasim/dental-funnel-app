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

    // CORS configuration
    const corsOptions = {
      origin: function (origin, callback) {
        const allowedOrigins = [
          "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
          "http://localhost:5174",
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
          return callback(null, true);
        }

        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          console.log("Blocked origin:", origin);
          callback(new Error("Not allowed by CORS"));
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

    // Enable pre-flight requests for all routes
    app.options("*", cors(corsOptions));

    // Apply CORS to all routes
    app.use(cors(corsOptions));

    // Add CORS debugging middleware
    app.use((req, res, next) => {
      console.log("Request Headers:", req.headers);
      console.log("Origin:", req.headers.origin);
      console.log("Method:", req.method);
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