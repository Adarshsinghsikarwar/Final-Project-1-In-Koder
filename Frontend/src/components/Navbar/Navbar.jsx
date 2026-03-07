import { useState } from "react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/interview/setup": "Interview Setup",
  "/interview/ai-room": "AI Interview Room",
  "/interview/live-room": "Live Interview Room",
  "/reports": "Reports",
  "/admin": "Admin",
};

const Navbar = () => {
  const { pathname } = useLocation();
  const [notifs] = useState(3);

  return (
    <header
      style={{
        height: 60,
        background: "rgba(6,6,15,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.75rem",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <h1 style={{ fontWeight: 700, fontSize: "1.05rem" }}>
        {pageTitles[pathname] ?? "InterviewAI"}
      </h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Notification bell */}
        <button
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.5rem",
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
            fontSize: "1rem",
          }}
        >
          🔔
          {notifs > 0 && (
            <span
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#7c3aed",
                border: "1.5px solid #06060f",
              }}
            />
          )}
        </button>

        {/* Avatar */}
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
            cursor: "pointer",
          }}
        >
          U
        </div>
      </div>
    </header>
  );
};

export default Navbar;
