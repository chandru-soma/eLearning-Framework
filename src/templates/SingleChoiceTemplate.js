import React, { useState, useContext } from 'react';
import CourseContext from '../context/CourseContext';

const SingleChoiceTemplate = ({ topicId, pageId, content, isActive, onNext }) => {
  const { markPageVisited, awardPoints } = useContext(CourseContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    if (!selectedOption) {
      setFeedback('Please select an option.');
      return;
    }

    const correctOption = content.options.find((opt) => opt.isCorrect);
    if (selectedOption === correctOption.text) {
      setFeedback('Correct!');
      awardPoints(topicId, pageId, content.questionId || 'q1'); // Award 10 points
      markPageVisited(topicId, pageId);
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
        onNext();
      }, 1000);
    } else {
      setFeedback('Incorrect. Try again.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">{content.question}</h3>
      <div className="space-y-2">
        {content.options.map((option) => (
          <label key={option.text} className="flex items-center space-x-2">
            <input
              type="radio"
              name={`question-${pageId}`}
              value={option.text}
              checked={selectedOption === option.text}
              onChange={() => setSelectedOption(option.text)}
              disabled={!isActive}
              className="form-radio"
              aria-label={option.text}
            />
            <span>{option.text}</span>
          </label>
        ))}
      </div>
      {feedback && (
        <p className={`mt-4 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
          {feedback}
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={!isActive || !selectedOption}
        className={`mt-4 px-4 py-2 rounded ${
          isActive && selectedOption ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-600'
        }`}
        aria-label="Submit answer"
      >
        Submit
      </button>
    </div>
  );
};

export default SingleChoiceTemplate;