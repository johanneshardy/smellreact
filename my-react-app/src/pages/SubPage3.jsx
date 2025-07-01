import React from 'react';

const SubPage3 = () => (
  <div className="w-full">
    <h2 className="text-4xl md:text-5xl font-extrabold text-orange-700 mb-6 animate-fade-in">Subpage Three: Contact Us</h2>
    <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto animate-fade-in-delay">
      Provide all the necessary information for users to get in touch. Include a contact form,
      email addresses, phone numbers, and your physical location if applicable.
    </p>
    <form className="mt-8 max-w-md mx-auto bg-orange-50 p-6 rounded-lg shadow-md animate-slide-up">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          id="name"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300"
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300"
          placeholder="your.email@example.com"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message:</label>
        <textarea
          id="message"
          rows="4"
          className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-orange-300"
          placeholder="Your message..."
        ></textarea>
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition duration-300 hover:scale-105"
        >
          Send Message
        </button>
      </div>
    </form>
  </div>
);