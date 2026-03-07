const VideoPanel = ({ label = "Participant", isCameraOff = false }) => (
  <div
    style={{
      background: "#0a0a1a",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "0.75rem",
      overflow: "hidden",
      aspectRatio: "16/9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    {isCameraOff ? (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 0.5rem",
            fontSize: "1.5rem",
            fontWeight: 700,
          }}
        >
          {label[0]}
        </div>
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
          Camera off
        </span>
      </div>
    ) : (
      <div style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.85rem" }}>
        📹 {label}
      </div>
    )}

    {/* Live badge */}
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
        background: "rgba(0,0,0,0.5)",
        borderRadius: "999px",
        padding: "0.2rem 0.55rem",
        fontSize: "0.7rem",
        fontWeight: 600,
      }}
    >
      <span
        className="pulse-dot"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#10b981",
          display: "inline-block",
        }}
      />
      LIVE
    </div>

    {/* Name label */}
    <div
      style={{
        position: "absolute",
        bottom: 10,
        left: 10,
        background: "rgba(0,0,0,0.55)",
        borderRadius: "0.4rem",
        padding: "0.2rem 0.5rem",
        fontSize: "0.75rem",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  </div>
);

export default VideoPanel;
