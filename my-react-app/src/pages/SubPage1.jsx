import React from 'react';

const SubPage1 = () => (
  <div className="w-full">
    <h2 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 animate-fade-in">Subpage One: Our Services</h2>
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-delay">
      Detail your first major section here. This could be about "Services," "Products," or a specific topic.
      Provide detailed information, lists, or even a gallery.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <div className="bg-green-100 p-6 rounded-lg shadow-md animate-slide-up">
        <h3 className="text-2xl font-semibold text-green-800 mb-3">Service A</h3>
        <p className="text-gray-600">Comprehensive solution for all your needs. Customization available.</p>
      </div>
      <div className="bg-green-100 p-6 rounded-lg shadow-md animate-slide-up-delay">
        <h3 className="text-2xl font-semibold text-green-800 mb-3">Service B</h3>
        <p className="text-gray-600">Efficient and reliable delivery. Designed for maximum impact.</p>
      </div>
    </div>
  </div>
);