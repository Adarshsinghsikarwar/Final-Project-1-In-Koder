import Room from "../models/Room.js";
import InterviewSession from "../models/InterviewSession.js";

/**
 * registerInterviewSocketEvents
 * Handles all real-time events for the live and AI interview rooms.
 *
 * Frontend pages that use these:
 *   - LiveInterviewRoom   → join-room, leave-room, interview controls
 *   - AIInterviewRoom     → start-interview, submit-answer, next-question
 *
 * Event flow for a live interview:
 *   1. interviewer creates room via REST → gets roomCode
 *   2. candidate joins via roomCode (REST validate) → then socket join-room
 *   3. interviewer starts  → start-interview
 *   4. candidate answers   → submit-answer
 *   5. server moves next   → next-question (broadcast)
 *   6. all done            → interview-ended (broadcast)
 */
export const registerInterviewSocketEvents = (io, socket) => {
  // ── join-room ─────────────────────────────────────────────────────────────
  // Emitted by both candidate and interviewer when entering LiveInterviewRoom.
  // Payload: { roomCode, userId, userName, role }
  socket.on("join-room", async ({ roomCode, userId, userName, role }) => {
    try {
      const room = await Room.findOne({ roomCode: roomCode?.toUpperCase() });

      if (!room || !room.isActive) {
        socket.emit("error", { message: "Room not found or is inactive" });
        return;
      }

      // Put this socket in the room's socket.io room
      socket.join(roomCode);
      socket.roomCode = roomCode;

      // Update participant's socketId in DB
      const participant = room.participants.find(
        (p) => p.user.toString() === userId,
      );
      if (participant) {
        participant.socketId = socket.id;
      } else {
        room.participants.push({ user: userId, socketId: socket.id });
      }
      await room.save();

      // Notify others in the room
      socket.to(roomCode).emit("user-joined", {
        userId,
        userName,
        role,
        socketId: socket.id,
      });

      // Send current participants list back to the joining user
      const populatedRoom = await Room.findById(room._id).populate(
        "participants.user",
        "name email avatar",
      );
      socket.emit("room-state", { room: populatedRoom });

      console.log(`👤 ${userName} joined room ${roomCode}`);
    } catch (error) {
      console.error("join-room error:", error.message);
      socket.emit("error", { message: "Failed to join room" });
    }
  });

  // ── leave-room ────────────────────────────────────────────────────────────
  // Emitted when user clicks leave or component unmounts.
  // Payload: { roomCode, userId, userName }
  socket.on("leave-room", async ({ roomCode, userId, userName }) => {
    socket.leave(roomCode);
    socket.to(roomCode).emit("user-left", { userId, userName });
    console.log(`👋 ${userName} left room ${roomCode}`);
  });

  // ── start-interview ───────────────────────────────────────────────────────
  // Emitted by the interviewer / system to kick off the session.
  // Payload: { roomCode, sessionId }
  socket.on("start-interview", async ({ roomCode, sessionId }) => {
    try {
      const session = await InterviewSession.findById(sessionId);
      if (!session) {
        socket.emit("error", { message: "Session not found" });
        return;
      }

      session.status = "active";
      session.startedAt = new Date();
      await session.save();

      const firstQuestion = session.questionsAndAnswers[0];

      // Broadcast to everyone in the room
      io.to(roomCode).emit("interview-started", {
        sessionId: session._id,
        currentQuestionIndex: 0,
        question: firstQuestion?.question || null,
        totalQuestions: session.questionsAndAnswers.length,
      });

      console.log(`🎯 Interview started in room ${roomCode}`);
    } catch (error) {
      console.error("start-interview error:", error.message);
      socket.emit("error", { message: "Failed to start interview" });
    }
  });

  // ── submit-answer ─────────────────────────────────────────────────────────
  // Emitted by the candidate after answering a question.
  // Payload: { roomCode, sessionId, questionIndex, answer }
  socket.on(
    "submit-answer",
    async ({ roomCode, sessionId, questionIndex, answer }) => {
      try {
        const session = await InterviewSession.findById(sessionId);
        if (!session) {
          socket.emit("error", { message: "Session not found" });
          return;
        }

        // Save the answer to the session
        if (session.questionsAndAnswers[questionIndex]) {
          session.questionsAndAnswers[questionIndex].answer = answer;
          session.questionsAndAnswers[questionIndex].answeredAt = new Date();
        }
        await session.save();

        const nextIndex = questionIndex + 1;
        const hasMore = nextIndex < session.questionsAndAnswers.length;

        if (hasMore) {
          // Broadcast next question to the entire room
          io.to(roomCode).emit("next-question", {
            currentQuestionIndex: nextIndex,
            question: session.questionsAndAnswers[nextIndex].question,
            totalQuestions: session.questionsAndAnswers.length,
          });
        } else {
          // All questions answered → end interview
          session.status = "completed";
          session.completedAt = new Date();
          await session.save();

          io.to(roomCode).emit("interview-ended", {
            sessionId: session._id,
            message: "Interview complete. Generating your report...",
          });
        }
      } catch (error) {
        console.error("submit-answer error:", error.message);
        socket.emit("error", { message: "Failed to submit answer" });
      }
    },
  );

  // ── Handle socket disconnect — auto-leave room ────────────────────────────
  socket.on("disconnect", async () => {
    if (socket.roomCode) {
      socket.to(socket.roomCode).emit("user-left", {
        socketId: socket.id,
        userId: socket.userId,
      });
    }
  });
};
