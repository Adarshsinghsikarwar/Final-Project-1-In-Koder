import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

/**
 * authMiddleware
 * Protects routes by verifying the JWT passed in the Authorization header.
 *
 * Expected header format:
 *   Authorization: Bearer <token>
 *
 * On success:  attaches req.user and calls next()
 * On failure:  returns 401 Unauthorized
 */
const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if token exists in the Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized — no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Fetch user from DB (exclude password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user || !user.isActive) {
      res.status(401);
      throw new Error("Not authorized — user not found or deactivated");
    }

    // 4. Attach user to request for downstream use
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized — invalid or expired token");
  }
});

export default authMiddleware;
