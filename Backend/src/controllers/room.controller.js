import asyncHandler from "express-async-handler";
import Room from "../models/Room.js";
import InterviewSession from "../models/InterviewSession.js";

/**
 * @route   POST /api/rooms
 * @desc    Create a new live interview room
 *          Frontend: LiveInterviewRoom — interviewer creates a room before sharing
 * @access  Private (interviewer, admin)
 */
export const createRoom = asyncHandler(async (req, res) => {
  const { sessionId, config } = req.body;

  // Optionally link to an existing session
  if (sessionId) {
    const session = await InterviewSession.findById(sessionId);
    if (!session) {
      res.status(404);
      throw new Error("Interview session not found");
    }
  }

  const room = await Room.create({
    host: req.user._id,
    session: sessionId || null,
    config: config || {},
    participants: [
      {
        user: req.user._id,
        joinedAt: new Date(),
      },
    ],
  });

  await room.populate("host", "name email avatar");

  res.status(201).json({
    message: "Room created successfully",
    room: {
      id: room._id,
      roomCode: room.roomCode, // Share this code with the candidate
      host: room.host,
      config: room.config,
      isActive: room.isActive,
      createdAt: room.createdAt,
    },
  });
});

/**
 * @route   GET /api/rooms/:code
 * @desc    Get room details by room code — validates before joining
 *          Frontend: LiveInterviewRoom — candidate enters room code to join
 * @access  Private
 */
export const getRoomByCode = asyncHandler(async (req, res) => {
  const room = await Room.findOne({
    roomCode: req.params.code.toUpperCase(),
  })
    .populate("host", "name email avatar")
    .populate("session", "jobRole techStack difficulty")
    .populate("participants.user", "name email avatar");

  if (!room) {
    res.status(404);
    throw new Error("Room not found — check the room code");
  }

  if (!room.isActive) {
    res.status(400);
    throw new Error("This room is no longer active");
  }

  if (room.participants.length >= room.config.maxParticipants) {
    res.status(400);
    throw new Error("Room is full");
  }

  res.status(200).json({ room });
});

/**
 * @route   DELETE /api/rooms/:code/leave
 * @desc    Remove the current user from a room's participants list
 *          Frontend: LiveInterviewRoom — called on page unmount / leave button
 * @access  Private
 */
export const leaveRoom = asyncHandler(async (req, res) => {
  const room = await Room.findOne({
    roomCode: req.params.code.toUpperCase(),
  });

  if (!room) {
    res.status(404);
    throw new Error("Room not found");
  }

  // Remove the logged-in user from participants
  room.participants = room.participants.filter(
    (p) => p.user.toString() !== req.user._id.toString(),
  );

  // If the host is leaving, close the room
  if (room.host.toString() === req.user._id.toString()) {
    room.isActive = false;
    room.closedAt = new Date();
  }

  await room.save();

  res.status(200).json({ message: "Left the room" });
});
