import { useState } from "react";
import api from "../api/axios";
import DotGrid from "../components/DotGrid";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/home";
    } catch {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (localStorage.getItem("token")) window.location.href = "/home";

  return (
    <div className="auth-page">
      <DotGrid />
      <div className="fade-in" style={{ width: "100%", maxWidth: "380px", position: "relative", zIndex: 1 }}>

        <div className="card" style={{ padding: "36px 32px" }}>

          <div style={{ marginBottom: "32px", paddingBottom: "24px", borderBottom: "1px solid var(--border)" }}>
            <h1 className="serif" style={{ fontSize: "26px", color: "var(--ink)", letterSpacing: "-0.01em", lineHeight: 1 }}>
              Louder. <em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>AI</em>
            </h1>
            <p style={{ fontSize: "12px", color: "var(--ink-3)", marginTop: "6px" }}>AI-powered trip planning</p>
          </div>

          <h2 style={{ fontSize: "15px", fontWeight: "500", color: "var(--ink)", marginBottom: "20px" }}>Sign in to your account</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" placeholder="you@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
            </div>
          </div>

          <button className="btn-primary" onClick={handleLogin} disabled={loading}
            style={{ width: "100%", marginTop: "22px" }}>
            {loading ? "Signing in…" : "Sign in"}
          </button>

          <p style={{ fontSize: "13px", color: "var(--ink-3)", textAlign: "center", marginTop: "20px" }}>
            No account?{" "}
            <a href="/signup" style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Create one</a>
          </p>
        </div>

        <p style={{ fontSize: "16px", color: "var(--ink-3)", textAlign: "center", marginTop: "20px", letterSpacing: "0.02em" }}>
          Live LOUDER.
        </p>
      </div>
    </div>
  );
};

export default Login;