import mongoose from "mongoose";
import crypto from "crypto";

/**
 * Room Model
 * Represents a live interview room.
 * Frontend page that uses this: LiveInterviewRoom
 * Socket events use the roomCode to identify and broadcast to participants.
 */
const roomSchema = new mongoose.Schema(
  {
    // Unique 6-character uppercase code used by participants to join
    // e.g. "AB12XZ"
    roomCode: {
      type: String,
      unique: true,
      uppercase: true,
      default: () => crypto.randomBytes(3).toString("hex").toUpperCase(),
    },

    // The interviewer who created the room
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // All users currently in the room (host + candidate/s)
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        joinedAt: { type: Date, default: Date.now },
        socketId: { type: String, default: "" }, // tracked by socket server
      },
    ],

    // Linked interview session
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Optional room settings
    config: {
      maxParticipants: { type: Number, default: 2 },
      allowChat: { type: Boolean, default: true },
      allowVideo: { type: Boolean, default: true },
      allowScreenShare: { type: Boolean, default: false },
    },

    closedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Room = mongoose.model("Room", roomSchema);
export default Room;
