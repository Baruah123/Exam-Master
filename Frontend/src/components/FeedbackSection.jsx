import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MessageSquare, Send, Smile, Star } from 'lucide-react';
import { useAuth0 } from '@auth0/auth0-react';
import { toast } from 'react-hot-toast';

export default function FeedbackSection() {
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  const submitFeedback = async (feedbackData) => {
    try {
      console.log('Sending feedback data:', feedbackData);
      
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(feedbackData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Received non-JSON response:', await response.text());
        throw new Error('Received non-JSON response from server');
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      const data = await response.json();
      console.log('Server response:', data);
      return data;
    } catch (error) {
      console.error('Detailed error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      loginWithRedirect();
      return;
    }

    if (!rating) {
      toast.error('Please provide a rating');
      return;
    }

    if (!feedback.trim()) {
      toast.error('Please provide your feedback');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit feedback to backend
      await submitFeedback({
        rating,
        name,
        feedback,
        userId: user?.sub,
        userEmail: user?.email
      });

      // Show success message
      toast.custom((t) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Thank you for your feedback!
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  We appreciate you taking the time to help us improve.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-violet-600 hover:text-violet-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 5000,
      });

      // Reset form
      setRating(0);
      setName('');
      setFeedback('');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message || 'Failed to send feedback. Please try again.', {
        position: 'top-center',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log('User data:', user);
  }, [user]);

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {!isAuthenticated ? (
        <div className="text-center p-8">
          <p className="text-gray-700 mb-4">Please log in to submit feedback</p>
          <button
            onClick={() => loginWithRedirect()}
            className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-6 py-2 rounded-xl"
          >
            Log In
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8">
            <motion.h2 
              className="text-3xl font-bold text-white flex items-center gap-3"
              variants={itemVariants}
            >
              <MessageSquare className="w-8 h-8" />
              Your Voice Matters
            </motion.h2>
            <motion.p 
              className="text-white/80 mt-2"
              variants={itemVariants}
            >
              Help us improve your experience
            </motion.p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
              >
                {/* Rating Section */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Star className="w-5 h-5 text-amber-500" />
                    Rate your experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className={`p-2 rounded-lg transition-colors ${
                          star <= (hoveredStar || rating)
                            ? 'bg-amber-100 text-amber-500'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        <Star className="w-6 h-6" fill={star <= (hoveredStar || rating) ? 'currentColor' : 'none'} />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Name Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <Smile className="w-5 h-5 text-violet-500" />
                    Your name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>

                {/* Feedback Input */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <MessageSquare className="w-5 h-5 text-fuchsia-500" />
                    Your feedback
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
                    placeholder="Share your thoughts with us..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white py-4 rounded-xl font-medium
                             flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-xl
                             hover:shadow-violet-500/30 transition-shadow disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Feedback
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </motion.div>
            </form>
          </div>
        </div>
      )}
    </motion.div>
  );
}
