import React, { useState } from 'react';

const ButtonPopupTemplate = ({ content }) => {
  const [activePopup, setActivePopup] = useState(null);

  if (!content || !Array.isArray(content.buttons)) {
    console.error('ButtonPopupTemplate: content or content.buttons is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid button popup content</div>;
  }

  return (
    <div className="button-popup-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Button Popup'}</h2>
      {content.buttons.length > 0 ? (
        <div className="space-y-2">
          {content.buttons.map((button, index) => (
            <div key={index}>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setActivePopup(index)}
              >
                {button.label || `Button ${index + 1}`}
              </button>
              {activePopup === index && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <p>{button.popupContent || 'No content available'}</p>
                    <button
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => setActivePopup(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No buttons available</div>
      )}
    </div>
  );
};

export default ButtonPopupTemplate;