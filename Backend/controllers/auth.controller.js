import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import User from "../models/User.js";

// ─── Helper: sign a JWT for a user ──────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

// ─── Helper: send validation error if any ───────────────────────────────────
const handleValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
export const register = asyncHandler(async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { name, email, password, role } = req.body;

  // Check if email is already taken
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  // Create the user (password hashing happens in the model pre-save hook)
  const user = await User.create({ name, email, password, role });

  const token = generateToken(user._id);

  res.status(201).json({
    message: "Account created successfully",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/login
// @desc    Login with email & password
// @access  Public
// ─────────────────────────────────────────────────────────────────────────────
export const login = asyncHandler(async (req, res) => {
  if (handleValidationErrors(req, res)) return;

  const { email, password } = req.body;

  // Explicitly include password (it's select: false in the schema)
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isActive) {
    res.status(403);
    throw new Error("Your account has been deactivated");
  }

  const token = generateToken(user._id);

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   POST /api/auth/logout
// @desc    Logout (client deletes the token; server-side is stateless)
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
export const logout = asyncHandler(async (req, res) => {
  // For a stateless JWT setup, the client just discards the token.
  // If Redis blacklisting is needed, add the token to Redis with TTL here.
  res.status(200).json({ message: "Logged out successfully" });
});

// ─────────────────────────────────────────────────────────────────────────────
// @route   GET /api/auth/me
// @desc    Get the currently logged-in user's profile
// @access  Private
// ─────────────────────────────────────────────────────────────────────────────
export const getMe = asyncHandler(async (req, res) => {
  // req.user is set by authMiddleware
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar,
      createdAt: req.user.createdAt,
    },
  });
});
