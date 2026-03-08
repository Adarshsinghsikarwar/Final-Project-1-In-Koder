import { registerInterviewSocketEvents } from "./interview.socket.js";

/**
 * initSocket
 * Initialises socket.io on the HTTP server with CORS settings.
 * Registers all namespace / event handlers.
 *
 * @param {import("http").Server} server - The Node.js HTTP server
 * @param {import("socket.io").Server} io  - The socket.io Server instance (passed from server.js)
 */
export const initSocket = (io) => {
  // ── Global middleware: log every connection ──────────────────────────────
  io.use((socket, next) => {
    const userId = socket.handshake.auth?.userId;
    if (userId) {
      socket.userId = userId; // attach user ID for use in event handlers
    }
    next();
  });

  // ── Connection lifecycle ─────────────────────────────────────────────────
  io.on("connection", (socket) => {
    console.log(
      `🔌 Socket connected: ${socket.id} (user: ${socket.userId || "anonymous"})`,
    );

    // Register interview room events
    registerInterviewSocketEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
};
