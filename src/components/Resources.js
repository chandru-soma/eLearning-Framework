import React, { useContext } from 'react';
import CourseContext from '../context/CourseContext';

const Resources = () => {
  const { courseData } = useContext(CourseContext);

  if (!courseData || !courseData.resources) {
    console.error('Resources: courseData or resources is undefined');
    return <div>No resources available</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Resources</h2>
      {courseData.resources.length > 0 ? (
        <ul className="list-disc pl-5">
          {courseData.resources.map((resource, index) => (
            <li key={index}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {resource.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No resources available</p>
      )}
    </div>
  );
};

export default Resources;