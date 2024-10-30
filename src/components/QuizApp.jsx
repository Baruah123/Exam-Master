'use client'

import { useState, useEffect, useRef } from 'react'
import { Timer, ArrowLeft, ArrowRight, CheckCircle, XCircle, Plus, Volume2, VolumeX, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const initialExams = [
  {
    id: 1,
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts and features.",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: "What is the output of typeof null?",
        options: ["undefined", "object", "null", "number"],
        correctAnswer: 1,
        explanation: "In JavaScript, typeof null returns 'object'. This is considered a bug in the language, but it's maintained for legacy reasons."
      },
      {
        id: 2,
        question: "Which method removes the last element from an array?",
        options: ["pop()", "push()", "shift()", "unshift()"],
        correctAnswer: 0,
        explanation: "The pop() method removes the last element from an array and returns that element."
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
        correctAnswer: 1,
        explanation: "A closure is a function that has access to variables in its outer (enclosing) lexical scope, even after the outer function has returned."
      },
      {
        id: 4,
        question: "Which of the following is NOT a primitive data type in JavaScript?",
        options: ["string", "number", "boolean", "array"],
        correctAnswer: 3,
        explanation: "Array is not a primitive data type. The primitive data types in JavaScript are: string, number, boolean, null, undefined, symbol, and bigint."
      },
      {
        id: 5,
        question: "What does the 'use strict' directive do?",
        options: [
          "Enables strict mode for better error catching",
          "Improves performance of the JavaScript engine",
          "Allows use of deprecated features",
          "Disables all JavaScript warnings"
        ],
        correctAnswer: 0,
        explanation: "'use strict' enables strict mode in JavaScript, which catches common coding errors and prevents the use of certain error-prone features."
      }
    ]
  }
]

