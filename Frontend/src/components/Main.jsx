'use client'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { motion, useScroll, useTransform } from "framer-motion"
import PropTypes from 'prop-types'
import { useRef } from 'react'
import FeedbackSection from './FeedbackSection'


export default function Component({ startExam }) {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth0()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const handleGetStarted = () => {
    startExam()
    navigate('/quiz')
  }

  // Modern animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }
    }
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 to-white" ref={containerRef}>
      {/* Modern Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Patterns */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
          style={{ opacity, scale }}
        >
          <motion.div 
            className="text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-8"
              variants={fadeInUp}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                Welcome to {' '}
                {isAuthenticated && (
                  <span className="text-primary">{user.name}&apos;s</span>
                )}
                {' '}Exam
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Platform
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12"
              variants={fadeInUp}
            >
              Experience the future of online examinations with our innovative platform.
              Seamless. Secure. Smart.
            </motion.p>

            {isAuthenticated && (
              <motion.div variants={fadeInUp}>
                <motion.button
                  onClick={handleGetStarted}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden shadow-lg transition-all duration-300 ease-out hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Your Journey</span>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 -z-20 bg-gradient-to-r from-purple-600 to-blue-600" />
                </motion.button>
              </motion.div>
            )}

            {/* Modern Stats Section */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {[
                { number: "10k+", label: "Active Users", icon: "👥" },
                { number: "1M+", label: "Exams Completed", icon: "📝" },
                { number: "98%", label: "Success Rate", icon: "🎯" }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeInUp}
                  className="relative group"
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                  <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                    <div className="text-4xl mb-4">{stat.icon}</div>
                    <motion.h4 
                      className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {stat.number}
                    </motion.h4>
                    <p className="text-gray-600 mt-2 text-lg">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Features Section with Modern Cards */}
      <motion.section 
        className="py-20 px-4 bg-gradient-to-b from-white to-gray-50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            variants={fadeInUp}
          >
            Why Choose Our Platform?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Lightning Fast",
                description: "Experience seamless performance with our optimized platform"
              },
              {
                icon: "🔒",
                title: "Highly Secure",
                description: "Advanced security measures to protect your examination process"
              },
              {
                icon: "📊",
                title: "Smart Analytics",
                description: "Comprehensive insights and performance tracking"
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl transform -rotate-6 group-hover:-rotate-12 transition-transform duration-300" />
                <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-semibold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technology Stack Section */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            Powered by Modern Technology
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "React", icon: "⚛️" },
              { name: "Node.js", icon: "🟢" },
              { name: "MongoDB", icon: "🍃" },
              { name: "AWS", icon: "☁️" },
              { name: "GraphQL", icon: "📊" },
              { name: "WebSocket", icon: "🔌" },
              { name: "Redis", icon: "⚡" },
              { name: "Docker", icon: "🐳" }
            ].map((tech) => (
              <motion.div
                key={tech.name}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative bg-white p-6 rounded-xl shadow-lg">
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{tech.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-b from-white to-gray-50"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Sign Up", description: "Create your account in seconds", icon: "👤" },
              { step: "2", title: "Choose Exam", description: "Select from various categories", icon: "📚" },
              { step: "3", title: "Take Test", description: "Complete the examination", icon: "✍️" },
              { step: "4", title: "Get Results", description: "Receive instant feedback", icon: "🎯" }
            ].map((process) => (
              <motion.div
                key={process.step}
                variants={fadeInUp}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{process.icon}</div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {process.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">{process.title}</h3>
                  <p className="text-gray-600">{process.description}</p>
                </div>
                {process.step !== "4" && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          >
            What Our Users Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Student",
                image: "👩‍🎓",
                quote: "This platform made my exam preparation so much easier. The interface is intuitive and the feedback is invaluable."
              },
              {
                name: "Dr. Michael Brown",
                role: "Professor",
                image: "👨‍🏫",
                quote: "As an educator, I find this platform extremely helpful in creating and managing exams. The analytics are particularly useful."
              },
              {
                name: "Emily Chen",
                role: "Student",
                image: "👩‍💻",
                quote: "The practice tests and instant feedback helped me improve my performance significantly. Highly recommended!"
              }
            ].map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeInUp}
                className="group relative"
                whileHover={{ y: -8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl transform rotate-6 group-hover:rotate-12 transition-transform duration-300" />
                <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                  <div className="text-6xl mb-6">{testimonial.image}</div>
                  <p className="text-gray-600 italic mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-purple-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Feedback Form for Authenticated Users */}
      {isAuthenticated && <FeedbackSection />}

     

    </div>
  )
}

Component.propTypes = {
  startExam: PropTypes.func.isRequired
}