/**
 * Report Service
 * Handles the business logic for structuring and formatting reports.
 * Controllers call these functions — no DB queries here.
 */

// ─────────────────────────────────────────────────────────────────────────────
// buildReportPayload
// Converts raw AI results into a shape ready to insert into the Report model.
// ─────────────────────────────────────────────────────────────────────────────
export const buildReportPayload = (session, aiResults) => {
  const { evaluatedAnswers, overallScore, categoryScores } = aiResults;

  // Build strengths from high-scoring answers
  const strengths = evaluatedAnswers
    .filter((qa) => qa.score >= 7)
    .map((qa) => `Strong answer on: "${qa.question.slice(0, 60)}..."`)
    .slice(0, 3); // Max 3 strengths

  // Build improvements from low-scoring answers
  const improvements = evaluatedAnswers
    .filter((qa) => qa.score < 5)
    .map((qa) => `Improve answer for: "${qa.question.slice(0, 60)}..."`)
    .slice(0, 3); // Max 3 improvement points

  // Full AI feedback summary paragraph
  const aiFeedback = buildFeedbackSummary(
    overallScore,
    session.jobRole,
    session.difficulty,
  );

  return {
    session: session._id,
    candidate: session.candidate._id || session.candidate,
    overallScore,
    categoryScores,
    summary: `Interview completed for ${session.jobRole} role at ${session.difficulty} level. Overall score: ${overallScore}/10.`,
    strengths:
      strengths.length > 0 ? strengths : ["Completed the interview session"],
    improvements:
      improvements.length > 0
        ? improvements
        : ["Continue practicing to achieve higher scores"],
    aiFeedback,
  };
};

// ─────────────────────────────────────────────────────────────────────────────
// getFormattedReport
// Returns a clean, frontend-ready version of a populated report document.
// ─────────────────────────────────────────────────────────────────────────────
export const getFormattedReport = (report) => {
  return {
    id: report._id,
    candidate: report.candidate,
    session: report.session,
    overallScore: report.overallScore,
    categoryScores: report.categoryScores,
    summary: report.summary,
    strengths: report.strengths,
    improvements: report.improvements,
    aiFeedback: report.aiFeedback,
    isViewed: report.isViewed,
    generatedAt: report.generatedAt,
  };
};

// ─── Private helper ──────────────────────────────────────────────────────────
const buildFeedbackSummary = (score, jobRole, difficulty) => {
  if (score >= 8) {
    return `Excellent performance for the ${jobRole} role at ${difficulty} level. You demonstrated strong technical knowledge and clear communication. You are well-prepared for this position.`;
  } else if (score >= 6) {
    return `Good performance for the ${jobRole} role. You showed solid understanding of most topics. With some additional practice in the lower-scoring areas, you will be a strong candidate.`;
  } else if (score >= 4) {
    return `Average performance for the ${jobRole} role at ${difficulty} level. Review the areas where your answers scored lower and practice with more detailed explanations.`;
  } else {
    return `The interview revealed areas that need significant improvement for the ${jobRole} role. Focus on deepening your technical knowledge and practice answering questions more thoroughly.`;
  }
};
