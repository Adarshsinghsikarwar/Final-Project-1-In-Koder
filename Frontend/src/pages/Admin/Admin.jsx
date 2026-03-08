import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

const USERS = [
  {
    name: "Alice Johnson",
    role: "Candidate",
    email: "alice@co.io",
    status: "Active",
    interviews: 4,
  },
  {
    name: "Bob Smith",
    role: "Interviewer",
    email: "bob@co.io",
    status: "Active",
    interviews: 12,
  },
  {
    name: "Carol Lee",
    role: "Candidate",
    email: "carol@co.io",
    status: "Active",
    interviews: 2,
  },
  {
    name: "David Kim",
    role: "HR Admin",
    email: "david@co.io",
    status: "Suspended",
    interviews: 0,
  },
];

const HEALTH = [
  { label: "API Server", status: "Online", icon: "🟢" },
  { label: "AI Engine", status: "Online", icon: "🟢" },
  { label: "WebRTC", status: "Degraded", icon: "🟡" },
  { label: "Database", status: "Online", icon: "🟢" },
];

const ACTIVITY = [
  { time: "22:45", msg: "New interview session started by Alice Johnson" },
  { time: "22:30", msg: "Report generated for Bob Smith • AI Interview" },
  { time: "22:15", msg: "user@co.io signed in from 192.168.1.1" },
  { time: "21:55", msg: "System backup completed successfully" },
];

export default function Admin() {
  const [aiEnabled, setAiEnabled] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);

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
        {/* <Navbar /> */}
        <main
          style={{
            flex: 1,
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Top row: health + toggles */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {/* System health */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                🖥️ System Health
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                {HEALTH.map(({ label, status, icon }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.6rem 0.875rem",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem" }}>{label}</span>
                    <span style={{ fontSize: "0.8rem" }}>
                      {icon} {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings toggles */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
                ⚙️ Settings
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {[
                  {
                    label: "AI Engine Enabled",
                    desc: "Allow AI-powered interview sessions",
                    val: aiEnabled,
                    set: setAiEnabled,
                  },
                  {
                    label: "Email Notifications",
                    desc: "Send results via email",
                    val: emailNotifs,
                    set: setEmailNotifs,
                  },
                ].map(({ label, desc, val, set }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "rgba(255,255,255,0.35)",
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                    <div
                      onClick={() => set((v) => !v)}
                      style={{
                        width: 44,
                        height: 24,
                        borderRadius: 999,
                        background: val ? "#7c3aed" : "rgba(255,255,255,0.1)",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background 0.2s",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#fff",
                          position: "absolute",
                          top: 3,
                          left: val ? 23 : 3,
                          transition: "left 0.2s",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* User table */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                fontWeight: 700,
              }}
            >
              👥 Users
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {[
                    "Name",
                    "Role",
                    "Email",
                    "Interviews",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "0.875rem 1.25rem",
                        textAlign: "left",
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.35)",
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {USERS.map(({ name, role, email, status, interviews }, i) => (
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
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span className="badge-cyan">{role}</span>
                    </td>
                    <td
                      style={{
                        padding: "0.875rem 1.25rem",
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      {email}
                    </td>
                    <td
                      style={{
                        padding: "0.875rem 1.25rem",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.875rem",
                      }}
                    >
                      {interviews}
                    </td>
                    <td style={{ padding: "0.875rem 1.25rem" }}>
                      <span
                        className={
                          status === "Active" ? "badge-green" : "badge-purple"
                        }
                      >
                        {status}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "0.875rem 1.25rem",
                        display: "flex",
                        gap: "0.4rem",
                      }}
                    >
                      <button
                        className="btn-ghost"
                        style={{
                          padding: "0.3rem 0.7rem",
                          fontSize: "0.72rem",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          padding: "0.3rem 0.7rem",
                          fontSize: "0.72rem",
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.25)",
                          borderRadius: "0.4rem",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        {status === "Active" ? "Suspend" : "Restore"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Activity log */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ fontWeight: 700, marginBottom: "1rem" }}>
              📋 Activity Log
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {ACTIVITY.map(({ time, msg }) => (
                <div
                  key={time}
                  style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "0.6rem 0.875rem",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-mono)",
                      flexShrink: 0,
                    }}
                  >
                    {time}
                  </span>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
