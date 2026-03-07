import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard", icon: "⊞" },
  { label: "Interview Setup", to: "/interview/setup", icon: "📋" },
  { label: "AI Room", to: "/interview/ai-room", icon: "🤖" },
  { label: "Live Room", to: "/interview/live-room", icon: "🎥" },
  { label: "Reports", to: "/reports", icon: "📊" },
  { label: "Admin", to: "/admin", icon: "🛡️" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: 240,
        minHeight: "100vh",
        background: "rgba(10,10,26,0.95)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1.5rem 1.25rem",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 9,
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.95rem",
          }}
        >
          Ai
        </div>
        <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>
          Interview<span className="gradient-text">AI</span>
        </span>
      </div>

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "1rem 0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {navItems.map(({ label, to, icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 0.875rem",
              borderRadius: "0.6rem",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
              background: isActive ? "rgba(124,58,237,0.18)" : "transparent",
              borderLeft: isActive
                ? "3px solid #7c3aed"
                : "3px solid transparent",
              transition: "all 0.15s",
            })}
          >
            <span style={{ fontSize: "1rem" }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User card */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "0.85rem",
          }}
        >
          U
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 600 }}>User</div>
          <div
            style={{
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.35)",
              truncate: "ellipsis",
            }}
          >
            user@company.io
          </div>
        </div>
        <button
          onClick={() => navigate("/signin")}
          style={{
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            cursor: "pointer",
            fontSize: "1rem",
          }}
          title="Sign out"
        >
          ↩
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
