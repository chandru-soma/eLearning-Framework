import React, { useState } from 'react';

const ConversationTemplate = ({ content }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);

  if (!content || !Array.isArray(content.dialogue)) {
    console.error('ConversationTemplate: content or content.dialogue is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid conversation content</div>;
  }

  const handleNext = () => {
    if (visibleIndex < content.dialogue.length - 1) {
      setVisibleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="conversation-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Conversation'}</h2>
      {content.dialogue.length > 0 ? (
        <div className="space-y-4">
          {content.dialogue.slice(0, visibleIndex + 1).map((line, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                line.speaker === 'User' ? 'bg-blue-100 ml-10' : 'bg-gray-100 mr-10'
              }`}
            >
              <p className="font-bold">{line.speaker || 'Unknown'}</p>
              <p>{line.text || 'No text available'}</p>
            </div>
          ))}
          {visibleIndex < content.dialogue.length - 1 && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center mx-auto"
              onClick={handleNext}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
              Next
            </button>
          )}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No dialogue available</div>
      )}
    </div>
  );
};

export default ConversationTemplate;