import React, { useContext, useEffect } from 'react';
import CourseContext from '../context/CourseContext';
import Badges from './Badges';

const LandingPage = ({ setCurrentTopic }) => {
  const { courseData, settings, unlockedTopics } = useContext(CourseContext);

  // Preload images to prevent flickering
  useEffect(() => {
    if (courseData && courseData.topics) {
      courseData.topics.forEach((topic) => {
        if (topic.image) {
          const img = new Image();
          img.src = topic.image;
          img.onerror = () => {
            console.error(`LandingPage: Preload failed for ${topic.image}`);
          };
        }
      });
    }
  }, [courseData]);

  if (!courseData || !courseData.topics) {
    console.error('LandingPage: courseData or topics is undefined');
    return <div>Error: Course data not available</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">{settings.courseTitle || 'Welcome to the Course'}</h1>
        <Badges />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseData.topics.map((topic) => {
            const isLocked = settings.topicsLocked && !unlockedTopics.includes(topic.id);
            return (
              <div
                key={topic.id}
                className={`p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                  isLocked ? 'bg-gray-200' : 'bg-white'
                }`}
                onClick={() => !isLocked && setCurrentTopic(topic.id)}
                onKeyDown={(e) => !isLocked && (e.key === 'Enter' || e.key === ' ') && setCurrentTopic(topic.id)}
                tabIndex={isLocked ? -1 : 0}
                role="button"
                aria-label={`Select ${topic.title}${isLocked ? ' (locked)' : ''}`}
              >
                <img
                  src={topic.image || '/assets/images/placeholder.jpg'}
                  alt={topic.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    console.error(`LandingPage: Image load failed for topic ${topic.id}, src: ${e.target.src}`);
                    e.target.src = '/assets/images/placeholder.jpg';
                    e.target.onerror = null; // Prevent flickering
                  }}
                  loading="lazy"
                />
                <h2 className="text-2xl font-bold mb-2">{topic.title}</h2>
                {topic.duration && (
                  <p className="text-gray-600 mb-4">Duration: {topic.duration}</p>
                )}
                {isLocked && (
                  <div className="flex items-center text-gray-500">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 11c0-1.1.9-2 2-2s2 .9 2 2-2 4-2 4m-4 0H6a4 4 0 01-4-4V7a4 4 0 014-4h4m4 0h4a4 4 0 014 4v8a4 4 0 01-4 4h-4"
                      />
                    </svg>
                    <span>Locked</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;