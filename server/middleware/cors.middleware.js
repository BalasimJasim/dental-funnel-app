import { allowedOrigins } from "../config/corsOptions.js";

export const corsMiddleware = (req, res, next) => {
  // Get the actual origin from Cloudflare headers if present
  const origin =
    req.headers.origin ||
    req.headers["cf-connecting-ip"] ||
    req.headers["x-forwarded-for"]?.split(",")[0];

  console.log("CORS Middleware:", {
    origin,
    method: req.method,
    path: req.path,
    cloudflare: {
      ip: req.headers["cf-connecting-ip"],
      country: req.headers["cf-ipcountry"],
      visitor: req.headers["cf-visitor"],
    },
  });

  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://dental-funnel-krl9mmx1x-balasim-jasim-s-projects.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept, X-Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "false");
  res.setHeader("Access-Control-Max-Age", "3600");

  // Handle preflight
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return res.status(204).end();
  }

  next();
};
