import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.js";
import appointmentsRouter from "./routes/appointments.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/appointments", appointmentsRouter);

const PORT = process.env.PORT || 3000;

// Add basic health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
