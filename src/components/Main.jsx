import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const MainComponent = ({ startExam }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    startExam(); // Call the startExam function from props
    navigate('/quiz'); // Navigate to quiz page
  };
  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      <style>
        {`
          body {
            scroll-behavior: smooth;
          }

          .parallax-bg {
            background-image: url('https://www.jotform.com/blog/wp-content/uploads/2019/10/how-to-make-a-website-featured-01.png');
            background-size: cover;
            background-attachment: fixed;
            background-position: center;
            background-repeat: no-repeat;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="max-w-4xl text-center py-20 px-4 animate-fadeIn">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-blue-700"> 
            {
              isAuthenticated && <p className='text-red-700'>{user.name}</p>
            }
          Your Exam Platform</span>
        </h1>
        <p className="text-lg mb-8">
          An innovative and secure online examination system designed to provide a seamless exam-taking experience.
          Prepare, take, and review your exams from anywhere, anytime.
        </p>
        <button 
          onClick={handleGetStarted}
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transform transition-all duration-200 hover:bg-blue-700 hover:scale-105"
        >
          Start Exam
        </button>
      </div>

      {/* Features Section */}
      <div className="parallax-bg max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-40">
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition duration-200 hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Easy Exam Creation</h3>
          <p>Create and customize exams with various question types and time limits for a flexible experience.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition duration-200 hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Real-Time Tracking</h3>
          <p>Track your exam progress, timing, and get instant feedback on your performance.</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-2xl transition duration-200 hover:-translate-y-2">
          <h3 className="text-2xl font-semibold mb-4 text-blue-700">Secure & Reliable</h3>
          <p>Experience secure exams with anti-cheating features to ensure fairness and integrity.</p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-5xl px-4 py-20 text-center animate-slideUp">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">About Our Platform</h2>
        <p className="text-lg mb-4">
          Our examination platform is built with advanced technology and designed to make online exams accessible and
          effective. We provide students and educators with all the tools needed for seamless online learning and assessment.
        </p>
        <p className="text-lg">
          With a focus on security, reliability, and ease of use, our platform supports various question formats, timed
          exams, and real-time monitoring to ensure fair and effective assessments.
        </p>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-r from-blue-200 to-blue-100 w-full py-20 px-4">
        <div className="max-w-6xl mx-auto text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-105">
              <p className="italic">
                "This platform has transformed the way we conduct exams. It's user-friendly and very secure!"
              </p>
              <p className="font-semibold mt-4 text-blue-600">- John Doe, Educator</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200 hover:scale-105">
              <p className="italic">
                "As a student, I love the instant feedback and easy navigation. It's made exams much less stressful."
              </p>
              <p className="font-semibold mt-4 text-blue-600">- Jane Smith, Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;