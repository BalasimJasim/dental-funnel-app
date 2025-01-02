import mongoose from 'mongoose';
import dotenv from "dotenv";

// Ensure environment variables are loaded
dotenv.config();

export const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MongoDB URI is not defined in environment variables");
    }

    console.log("Attempting to connect to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Handle MongoDB connection errors
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1);
  }
}; 