import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
    headers: req.headers,
  });

  // During development/debugging, allow all origins
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false");

  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return res.status(204).end();
  }

  next();
};
