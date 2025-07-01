import React from 'react';

const HomePage = () => (
  <div className="w-full">
    <h2 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 animate-fade-in">Welcome to the Homepage!</h2>
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-delay">
      This is the main landing page of your website. Use this space to introduce your content, services, or mission.
      Feel free to add images, carousels, or featured sections here.
    </p>
    <div className="mt-8">
      <button
        onClick={() => alert("Learn More button clicked!")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
      >
        Learn More
      </button>
    </div>
  </div>
);

export default HomePage;