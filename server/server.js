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

    // CORS middleware should be first
    app.use(cors(corsOptions));

    // Body parser
    app.use(express.json());

    // Simple logging
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.url} from ${req.headers.origin}`);
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
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer(); 