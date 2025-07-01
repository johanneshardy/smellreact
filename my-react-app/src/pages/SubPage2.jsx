import React from 'react';

const SubPage2 = () => (
  <div className="w-full">
    <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-6 animate-fade-in">Subpage Two: About Us</h2>
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-delay">
      Share your company's story, mission, and values here. Introduce your team members,
      showcase your history, or explain your unique approach.
    </p>
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8">
      <div className="bg-purple-100 p-6 rounded-lg shadow-md animate-zoom-in">
        <h3 className="text-2xl font-semibold text-purple-800 mb-3">Our Mission</h3>
        <p className="text-gray-600">Empowering users with innovative and accessible solutions.</p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg shadow-md animate-zoom-in-delay">
        <h3 className="text-2xl font-semibold text-purple-800 mb-3">Our Vision</h3>
        <p className="text-gray-600">To be a leader in transformative digital experiences.</p>
      </div>
    </div>
  </div>
);

export default SubPage2;