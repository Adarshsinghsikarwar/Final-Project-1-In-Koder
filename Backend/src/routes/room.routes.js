import express from "express";
import {
  createRoom,
  getRoomByCode,
  leaveRoom,
} from "../controllers/room.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

// All room routes require authentication
router.use(authMiddleware);

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST   /api/rooms             → Create room (interviewers & admins only)
router.post("/", authorizeRoles("interviewer", "admin"), createRoom);

// GET    /api/rooms/:code       → Validate & get room info before joining
router.get("/:code", getRoomByCode);

// DELETE /api/rooms/:code/leave → Leave a room
router.delete("/:code/leave", leaveRoom);

export default router;
