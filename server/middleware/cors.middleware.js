import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;

  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
    headers: {
      origin: req.headers.origin,
      referer: req.headers.referer,
      host: req.headers.host,
    },
  });

  // Set CORS headers
  if (origin) {
    // If there's an origin header, check if it's allowed
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  } else {
    // For requests without origin (like health checks)
    res.setHeader("Access-Control-Allow-Origin", "*");
  }

  // Common CORS headers
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
