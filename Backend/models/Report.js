import mongoose from "mongoose";

/**
 * Report Model
 * Stores the full post-interview AI analysis for a session.
 * Frontend page that uses this: Reports page
 */

// Category breakdown (e.g. Technical, Communication, Problem-Solving)
const categoryScoreSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    score: { type: Number, required: true }, // 0–10
    comment: { type: String, default: "" },
  },
  { _id: false },
);

const reportSchema = new mongoose.Schema(
  {
    // Linked session
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InterviewSession",
      required: true,
    },

    // Candidate shortcut reference (avoids deep populate in list views)
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Aggregate score
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },

    // Score breakdown by skill category
    categoryScores: {
      type: [categoryScoreSchema],
      default: [],
    },

    // Human-readable summary paragraph
    summary: {
      type: String,
      default: "",
    },

    // Bullet-point strengths
    strengths: {
      type: [String],
      default: [],
    },

    // Bullet-point areas to improve
    improvements: {
      type: [String],
      default: [],
    },

    // Full AI-generated textual feedback block
    aiFeedback: {
      type: String,
      default: "",
    },

    // Whether this report has been viewed by the candidate
    isViewed: {
      type: Boolean,
      default: false,
    },

    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model("Report", reportSchema);
export default Report;
