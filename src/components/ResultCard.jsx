const ResultCard = ({ data, loading }) => {
  if (!data && !loading) return null;

  if (loading) {
    return (
      <div className="card fade-in" style={{ marginTop: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
        <div className="skeleton" style={{ height: "13px", width: "40%", background: "var(--border-strong)" }} />
        <div className="skeleton" style={{ height: "24px", width: "65%", marginTop: "4px", background: "var(--border-strong)" }} />
        <div className="skeleton" style={{ height: "13px", width: "30%", marginTop: "8px", background: "var(--border-strong)" }} />
        <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="skeleton" style={{ height: "12px", width: "90%", background: "var(--border-strong)" }} />
          <div className="skeleton" style={{ height: "12px", width: "75%", background: "var(--border-strong)" }} />
          <div className="skeleton" style={{ height: "12px", width: "83%", background: "var(--border-strong)" }} />
        </div>
      </div>
    );
  }

  const d = typeof data === "string" ? JSON.parse(data) : data;

  return (
    <div className="card fade-in" style={{ marginTop: "20px", overflow: "hidden" }}>

      <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "6px" }}>
            Recommendation
          </p>
          <h3 className="serif" style={{ fontSize: "22px", fontWeight: "400", color: "var(--ink)", lineHeight: "1.2", letterSpacing: "-0.01em" }}>
            {d?.venueName || "Your Plan"}
          </h3>
          {d?.location && (
            <p style={{ fontSize: "13px", color: "var(--ink-2)", marginTop: "5px" }}>
              {d.location}
            </p>
          )}
        </div>
        {d?.estimatedCost && (
          <div style={{ textAlign: "right", flexShrink: 0, maxWidth: "200px" }}>
            <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "4px" }}>
              Est. Cost
            </p>
            <p className="serif" style={{ fontSize: "16px", color: "var(--ink)", fontWeight: "400", wordBreak: "break-word", lineHeight: "1.4" }}>
              {d.estimatedCost}
            </p>
          </div>
        )}
      </div>

      <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "20px" }}>

        {d?.whyItFits && (
          <div>
            <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "8px" }}>
              Why it fits
            </p>
            <p style={{ fontSize: "14px", color: "var(--ink-2)", lineHeight: "1.7" }}>
              {d.whyItFits}
            </p>
          </div>
        )}

        {d?.highlights?.length > 0 && (
          <div>
            <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "10px" }}>
              Highlights
            </p>
            <ul style={{ display: "flex", flexDirection: "column", gap: "7px", listStyle: "none" }}>
              {d.highlights.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "var(--ink-2)", lineHeight: "1.5" }}>
                  <span style={{ color: "var(--ink-3)", flexShrink: 0, marginTop: "1px" }}>—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: d?.bestTimeToVisit && d?.travelTips?.length ? "1fr 1fr" : "1fr", gap: "20px" }}>
          {d?.bestTimeToVisit && (
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 16px" }}>
              <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "6px" }}>
                Best time to visit
              </p>
              <p style={{ fontSize: "13px", color: "var(--ink-2)" }}>{d.bestTimeToVisit}</p>
            </div>
          )}

          {d?.travelTips?.length > 0 && (
            <div style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 16px" }}>
              <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "8px" }}>
                Tips
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: "5px", listStyle: "none" }}>
                {d.travelTips.map((tip, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "var(--ink-2)", lineHeight: "1.5", display: "flex", gap: "8px" }}>
                    <span style={{ color: "var(--border-strong)", flexShrink: 0 }}>·</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResultCard;