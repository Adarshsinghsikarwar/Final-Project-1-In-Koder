import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../utils/auth";
import authService from "../../services/authService";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authService.login({ email, password });
      const redirectPath = res.user.role === "candidate" ? "/candidate/home" : "/dashboard";
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "var(--color-bg-base)",
        position: "relative",
        overflow: "hidden",
      }}
      className="grid-bg"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      {/* Left – branding */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "1.1rem",
            }}
          >
            Ai
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.3rem",
              letterSpacing: "-0.03em",
            }}
          >
            Interview<span className="gradient-text">AI</span>
          </span>
        </div>

        <div className="animate-fade-in-1">
          <h1
            style={{
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.25rem",
            }}
          >
            The <span className="gradient-text">Smartest</span>
            <br />
            Way to Interview
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "rgba(255,255,255,0.5)",
              maxWidth: 440,
              lineHeight: 1.7,
            }}
          >
            AI-powered interviews, real-time evaluation, and instant feedback —
            all from one unified platform.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.875rem",
            marginTop: "2.5rem",
          }}
        >
          {[
            { icon: "🤖", text: "AI Interviewer with real-time voice" },
            { icon: "📊", text: "Automated scoring & detailed reports" },
            { icon: "🎥", text: "Live video interviews with WebRTC" },
          ].map(({ icon, text }, i) => (
            <div
              key={i}
              className={`animate-fade-in-${i + 2}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
                maxWidth: 380,
              }}
            >
              <span style={{ fontSize: "1.1rem" }}>{icon}</span>
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.65)",
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right – form */}
      <div
        style={{
          width: 480,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 2.5rem",
          position: "relative",
          zIndex: 1,
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(13,13,30,0.7)",
          backdropFilter: "blur(30px)",
        }}
      >
        <div
          style={{ width: "100%", maxWidth: 380 }}
          className="animate-fade-in"
        >
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: "0.375rem",
            }}
          >
            Welcome back
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              marginBottom: "2rem",
              fontSize: "0.9rem",
            }}
          >
            Sign in to your InterviewAI account
          </p>

          {/* Google OAuth */}
          <button
            className="btn-ghost"
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}
            >
              or continue with email
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            {error && (
              <div style={{ color: "#ef4444", fontSize: "0.8rem", textAlign: "center", background: "rgba(239,68,68,0.1)", padding: "0.5rem", borderRadius: "0.5rem" }}>
                {error}
              </div>
            )}
            <div>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: "0.4rem",
                  display: "block",
                }}
              >
                Email address
              </label>
              <input
                className="input-field"
                type="email"
                placeholder="john@company.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.4rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Password
                </label>
                <a
                  href="#"
                  style={{
                    fontSize: "0.78rem",
                    color: "#9d5cf5",
                    textDecoration: "none",
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem",
                marginTop: "0.5rem",
                fontSize: "0.95rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.25rem",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            New to InterviewAI?{" "}
            <Link
              to="/signup"
              style={{
                color: "#9d5cf5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
