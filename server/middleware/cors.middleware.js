import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Log incoming request details
  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
  });

  // Set CORS headers for all responses
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours

  // Handle preflight
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return res.status(204).end();
  }

  next();
};
