// src/components/ExamMasterNavbar.jsx

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const ExamMasterNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-lime-300 shadow-lg py-2"
          : "bg-lime-300/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <Link
              to="/"
              className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform duration-200"
            >
              ExamMaster
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="relative text-gray-700 font-medium group"
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-blue-600">
                    Dashboard
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/create-exam"
                  className="relative text-gray-700 font-medium group"
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-blue-600">
                    Create Exam
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <a
                  href="/results"
                  className="relative text-gray-700 font-medium group"
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-blue-600">
                    Results
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <a
                  href="#about"
                  className="relative text-gray-700 font-medium group"
                >
                  <span className="relative z-10 transition-colors duration-200 group-hover:text-blue-600">
                    About
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                </a>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10">Log Out</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Log In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block text-gray-700 hover:text-blue-600 hover:pl-2 transition-all duration-200"
                >
                  Dashboard
                </Link>
                <a
                  href="/create-exam"
                  className="block text-gray-700 hover:text-blue-600 hover:pl-2 transition-all duration-200"
                >
                  Create Exam
                </a>
                <a
                  href="/results"
                  className="block text-gray-700 hover:text-blue-600 hover:pl-2 transition-all duration-200"
                >
                  Results
                </a>
                <a
                  href="#about"
                  className="block text-gray-700 hover:text-blue-600 hover:pl-2 transition-all duration-200"
                >
                  About
                </a>
                <button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="w-full relative overflow-hidden bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  <span className="relative z-10">Log Out</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
                </button>
              </>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10">Log In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 origin-left transition-transform duration-300 hover:scale-x-100"></div>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ExamMasterNavbar;