import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { config } from "../config/config.js";
import redisClient from "../config/redis.js";

// ─── Helper: sign a JWT for a user ──────────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt_secret, {
    expiresIn: config.jwt_expires_in,
  });
};
/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
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

/**
 * @route   POST /api/auth/login
 * @desc    Login with email & password
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
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

/**
 * @route   POST /api/auth/logout
 * @desc    Logout (client deletes token; server blacklists in Redis if available)
 * @access  Private
 */
export const logout = asyncHandler(async (req, res) => {
  const authHeader = req.headers.authorization;

  // If Redis is connected and we have a token, blacklist it
  if (redisClient.status === "ready" && authHeader?.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        // Calculate remaining TTL (in seconds)
        const ttl = decoded.exp - Math.floor(Date.now() / 1000);

        if (ttl > 0) {
          // Store in Redis with "blacklist:" prefix
          await redisClient.set(`blacklist:${token}`, "true", "EX", ttl);
        }
      }
    } catch (error) {
      console.error("Logout blacklist error:", error.message);
      // We continue even if blacklisting fails — client will still delete local token
    }
  }

  res.status(200).json({ message: "Logged out successfully" });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get the currently logged-in user's profile
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  // req.user is set by authMiddleware (which calls .findById and select("-password"))
  // No need to query the database again, just return the data we have.
  res.status(200).json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar,
      headline: req.user.headline,
      bio: req.user.bio,
      experienceLevel: req.user.experienceLevel,
      techStack: req.user.techStack,
      availability: req.user.availability,
      socialLinks: req.user.socialLinks,
      isProfileComplete: req.user.isProfileComplete,
      isActive: req.user.isActive,
      createdAt: req.user.createdAt,
    },
  });
});
