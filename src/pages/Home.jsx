import { useState, useEffect } from "react";
import api from "../api/axios";
import ResultCard from "../components/ResultCard";
import History from "../components/History";

const Home = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/events/my");
      setHistory(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
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
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">

        {/* Navbar */}
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">Louder AI ✨</h1>
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        </div>

        {/* Input */}
        <div className="bg-white p-4 rounded-xl shadow">
          <input
            className="w-full p-3 border rounded mb-3
              focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Describe your event or trip..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-black text-white px-4 py-2 rounded w-full
              hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mt-4">
            {error}
          </div>
        )}

        {/* Result */}
        <ResultCard data={result} loading={loading} />

        {/* History */}
        <History items={history} onSelect={setResult} />

      </div>
    </div>
  );
};

export default Home;