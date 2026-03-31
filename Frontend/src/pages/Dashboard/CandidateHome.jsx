import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const CANDIDATE_STATS = [
  { label: "Upcoming Interviews", value: "2", icon: "🗓️", color: "#7c3aed" },
  { label: "AI Mock Sessions", value: "15", icon: "🤖", color: "#06b6d4" },
  { label: "Ready Reports", value: "4", icon: "📊", color: "#10b981" },
];

export default function CandidateHome() {
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
            gap: "2.5rem",
          }}
        >
          {/* Welcome Section */}
          <div className="animate-fade-in">
            <h1 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Welcome back, <span className="gradient-text">Candidate</span>!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem" }}>
              Ready for your next career jump? Let's get started.
            </p>
          </div>

          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {CANDIDATE_STATS.map(({ label, value, icon, color }) => (
              <div key={label} className="card" style={{ padding: "1.75rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.4)" }}>
                    {label}
                  </span>
                  <span style={{ fontSize: "1.5rem" }}>{icon}</span>
                </div>
                <div style={{ fontSize: "2.5rem", fontWeight: 800, color }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Core Call to Action */}
          <div 
            className="glass" 
            style={{ 
              padding: "2.5rem", 
              borderRadius: "1.5rem", 
              textAlign: "center",
              border: "1px solid rgba(124, 58, 237, 0.2)",
              background: "linear-gradient(135deg, rgba(124, 58, 237, 0.05), rgba(6, 182, 212, 0.05))"
            }}
          >
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>
              Start your Interview Journey
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2rem", maxWidth: "500px", marginInline: "auto" }}>
              Practice with our AI or schedule a real-time session with expert interviewers to improve your skills.
            </p>
            <button 
              className="btn-primary" 
              style={{ padding: "0.85rem 2.5rem", fontSize: "1rem" }}
              onClick={() => navigate("/interview/setup")}
            >
              Set up Interview →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
