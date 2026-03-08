import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import InterviewSession from "../models/InterviewSession.js";
import { generateQuestions } from "../services/ai.service.js";

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/interviews
// @desc    Create a new interview session
//          Frontend: InterviewSetup page — user picks role, tech, difficulty
// @access  Private (candidate)
// ─────────────────────────────────────────────────────────────────────────────
export const createSession = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { jobRole, techStack, difficulty, type, duration } = req.body;

  // Generate AI questions for the chosen stack + difficulty
  const questions = await generateQuestions(jobRole, techStack, difficulty);

  // Map raw question strings into Q&A sub-documents
  const questionsAndAnswers = questions.map((q) => ({ question: q }));

  const session = await InterviewSession.create({
    candidate: req.user._id,
    jobRole,
    techStack,
    difficulty,
    type: type || "ai",
    duration: duration || 30,
    questionsAndAnswers,
    status: "pending",
  });

  res.status(201).json({
    message: "Interview session created",
    session,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/interviews
// @desc    Get all interview sessions for the logged-in user
//          Frontend: Dashboard page — show history
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
export const getAllSessions = asyncHandler(async (req, res) => {
  // Admins & interviewers can see all; candidates see only their own
  const filter =
    req.user.role === "admin" || req.user.role === "interviewer"
      ? {}
      : { candidate: req.user._id };

  const sessions = await InterviewSession.find(filter)
    .populate("candidate", "name email avatar")
    .populate("interviewer", "name email")
    .sort({ createdAt: -1 }); // newest first

  res.status(200).json({ sessions });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/interviews/:id
// @desc    Get a single interview session by ID
//          Frontend: AIInterviewRoom / LiveInterviewRoom — load session data
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
export const getSessionById = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findById(req.params.id)
    .populate("candidate", "name email avatar")
    .populate("interviewer", "name email")
    .populate("roomId");

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  // Candidates can only see their own session
  if (
    req.user.role === "candidate" &&
    session.candidate._id.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to view this session");
  }

  res.status(200).json({ session });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   PATCH /api/interviews/:id
// @desc    Update a session — e.g. submit an answer, change status
//          Frontend: AIInterviewRoom — submit answers one by one
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
export const updateSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  // Only the candidate or admin may update
  if (
    req.user.role === "candidate" &&
    session.candidate.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to update this session");
  }

  const { status, questionsAndAnswers, startedAt, completedAt } = req.body;

  if (status) session.status = status;
  if (questionsAndAnswers) session.questionsAndAnswers = questionsAndAnswers;
  if (startedAt) session.startedAt = startedAt;
  if (completedAt) session.completedAt = completedAt;

  const updated = await session.save();

  res.status(200).json({
    message: "Session updated",
    session: updated,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   DELETE /api/interviews/:id
// @desc    Delete an interview session
// @access  Private (admin or session owner)
// ─────────────────────────────────────────────────────────────────────────────
export const deleteSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findById(req.params.id);

  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  if (
    req.user.role !== "admin" &&
    session.candidate.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not authorized to delete this session");
  }

  await session.deleteOne();

  res.status(200).json({ message: "Interview session deleted" });
});
