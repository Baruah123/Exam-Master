import { useState, useEffect } from 'react';
import { Timer, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

const QuizApp = () => {
  // Sample quiz data - in real app, this would come from props or API
  const quizData = {
    title: "JavaScript Fundamentals",
    timeLimit: 600, // 10 minutes in seconds
    questions: [
      {
        id: 1,
        question: "What is the output of typeof null?",
        options: ["undefined", "object", "null", "number"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which method removes the last element from an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "What is closure in JavaScript?",
        options: [
          "A design pattern",
          "A function with access to its outer scope",
          "A JavaScript library",
          "A data structure"
        ],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is closure in JavaScript?",
        options: [
          "A design pattern",
          "A function with access to its outer scope",
          "A JavaScript library",
          "A data structure"
        ],
        correctAnswer: 1
      }
    ]
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.timeLimit);
  const [quizState, setQuizState] = useState('not-started'); // not-started, in-progress, completed
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (quizState === 'in-progress' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setQuizState('completed');
            calculateScore();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [quizState, timeLeft]);

  const startQuiz = () => {
    setQuizState('in-progress');
    setAnswers({});
    setTimeLeft(quizData.timeLimit);
    setCurrentQuestion(0);
    setScore(0);
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizData.questions.find(q => q.id === parseInt(questionId));
      if (question && question.correctAnswer === answer) {
        correct++;
      }
    });
    setScore((correct / quizData.questions.length) * 100);
  };

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const submitQuiz = () => {
    setQuizState('completed');
    calculateScore();
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{quizData.title}</h2>
            {quizState === 'in-progress' && (
              <div className="flex items-center gap-2 bg-blue-500 px-3 py-1 rounded">
                <Timer className="w-5 h-5" />
                <span className="font-mono">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {quizState === 'not-started' && (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Quiz Instructions</h3>
              <ul className="text-left mb-6 space-y-2 text-gray-600">
                <li>• Time limit: {formatTime(quizData.timeLimit)}</li>
                <li>• Total questions: {quizData.questions.length}</li>
                <li>• You can navigate between questions</li>
                <li>• Submit before time runs out</li>
              </ul>
              <button 
                onClick={startQuiz}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Start Quiz
              </button>
            </div>
          )}

          {quizState === 'in-progress' && (
            <>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Question {currentQuestion + 1} of {quizData.questions.length}
                </h3>
                <p className="mb-4 text-gray-700">{quizData.questions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {quizData.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full p-3 text-left rounded transition-colors ${
                        answers[quizData.questions[currentQuestion].id] === index
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleAnswer(quizData.questions[currentQuestion].id, index)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  className="flex items-center px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:opacity-50"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </button>
                
                {currentQuestion === quizData.questions.length - 1 ? (
                  <button
                    className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    onClick={submitQuiz}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    className="flex items-center px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => setCurrentQuestion(prev => Math.min(quizData.questions.length - 1, prev + 1))}
                    disabled={currentQuestion === quizData.questions.length - 1}
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </>
          )}

          {quizState === 'completed' && (
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Quiz Completed!</h3>
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg">
                  Your score: <span className="font-bold text-blue-600">{score.toFixed(1)}%</span>
                </p>
              </div>
              <button 
                onClick={startQuiz}
                className="flex items-center mx-auto px-6 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Retake Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      {quizState === 'in-progress' && (
        <div className="mt-4 bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-6 gap-2">
            {quizData.questions.map((_, index) => (
              <button
                key={index}
                className={`p-2 rounded ${
                  answers[quizData.questions[index].id] !== undefined
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;