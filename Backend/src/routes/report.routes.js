import express from "express";
import {
  generateReport,
  getMyReports,
  getReportById,
} from "../controllers/report.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// All report routes require authentication
router.use(authMiddleware);

// ─── Routes ──────────────────────────────────────────────────────────────────

// POST /api/reports/generate/:sessionId  → Trigger AI report generation
router.post("/generate/:sessionId", generateReport);

// GET  /api/reports                      → Paginated list (Reports page)
router.get("/", getMyReports);

// GET  /api/reports/:id                  → Full report detail
router.get("/:id", getReportById);

export default router;
