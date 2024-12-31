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

    // Configure CORS
    app.use(
      cors({
        origin: [
          "http://localhost:5174",
          "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app",
          "https://dental-funnel-app.vercel.app",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );

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

    // Add this after your routes
    app.get("/api/test", (req, res) => {
      res.json({ message: "API is working!", cors: "enabled" });
    });

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