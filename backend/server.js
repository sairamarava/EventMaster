// backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import eventRoutes from "./routes/EventRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// CORS configuration for deployment
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Handle React routing - serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT || 5000}`)
);
