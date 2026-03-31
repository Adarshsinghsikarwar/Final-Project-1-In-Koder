import asyncHandler from "express-async-handler";
import Report from "../models/Report.js";
import InterviewSession from "../models/InterviewSession.js";
import { generateFullReport } from "../services/ai.service.js";
import { buildReportPayload } from "../services/report.service.js";

/**
 * @route   POST /api/reports/generate/:sessionId
 * @desc    Generate an AI report for a completed interview session
 *          Frontend: called automatically when AIInterviewRoom finishes
 * @access  Private
 */

export const generateReport = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findById(
    req.params.sessionId,
  ).populate("candidate", "name email");

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  // Prevent generating a report for an incomplete session
  if (session.status !== "completed") {
    res.status(400);
    throw new Error("Cannot generate report — session is not completed yet");
  }

  // Check if a report already exists for this session
  const existingReport = await Report.findOne({ session: session._id });
  if (existingReport) {
    return res.status(200).json({
      message: "Report already exists",
      report: existingReport,
    });
  }

  // 1. Call AI service to evaluate all answers
  const aiResults = await generateFullReport(session);

  // 2. Structure the AI output into the Report schema shape
  const reportPayload = buildReportPayload(session, aiResults);

  // 3. Save the report to DB
  const report = await Report.create(reportPayload);

  res.status(201).json({
    message: "Report generated successfully",
    report,
  });
});

/**
 * @route   GET /api/reports
 * @desc    Get all reports for the logged-in candidate (paginated)
 *          Frontend: Reports page — show list of past interviews
 * @access  Private
 */

export const getMyReports = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const filter = req.user.role === "admin" ? {} : { candidate: req.user._id };

  const [reports, total] = await Promise.all([
    Report.find(filter)
      .populate("session", "jobRole techStack difficulty type createdAt")
      .sort({ generatedAt: -1 })
      .skip(skip)
      .limit(limit),
    Report.countDocuments(filter),
  ]);

  res.status(200).json({
    reports,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalReports: total,
    },
  });
});

/**
 * @route   GET /api/reports/:id
 * @desc    Get a single full report by ID
 *          Frontend: Reports detail page — show breakdown, scores, feedback
 * @access  Private
 */
export const getReportById = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id)
    .populate("candidate", "name email avatar")
    .populate({
      path: "session",
      populate: { path: "interviewer", select: "name email" },
    });

  if (!report) {
    res.status(404);
    throw new Error("Report not found");
  }

  // Candidates may only view their own reports
  if (
    req.user.role === "candidate" &&
    report.candidate._id.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to view this report");
  }

  // Mark as viewed when the candidate reads it
  if (!report.isViewed && req.user.role === "candidate") {
    report.isViewed = true;
    await report.save();
  }

  res.status(200).json({ report });
});
