const express = require('express');
const router = express.Router();
const Quiz = require('../../database/quizSchema'); // Go back two levels


// Create a new quiz
router.post('/', async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes); // Use 200 OK for successful retrieval
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findOne({ id: req.params.id });
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json(quiz); // Return quiz with 200 OK status
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a quiz by ID
router.put('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json(quiz); // Return updated quiz with 200 OK
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findOneAndDelete({ id: req.params.id });
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json({ message: 'Quiz deleted successfully' }); // Return 200 OK for successful deletion
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
