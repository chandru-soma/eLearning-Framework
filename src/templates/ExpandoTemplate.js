import React, { useState } from 'react';

const ExpandoTemplate = ({ content }) => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // Validate content and items
  if (!content || !Array.isArray(content.items)) {
    console.error('ExpandoTemplate: content or content.items is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid expando content</div>;
  }

  return (
    <div className="expando-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Expando Section'}</h2>
      {content.items.length > 0 ? (
        content.items.map((item, index) => (
          <div key={index} className="mb-2">
            <button
              className="w-full text-left bg-gray-200 p-3 rounded-lg flex justify-between items-center"
              onClick={() => toggleExpand(index)}
            >
              <span>{item.title || `Item ${index + 1}`}</span>
              <span>{expanded[index] ? '−' : '+'}</span>
            </button>
            {expanded[index] && (
              <div className="p-3 bg-gray-100 rounded-b-lg">
                {item.content || 'No content available'}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="p-4 text-gray-600">No items available</div>
      )}
    </div>
  );
};

export default ExpandoTemplate;