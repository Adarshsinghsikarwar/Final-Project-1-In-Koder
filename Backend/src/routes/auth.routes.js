import express from "express";
import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /api/auth/register
router.post("/register", registerValidation, validate, register);

// POST /api/auth/login
router.post("/login", loginValidation, validate, login);

// POST /api/auth/logout   [Protected]
router.post("/logout", authMiddleware, logout);

// GET  /api/auth/me       [Protected]
router.get("/me", authMiddleware, getMe);

export default router;
