/**
 * Format a date string to "Mar 7, 2026"
 */
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Format seconds -> "34:20"
 */
export const formatDuration = (seconds) => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

/**
 * Returns a color class string based on score 0–100
 */
export const scoreColor = (score) => {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#f59e0b";
  return "#ef4444";
};

/**
 * Truncate a string to maxLen chars
 */
export const truncate = (str, maxLen = 60) =>
  str.length > maxLen ? str.slice(0, maxLen) + "…" : str;