export default function ExamSystem() {
  const [exams, setExams] = useState(initialExams)
  const [currentExam, setCurrentExam] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [examState, setExamState] = useState('not-started')
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(null)
  const [examResponses, setExamResponses] = useState([])
  const [isCreatingExam, setIsCreatingExam] = useState(false)
  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    timeLimit: 600,
    questions: []
  })
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const correctSound = useRef(typeof Audio !== 'undefined' ? new Audio('/correct.mp3') : null)
  const incorrectSound = useRef(typeof Audio !== 'undefined' ? new Audio('/incorrect.mp3') : null)
  const completionSound = useRef(typeof Audio !== 'undefined' ? new Audio('/completion.mp3') : null)
  const [userCreatedExams, setUserCreatedExams] = useState([])

  useEffect(() => {
    let timer
    if (examState === 'in-progress' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            submitExam()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [examState, timeLeft])

  const startExam = (exam) => {
    setCurrentExam(exam)
    setExamState('in-progress')
    setAnswers({})
    setTimeLeft(exam.timeLimit)
    setCurrentQuestion(0)
    setScore(0)
    setShowExplanation(null)
  }

  const playSound = (sound) => {
    if (isSoundEnabled && sound.current) {
      sound.current.play().catch(error => console.error('Error playing sound:', error))
    }
  }

  const handleAnswer = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }))
    
    if (currentExam.questions[currentQuestion].correctAnswer === optionIndex) {
      playSound(correctSound)
    } else {
      playSound(incorrectSound)
    }
  }

  const submitExam = () => {
    if (!currentExam) return

    const totalQuestions = currentExam.questions.length
    const correctAnswers = currentExam.questions.reduce((acc, question) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0)
    }, 0)
    const calculatedScore = (correctAnswers / totalQuestions) * 100

    setScore(calculatedScore)
    setExamState('completed')

    const newResponse = {
      examId: currentExam.id,
      answers: answers,
      score: calculatedScore,
      completed: true
    }

    setExamResponses(prev => [...prev, newResponse])

    playSound(completionSound)
    if (calculatedScore >= 80) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleCreateExam = () => {
    const newExamWithId = {
      ...newExam,
      id: exams.length + 1,
      userCreated: true
    }
    setExams(prev => [...prev, newExamWithId])
    setUserCreatedExams(prev => [...prev, newExamWithId.id])
    setIsCreatingExam(false)
    setNewExam({
      title: '',
      description: '',
      timeLimit: 600,
      questions: []
    })
  }

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
    }))
  }

  const updateQuestion = (index, field, value) => {
    setNewExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }))
  }

  const updateOption = (questionIndex, optionIndex, value) => {
    setNewExam(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex ? {
          ...q,
          options: q.options.map((opt, j) => j === optionIndex ? value : opt)
        } : q
      )
    }))
  }

  const handleDeleteExam = (examId) => {
    setExams(prev => prev.filter(exam => exam.id !== examId))
    setUserCreatedExams(prev => prev.filter(id => id !== examId))
    setExamResponses(prev => prev.filter(response => response.examId !== examId))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-indigo-800"
        >
          Premium Exam System
        </motion.h1>

        <motion.div 
          className="fixed top-4 right-4 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            {isSoundEnabled ? <Volume2 className="w-6 h-6 text-indigo-600" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
          </button>
        </motion.div>

        {!currentExam && !isCreatingExam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Available Exams</h2>
            <div className="grid gap-4">
              {exams.map(exam => (
                <motion.div
                  key={exam.id}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-indigo-600">{exam.title}</h3>
                      <p className="text-gray-600 mb-2">{exam.description}</p>
                      <p className="text-sm text-gray-500 mb-4">Time limit: {formatTime(exam.timeLimit)}</p>
                    </div>
                    {userCreatedExams.includes(exam.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteExam(exam.id)
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete exam"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => startExam(exam)}
                    className="bg-indigo-500 text-white px-6 py-2 rounded-full hover:bg-indigo-600 transition-colors"
                  >
                    Start Exam
                  </button>
                </motion.div>
              ))}
            </div>
            <motion.button
              onClick={() => setIsCreatingExam(true)}
              className="mt-6 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5 mr-2" /> Create New Exam
            </motion.button>
          </motion.div>
        )}

        {isCreatingExam && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Create New Exam</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="examTitle" className="block text-sm font-medium text-gray-700">Exam Title</label>
                <input
                  type="text"
                  id="examTitle"
                  value={newExam.title}
                  onChange={(e) => setNewExam(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="examDescription" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="examDescription"
                  value={newExam.description}
                  onChange={(e) => setNewExam(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
              <div>
                <h3 className="text-lg font-medium mb-2">Questions</h3>
                {newExam.questions.map((question, index) => (
                  <div key={question.id} className="mb-4 p-4 border border-gray-200 rounded">
                    <input
                      type="text"
                      value={question.question}
                      onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                      placeholder="Enter question"
                      className="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => updateOption(index,   optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <input
                          type="radio"
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(index, 'correctAnswer', optionIndex)}
                          className="ml-2"
                        />
                      </div>
                    ))}
                    <textarea
                      value={question.explanation}
                      onChange={(e) => updateQuestion(index, 'explanation', e.target.value)}
                      placeholder="Explanation"
                      className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      rows={2}
                    ></textarea>
                  </div>
                ))}
                <button
                  onClick={addQuestion}
                  className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors"
                >
                  Add Question
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsCreatingExam(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateExam}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Create Exam
              </button>
            </div>
          </div>
        )}

        {currentExam && examState === 'in-progress' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{currentExam.title}</h2>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-full">
                  <Timer className="w-5 h-5" />
                  <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-700">
                  Question {currentQuestion + 1} of {currentExam.questions.length}
                </h3>
                <p className="mb-6 text-gray-700 text-lg">{currentExam.questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {currentExam.questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 text-left rounded-lg transition-colors ${
                        answers[currentExam.questions[currentQuestion].id] === index
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                      onClick={() => handleAnswer(currentExam.questions[currentQuestion].id, index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              <div className="flex justify-between items-center">
                <motion.button
                  className="flex items-center px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" /> Previous
                </motion.button>
                {currentQuestion === currentExam.questions.length - 1 ? (
                  <motion.button
                    className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                    onClick={submitExam}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Submit Exam
                  </motion.button>
                ) : (
                  <motion.button
                    className="flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setCurrentQuestion(prev => Math.min(currentExam.questions.length - 1, prev + 1))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {examState === 'completed' && currentExam && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold">Exam Results: {currentExam.title}</h2>
            </div>
            <div className="p-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-8 p-6 bg-indigo-50 rounded-lg border border-indigo-200"
              >
                <p className="text-3xl font-bold text-center text-indigo-800">
                  Your score: <span className="text-indigo-600">{score.toFixed(1)}%</span>
                </p>
                <p className="text-center mt-2 text-indigo-600 font-medium">
                  {score >= 80 ? "Excellent job!" : score >= 60 ? "Good effort!" : "Keep practicing!"}
                </p>
              </motion.div>
              <h3 className="text-xl font-semibold mb-4 text-indigo-700">Review Your Answers</h3>
              {currentExam.questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                >
                  <p className="text-lg font-medium mb-2 text-indigo-700">
                    {index + 1}. {question.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-3 rounded-lg ${
                          answers[question.id] === optionIndex
                            ? question.correctAnswer === optionIndex
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            : question.correctAnswer === optionIndex
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {option}
                        {answers[question.id] === optionIndex && (
                          <span className="ml-2">
                            {question.correctAnswer === optionIndex ? (
                              <CheckCircle className="inline w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="inline w-5 h-5 text-red-600" />
                            )}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                    onClick={() => setShowExplanation(prev => prev === question.id ? null : question.id)}
                  >
                    {showExplanation === question.id ? 'Hide' : 'Show'} Explanation
                  </button>
                  <AnimatePresence>
                    {showExplanation === question.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 p-3 bg-indigo-50 rounded-lg text-indigo-800"
                      >
                        {question.explanation}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <div className="mt-8 flex justify-center">
                <motion.button
                  onClick={() => {
                    setCurrentExam(null)
                    setExamState('not-started')
                  }}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Exam List
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {!currentExam && !isCreatingExam && examResponses.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Your Exam History</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {examResponses.map((response, index) => {
                    const exam = exams.find(e => e.id === response.examId)
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{exam?.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{response.score.toFixed(1)}%</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date().toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}