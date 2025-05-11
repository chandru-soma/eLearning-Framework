import React from 'react';

const MediaTemplate = ({ content }) => {
  if (!content || !content.mediaUrl) {
    console.error('MediaTemplate: content or content.mediaUrl is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid media content</div>;
  }

  return (
    <div className="media-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Media'}</h2>
      <video controls className="w-full max-w-2xl mx-auto">
        <source src={content.mediaUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {content.caption && <p className="mt-2 text-gray-600">{content.caption}</p>}
    </div>
  );
};

export default MediaTemplate;