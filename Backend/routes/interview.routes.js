import express from "express";
import { body } from "express-validator";
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

// ─── Validation for creating a session ──────────────────────────────────────
const createSessionValidation = [
  body("jobRole").trim().notEmpty().withMessage("Job role is required"),
  body("difficulty")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage("Difficulty must be beginner, intermediate, or advanced"),
  body("techStack")
    .optional()
    .isArray()
    .withMessage("Tech stack must be an array"),
  body("type")
    .optional()
    .isIn(["ai", "live"])
    .withMessage("Type must be ai or live"),
];

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST   /api/interviews         → Create a session (InterviewSetup page)
router.post("/", createSessionValidation, createSession);

// GET    /api/interviews         → List all sessions for user (Dashboard)
router.get("/", getAllSessions);

// GET    /api/interviews/:id     → Get one session (AIInterviewRoom / LiveInterviewRoom)
router.get("/:id", getSessionById);

// PATCH  /api/interviews/:id     → Update session — submit answers, change status
router.patch("/:id", updateSession);

// DELETE /api/interviews/:id     → Delete session (admin or owner)
router.delete("/:id", deleteSession);

export default router;
