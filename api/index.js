import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import eventRoutes from "../backend/routes/EventRoutes.js";
import authRoutes from "../backend/routes/AuthRoutes.js";

dotenv.config({ path: "../backend/.env" });

const app = express();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB only once
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      isConnected = true;
      console.log("Connected to MongoDB");
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

// API routes
app.use("/api/events", async (req, res, next) => {
  await connectDB();
  next();
}, eventRoutes);

app.use("/api/auth", async (req, res, next) => {
  await connectDB();
  next();
}, authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" });
});

// Export handler for Vercel
export default async (req, res) => {
  await connectDB();
  return app(req, res);
};