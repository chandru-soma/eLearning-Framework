import React, { useState, useEffect } from 'react';
import CourseContext from './context/CourseContext';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import TopicPage from './pages/TopicPage';
import courseData from './data/course.json';
import settings from './data/settings.json';
import './styles/tailwind.css';

const App = () => {
  const [currentTopic, setCurrentTopic] = useState(null);
  const [visitedPages, setVisitedPages] = useState({});
  const [unlockedTopics, setUnlockedTopics] = useState(
    settings.topicsLocked ? ['topic1'] : courseData.topics.map((t) => t.id)
  );
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState({});

  // Calculate course progress
  const totalPages = courseData.topics.reduce((sum, topic) => sum + (topic.pages?.length || 0), 0);
  const visitedCount = Object.keys(visitedPages).length;
  const courseProgress = totalPages > 0 ? (visitedCount / totalPages) * 100 : 0;

  // Mark page as visited
  const markPageVisited = (topicId, pageId) => {
    const pageKey = `${topicId}-${pageId}`;
    if (!visitedPages[pageKey]) {
      setVisitedPages((prev) => ({ ...prev, [pageKey]: true }));
    }
  };

  // Award points for correct question answers
  const awardPoints = (topicId, pageId, questionId) => {
    const answerKey = `${topicId}-${pageId}-${questionId}`;
    if (!correctAnswers[answerKey]) {
      setCorrectAnswers((prev) => ({ ...prev, [answerKey]: true }));
      setPoints((prev) => prev + 10); // 10 points per correct answer
    }
  };

  // Unlock topics and award badges
  useEffect(() => {
    if (!settings.topicsLocked) return;

    const topic1 = courseData.topics.find((t) => t.id === 'topic1');
    const topic1Pages = topic1?.pages || [];
    const topic1Visited = topic1Pages.every((page) => visitedPages[`topic1-${page.id}`]);

    if (topic1Visited && !unlockedTopics.includes('assessment')) {
      setUnlockedTopics((prev) => [...prev, 'assessment']);
      if (!badges.includes('topic1_complete')) {
        setBadges((prev) => [...prev, 'topic1_complete']);
      }
    }

    const assessment = courseData.topics.find((t) => t.id === 'assessment');
    const assessmentPages = assessment?.pages || [];
    const assessmentVisited = assessmentPages.every((page) => visitedPages[`assessment-${page.id}`]);

    if (assessmentVisited && !badges.includes('assessment_master')) {
      setBadges((prev) => [...prev, 'assessment_master']);
    }
  }, [visitedPages, unlockedTopics, badges]);

  // Debug course progress
  console.log('Progress calc:', {
    totalPages,
    visitedCount,
    courseProgress,
    visitedPages,
    unlockedTopics,
    points,
    badges,
    correctAnswers,
  });

  return (
    <CourseContext.Provider
      value={{
        courseData,
        settings,
        visitedPages,
        markPageVisited,
        unlockedTopics,
        courseProgress,
        points,
        badges,
        awardPoints,
      }}
    >
      <div className="app" role="main">
        <Header setCurrentTopic={setCurrentTopic} />
        {currentTopic ? (
          <TopicPage topicId={currentTopic} setCurrentTopic={setCurrentTopic} />
        ) : (
          <LandingPage setCurrentTopic={setCurrentTopic} />
        )}
      </div>
    </CourseContext.Provider>
  );
};

export default App;