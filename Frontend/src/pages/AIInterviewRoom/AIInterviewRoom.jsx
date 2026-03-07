import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import ChatPanel from "../../components/Chat/ChatPanel";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import Timer from "../../components/Timer/Timer";

const QUESTIONS = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    done: true,
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    done: true,
  },
  {
    id: 3,
    title: "LRU Cache",
    difficulty: "Medium",
    category: "Design",
    done: false,
    active: true,
  },
  {
    id: 4,
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    category: "Linked List",
    done: false,
  },
  {
    id: 5,
    title: "System Design: URL Shortener",
    difficulty: "Hard",
    category: "System Design",
    done: false,
  },
];

const diffColor = {
  Easy: "badge-green",
  Medium: "badge-amber",
  Hard: "badge-purple",
};

export default function AIInterviewRoom() {
  const [activeQ, setActiveQ] = useState(3);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-bg-base)",
      }}
    >
      <Sidebar />
      <div
        style={{
          marginLeft: 240,
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        {/* 3-column layout */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "260px 1fr 280px",
            gap: "1rem",
            padding: "1rem",
            minHeight: 0,
          }}
        >
          {/* Left: question list */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.875rem",
                marginBottom: "0.25rem",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              QUESTIONS
            </div>
            {QUESTIONS.map(
              ({ id, title, difficulty, category, done, active }) => (
                <div
                  key={id}
                  onClick={() => setActiveQ(id)}
                  className="card"
                  style={{
                    padding: "0.875rem",
                    cursor: "pointer",
                    borderColor:
                      activeQ === id
                        ? "#7c3aed"
                        : done
                          ? "rgba(16,185,129,0.2)"
                          : "rgba(255,255,255,0.06)",
                    background:
                      activeQ === id
                        ? "rgba(124,58,237,0.1)"
                        : "rgba(13,13,30,0.6)",
                    transform: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                      {id}. {title}
                    </span>
                    {done && (
                      <span style={{ color: "#10b981", fontSize: "0.85rem" }}>
                        ✓
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.35rem" }}>
                    <span className={diffColor[difficulty]}>{difficulty}</span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "rgba(255,255,255,0.35)",
                        alignSelf: "center",
                      }}
                    >
                      {category}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Center: AI avatar + code editor */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* AI avatar card */}
            <div
              className="card"
              style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                  boxShadow: "0 0 20px rgba(124,58,237,0.4)",
                }}
              >
                🤖
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
                  AI Interviewer
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  "Design an LRU Cache with O(1) get and put operations. What
                  data structures would you use?"
                </div>
              </div>
              <div
                className="pulse-dot"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#10b981",
                  flexShrink: 0,
                }}
              />
            </div>

            <CodeEditor />

            {/* Run buttons */}
            <div style={{ display: "flex", gap: "0.625rem" }}>
              <button
                className="btn-primary"
                style={{ padding: "0.65rem 1.5rem", fontSize: "0.875rem" }}
              >
                ▶ Run
              </button>
              <button
                className="btn-ghost"
                style={{ padding: "0.65rem 1.5rem", fontSize: "0.875rem" }}
              >
                Submit
              </button>
              <div style={{ marginLeft: "auto" }}>
                <Timer initialSeconds={20 * 60} />
              </div>
            </div>
          </div>

          {/* Right: chat + score */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div style={{ flex: 1, minHeight: 0 }}>
              <ChatPanel title="AI Chat" />
            </div>
            <ScoreCard overallScore={82} />
          </div>
        </div>
      </div>
    </div>
  );
}
