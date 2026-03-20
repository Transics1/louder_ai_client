const History = ({ items, onSelect }) => {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ marginTop: "40px" }}>
      <p style={{ fontSize: "11px", fontWeight: "500", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-3)", marginBottom: "4px" }}>
        Past trips
      </p>
      <div style={{ borderTop: "1px solid var(--border)", marginTop: "12px" }}>
        {items.map((item) => (
          <div
            key={item._id}
            className="history-row"
            onClick={() => onSelect(item.response)}
          >
            <span className="history-query">{item.query}</span>
            <span className="history-arrow">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
