import React, { useState, useEffect } from 'react';
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
        return <HomePage />;
      case 'subpage1':
        return <SubPage1 />;
      case 'subpage2':
        return <SubPage2 />;
      case 'subpage3':
        return <SubPage3 />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      {isAuthReady && userId && (
        <div className="absolute top-2 right-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
          User ID: {userId}
        </div>
      )}

      <nav className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-lg">
        <div className="container mx-auto flex flex-wrap justify-center sm:justify-between items-center">
          <h1 className="text-white text-3xl font-bold mb-2 sm:mb-0">My Awesome Website</h1>
          <ul className="flex flex-wrap space-x-4 md:space-x-8 text-lg">
            <li>
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                            ${currentPage === 'home' ? 'bg-white text-blue-800 shadow-md scale-105' : 'text-white hover:text-blue-200 hover:bg-blue-700'}`}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('subpage1')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                            ${currentPage === 'subpage1' ? 'bg-white text-blue-800 shadow-md scale-105' : 'text-white hover:text-blue-200 hover:bg-blue-700'}`}
              >
                Subpage 1
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('subpage2')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                            ${currentPage === 'subpage2' ? 'bg-white text-blue-800 shadow-md scale-105' : 'text-white hover:text-blue-200 hover:bg-blue-700'}`}
              >
                Subpage 2
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('subpage3')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
                            ${currentPage === 'subpage3' ? 'bg-white text-blue-800 shadow-md scale-105' : 'text-white hover:text-blue-200 hover:bg-blue-700'}`}
              >
                Subpage 3
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="flex-grow container mx-auto p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 min-h-[calc(100vh-180px)] flex flex-col items-center justify-center text-center">
          {PageRouter()}
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 text-center text-sm shadow-inner mt-auto">
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
        <p>Built with React and Tailwind CSS</p>
      </footer>
    </div>
  );
};

// ADD THIS CRUCIAL EXPORT!
export default App;