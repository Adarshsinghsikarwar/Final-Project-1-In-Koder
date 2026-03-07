const CATEGORIES = [
  { label: "Problem Solving", score: 82 },
  { label: "Communication", score: 74 },
  { label: "Code Quality", score: 90 },
  { label: "System Design", score: 65 },
];

const R = 42;
const CIRC = 2 * Math.PI * R;

const ScoreCard = ({ overallScore = 78 }) => {
  const dashOffset = CIRC * (1 - overallScore / 100);

  return (
    <div
      style={{
        background: "#0a0a1a",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "0.75rem",
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.35)",
          marginBottom: "1rem",
          letterSpacing: "0.08em",
        }}
      >
        SCORE
      </div>

      {/* SVG ring */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <svg width={110} height={110} viewBox="0 0 110 110">
          <defs>
            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
          <circle
            cx={55}
            cy={55}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={10}
          />
          <circle
            cx={55}
            cy={55}
            r={R}
            fill="none"
            stroke="url(#scoreGrad)"
            strokeWidth={10}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 55 55)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
          <text
            x={55}
            y={55}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#fff"
            fontSize={22}
            fontWeight={800}
          >
            {overallScore}
          </text>
          <text
            x={55}
            y={72}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize={9}
          >
            / 100
          </text>
        </svg>
      </div>

      {/* Category bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {CATEGORIES.map(({ label, score }) => (
          <div key={label}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "0.2rem",
              }}
            >
              <span
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}
              >
                {label}
              </span>
              <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {score}
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 99,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${score}%`,
                  background: "linear-gradient(90deg,#7c3aed,#06b6d4)",
                  borderRadius: 99,
                  boxShadow: "0 0 8px rgba(124,58,237,0.5)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreCard;
