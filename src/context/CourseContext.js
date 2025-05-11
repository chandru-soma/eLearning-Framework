import { createContext } from 'react';

const CourseContext = createContext({
  settings: {},
  courseData: { topics: [] },
  courseProgress: 0,
  markPageVisited: () => {},
});

export const CourseProvider = CourseContext.Provider;
export default CourseContext;