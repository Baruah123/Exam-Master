// src/data/data.js
export const examsData = [
    {
      id: 0,
      title: 'Mathematics Exam',
      questions: [
        {
          id: 1,
          question: 'What is 2 + 2?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 3,
          explanation: '2 + 2 equals 4.',
        },
        {
          id: 2,
          question: 'What is 5 + 3?',
          options: ['6', '7', '8', '9'],
          correctAnswer: 2,
          explanation: '5 + 3 equals 8.',
        },
      ],
    },
    {
      id: 1,
      title: 'Science Exam',
      questions: [
        {
          id: 1,
          question: 'What is the chemical symbol for water?',
          options: ['O2', 'H2O', 'CO2', 'H2'],
          correctAnswer: 1,
          explanation: 'The chemical symbol for water is H2O.',
        },
        {
          id: 2,
          question: 'What planet is closest to the Sun?',
          options: ['Earth', 'Mars', 'Venus', 'Mercury'],
          correctAnswer: 3,
          explanation: 'Mercury is the closest planet to the Sun.',
        },
      ],
    },
  ];
  
  export const examResponsesData = [
    { examId: 0, date: '2024-11-01', score: 85 },
    { examId: 1, date: '2024-11-02', score: 90 },
  ];
  