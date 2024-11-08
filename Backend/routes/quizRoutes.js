const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Sample quiz questions
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    id: 4,
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    id: 5,
    question: "Which of these is not a JavaScript framework?",
    options: ["Angular", "Django", "Vue", "React"],
    answer: "Django"
  },
  {
    id: 6,
    question: "What is the purpose of CSS in web development?",
    options: ["Database Management", "Styling and Layout", "Server-side Logic", "Form Validation"],
    answer: "Styling and Layout"
  },
  {
    id: 7,
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["//", "/*", "#", "<!--"],
    answer: "//"
  },
  {
    id: 8,
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interface", "Application Process Integration"],
    answer: "Application Programming Interface"
  }
];

// Fetch quiz questions
router.get('/', (req, res) => {
  res.json(questions);
});

// Store quiz results
router.post('/submit', async (req, res) => {
  const { userName, score, totalQuestions, correctAnswers } = req.body;

  try {
    const newResult = new Result({ userName, score, totalQuestions, correctAnswers });
    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving result' });
  }
});

module.exports = router;
