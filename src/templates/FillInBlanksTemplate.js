import React, { useState, useContext } from 'react';
import CourseContext from '../context/CourseContext';

const FillInBlanksTemplate = ({ content, isActive, onNext, topicId, pageId }) => {
  const { settings } = useContext(CourseContext);
  const [inputValue, setInputValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!content || !content.question || !Array.isArray(content.correctAnswers)) {
    console.error('FillInBlanksTemplate: content is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid fill-in-blanks content</div>;
  }

  const handleSubmit = () => {
    if (!isActive || !inputValue.trim()) {
      setFeedback('Please enter an answer.');
      return;
    }
    const isCorrect = content.correctAnswers.some(
      (answer) => answer.toLowerCase() === inputValue.trim().toLowerCase()
    );
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. Try again.');
    setSubmitted(true);
  };

  return (
    <div className="fill-in-blanks-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Fill in the Blanks'}</h2>
      <p className="mb-4">{content.question || 'No question available'}</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => isActive && !submitted && setInputValue(e.target.value)}
        className={`w-full p-2 border rounded-lg ${
          !isActive || submitted ? 'bg-gray-200 cursor-not-allowed' : ''
        }`}
        disabled={!isActive || submitted}
        placeholder="Type your answer"
      />
      {!submitted && isActive && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {(submitted || !settings.interactiveLocked) && isActive && onNext()}
      {feedback && <p className="mt-4 text-gray-700">{feedback}</p>}
    </div>
  );
};

export default FillInBlanksTemplate;