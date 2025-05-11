import React, { useContext, useState, useRef } from 'react';
import CourseContext from '../context/CourseContext';
import Page from '../components/Page';
import NavigationButtons from '../components/NavigationButtons';

const TopicPage = ({ topicId, setCurrentTopic }) => {
  const { courseData, visitedPages } = useContext(CourseContext);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const pageRefs = useRef([]);

  if (!courseData || !courseData.topics) {
    console.error('TopicPage: courseData or topics is undefined');
    return <div>Error: Course data not available</div>;
  }

  const topic = courseData.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error('Topic not found:', topicId);
    return <div>Error: Topic not found</div>;
  }

  // Calculate topic progress
  const totalPages = topic.pages?.length || 0;
  const visitedCount = topic.pages?.filter((page) =>
    visitedPages && visitedPages[`${topicId}-${page.id}`]
  ).length || 0;
  const topicProgress = totalPages > 0 ? (visitedCount / totalPages) * 100 : 0;
  const allPagesVisited = visitedCount === totalPages;
  const isLastPage = currentPageIndex === totalPages - 1;

  // Debug topic rendering
  console.log('TopicPage rendering:', { topicId, topic, pages: topic.pages, visitedPages, currentPageIndex, allPagesVisited, isLastPage });

  // Navigation
  const topicIndex = courseData.topics.findIndex((t) => t.id === topicId);
  const prevTopic = topicIndex > 0 ? courseData.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < courseData.topics.length - 1 ? courseData.topics[topicIndex + 1] : null;

  const handleNextPage = () => {
    if (currentPageIndex < topic.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setTimeout(() => {
        const nextPage = pageRefs.current[currentPageIndex + 1];
        if (nextPage) {
          const currentScroll = window.scrollY;
          const nextPageTop = nextPage.getBoundingClientRect().top + window.scrollY;
          const scrollDistance = (nextPageTop - currentScroll) * 0.5;
          window.scrollTo({
            top: currentScroll + scrollDistance,
            behavior: 'smooth',
          });
        }
      }, 100);
    }
  };

  return (
    <main className="pt-20 pb-10 bg-gray-100 min-h-screen relative" aria-label={`Topic: ${topic.title}`}>
      {/* Topic Progress Bar (Hidden for Assessment) */}
      {topicId !== 'assessment' && (
        <div className="fixed top-16 left-0 right-0 bg-white shadow-md z-10" role="progressbar" aria-label={`Topic progress: ${Math.round(topicProgress)}%`} aria-valuenow={Math.round(topicProgress)} aria-valuemin="0" aria-valuemax="100">
          <div className="w-full px-4 py-2">
            <div className="w-full bg-gray-200 h-2.5">
              <div
                className="bg-blue-600 h-2.5 transition-all duration-500 ease-in-out"
                style={{ width: `${topicProgress}%`, boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 mt-12">{topic.title}</h1>
        {topic.duration && (
          <p className="text-gray-600 mb-6">Duration: {topic.duration}</p>
        )}
        {Array.isArray(topic.pages) && topic.pages.length > 0 ? (
          topic.pages.map((page, index) => {
            const isVisited = visitedPages[`${topicId}-${page.id}`];
            const shouldRender = index <= currentPageIndex || isVisited;
            if (!shouldRender) return null;
            const shouldFade = index > currentPageIndex && !isVisited;
            return (
              <div
                key={page.id}
                ref={(el) => (pageRefs.current[index] = el)}
                className={`mb-8 ${shouldFade ? 'opacity-30 pointer-events-none filter blur-md' : ''}`}
              >
                <Page
                  topicId={topicId}
                  pageId={page.id}
                  isActive={index === currentPageIndex}
                  onNext={handleNextPage}
                />
              </div>
            );
          })
        ) : (
          <div>No pages available for this topic.</div>
        )}
        <NavigationButtons
          isLastPage={isLastPage}
          topicId={topicId}
          allPagesVisited={allPagesVisited}
          prevTopic={prevTopic}
          nextTopic={nextTopic}
          setCurrentTopic={setCurrentTopic}
        />
      </div>
    </main>
  );
};

export default TopicPage;