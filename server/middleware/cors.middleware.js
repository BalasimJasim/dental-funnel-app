import cors from "cors";
import corsOptions from "../config/corsOptions.js";

export const corsMiddleware = cors(corsOptions);

export const optionsMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).json({});
  }
  next();
};

const corsOptions = {
  origin: [
    "https://funnel-web-bv487x04m-balasim-jasim-s-projects.vercel.app",
    "https://funnel-web-app.vercel.app",
    ...other origins
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
