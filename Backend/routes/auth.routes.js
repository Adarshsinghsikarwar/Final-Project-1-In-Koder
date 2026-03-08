import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// ─── Validation Rules ────────────────────────────────────────────────────────
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /api/auth/register
router.post("/register", registerValidation, register);

// POST /api/auth/login
router.post("/login", loginValidation, login);

// POST /api/auth/logout   [Protected]
router.post("/logout", authMiddleware, logout);

// GET  /api/auth/me       [Protected]
router.get("/me", authMiddleware, getMe);

export default router;
