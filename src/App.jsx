// src/App.js
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import HeroSection from './Components/HeroSection';
import Footer from './Components/Footer';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
        <Footer />
        <Toaster 
          position="top-center"
          toastOptions={{
            success: {
              style: {
                background: '#1995AD',
                color: '#F1F1F2',
              },
            },
            error: {
              style: {
                background: 'gray',
                color: '#F1F1F2',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
