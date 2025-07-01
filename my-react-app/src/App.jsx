import React, { useState, useEffect } from 'react';
// These imports are now for components that are not default exported in this single file context,
// but would be default exports from their respective files in a real project setup.
import HomePage from './pages/HomePage';
import SubPage1 from './pages/SubPage1';
import SubPage2 from './pages/SubPage2';
import SubPage3 from './pages/SubPage3';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userId, setUserId] = useState('');
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Utility function to get the current user ID.
  const getUserId = () => {
    const auth = typeof firebase !== 'undefined' && firebase.auth ? firebase.auth() : null;
    return auth?.currentUser?.uid || 'anonymous-user-' + Math.random().toString(36).substring(2, 11);
  };

  // Initialize Firebase and handle authentication
  useEffect(() => {
    if (typeof __firebase_config !== 'undefined' && typeof __app_id !== 'undefined') {
      try {
        const firebaseConfig = JSON.parse(__firebase_config);
        const app = firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth(app);
        window.firebase = { ...window.firebase, auth: () => auth }; // Expose auth globally

        const unsub = firebase.auth().onAuthStateChanged(async (user) => {
          if (!user) {
            try {
              if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                await firebase.auth().signInWithCustomToken(__initial_auth_token);
              } else {
                await firebase.auth().signInAnonymously();
              }
            } catch (error) {
              console.error("Firebase Auth Error:", error);
            }
          }
          setUserId(firebase.auth().currentUser?.uid || getUserId());
          setIsAuthReady(true);
        });
        return () => unsub();
      } catch (error) {
        console.error("Failed to initialize Firebase:", error);
        setIsAuthReady(true);
      }
    } else {
      console.warn("Firebase configuration not found. Running without Firebase.");
      setIsAuthReady(true);
    }
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