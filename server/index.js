import express from "express";
import cors from 'cors';
import corsOptions from "./config/corsOptions.js";
import appointmentsRouter from "./routes/appointments.js";

const app = express();

// Apply CORS before any routes
app.use(cors(corsOptions));

// Parse JSON bodies
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
