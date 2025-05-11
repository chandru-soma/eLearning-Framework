import React from 'react';

const TextImageRightTemplate = ({ content }) => (
  <div className="p-4 bg-white rounded-lg shadow flex flex-row-reverse" role="region" aria-label="Text and Image">
    <img src={content.image} alt="Content visual" className="w-1/2 h-48 object-cover rounded" />
    <div className="p-4 w-1/2">{content.text}</div>
  </div>
);

export default TextImageRightTemplate;