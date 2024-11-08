const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables

// Import routes
const quizRoutes = require('./routes/quizRoutes');  // Assuming the path for quiz routes
const feedbackRouter = require('./api/feedback');  // Assuming the path for feedback routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(express.json());  // Parse JSON data from incoming requests

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

// Routes
app.use('/api/quiz', quizRoutes);  // Quiz API endpoint
app.use(feedbackRouter);  // Feedback API endpoint

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
