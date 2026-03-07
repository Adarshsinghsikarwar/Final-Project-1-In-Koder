import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { scoreColor } from "../../utils";

const REPORTS = [
  {
    name: "Alice Johnson",
    role: "Sr. Frontend Dev",
    type: "AI",
    score: 88,
    date: "Mar 6",
    status: "Passed",
  },
  {
    name: "Bob Smith",
    role: "Backend Engineer",
    type: "Live",
    score: 72,
    date: "Mar 5",
    status: "Review",
  },
  {
    name: "Carol Lee",
    role: "Data Scientist",
    type: "AI",
    score: 91,
    date: "Mar 5",
    status: "Passed",
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    type: "Live",
    score: 55,
    date: "Mar 4",
    status: "Failed",
  },
  {
    name: "Eva Chen",
    role: "Product Manager",
    type: "AI",
    score: 83,
    date: "Mar 3",
    status: "Passed",
  },
  {
    name: "Frank Roy",
    role: "QA Engineer",
    type: "Live",
    score: 69,
    date: "Mar 2",
    status: "Review",
  },
];

const STAT_CARDS = [
  { label: "Avg Score", value: "76.3", icon: "📈" },
  { label: "Pass Rate", value: "66%", icon: "✅" },
  { label: "AI Sessions", value: "3", icon: "🤖" },
  { label: "Live Sessions", value: "3", icon: "🎥" },
];

const statusStyle = {
  Passed: "badge-green",
  Failed: "badge-purple",
  Review: "badge-amber",
};

export default function Reports() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? REPORTS
      : REPORTS.filter((r) => r.type === filter || r.status === filter);

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
          {/* Stat cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
              gap: "1rem",
            }}
          >
            {STAT_CARDS.map(({ label, value, icon }) => (
              <div key={label} className="card" style={{ padding: "1.25rem" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {icon}
                </div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800 }}>
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["All", "AI", "Live", "Passed", "Failed", "Review"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: 999,
                  border: `1px solid ${filter === f ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                  background:
                    filter === f ? "rgba(124,58,237,0.18)" : "transparent",
                  color: filter === f ? "#fff" : "rgba(255,255,255,0.45)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {[
                    "Candidate",
                    "Role",
                    "Type",
                    "Score",
                    "Status",
                    "Date",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.35)",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(
                  ({ name, role, type, score, date, status }, i) => (
                    <tr
                      key={i}
                      style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          fontWeight: 600,
                          fontSize: "0.875rem",
                        }}
                      >
                        {name}
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {role}
                      </td>
                      <td style={{ padding: "0.875rem 1.25rem" }}>
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
                          padding: "0.875rem 1.25rem",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          color: scoreColor(score),
                        }}
                      >
                        {score}
                      </td>
                      <td style={{ padding: "0.875rem 1.25rem" }}>
                        <span className={statusStyle[status]}>{status}</span>
                      </td>
                      <td
                        style={{
                          padding: "0.875rem 1.25rem",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {date}
                      </td>
                      <td style={{ padding: "0.875rem 1.25rem" }}>
                        <button
                          className="btn-ghost"
                          style={{
                            padding: "0.3rem 0.8rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          View →
                        </button>
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
