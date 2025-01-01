import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  // Log incoming request details
  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
    headers: req.headers,
  });

  // Always set CORS headers for preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");

    // Set required CORS headers
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Accept, X-Origin"
    );
    res.setHeader("Access-Control-Max-Age", "86400"); // 24 hours
    res.setHeader("Access-Control-Allow-Credentials", "false");

    return res.status(204).end();
  }

  // For non-OPTIONS requests, set CORS headers based on origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // For requests without origin or non-allowed origins
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false");

  next();
};
