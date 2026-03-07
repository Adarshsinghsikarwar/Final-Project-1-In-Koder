import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import VideoPanel from "../../components/Video/VideoPanel";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import ChatPanel from "../../components/Chat/ChatPanel";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import Timer from "../../components/Timer/Timer";

export default function LiveInterviewRoom() {
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [notes, setNotes] = useState("");

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

        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "1rem",
            padding: "1rem",
          }}
        >
          {/* Left: video + editor */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Video grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <VideoPanel label="Interviewer" />
              <VideoPanel label="You (Candidate)" isCameraOff={cameraOff} />
            </div>

            {/* Controls */}
            <div
              style={{
                display: "flex",
                gap: "0.625rem",
                justifyContent: "center",
              }}
            >
              <button
                onClick={() => setMuted((v) => !v)}
                className={muted ? "btn-primary" : "btn-ghost"}
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
              >
                {muted ? "🔇 Unmute" : "🎙️ Mute"}
              </button>
              <button
                onClick={() => setCameraOff((v) => !v)}
                className={cameraOff ? "btn-primary" : "btn-ghost"}
                style={{ padding: "0.6rem 1.25rem", fontSize: "0.85rem" }}
              >
                {cameraOff ? "📷 Camera On" : "📵 Camera Off"}
              </button>
              <button
                className="btn-ghost"
                style={{
                  padding: "0.6rem 1rem",
                  fontSize: "0.85rem",
                  color: "#ef4444",
                  borderColor: "rgba(239,68,68,0.3)",
                }}
              >
                ✕ End Call
              </button>
            </div>

            {/* Code editor */}
            <CodeEditor language="JavaScript" />

            {/* Private notes */}
            <div className="card" style={{ padding: "1rem" }}>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                }}
              >
                🔒 PRIVATE NOTES
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Jot private notes here — only visible to you…"
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.7)",
                  fontFamily: "var(--font-ui)",
                  fontSize: "0.82rem",
                  resize: "none",
                  outline: "none",
                  height: 80,
                  lineHeight: 1.6,
                }}
              />
            </div>
          </div>

          {/* Right: timer + chat + score */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <Timer initialSeconds={45 * 60} />
            <div style={{ flex: 1, minHeight: 300 }}>
              <ChatPanel title="Chat" />
            </div>
            <ScoreCard overallScore={74} />
          </div>
        </div>
      </div>
    </div>
  );
}
