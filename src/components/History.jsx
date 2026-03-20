const History = ({ items, onSelect }) => {
  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">Previous Queries</h3>

      {items.map((item) => (
        <div
          key={item._id}
          onClick={() => onSelect(item.response)}
          className="p-3 border rounded mb-2 cursor-pointer
                     hover:bg-gray-100 transition"
        >
          {item.query}
        </div>
      ))}
    </div>
  );
};

export default History;