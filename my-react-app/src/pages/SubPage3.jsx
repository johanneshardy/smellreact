import React from 'react';

const SubPage2 = ({ onNavigate }) => (
  <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-hidden">
    {/* Background effects - softer */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-800/20 via-transparent to-pink-800/20"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/8 rounded-full blur-2xl"></div>
    </div>

    {/* Navigation header with better visibility */}
    <div className="relative z-10 p-6 flex justify-between items-center">
      <button 
        onClick={() => onNavigate('home')}
        className="group flex items-center space-x-2 text-white/80 hover:text-white transition-all duration-300 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl border border-white/30 hover:border-white/50"
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium text-sm">Back to Home</span>
      </button>
      
      <button 
        onClick={() => onNavigate('home')}
        className="group p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white/80 hover:text-white border border-white/30 hover:border-white/50"
        title="Return to Home"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>
    </div>

    {/* Main content */}
    <div className="relative z-10 flex-grow flex items-center justify-center px-8">
      <div className="max-w-4xl w-full text-center">
        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-pink-300 mb-6 animate-fade-in">
            Project Introduction
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            Discover the vision, mission, and innovative approach that drives our project forward. 
            Learn about our goals and the impact we aim to create.
          </p>
        </div>

        {/* Project details with unified theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-slide-up">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-white/70 text-sm">Creating innovative solutions that bridge technology and human experience, making complex concepts accessible to everyone.</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40">
            <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Our Team</h3>
            <p className="text-white/70 text-sm">A diverse group of researchers, designers, and innovators working together to push the boundaries of what's possible.</p>
          </div>
        </div>

        {/* Navigation buttons with unified theme */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate('subpage1')}
            className="group relative bg-white/10 backdrop-blur-md hover:bg-white/15 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-white/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center space-x-2">
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Journey</span>
            </span>
          </button>
          
          <button 
            onClick={() => onNavigate('subpage3')}
            className="group relative bg-white/10 backdrop-blur-md hover:bg-white/15 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/20 hover:border-white/40 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center space-x-2">
              <span>Explore Smell</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SubPage2;