import React, { useState, useEffect } from 'react';
import './App.css';
// Import the page components
import HomePage from './pages/HomePage';
import SubPage1 from './pages/SubPage1';
import SubPage2 from './pages/SubPage2';
import SubPage3 from './pages/SubPage3';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userId, setUserId] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Simplified without Firebase for now
  useEffect(() => {
    // Set a simple user ID without Firebase
    setUserId('user-' + Math.random().toString(36).substring(2, 11));
    setIsAuthReady(true);
  }, []);

  const PageRouter = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'subpage1':
        return <SubPage1 onNavigate={setCurrentPage} />;
      case 'subpage2':
        return <SubPage2 onNavigate={setCurrentPage} />;
      case 'subpage3':
        return <SubPage3 onNavigate={setCurrentPage} />;
      default:
        return <NotFoundPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* User ID badge - only show on non-home pages */}
      {isAuthReady && userId && currentPage !== 'home' && (
        <div className="fixed top-4 right-4 bg-black/20 backdrop-blur-sm text-white/80 text-xs px-3 py-1 rounded-full shadow-lg z-50">
          User: {userId}
        </div>
      )}

      {/* Full screen content */}
      <main className="w-full h-full">
        {PageRouter()}
      </main>
    </div>
  );
};

export default App;