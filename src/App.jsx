import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamNavbar from './components/Navbar';
import MainComponent from './components/Main';
import QuizApp from './components/QuizApp';
import Footer from './components/footer';
import Loader from './components/LoadingSpinner';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(loadingTimeout); // Clear timeout if component unmounts
  }, []);

  const startExam = () => {
    console.log("Exam started");
    // Additional exam initialization logic can be added here
  };

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col">
          {/* Fixed navbar with proper z-index */}
          <header className="fixed top-0 w-full z-50">
            <ExamNavbar />
          </header>

          {/* Main content with padding-top to account for fixed navbar */}
          <main className="flex-grow pt-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <Routes>
                <Route
                  path="/"
                  element={<MainComponent startExam={startExam} />}
                />
                <Route
                  path="/quiz"
                  element={<QuizApp />}
                />
              </Routes>
            </div>
          </main>

          {/* Footer at the bottom */}
          <Footer />
        </div>
      )}
    </Router>
  );
};

export default App;
