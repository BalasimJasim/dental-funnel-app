import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
    headers: req.headers,
  });

  // Always set CORS headers
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Origin, Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader("Access-Control-Max-Age", "3600");

  // Handle preflight
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request for origin:", origin);
    return res.status(204).end();
  }

  next();
};
