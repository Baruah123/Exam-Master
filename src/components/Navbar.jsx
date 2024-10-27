// src/components/ExamMasterNavbar.jsx

import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useAuth0 } from "@auth0/auth0-react";

const ExamMasterNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { loginWithRedirect , isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-lime-300 shadow-md py-2' : 'bg-lime-300 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              ExamMaster
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#courses" className="text-gray-700 hover:text-blue-600 transition-colors">
              Courses
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            
            {
              isAuthenticated ? (
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
              Log Out
              </button>
               ) : (
              <button onClick={() => loginWithRedirect()}className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Log In</button>
            )}

           
            
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#courses" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Courses
            </a>
            <a href="#pricing" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Pricing
            </a>
            <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <div className="space-y-2">
              {/* <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                Sign In
              </button>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
                Sign Up
              </button> */}
              {
              isAuthenticated ? (
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded">
              Log Out
              </button>
               ) : (
              <button onClick={() => loginWithRedirect()}className="bg-blue-600 hover:bg-blue-700 text-white  py-2 rounded">Log In</button>
            )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ExamMasterNavbar;
