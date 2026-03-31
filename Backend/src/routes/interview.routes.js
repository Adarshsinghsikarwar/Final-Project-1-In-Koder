import express from "express";
import { createSessionValidation } from "../validators/interview.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
} from "../controllers/interview.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// All interview routes require authentication
router.use(authMiddleware);

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST   /api/interviews         → Create a session (InterviewSetup page)
router.post("/", createSessionValidation, validate, createSession);

// GET    /api/interviews         → List all sessions for user (Dashboard)
router.get("/", getAllSessions);

// GET    /api/interviews/:id     → Get one session (AIInterviewRoom / LiveInterviewRoom)
router.get("/:id", getSessionById);

// PATCH  /api/interviews/:id     → Update session — submit answers, change status
router.patch("/:id", updateSession);

// DELETE /api/interviews/:id     → Delete session (admin or owner)
router.delete("/:id", deleteSession);

export default router;
