import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import PropTypes from 'prop-types';

export default function CreateExam({ onCreateExam, onCancel }) {
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    timeLimit: 600,
    questions: []
  });

  const addQuestion = () => {
    setNewExam(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: ''
        }
      ]
    }));
  };

  const updateQuestion = (index, field, value) => {
    setNewExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    setNewExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) =>
        i === questionIndex ? {
          ...q,
          options: q.options.map((opt, j) => j === optionIndex ? value : opt)
        } : q
      )
    }));
  };

  const removeQuestion = (indexToRemove) => {
    setNewExam(prev => ({
      ...prev,
      questions: prev.questions.filter((_, index) => index !== indexToRemove)
    }));
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Exam</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="examTitle" className="block text-sm font-medium text-gray-700">Exam Title</label>
          <input
            type="text"
            id="examTitle"
            value={newExam.title}
            onChange={(e) => setNewExam(prev => ({ ...prev, title: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="examDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="examDescription"
            value={newExam.description}
            onChange={(e) => setNewExam(prev => ({ ...prev, description: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
          ></textarea>
        </div>
        <div>
          <label htmlFor="examTimeLimit" className="block text-sm font-medium text-gray-700">Time Limit (seconds)</label>
          <input
            type="number"
            id="examTimeLimit"
            value={newExam.timeLimit}
            onChange={(e) => setNewExam(prev => ({ ...prev, timeLimit: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <span>Questions</span>
            <span className="ml-2 text-sm text-gray-500">({newExam.questions.length})</span>
          </h3>
          
          {newExam.questions.map((question, index) => (
            <div key={question.id} className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move mr-2" />
                  <span className="font-medium text-gray-700">Question {index + 1}</span>
                </div>
                <button
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <input
                type="text"
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                placeholder="Enter your question here..."
                className="mb-4 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              />
              
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-3">
                    <input
                      type="radio"
                      checked={question.correctAnswer === optionIndex}
                      onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                      placeholder={`Option ${optionIndex + 1}`}
                      className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                ))}
              </div>

              <textarea
                value={question.explanation}
                onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                placeholder="Add an explanation for the correct answer..."
                className="mt-4 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                rows={2}
              />
            </div>
          ))}
          
          <button
            onClick={addQuestion}
            className="w-full mt-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Question
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => onCreateExam(newExam)}
          className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
}

CreateExam.propTypes = {
  onCreateExam: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

// Setting default props to prevent errors if no handler is passed
CreateExam.defaultProps = {
  onCreateExam: () => {},
  onCancel: () => {}
};
