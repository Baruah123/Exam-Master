const express = require('express');
const router = express.Router();

// You might want to add a database connection here
// const db = require('../db');

router.post('/api/feedback', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const { rating, name, feedback, userId, userEmail } = req.body;

    // Validate the input
    if (!rating || !feedback) {
      console.log('Validation failed:', { rating, feedback });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Log successful submission
    console.log('Feedback submitted:', { rating, name, feedback, userId, userEmail });

    res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

module.exports = router;