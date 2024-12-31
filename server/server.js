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

    // Apply CORS with specific configuration
    app.use(
      cors({
        origin: [
          "http://localhost:5174",
          "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
          "https://dental-funnel-app.vercel.app",
          // Add any other domains that need access
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
          "Origin",
          "X-Requested-With",
          "Content-Type",
          "Accept",
          "Authorization",
        ],
        credentials: true,
        optionsSuccessStatus: 200,
        preflightContinue: false,
      })
    );

    // Basic middleware
    app.use(express.json());

    // Test route to verify CORS
    app.get("/api/test-cors", (req, res) => {
      res.json({
        message: "CORS is working!",
        origin: req.headers.origin,
        headers: req.headers,
      });
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
      console.log("CORS enabled for:", [
        "http://localhost:5174",
        "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
        "https://dental-funnel-app.vercel.app",
      ]);
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