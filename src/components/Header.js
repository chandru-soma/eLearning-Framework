import React, { useState, useEffect, useRef, useContext } from 'react';
import CourseContext from '../context/CourseContext';
import resources from '../data/resources.json';

const Header = ({ setCurrentTopic }) => {
  const { courseData, settings, unlockedTopics, courseProgress, points } = useContext(CourseContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const menuRef = useRef(null);
  const resourcesRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsResourcesOpen(false);
  };

  const toggleResources = () => {
    setIsResourcesOpen(!isResourcesOpen);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(event.target)) {
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (!courseData || !courseData.topics) {
    console.error('Header: courseData or topics is undefined');
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-blue-600 text-white shadow-lg z-20" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img
            src="/assets/images/logo.png"
            alt="Course logo"
            className="h-10 w-auto"
            onError={(e) => {
              console.error('Header: Logo image failed to load');
              e.target.src = '/assets/images/placeholder.jpg';
              e.target.onerror = null; // Prevent flickering
            }}
            aria-hidden="true"
          />
          <h1 className="text-xl font-bold">{settings.courseTitle || 'eLearning Course'}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <p>Progress: {Math.round(courseProgress)}%</p>
              <div className="w-24 bg-gray-200 h-1.5 mt-1" role="progressbar" aria-label={`Course progress: ${Math.round(courseProgress)}%`} aria-valuenow={Math.round(courseProgress)} aria-valuemin="0" aria-valuemax="100">
                <div
                  className="bg-white h-1.5 transition-all duration-500"
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm">Points: {points}</p>
          </div>
          <div className="relative" ref={resourcesRef}>
            <button
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 focus:outline-none"
              onClick={toggleResources}
              aria-expanded={isResourcesOpen}
              aria-controls="resources-menu"
              aria-label="Toggle resources menu"
            >
              Resources
            </button>
            {isResourcesOpen && (
              <div id="resources-menu" className="absolute top-full right-0 mt-2 w-64 bg-white text-gray-900 shadow-lg rounded-lg z-30">
                <ul className="py-2">
                  {resources.map((resource) => (
                    <li
                      key={resource.url}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <a
                        href={resource.url}
                        download={resource.type === 'pdf' || resource.type === 'video'}
                        target={resource.type === 'link' ? '_blank' : undefined}
                        rel={resource.type === 'link' ? 'noopener noreferrer' : undefined}
                        className="flex items-center"
                        aria-label={`Download ${resource.name}`}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
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
                            d={resource.type === 'pdf' ? 'M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' : resource.type === 'video' ? 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'}
                          />
                        </svg>
                        {resource.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative" ref={menuRef}>
            <button
              className="px-4 py-2 bg-blue-700 rounded hover:bg-blue-800 focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="topics-menu"
              aria-label="Toggle topics menu"
            >
              Menu
            </button>
            {isMenuOpen && (
              <div id="topics-menu" className="absolute top-full right-0 mt-2 w-64 bg-white text-gray-900 shadow-lg rounded-lg z-30">
                <ul className="py-2">
                  {courseData.topics.map((topic) => {
                    const isLocked = settings.topicsLocked && !unlockedTopics.includes(topic.id);
                    return (
                      <li
                        key={topic.id}
                        className={`px-4 py-2 hover:bg-gray-100 ${isLocked ? 'text-gray-400 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => {
                          if (!isLocked) {
                            setCurrentTopic(topic.id);
                            setIsMenuOpen(false);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
                            setCurrentTopic(topic.id);
                            setIsMenuOpen(false);
                          }
                        }}
                        tabIndex={0}
                        role="menuitem"
                        aria-label={`${topic.title}${isLocked ? ' (locked)' : ''}`}
                      >
                        {isLocked ? (
                          <span className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
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
                            {topic.title}
                          </span>
                        ) : (
                          topic.title
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;