/**
 * AI Service
 * Central service for all interactions with the AI API.
 * Abstracts prompt engineering and API calls away from controllers.
 *
 * Currently uses a mock implementation so the server works without
 * a real AI API key. Swap the mock functions below with real API
 * calls (e.g. OpenAI, Gemini) when your key is ready.
 */

// ─── Mock questions bank (replace with real AI call) ─────────────────────────
const MOCK_QUESTIONS = {
  beginner: [
    "Tell me about yourself and your background.",
    "What are the core differences between HTML and CSS?",
    "Explain what a REST API is in simple terms.",
    "What is version control and why is it important?",
    "How do you approach debugging a bug you've never seen before?",
  ],
  intermediate: [
    "Explain the difference between synchronous and asynchronous programming.",
    "What is the event loop in JavaScript and how does it work?",
    "How would you optimize the performance of a web application?",
    "Describe the MVC pattern and when you would use it.",
    "What are the SOLID principles and why do they matter?",
  ],
  advanced: [
    "Explain how you would design a scalable microservices architecture.",
    "What are the trade-offs between SQL and NoSQL databases?",
    "How do you prevent SQL injection and XSS attacks in a Node.js app?",
    "Describe your experience with CI/CD pipelines.",
    "How would you handle distributed transactions across services?",
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// generateQuestions
// Returns an array of question strings for a given role + stack + difficulty.
// TODO: Replace mock with a real AI API call.
// ─────────────────────────────────────────────────────────────────────────────
export const generateQuestions = async (
  jobRole,
  techStack = [],
  difficulty = "intermediate",
) => {
  try {
    // ── Real AI call example (OpenAI): ──────────────────────────────────────
    // const prompt = `
    //   Generate 5 technical interview questions for a ${jobRole} role.
    //   Tech stack: ${techStack.join(", ")}.
    //   Difficulty: ${difficulty}.
    //   Return as a JSON array of strings.
    // `;
    // const response = await openai.chat.completions.create({ ... });
    // return JSON.parse(response.choices[0].message.content);

    // ── Mock: return difficulty-based pre-set questions ─────────────────────
    const questions = MOCK_QUESTIONS[difficulty] || MOCK_QUESTIONS.intermediate;
    return questions;
  } catch (error) {
    console.error("AI generateQuestions error:", error.message);
    // Fallback so the app doesn't crash if AI is unavailable
    return MOCK_QUESTIONS.intermediate;
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// evaluateAnswer
// Scores a single answer from 0–10 and returns per-answer AI feedback.
// TODO: Replace mock with a real AI API call.
// ─────────────────────────────────────────────────────────────────────────────
export const evaluateAnswer = async (question, answer) => {
  try {
    // ── Real AI call example: ───────────────────────────────────────────────
    // const prompt = `
    //   Question: ${question}
    //   Candidate's Answer: ${answer}
    //   Score the answer out of 10 and give brief feedback.
    //   Return JSON: { score: number, feedback: string }
    // `;

    // ── Mock evaluation ─────────────────────────────────────────────────────
    if (!answer || answer.trim().length < 10) {
      return { score: 0, feedback: "Answer is too short or missing." };
    }

    const wordCount = answer.trim().split(/\s+/).length;
    const mockScore = Math.min(10, Math.floor(wordCount / 5)); // Simple word-count based mock

    return {
      score: mockScore,
      feedback:
        mockScore >= 7
          ? "Great answer! You covered the key concepts clearly."
          : mockScore >= 4
            ? "Good attempt. Could be more detailed."
            : "The answer needs more depth. Consider covering key concepts.",
    };
  } catch (error) {
    console.error("AI evaluateAnswer error:", error.message);
    return { score: 0, feedback: "Could not evaluate answer." };
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// generateFullReport
// Evaluates all Q&A pairs in a session and returns structured report data.
// ─────────────────────────────────────────────────────────────────────────────
export const generateFullReport = async (session) => {
  const { questionsAndAnswers, jobRole, techStack, difficulty } = session;

  // Evaluate each answer individually
  const evaluatedAnswers = await Promise.all(
    questionsAndAnswers.map(async (qa) => {
      const { score, feedback } = await evaluateAnswer(qa.question, qa.answer);
      return { ...qa.toObject(), score, aiFeedback: feedback };
    }),
  );

  const totalScore = evaluatedAnswers.reduce(
    (sum, qa) => sum + (qa.score || 0),
    0,
  );
  const overallScore = parseFloat(
    (totalScore / (evaluatedAnswers.length || 1)).toFixed(1),
  );

  // Build category scores breakdown
  const categoryScores = [
    { category: "Technical Knowledge", score: overallScore },
    { category: "Communication", score: Math.min(10, overallScore + 0.5) },
    { category: "Problem Solving", score: Math.max(0, overallScore - 0.5) },
  ];

  return {
    evaluatedAnswers,
    overallScore,
    categoryScores,
    jobRole,
    techStack,
    difficulty,
  };
};
