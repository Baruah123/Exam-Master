'use client'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { motion } from "framer-motion"

export default function Component({ startExam }) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth0()

  const handleGetStarted = () => {
    startExam()
    navigate('/quiz')
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      {/* Hero Section */}
      <motion.div 
        className="max-w-4xl text-center py-32 px-4"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Welcome to {' '}
          {isAuthenticated && <span className="text-primary">{user.name}'s</span>}
          {' '}Exam Platform
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          An innovative and secure online examination system designed to provide a seamless exam-taking experience.
          Prepare, take, and review your exams from anywhere, anytime.
        </p>
        {isAuthenticated && (
          <motion.button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-10 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Exam
          </motion.button>
        )}
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="w-full bg-fixed bg-center bg-cover py-40"
        style={{
          backgroundImage: `url('https://www.jotform.com/blog/wp-content/uploads/2019/10/how-to-make-a-website-featured-01.png')`
        }}
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Easy Exam Creation</h3>
            <p className="text-gray-600">Create and customize exams with various question types and time limits for a flexible experience.</p>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Real-Time Tracking</h3>
            <p className="text-gray-600">Track your exam progress, timing, and get instant feedback on your performance.</p>
          </motion.div>
          <motion.div 
            className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300"
            variants={fadeIn}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-700">Secure & Reliable</h3>
            <p className="text-gray-600">Experience secure exams with anti-cheating features to ensure fairness and integrity.</p>
          </motion.div>
        </div>
      </motion.div>

      {/* About Section */}
      <motion.div 
        className="max-w-5xl px-4 py-20 text-center"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-800">About Our Platform</h2>
        <p className="text-xl mb-4 text-gray-600">
          Our examination platform is built with advanced technology and designed to make online exams accessible and
          effective. We provide students and educators with all the tools needed for seamless online learning and assessment.
        </p>
        <p className="text-xl text-gray-600">
          With a focus on security, reliability, and ease of use, our platform supports various question formats, timed
          exams, and real-time monitoring to ensure fair and effective assessments.
        </p>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div 
        className="w-full bg-gradient-to-r from-blue-100 to-purple-100 py-20 px-4"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              variants={fadeIn}
            >
              <p className="text-lg italic text-gray-600">
                "This platform has transformed the way we conduct exams. It's user-friendly and very secure!"
              </p>
              <p className="font-semibold mt-6 text-blue-600">- John Doe, Educator</p>
            </motion.div>
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
              variants={fadeIn}
            >
              <p className="text-lg italic text-gray-600">
                "As a student, I love the instant feedback and easy navigation. It's made exams much less stressful."
              </p>
              <p className="font-semibold mt-6 text-blue-600">- Jane Smith, Student</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}