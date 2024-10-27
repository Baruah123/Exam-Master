
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExamNavbar from './components/Navbar';
import MainComponent from './components/Main';
import QuizApp from './components/QuizApp';

const App = () => {
  const startExam = () => {
    console.log("Exam started");
    // You can add additional exam initialization logic here
  };

  return (
    <Router>
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
      </div>
    </Router>
  );
};

export default App;