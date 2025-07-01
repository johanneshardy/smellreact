import React from 'react';

const NotFoundPage = () => (
  <div className="w-full">
    <h2 className="text-5xl font-extrabold text-red-600 mb-6">404 - Page Not Found</h2>
    <p className="text-xl text-gray-700">Oops! The page you are looking for does not exist.</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300 hover:scale-105"
    >
      Go Back Home
    </button>
  </div>
);

export default NotFoundPage;