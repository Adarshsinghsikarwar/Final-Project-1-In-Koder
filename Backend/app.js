import express from "express";
import cors from "cors";

// ─── Route Imports ────────────────────────────────────────────────────────────
import authRoutes from "./routes/auth.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import reportRoutes from "./routes/report.routes.js";
import roomRoutes from "./routes/room.routes.js";

const app = express();

// ─── Global Middlewares ───────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// ─── Health Check ─────────────────────────────────────────────────────────────
// GET /api/health → lets the frontend verify the server is alive
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "InterviewAI server is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes); // /api/auth/register, /login, /me
app.use("/api/interviews", interviewRoutes); // /api/interviews
app.use("/api/reports", reportRoutes); // /api/reports
app.use("/api/rooms", roomRoutes); // /api/rooms

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// Catches all errors thrown by asyncHandler in controllers
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Show stack trace only in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

export default app;
