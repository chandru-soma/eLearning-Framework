import React from 'react';

const StaticTemplate = ({ content }) => {
  if (!content) {
    console.error('StaticTemplate: content is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid static content</div>;
  }

  const text = typeof content.text === 'string' ? content.text : 'No content available';

  return (
    <div className="static-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Static Page'}</h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default StaticTemplate;