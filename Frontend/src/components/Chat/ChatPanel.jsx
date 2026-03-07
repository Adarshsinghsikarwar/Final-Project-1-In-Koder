import { useState, useRef, useEffect } from "react";

const MOCK_MESSAGES = [
  {
    id: 1,
    from: "Interviewer",
    text: "Tell me about yourself.",
    own: false,
    time: "2:00 PM",
  },
  {
    id: 2,
    from: "You",
    text: "Sure! I'm a full-stack developer with 3 years of experience...",
    own: true,
    time: "2:01 PM",
  },
];

const ChatPanel = ({ title = "Chat" }) => {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        from: "You",
        text: input.trim(),
        own: true,
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#0a0a1a",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "0.75rem",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "0.875rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          fontWeight: 600,
          fontSize: "0.875rem",
        }}
      >
        💬 {title}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.own ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "80%",
                background: msg.own
                  ? "rgba(124,58,237,0.25)"
                  : "rgba(255,255,255,0.05)",
                border: `1px solid ${msg.own ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: msg.own
                  ? "0.75rem 0.75rem 0.1rem 0.75rem"
                  : "0.75rem 0.75rem 0.75rem 0.1rem",
                padding: "0.55rem 0.75rem",
              }}
            >
              {!msg.own && (
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "#7c3aed",
                    fontWeight: 600,
                    marginBottom: "0.2rem",
                  }}
                >
                  {msg.from}
                </div>
              )}
              <div
                style={{
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.85)",
                  lineHeight: 1.5,
                }}
              >
                {msg.text}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.25)",
                  marginTop: "0.25rem",
                  textAlign: "right",
                }}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "0.75rem",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Type a message…"
          style={{ flex: 1 }}
        />
        <button
          onClick={send}
          className="btn-primary"
          style={{ padding: "0.6rem 0.9rem", fontSize: "0.85rem" }}
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
