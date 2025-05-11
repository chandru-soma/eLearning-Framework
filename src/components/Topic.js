import React from 'react';

const Topic = ({ topic, onSelect }) => (
  <div className="p-4 bg-white rounded-lg shadow mb-4" role="article">
    <h2 className="text-2xl font-semibold">{topic.name}</h2>
    <p>Duration: {topic.duration} minutes</p>
    <button
      className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => onSelect(topic.id)}
      aria-label={`Start ${topic.name}`}
    >
      Start Topic
    </button>
  </div>
);

export default Topic;