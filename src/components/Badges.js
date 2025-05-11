import React, { useContext } from 'react';
import CourseContext from '../context/CourseContext';

const badgeData = {
  topic1_complete: { name: 'Topic 1 Complete', icon: '/assets/images/badge1.png' },
  assessment_master: { name: 'Assessment Master', icon: '/assets/images/badge2.png' },
};

const Badges = () => {
  const { badges } = useContext(CourseContext);

  if (!badges || badges.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold mb-2">Your Badges</h3>
      <div className="flex flex-wrap gap-4">
        {badges.map((badgeId) => {
          const badge = badgeData[badgeId];
          if (!badge) return null;
          return (
            <div
              key={badgeId}
              className="flex items-center p-2 bg-white rounded-lg shadow-md"
              role="img"
              aria-label={`Badge: ${badge.name}`}
            >
              <img
                src={badge.icon}
                alt={badge.name}
                className="w-12 h-12 mr-2"
                onError={(e) => {
                  console.error(`Badges: Badge image failed to load for ${badgeId}`);
                  e.target.src = '/assets/images/placeholder.jpg';
                }}
              />
              <span className="text-gray-700">{badge.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Badges;