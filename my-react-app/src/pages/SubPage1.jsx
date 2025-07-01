import React from 'react';

const SubPage1 = ({ onNavigate }) => (
  <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-hidden">
    {/* Background effects - softer */}
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-transparent to-purple-800/20"></div>
      <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/8 rounded-full blur-2xl"></div>
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
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-purple-200 mb-6 animate-fade-in">
            Your Journey
          </h1>
          <div className="w-24 h-0.5 bg-gradient-to-r from-blue-300 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
            Welcome to an extraordinary adventure where discovery meets innovation. 
            Every step forward opens new possibilities.
          </p>
        </div>

        {/* Feature cards with better visibility */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Start Fast</h3>
            <p className="text-white/80">Begin your journey with powerful tools and intuitive design.</p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Innovate</h3>
            <p className="text-white/80">Discover new possibilities and push the boundaries of what's possible.</p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Achieve</h3>
            <p className="text-white/80">Reach your goals with guided pathways and measurable results.</p>
          </div>
        </div>

        {/* Call to action with better visibility */}
        <div className="mt-16">
          <button 
            onClick={() => onNavigate('subpage2')}
            className="group relative bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center space-x-2">
              <span>Continue to Project</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default SubPage1;