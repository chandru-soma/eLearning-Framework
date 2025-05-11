import React, { useState, useContext } from 'react';
import CourseContext from '../context/CourseContext';

const DropdownTemplate = ({ content, isActive, onNext, topicId, pageId }) => {
  const { settings } = useContext(CourseContext);
  const [selectedOption, setSelectedOption] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  if (!content || !content.question || !Array.isArray(content.options) || !content.correctAnswer) {
    console.error('DropdownTemplate: content is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid dropdown content</div>;
  }

  const handleSubmit = () => {
    if (!isActive || !selectedOption) {
      setFeedback('Please select an option.');
      return;
    }
    const isCorrect = selectedOption === content.correctAnswer;
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. Try again.');
    setSubmitted(true);
  };

  return (
    <div className="dropdown-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Dropdown'}</h2>
      <p className="mb-4">{content.question || 'No question available'}</p>
      <select
        value={selectedOption}
        onChange={(e) => isActive && !submitted && setSelectedOption(e.target.value)}
        className={`w-full p-2 border rounded-lg ${
          !isActive || submitted ? 'bg-gray-200 cursor-not-allowed' : ''
        }`}
        disabled={!isActive || submitted}
      >
        <option value="">Select an option</option>
        {content.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
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

export default DropdownTemplate;