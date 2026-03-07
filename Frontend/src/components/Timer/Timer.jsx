import useInterviewTimer from "../../hooks/useInterviewTimer";

const Timer = ({ initialSeconds = 45 * 60 }) => {
  const { minutes, seconds, isRunning, start, pause, reset } =
    useInterviewTimer(initialSeconds);

  const pct = 1 - (parseInt(minutes) * 60 + parseInt(seconds)) / initialSeconds;
  const isWarning = parseInt(minutes) < 10;

  return (
    <div
      style={{
        background: "#0a0a1a",
        border: `1px solid ${isWarning ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "0.75rem",
        padding: "1.25rem",
        textAlign: "center",
        transition: "border-color 0.3s",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "0.5rem",
          letterSpacing: "0.08em",
        }}
      >
        TIME REMAINING
      </div>

      {/* Digit display */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "2.5rem",
          fontWeight: 700,
          letterSpacing: "0.05em",
          color: isWarning ? "#f59e0b" : "#fff",
          transition: "color 0.3s",
        }}
      >
        {minutes}:{seconds}
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 99,
          margin: "0.75rem 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct * 100}%`,
            background: isWarning
              ? "#f59e0b"
              : "linear-gradient(90deg,#7c3aed,#06b6d4)",
            borderRadius: 99,
            transition: "width 1s linear, background 0.3s",
          }}
        />
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
        <button
          onClick={isRunning ? pause : start}
          className="btn-primary"
          style={{ padding: "0.4rem 1rem", fontSize: "0.8rem" }}
        >
          {isRunning ? "⏸ Pause" : "▶ Start"}
        </button>
        <button
          onClick={reset}
          className="btn-ghost"
          style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
        >
          ↺
        </button>
      </div>
    </div>
  );
};

export default Timer;
