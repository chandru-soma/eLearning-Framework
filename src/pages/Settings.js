import React, { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';

const Settings = () => {
  const { settings, setSettings } = useContext(CourseContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === 'checkbox' ? checked : value });
    localStorage.setItem('settings', JSON.stringify({ ...settings, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="pt-20 max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Course Settings</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="topicsLocked"
            checked={settings.topicsLocked}
            onChange={handleChange}
            className="mr-2"
          />
          Lock Topics
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="interactiveLocked"
            checked={settings.interactiveLocked}
            onChange={handleChange}
            className="mr-2"
          />
          Lock Interactive Pages
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="hasAssessment"
            checked={settings.hasAssessment}
            onChange={handleChange}
            className="mr-2"
          />
          Include Assessment
        </label>
        <label className="block">
          Number of Assessment Questions:
          <input
            type="number"
            name="assessmentQuestions"
            value={settings.assessmentQuestions}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
            min="1"
          />
        </label>
        <label className="block">
          Assessment Attempts:
          <input
            type="number"
            name="assessmentAttempts"
            value={settings.assessmentAttempts}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
            min="1"
          />
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="randomizeQuestions"
            checked={settings.randomizeQuestions}
            onChange={handleChange}
            className="mr-2"
          />
          Randomize Questions
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="randomizeOptions"
            checked={settings.randomizeOptions}
            onChange={handleChange}
            className="mr-2"
          />
          Randomize Options
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="hasResources"
            checked={settings.hasResources}
            onChange={handleChange}
            className="mr-2"
          />
          Include Resource Section
        </label>
        <label className="block">
          Knowledge Check Attempts:
          <input
            type="number"
            name="knowledgeCheckAttempts"
            value={settings.knowledgeAssessAttempts}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
            min="1"
          />
        </label>
      </form>
    </div>
  );
};

export default Settings;