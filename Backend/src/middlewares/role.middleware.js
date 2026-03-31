/**
 * roleMiddleware
 * Factory that returns a middleware restricting access by user role.
 *
 * Usage in routes:
 *   router.get("/admin", authMiddleware, authorizeRoles("admin"), handler)
 *   router.get("/room",  authMiddleware, authorizeRoles("interviewer", "admin"), handler)
 *
 * Roles available: "candidate" | "interviewer" | "admin"
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // authMiddleware must run first so req.user is available
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied — role '${req.user.role}' is not permitted here`,
      });
    }

    next();
  };
};

export default authorizeRoles;
