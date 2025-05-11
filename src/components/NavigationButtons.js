import React from 'react';

const NavigationButtons = ({ isLastPage, topicId, allPagesVisited, prevTopic, nextTopic, setCurrentTopic }) => {
  if (!isLastPage) return null;

  if (topicId === 'assessment') {
    console.log('Rendering Assessment Home button');
    return (
      <button
        className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-md px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 z-20"
        onClick={() => setCurrentTopic(null)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setCurrentTopic(null)}
        tabIndex={0}
        aria-label="Return to home page"
      >
        Home
      </button>
    );
  }

  return (
    <div className="flex justify-between mt-6">
      <button
        className={`px-4 py-2 rounded ${prevTopic && allPagesVisited ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        onClick={() => prevTopic && allPagesVisited && setCurrentTopic(prevTopic.id)}
        onKeyDown={(e) => prevTopic && allPagesVisited && (e.key === 'Enter' || e.key === ' ') && setCurrentTopic(prevTopic.id)}
        disabled={!prevTopic || !allPagesVisited}
        tabIndex={prevTopic && allPagesVisited ? 0 : -1}
        aria-label="Go to previous topic"
      >
        Previous Topic
      </button>
      <button
        className={`px-4 py-2 rounded ${allPagesVisited ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        onClick={() => allPagesVisited && setCurrentTopic(null)}
        onKeyDown={(e) => allPagesVisited && (e.key === 'Enter' || e.key === ' ') && setCurrentTopic(null)}
        disabled={!allPagesVisited}
        tabIndex={allPagesVisited ? 0 : -1}
        aria-label="Return to home page"
      >
        Home
      </button>
      <button
        className={`px-4 py-2 rounded ${nextTopic && allPagesVisited ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
        onClick={() => nextTopic && allPagesVisited && setCurrentTopic(nextTopic.id)}
        onKeyDown={(e) => nextTopic && allPagesVisited && (e.key === 'Enter' || e.key === ' ') && setCurrentTopic(nextTopic.id)}
        disabled={!nextTopic || !allPagesVisited}
        tabIndex={nextTopic && allPagesVisited ? 0 : -1}
        aria-label="Go to next topic"
      >
        Next Topic
      </button>
    </div>
  );
};

export default NavigationButtons;