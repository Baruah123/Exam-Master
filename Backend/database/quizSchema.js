const mongoose = require('mongoose');

const { Schema } = mongoose;

// Define the Question schema
const questionSchema = new Schema({
    id: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: true },
});

// Define the Quiz schema
const quizSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    questions: { type: [questionSchema], required: true },
});

// Create and export the Quiz model
module.exports = mongoose.model('Quiz', quizSchema);
