import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const INTERVIEW_TYPES = [
  {
    id: "ai",
    label: "AI Interview",
    icon: "🤖",
    desc: "Fully automated AI-driven session",
    route: "/interview/ai-room",
  },
  {
    id: "live",
    label: "Live Interview",
    icon: "🎥",
    desc: "Real-time video with human interviewer",
    route: "/interview/live-room",
  },
];

const TECH_STACK = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "SQL",
  "System Design",
  "DSA",
  "TypeScript",
  "AWS",
  "Docker",
];

export default function InterviewSetup() {
  const navigate = useNavigate();
  const [type, setType] = useState("ai");
  const [chips, setChips] = useState([]);
  const [candidate, setCandidate] = useState({
    name: "",
    email: "",
    role: "",
    level: "Mid",
  });

  const toggleChip = (c) =>
    setChips((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    );

  const selectedType = INTERVIEW_TYPES.find((t) => t.id === type);

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
        <main
          style={{ flex: 1, padding: "2rem", maxWidth: 800, width: "100%" }}
        >
          <div className="animate-fade-in">
            <h2
              style={{
                fontWeight: 800,
                fontSize: "1.5rem",
                marginBottom: "0.3rem",
              }}
            >
              Interview Setup
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "0.875rem",
                marginBottom: "2rem",
              }}
            >
              Configure your interview session
            </p>

            {/* Step 1: Type */}
            <div
              className="card"
              style={{ padding: "1.5rem", marginBottom: "1.25rem" }}
            >
              <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                1. Interview Type
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.75rem",
                }}
              >
                {INTERVIEW_TYPES.map(({ id, label, icon, desc }) => (
                  <div
                    key={id}
                    onClick={() => setType(id)}
                    style={{
                      padding: "1.25rem",
                      borderRadius: "0.75rem",
                      border: `1px solid ${type === id ? "#7c3aed" : "rgba(255,255,255,0.08)"}`,
                      background:
                        type === id
                          ? "rgba(124,58,237,0.12)"
                          : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                      {icon}
                    </div>
                    <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
                      {label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 2: Candidate */}
            <div
              className="card"
              style={{ padding: "1.5rem", marginBottom: "1.25rem" }}
            >
              <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                2. Candidate Details
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0.875rem",
                }}
              >
                {[
                  {
                    label: "Full Name",
                    key: "name",
                    placeholder: "Alice Johnson",
                  },
                  {
                    label: "Email",
                    key: "email",
                    placeholder: "alice@example.com",
                  },
                  {
                    label: "Role Applied For",
                    key: "role",
                    placeholder: "Frontend Developer",
                  },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label
                      style={{
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.45)",
                        display: "block",
                        marginBottom: "0.35rem",
                      }}
                    >
                      {label}
                    </label>
                    <input
                      className="input-field"
                      placeholder={placeholder}
                      value={candidate[key]}
                      onChange={(e) =>
                        setCandidate((p) => ({ ...p, [key]: e.target.value }))
                      }
                    />
                  </div>
                ))}
                <div>
                  <label
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.45)",
                      display: "block",
                      marginBottom: "0.35rem",
                    }}
                  >
                    Experience Level
                  </label>
                  <select
                    className="input-field"
                    value={candidate.level}
                    onChange={(e) =>
                      setCandidate((p) => ({ ...p, level: e.target.value }))
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {["Junior", "Mid", "Senior", "Lead"].map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 3: Tech stack */}
            <div
              className="card"
              style={{ padding: "1.5rem", marginBottom: "2rem" }}
            >
              <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                3. Tech Stack / Topics
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {TECH_STACK.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggleChip(c)}
                    style={{
                      padding: "0.35rem 0.9rem",
                      borderRadius: 999,
                      border: `1px solid ${chips.includes(c) ? "#7c3aed" : "rgba(255,255,255,0.12)"}`,
                      background: chips.includes(c)
                        ? "rgba(124,58,237,0.2)"
                        : "transparent",
                      color: chips.includes(c)
                        ? "#fff"
                        : "rgba(255,255,255,0.5)",
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch */}
            <button
              className="btn-primary"
              style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}
              onClick={() => navigate(selectedType.route)}
            >
              Launch {selectedType.label} →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
