import React, { useState } from 'react';

const TabTemplate = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);

  if (!content || !Array.isArray(content.tabs)) {
    console.error('TabTemplate: content or content.tabs is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid tab content</div>;
  }

  return (
    <div className="tab-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Tabs'}</h2>
      {content.tabs.length > 0 ? (
        <>
          <div className="flex border-b">
            {content.tabs.map((tab, index) => (
              <button
                key={index}
                className={`px-4 py-2 -mb-px border-b-2 ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.title || `Tab ${index + 1}`}
              </button>
            ))}
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg">
            {content.tabs[activeTab]?.content || 'No content available'}
          </div>
        </>
      ) : (
        <div className="p-4 text-gray-600">No tabs available</div>
      )}
    </div>
  );
};

export default TabTemplate;