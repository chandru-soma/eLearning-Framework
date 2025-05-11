import React, { useState } from 'react';

const ScenarioBranchingTemplate = ({ content }) => {
  const [currentOutcome, setCurrentOutcome] = useState(null);

  // Validate content and branches
  if (!content || !Array.isArray(content.branches)) {
    console.error('ScenarioBranchingTemplate: content or content.branches is invalid:', content);
    return <div className="p-4 text-red-600">Error: Invalid scenario content</div>;
  }

  return (
    <div className="scenario-branching-template p-4">
      <h2 className="text-2xl font-bold mb-4">{content.title || 'Scenario'}</h2>
      <p className="mb-4">{content.scenario || 'No scenario description available'}</p>
      {content.branches.length > 0 ? (
        <div className="space-y-2">
          {content.branches.map((branch, index) => (
            <button
              key={index}
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setCurrentOutcome(branch.next)}
            >
              {branch.option || `Option ${index + 1}`}
            </button>
          ))}
        </div>
      ) : (
        <div className="p-4 text-gray-600">No branches available</div>
      )}
      {currentOutcome && (
        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <p>{currentOutcome}</p>
        </div>
      )}
    </div>
  );
};

export default ScenarioBranchingTemplate;