import React, { useState } from 'react';

const HotspotTemplate = ({ content }) => {
  const [activeHotspot, setActiveHotspot] = useState(null);

  if (!content || !content.image || !Array.isArray(content.hotspots)) {
    console.error('HotspotTemplate: content or content.hotspots is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid hotspot content</div>;
  }

  return (
    <div className="hotspot-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Hotspot'}</h2>
      <div className="relative max-w-2xl mx-auto">
        <img src={content.image} alt="Hotspot" className="w-full" />
        {content.hotspots.map((hotspot, index) => (
          <button
            key={index}
            className="absolute bg-red-500 w-6 h-6 rounded-full flex items-center justify-center text-white"
            style={{ left: hotspot.x, top: hotspot.y, transform: 'translate(-50%, -50%)' }}
            onClick={() => setActiveHotspot(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      {activeHotspot !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <p>{content.hotspots[activeHotspot].content || 'No content available'}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setActiveHotspot(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotspotTemplate;