import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROLES } from "../../utils/auth";
import authService from "../../services/authService";

const STRENGTHS = [
  { label: "Weak", width: "25%", color: "#ef4444" },
  { label: "Fair", width: "50%", color: "#f59e0b" },
  { label: "Good", width: "75%", color: "#3b82f6" },
  { label: "Strong", width: "100%", color: "#10b981" },
];

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState(ROLES.CANDIDATE.toLowerCase()); // Backend expects lowercase
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const strength =
    password.length === 0
      ? -1
      : password.length < 6
        ? 0
        : password.length < 10
          ? 1
          : password.length < 14
            ? 2
            : 3;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg-base)",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
      }}
      className="grid-bg"
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div
        style={{
          width: "100%",
          maxWidth: 460,
          position: "relative",
          zIndex: 1,
        }}
        className="animate-fade-in"
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 9,
              background: "linear-gradient(135deg,#7c3aed,#06b6d4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
            }}
          >
            Ai
          </div>
          <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>
            Interview<span className="gradient-text">AI</span>
          </span>
        </div>

        <div
          className="glass"
          style={{ borderRadius: "1.25rem", padding: "2.5rem" }}
        >
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              marginBottom: "0.3rem",
              textAlign: "center",
            }}
          >
            Create your account
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.875rem",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Start your AI-powered interview journey
          </p>

          {/* Role selector */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.55)",
                display: "block",
                marginBottom: "0.6rem",
              }}
            >
              I am a
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {Object.entries(ROLES).map(([key, r]) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r.toLowerCase())}
                  style={{
                    flex: 1,
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: `1px solid ${role === r.toLowerCase() ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                    background:
                      role === r.toLowerCase() ? "rgba(124,58,237,0.18)" : "transparent",
                    color: role === r.toLowerCase() ? "#fff" : "rgba(255,255,255,0.45)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError("");
              setLoading(true);
              try {
                const userData = {
                  name: `${formData.firstName} ${formData.lastName}`.trim(),
                  email: formData.email,
                  password,
                  role: role,
                };
                const res = await authService.register(userData);
                const redirectPath = res.user.role === "candidate" ? "/candidate/home" : "/dashboard";
                navigate(redirectPath);
              } catch (err) {
                setError(err.response?.data?.message || "Registration failed. Try again.");
              } finally {
                setLoading(false);
              }
            }}
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
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  First name
                </label>
                <input 
                  className="input-field" 
                  name="firstName"
                  placeholder="John" 
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.55)",
                    display: "block",
                    marginBottom: "0.4rem",
                  }}
                >
                  Last name
                </label>
                <input 
                  className="input-field" 
                  name="lastName"
                  placeholder="Doe" 
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Email address
              </label>
              <input
                className="input-field"
                type="email"
                name="email"
                placeholder="john@company.io"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Password
              </label>
              <input
                className="input-field"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Strength meter */}
              {strength >= 0 && (
                <div style={{ marginTop: "0.4rem" }}>
                  <div
                    style={{
                      height: 3,
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: STRENGTHS[strength].width,
                        background: STRENGTHS[strength].color,
                        borderRadius: 99,
                        transition: "width 0.3s, background 0.3s",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: STRENGTHS[strength].color,
                      marginTop: "0.2rem",
                    }}
                  >
                    {STRENGTHS[strength].label} password
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.85rem",
                marginTop: "0.25rem",
                fontSize: "0.95rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Creating Account..." : "Create Account →"}
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
            Already have an account?{" "}
            <Link
              to="/signin"
              style={{
                color: "#9d5cf5",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
