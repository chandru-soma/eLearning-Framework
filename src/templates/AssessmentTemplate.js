import React, { useState, useContext } from 'react';
import CourseContext from '../context/CourseContext';

const AssessmentTemplate = ({ content }) => {
  const { settings } = useContext(CourseContext);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!content || !Array.isArray(content.questions)) {
    console.error('AssessmentTemplate: content or content.questions is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid assessment content</div>;
  }

  const handleAnswer = (questionIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = (questionIndex) => {
    if (answers[questionIndex] === undefined) {
      alert('Please select an option.');
      return;
    }
    setSubmittedQuestions((prev) => ({ ...prev, [questionIndex]: true }));
    if (questionIndex < content.questions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    content.questions.forEach((question, index) => {
      const selectedOption = answers[index];
      if (
        selectedOption !== undefined &&
        question.options[selectedOption]?.isCorrect
      ) {
        correct++;
      }
    });
    const percentage = content.questions.length > 0 ? (correct / content.questions.length) * 100 : 0;
    return { correct, total: content.questions.length, percentage };
  };

  if (!started) {
    return (
      <div className="assessment-template p-4">
        <img
          src={content.bannerImage || '/assets/images/assessment.jpg'}
          alt="Assessment Banner"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">{content.title || 'Assessment'}</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Instructions</h3>
          <p>Questions: {content.questions.length}</p>
          <p>Attempts Allowed: {settings.assessmentAttempts}</p>
          <p>Passing Score: 70%</p>
        </div>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => setStarted(true)}
        >
          Start the Assessment
        </button>
      </div>
    );
  }

  if (showResults) {
    const { correct, total, percentage } = calculateResults();
    return (
      <div className="assessment-template p-4">
        <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
        <p>Correct Answers: {correct} / {total}</p>
        <p>Score: {percentage.toFixed(2)}%</p>
        <p>{percentage >= 70 ? 'Congratulations, you passed!' : 'Please try again.'}</p>
      </div>
    );
  }

  const question = content.questions[currentQuestion];

  return (
    <div className="assessment-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Assessment'}</h2>
      <p className="mb-4">{question.question || 'No question available'}</p>
      {question.options?.length > 0 ? (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`w-full p-3 text-left rounded-lg ${
                answers[currentQuestion] === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              } ${submittedQuestions[currentQuestion] ? 'cursor-not-allowed' : ''}`}
              onClick={() => !submittedQuestions[currentQuestion] && handleAnswer(currentQuestion, index)}
              disabled={submittedQuestions[currentQuestion]}
            >
              {option.text || `Option ${index + 1}`}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No options available</div>
      )}
      {!submittedQuestions[currentQuestion] && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleSubmit(currentQuestion)}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default AssessmentTemplate;