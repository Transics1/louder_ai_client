import { useState, useEffect } from "react";
import api from "../api/axios";
import ResultCard from "../components/ResultCard";
import History from "../components/History";
import DotGrid from "../components/DotGrid";

const CONTEXT_MAP = [
  { keywords: ["goa", "beach", "coastal", "sea", "ocean", "shore", "konkan"], suggestions: ["Beaches of Pondicherry", "Coastal Karnataka road trip", "Vizag beach weekend", "Gokarna offbeat stay"] },
  { keywords: ["hill", "mountain", "trek", "shimla", "manali", "ooty", "munnar", "darjeeling", "mussoorie", "coorg", "kodaikanal"], suggestions: ["Weekend in Coorg", "Spiti Valley road trip", "Chopta camping trip", "Dzukou Valley trek"] },
  { keywords: ["heritage", "history", "fort", "palace", "rajasthan", "jaipur", "jodhpur", "udaipur", "mysore", "hampi"], suggestions: ["Chettinad heritage trail", "Orchha day trip", "Mandu ruins exploration", "Pattadakal temples"] },
  { keywords: ["food", "cuisine", "eat", "restaurant", "street food", "culinary"], suggestions: ["Lucknow food trail", "Kolkata street food tour", "Hyderabad biryani weekend", "Amritsar food crawl"] },
  { keywords: ["jungle", "wildlife", "safari", "forest", "tiger", "national park", "ranthambore", "jim corbett", "kaziranga"], suggestions: ["Bandhavgarh tiger safari", "Kabini wildlife weekend", "Satpura canoe safari", "Sundarbans boat trip"] },
  { keywords: ["backwater", "kerala", "houseboat", "alleppey", "kochi", "kovalam"], suggestions: ["Kumarakom houseboat stay", "Varkala cliff side trip", "Munnar tea estate tour", "Silent Valley trek"] },
  { keywords: ["city", "urban", "mumbai", "delhi", "bangalore", "chennai", "kolkata", "hyderabad", "pune"], suggestions: ["Weekend in Pondicherry", "Chandigarh architecture walk", "Ahmedabad heritage walk", "Mysore day trip"] },
  { keywords: ["budget", "cheap", "affordable", "low cost", "backpack"], suggestions: ["Hampi on a budget", "Spiti backpacking trip", "Mcleodganj budget stay", "Rishikesh camping"] },
  { keywords: ["luxury", "resort", "spa", "premium", "5 star"], suggestions: ["Seychelles luxury retreat", "Maldives overwater villa", "Taj safari lodge Panna", "Oberoi Sukhvilas"] },
  { keywords: ["road trip", "drive", "car", "route", "highway"], suggestions: ["Leh-Ladakh road trip", "Konkan coast drive", "Coorg via Chikmagalur", "Spiti circuit route"] },
];

const DEFAULT_SUGGESTIONS = ["Weekend in Goa", "Hill station getaway", "City food tour", "Heritage walk"];

const getContextualSuggestions = (history) => {
  if (!history || history.length === 0) return DEFAULT_SUGGESTIONS;
  const recentQueries = history.slice(0, 3).map((h) => h.query.toLowerCase()).join(" ");
  for (const { keywords, suggestions } of CONTEXT_MAP) {
    if (keywords.some((kw) => recentQueries.includes(kw))) return suggestions;
  }
  return DEFAULT_SUGGESTIONS;
};

const getGreeting = (name) => {
  const h = new Date().getHours();
  const time = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  return name ? `${time}, ${name.split(" ")[0]}` : time;
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("name") || "");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/events/my");
      setHistory(res.data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchHistory();
    api.get("/user/profile")
      .then((res) => {
        setUserName(res.data.user.name);
        localStorage.setItem("name", res.data.user.name);
      })
      .catch((err) => console.error("Could not fetch user:", err));
  }, []);

  const handleGenerate = async () => {
    if (!query) return;
    try {
      setError("");
      setLoading(true);
      const res = await api.post("/events/generate", { query });
      console.log("🎯 Full Response:", res.data);
      console.log("📦 Event Data:", res.data.data);
      console.log("🤖 AI Response:", res.data.data.response);
      setResult(res.data.data.response);
      fetchHistory();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Error generating plan";
      console.error("❌ Generation Error:", err.response?.data || err.message);
      setError(errorMsg);
      alert(errorMsg);
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    window.location.href = "/login";
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <DotGrid />

      <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "0 28px", height: "54px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span className="serif" style={{ fontSize: "19px", color: "var(--ink)", letterSpacing: "-0.01em" }}>
            Louder<em style={{ fontStyle: "italic", color: "var(--ink-2)" }}>AI</em>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {userName && (
              <span style={{ fontSize: "13px", color: "var(--ink-2)", borderRight: "1px solid var(--border)", paddingRight: "14px" }}>
                {userName}
              </span>
            )}
            <button className="btn-ghost" onClick={logout}>Sign out</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "52px 28px 100px", position: "relative", zIndex: 1 }}>

        <div style={{ marginBottom: "40px" }}>
          <p style={{ fontSize: "12px", fontWeight: "500", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "10px" }}>
            {getGreeting(userName)}
          </p>
          <h2 className="serif" style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "400", color: "var(--ink)", lineHeight: "1.15", letterSpacing: "-0.02em", maxWidth: "520px" }}>
            Where are you headed next?
          </h2>
          <p style={{ fontSize: "14px", color: "var(--ink-3)", marginTop: "10px", maxWidth: "400px", lineHeight: "1.6" }}>
            Describe your trip and we'll craft a tailored plan in seconds.
          </p>
        </div>

        {history.length > 0 && (
          <div className="fade-in" style={{ display: "flex", gap: "10px", marginBottom: "32px", flexWrap: "wrap" }}>
            <div className="stat-pill">
              <span style={{ fontSize: "20px", fontWeight: "500", color: "var(--ink)", lineHeight: 1 }}>{history.length}</span>
              <span style={{ fontSize: "11px", color: "var(--ink-3)", marginTop: "4px", letterSpacing: "0.04em" }}>trips planned</span>
            </div>
            <div className="stat-pill">
              <span className="serif" style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.2, maxWidth: "180px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {history[0]?.query}
              </span>
              <span style={{ fontSize: "11px", color: "var(--ink-3)", marginTop: "4px", letterSpacing: "0.04em" }}>last search</span>
            </div>
          </div>
        )}

        <div className="card" style={{ padding: "18px" }}>
          <textarea
            className="input"
            style={{ border: "none", padding: "0", resize: "none", fontSize: "14px", lineHeight: "1.65", minHeight: "80px", outline: "none", background: "transparent" }}
            placeholder="e.g. 3-day trip to Jaipur for 2 people, ₹15,000 budget, interested in heritage and local food…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
            rows={3}
          />
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "14px", paddingTop: "14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {getContextualSuggestions(history).map((p) => (
                <button key={p} className="tag" onClick={() => setQuery(p)}>{p}</button>
              ))}
            </div>
            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={loading || !query}
              style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: "8px" }}
            >
              {loading && <span style={{ width: "12px", height: "12px", border: "1.5px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", display: "inline-block" }} className="spin" />}
              {loading ? "Planning…" : "Generate plan"}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ marginTop: "12px", padding: "10px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius)", fontSize: "13px", color: "var(--red)" }}>
            {error}
          </div>
        )}

        <ResultCard data={result} loading={loading} />
        <History items={history} onSelect={setResult} />

      </main>
    </div>
  );
};

export default Home;