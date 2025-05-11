import React, { useState, useMemo, useContext } from 'react';
import CourseContext from '../context/CourseContext';

const MultipleChoiceTemplate = ({ content, isActive, onNext }) => {
  const { settings } = useContext(CourseContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Memoize shuffled options to prevent re-shuffling
  const options = useMemo(() => {
    if (settings.randomizeOptions && !submitted) {
      return [...content.options].sort(() => Math.random() - 0.5);
    }
    return content.options;
  }, [content.options, settings.randomizeOptions]);

  if (!content || !Array.isArray(content.options)) {
    console.error('MultipleChoiceTemplate: content or content.options is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid multiple choice content</div>;
  }

  const handleOptionClick = (index) => {
    if (!isActive || submitted) return;
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter((i) => i !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  const handleSubmit = () => {
    if (!isActive || selectedOptions.length === 0) {
      setFeedback('Please select at least one option.');
      return;
    }
    const correctOptions = content.options
      .map((opt, idx) => (opt.isCorrect ? idx : -1))
      .filter((idx) => idx !== -1);
    const isCorrect =
      selectedOptions.length === correctOptions.length &&
      selectedOptions.every((idx) => correctOptions.includes(idx));
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect. Try again.');
    setSubmitted(true);
  };

  return (
    <div className="multiple-choice-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Multiple Choice'}</h2>
      <p className="mb-4">{content.question || 'No question available'}</p>
      {options.length > 0 ? (
        <div className="space-y-2">
          {options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left rounded-lg ${
                selectedOptions.includes(index)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } ${!isActive || submitted ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleOptionClick(index)}
              disabled={!isActive || submitted}
            >
              {option.text || `Option ${index + 1}`}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No options available</div>
      )}
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

export default MultipleChoiceTemplate;