import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCardTemplate = ({ content, isActive, onNext, topicId, pageId }) => {
  const [flipped, setFlipped] = useState({});

  if (!content || !Array.isArray(content.cards)) {
    console.error('FlipCardTemplate: content or content.cards is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid flip card content</div>;
  }

  const toggleFlip = (index) => {
    if (isActive) {
      setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
    }
  };

  return (
    <div className="flip-card-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Flip Cards'}</h2>
      {content.cards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.cards.map((card, index) => (
            <div
              key={index}
              className="relative w-full h-48 cursor-pointer perspective-1000"
              onClick={() => toggleFlip(index)}
            >
              <motion.div
                className="relative w-full h-full"
                animate={{ rotateY: flipped[index] ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div
                  className="absolute w-full h-full bg-blue-100 rounded-lg flex items-center justify-center p-4 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p>{card.front || 'No front content'}</p>
                </div>
                {/* Back */}
                <div
                  className="absolute w-full h-full bg-blue-200 rounded-lg flex items-center justify-center p-4 backface-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p>{card.back || 'No back content'}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No cards available</div>
      )}
    </div>
  );
};

export default FlipCardTemplate;