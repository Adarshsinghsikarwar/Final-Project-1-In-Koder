import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const STATS = [
  {
    label: "Total Interviews",
    value: "128",
    icon: "🎙️",
    color: "#7c3aed",
    delta: "+12 this month",
  },
  {
    label: "Avg. Score",
    value: "78",
    icon: "📊",
    color: "#06b6d4",
    delta: "+3.4 pts",
  },
  {
    label: "Pass Rate",
    value: "64%",
    icon: "✅",
    color: "#10b981",
    delta: "+5% vs last month",
  },
  {
    label: "Pending Reviews",
    value: "7",
    icon: "⏳",
    color: "#f59e0b",
    delta: "Action needed",
  },
];

const INTERVIEWS = [
  {
    name: "Alice Johnson",
    role: "Sr. Frontend Dev",
    type: "AI",
    score: 88,
    status: "Passed",
    date: "Mar 6",
  },
  {
    name: "Bob Smith",
    role: "Backend Engineer",
    type: "Live",
    score: 72,
    status: "Review",
    date: "Mar 5",
  },
  {
    name: "Carol Lee",
    role: "Data Scientist",
    type: "AI",
    score: 91,
    status: "Passed",
    date: "Mar 5",
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    type: "Live",
    score: 55,
    status: "Failed",
    date: "Mar 4",
  },
  {
    name: "Eva Chen",
    role: "Product Manager",
    type: "AI",
    score: 83,
    status: "Passed",
    date: "Mar 3",
  },
];

const statusStyle = {
  Passed: "badge-green",
  Failed: "badge-purple",
  Review: "badge-amber",
};

import { ROLES, mockUser } from "../../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();

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
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Stats */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: "1rem",
            }}
          >
            {STATS.map(({ label, value, icon, color, delta }) => (
              <div key={label} className="card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: "1.5rem" }}>{icon}</div>
                </div>
                <div style={{ fontSize: "2.25rem", fontWeight: 800, color }}>
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.3)",
                    marginTop: "0.25rem",
                  }}
                >
                  {delta}
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            {mockUser.role === ROLES.CANDIDATE && (
              <>
                <button
                  className="btn-primary"
                  style={{ padding: "0.7rem 1.5rem", fontSize: "0.875rem" }}
                  onClick={() => navigate("/interview/setup")}
                >
                  + New Interview
                </button>
                <button
                  className="btn-cyan"
                  style={{ padding: "0.7rem 1.5rem", fontSize: "0.875rem" }}
                  onClick={() => navigate("/interview/ai-room")}
                >
                  🤖 AI Room
                </button>
              </>
            )}
            <button
              className="btn-ghost"
              style={{ padding: "0.7rem 1.5rem", fontSize: "0.875rem" }}
              onClick={() => navigate("/reports")}
            >
              📊 View Reports
            </button>
          </div>

          {/* Interviews table */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              Recent Interviews
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {["Candidate", "Role", "Type", "Score", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "0.875rem 1.5rem",
                          textAlign: "left",
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.35)",
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {INTERVIEWS.map(
                  ({ name, role, type, score, status, date }, i) => (
                    <tr
                      key={i}
                      style={{
                        borderTop: "1px solid rgba(255,255,255,0.04)",
                        cursor: "pointer",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "rgba(255,255,255,0.02)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        {name}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {role}
                      </td>
                      <td style={{ padding: "0.875rem 1.5rem" }}>
                        <span
                          className={
                            type === "AI" ? "badge-cyan" : "badge-purple"
                          }
                        >
                          {type}
                        </span>
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color:
                            score >= 80
                              ? "#10b981"
                              : score >= 65
                                ? "#f59e0b"
                                : "#ef4444",
                        }}
                      >
                        {score}
                      </td>
                      <td style={{ padding: "0.875rem 1.5rem" }}>
                        <span className={statusStyle[status]}>{status}</span>
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.5rem",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {date}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
