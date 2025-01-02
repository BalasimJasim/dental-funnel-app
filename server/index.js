import express from "express";
import {
  corsMiddleware,
  optionsMiddleware,
} from "./middleware/cors.middleware.js";
import appointmentsRouter from "./routes/appointments.js";

const app = express();

// Apply CORS middleware
app.use(corsMiddleware);
app.use(optionsMiddleware);

app.use(express.json());

// Routes
app.use("/api/appointments", appointmentsRouter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
