import http from "http";
import { Server as SocketIOServer } from "socket.io";
import app from "./src/app.js";
import { config } from "./src/config/config.js";
import connectDB from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import { initSocket } from "./src/sockets/socketHandler.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// ─── Create HTTP Server ───────────────────────────────────────────────────────
// We wrap the Express app in a Node http.Server so Socket.io can attach to it.
const server = http.createServer(app);

// ─── Attach Socket.io ─────────────────────────────────────────────────────────
const io = new SocketIOServer(server, {
  cors: {
    origin: config.client_url,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Register all socket event handlers
initSocket(io);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = config.port;

const startServer = async () => {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Connect to Redis (optional — server still starts if Redis is down)
    await redisClient.connect().catch(() => {
      console.warn("⚠️  Redis not connected — continuing without cache");
    });

    // 3. Start the HTTP + Socket.io server
    server.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📡 Socket.io ready`);
      console.log(
        `🌐 CORS enabled for: ${config.client_url}`,
      );
      console.log(`\n📋 API Routes:`);
      console.log(`   POST   /api/auth/register`);
      console.log(`   POST   /api/auth/login`);
      console.log(`   GET    /api/auth/me`);
      console.log(`   POST   /api/interviews`);
      console.log(`   GET    /api/interviews`);
      console.log(`   GET    /api/interviews/:id`);
      console.log(`   PATCH  /api/interviews/:id`);
      console.log(`   POST   /api/reports/generate/:sessionId`);
      console.log(`   GET    /api/reports`);
      console.log(`   GET    /api/reports/:id`);
      console.log(`   POST   /api/rooms`);
      console.log(`   GET    /api/rooms/:code`);
      console.log(`   DELETE /api/rooms/:code/leave\n`);
    });
  } catch (error) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();

export { io }; // Export io if controllers need to emit events directly
