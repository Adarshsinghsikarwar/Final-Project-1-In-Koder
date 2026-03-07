const LINES = [
  { n: 1, code: "function twoSum(nums, target) {", highlight: false },
  { n: 2, code: "  const map = new Map();", highlight: false },
  { n: 3, code: "  for (let i = 0; i < nums.length; i++) {", highlight: true },
  { n: 4, code: "    const complement = target - nums[i];", highlight: false },
  { n: 5, code: "    if (map.has(complement)) {", highlight: false },
  { n: 6, code: "      return [map.get(complement), i];", highlight: false },
  { n: 7, code: "    }", highlight: false },
  { n: 8, code: "    map.set(nums[i], i);", highlight: false },
  { n: 9, code: "  }", highlight: false },
  { n: 10, code: "  return [];", highlight: false },
  { n: 11, code: "}", highlight: false },
];

const CodeEditor = ({ language = "JavaScript" }) => (
  <div
    style={{
      background: "#0d0d1e",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "0.75rem",
      overflow: "hidden",
      fontFamily: "var(--font-mono)",
    }}
  >
    {/* macOS titlebar */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.65rem 1rem",
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ display: "flex", gap: "0.45rem" }}>
        {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
          <div
            key={c}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: c,
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: "0.72rem",
          color: "rgba(255,255,255,0.3)",
          fontFamily: "var(--font-ui)",
        }}
      >
        solution.{language === "JavaScript" ? "js" : language.toLowerCase()}
      </span>
      <span className="badge-purple" style={{ fontSize: "0.65rem" }}>
        {language}
      </span>
    </div>

    {/* Code lines */}
    <div style={{ padding: "0.75rem 0" }}>
      {LINES.map(({ n, code, highlight }) => (
        <div
          key={n}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.18rem 1rem",
            background: highlight ? "rgba(124,58,237,0.12)" : "transparent",
            borderLeft: highlight
              ? "2px solid #7c3aed"
              : "2px solid transparent",
          }}
        >
          <span
            style={{
              width: 28,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.2)",
              userSelect: "none",
              flexShrink: 0,
            }}
          >
            {n}
          </span>
          <span
            style={{
              fontSize: "0.82rem",
              color: highlight ? "#c4b5fd" : "rgba(255,255,255,0.7)",
              whiteSpace: "pre",
            }}
          >
            {code}
          </span>
        </div>
      ))}
    </div>

    {/* Status bar */}
    <div
      style={{
        padding: "0.4rem 1rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        gap: "1rem",
        fontSize: "0.7rem",
        color: "rgba(255,255,255,0.25)",
      }}
    >
      <span>Ln 3, Col 42</span>
      <span>{language}</span>
      <span>UTF-8</span>
    </div>
  </div>
);

export default CodeEditor;
