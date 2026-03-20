const ResultCard = ({ data, loading }) => {
  if (!data && !loading) return null;

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow mt-6 animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  // Handle if data is a string (stored as JSON in DB)
  const eventData = typeof data === "string" ? JSON.parse(data) : data;

  return (
    <div className="bg-white p-5 rounded-xl shadow mt-6 hover:shadow-lg transition border-2 border-green-400">
      
      {/* Main Info */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {eventData?.venueName || "Event Plan"}
        </h2>
        
        <p className="text-lg text-gray-600 mt-2">
          📍 <span className="font-semibold">{eventData?.location || "Location TBD"}</span>
        </p>

        <p className="text-lg font-semibold text-green-600 mt-2">
          💰 {eventData?.estimatedCost || "Cost TBD"}
        </p>
      </div>

      {/* Why It Fits */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4 border-l-4 border-blue-400">
        <h3 className="font-bold text-blue-900 mb-2">Why It Fits 🎯</h3>
        <p className="text-gray-700 leading-relaxed">
          {eventData?.whyItFits || "Planning event details..."}
        </p>
      </div>

      {/* Highlights */}
      {eventData?.highlights && eventData.highlights.length > 0 && (
        <div className="mt-4 mb-4">
          <h4 className="font-bold text-gray-800 mb-2">✨ Highlights</h4>
          <ul className="space-y-1">
            {eventData.highlights.map((item, i) => (
              <li key={i} className="text-gray-600 flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Best Time */}
      {eventData?.bestTimeToVisit && (
        <p className="mt-3 text-sm text-gray-600 bg-yellow-50 p-2 rounded">
          🗓️ <span className="font-semibold">Best Time:</span> {eventData.bestTimeToVisit}
        </p>
      )}

      {/* Tips */}
      {eventData?.travelTips && eventData.travelTips.length > 0 && (
        <div className="mt-4 bg-purple-50 p-3 rounded">
          <h4 className="font-bold text-purple-900 mb-2">💡 Tips</h4>
          <div className="space-y-1">
            {eventData.travelTips.map((tip, i) => (
              <p key={i} className="text-gray-700 text-sm">• {tip}</p>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default ResultCard;