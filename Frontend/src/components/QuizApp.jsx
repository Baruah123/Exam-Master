import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [pastScores, setPastScores] = useState([]);

  // Format time to display mm:ss
  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m ${remainingSeconds}s`;
  };

  // Handle timer expiration
  const handleTimeUp = useCallback(async () => {
    if (!isSubmitted) {
      await handleSubmit();
    }
  }, [isSubmitted]);

  // Timer effect
  useEffect(() => {
    if (userName && !isSubmitted && timerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [userName, isSubmitted, timerActive, timeRemaining, handleTimeUp]);

  // Start timer when user enters name
  useEffect(() => {
    if (userName && !timerActive) {
      setTimerActive(true);
    }
  }, [userName]);

  // Fetch quiz questions from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/quiz')
      .then(response => {
        console.log('Fetched questions:', response.data);
        setQuestions(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setIsLoading(false);
      });
  }, []);

  // Fetch past scores when component mounts
  useEffect(() => {
    const savedScores = localStorage.getItem('quizScores');
    if (savedScores) {
      setPastScores(JSON.parse(savedScores));
    }
  }, []);

  // Handle selecting an option
  const handleOptionSelect = (option, questionId) => {
    setSelectedOptions((prev) => {
      const newSelections = [...prev];
      newSelections[questionId] = option;
      return newSelections;
    });
  };

  // Calculate the score
  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  // Submit the exam results to the backend
  const handleSubmit = async () => {
    // Calculate score first
    let newScore = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.answer) {
        newScore += 1;
      }
    });
    setScore(newScore);

    const timeSpent = (30 * 60) - timeRemaining; // Calculate time spent in seconds

    try {
      await axios.post('http://localhost:5000/api/quiz/submit', {
        userName,
        score: newScore,
        totalQuestions: questions.length,
        correctAnswers: newScore,
        timeSpent
      });
      
      const newScoreEntry = {
        userName,
        score: newScore,
        totalQuestions: questions.length,
        date: new Date().toLocaleDateString(),
        timeSpent,
        timestamp: new Date().getTime() // Add timestamp for better sorting
      };
      
      const updatedScores = [...pastScores, newScoreEntry]
        .sort((a, b) => b.timestamp - a.timestamp) // Sort by most recent
        .slice(0, 10); // Keep only the last 10 attempts

      localStorage.setItem('quizScores', JSON.stringify(updatedScores));
      setPastScores(updatedScores);
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  const handleRestart = () => {
    setIsSubmitted(false);
    setSelectedOptions([]);
    setScore(0);
    setUserName('');
    setTimeRemaining(30 * 60);
    setTimerActive(false);
  };

  // Timer Display Component
  const TimerDisplay = () => (
    <div className={`flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border ${timeRemaining <= 60 ? 'border-red-200' : 'border-gray-200'}`}>
      <svg className={`w-5 h-5 ${timeRemaining <= 60 ? 'text-red-500' : 'text-blue-500'}`} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span className={`font-mono font-semibold ${timeRemaining <= 60 ? 'text-red-600' : 'text-blue-600'}`}>
        {formatTime(timeRemaining)}
      </span>
    </div>
  );

  // Loading animation
  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-20">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Loading your quiz...</p>
      </motion.div>
    );
  }

  // Result screen with animations
  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }} className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <motion.h2 initial={{ y: -20 }} animate={{ y: 0 }} className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Exam Completed! 🎉
          </motion.h2>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <p className="text-xl mb-4 text-center">Thank you, {userName}!</p>
            <div className="text-center p-4 bg-gray-50 rounded-lg mb-4">
              <p className="text-2xl font-bold text-blue-600">
                {score}/{questions.length}
              </p>
              <p className="text-gray-600">Final Score</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-center p-4 bg-gray-50 rounded-lg mb-4">
            <p className="text-gray-600">Time Spent</p>
            <p className="text-xl font-bold text-blue-600">
              {formatTime((30 * 60) - timeRemaining)}
            </p>
          </motion.div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRestart} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200">
            Try Again
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Add this new function in your QuizApp component
  const clearPastAttempts = () => {
    localStorage.removeItem('quizScores');
    setPastScores([]);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <AnimatePresence mode="wait">
        {!userName ? (
          <motion.div
            key="name-input"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-2xl w-full"
          >
            <motion.div className="bg-white p-8 rounded-xl shadow-lg mb-6">
              <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome to the Quiz!
              </h2>
              <motion.input
                whileFocus={{ scale: 1.02, boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)" }}
                type="text"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none mb-6 transition-all duration-200"
                placeholder="Enter your name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTimerActive(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
              >
                Start Quiz
              </motion.button>
            </motion.div>

            {pastScores.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Past Attempts</h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearPastAttempts}
                    className="px-4 py-2 text-sm text-red-600 hover:text-red-700 
                      border border-red-200 rounded-lg hover:bg-red-50 
                      transition-all duration-200"
                  >
                    Clear History
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {pastScores.slice(-3).reverse().map((score, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200 
                        hover:border-blue-300 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-gray-800">{score.userName}</p>
                          <p className="text-sm text-gray-500">{score.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">
                            {score.score}/{score.totalQuestions}
                          </p>
                          <p className="text-sm text-gray-500">
                            Time: {formatTime(score.timeSpent)}
                          </p>
                        </div>
                      </div>
                      {/* Add a progress bar to visualize the score */}
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(score.score / score.totalQuestions) * 100}%` }}
                          className="bg-blue-500 h-1.5 rounded-full"
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="quiz" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto"
          >
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg mb-6"
              whileHover={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <div className="flex justify-between items-center mb-6">
                <motion.h2 
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Hi {userName}! 
                </motion.h2>
                <TimerDisplay />
              </div>

              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {questions.map((question, index) => (
                  <motion.div
                    key={question._id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Question {index + 1}: {question.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {question.options.map((option) => (
                        <motion.label
                          key={option}
                          className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200
                            ${selectedOptions[index] === option 
                              ? 'bg-blue-50 border-2 border-blue-500 shadow-sm' 
                              : 'bg-white border-2 border-gray-200 hover:border-blue-300'}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={option}
                            checked={selectedOptions[index] === option}
                            onChange={() => handleOptionSelect(option, index)}
                            className="hidden"
                          />
                          <motion.div 
                            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center
                              ${selectedOptions[index] === option 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'}`}
                          >
                            {selectedOptions[index] === option && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 bg-white rounded-full"
                              />
                            )}
                          </motion.div>
                          <span className={`flex-grow ${selectedOptions[index] === option ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                            {option}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(59, 130, 246, 0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 px-8 rounded-xl 
                    font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 
                    flex items-center justify-center gap-2"
                >
                  <span>Submit Quiz</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Progress indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-4 rounded-xl shadow-md mb-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Progress</span>
                <span className="text-blue-600 font-semibold">
                  {selectedOptions.filter(Boolean).length} / {questions.length} answered
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${(selectedOptions.filter(Boolean).length / questions.length) * 100}%` 
                  }}
                  className="bg-blue-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizApp;
