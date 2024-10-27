// src/App.jsx

import ExamNavbar from './components/Navbar';
import MainComponent from './components/Main';

function App() {
  const startExam = () => {
    console.log("Exam started"); // Placeholder for exam start function
  };

  return (
    <div className="App">
      <ExamNavbar />
      <main className="p-4">
        <MainComponent startExam={startExam} />
      </main>
    </div>
  );
}

export default App;
