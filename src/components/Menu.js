import React, { useContext } from 'react';
import CourseContext from '../context/CourseContext';

const Menu = ({ setCurrentTopic }) => {
  const { courseData } = useContext(CourseContext);

  if (!courseData || !courseData.topics) {
    console.error('Menu: courseData or topics is undefined');
    return <div>Error: Course topics not available</div>;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        {courseData.topics.map((topic) => (
          <li key={topic.id}>
            <button
              onClick={() => setCurrentTopic(topic.id)}
              className="hover:bg-gray-700 px-3 py-2 rounded"
            >
              {topic.title || 'Untitled Topic'}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;