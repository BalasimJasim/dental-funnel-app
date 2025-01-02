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
