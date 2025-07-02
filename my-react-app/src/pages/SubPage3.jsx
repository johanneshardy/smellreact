import React, { useState } from 'react';

const SubPage3 = ({ onNavigate }) => {
  const [activeScent, setActiveScent] = useState(null);

  const scentExperiences = [
    {
      id: 1,
      title: "Floral Essence",
      description: "Delicate rose and jasmine blend",
      color: "from-pink-500 to-rose-600",
      intensity: 75
    },
    {
      id: 2,
      title: "Citrus Burst",
      description: "Fresh lemon and orange zest",
      color: "from-orange-500 to-yellow-600",
      intensity: 90
    },
    {
      id: 3,
      title: "Forest Deep",
      description: "Earthy pine and moss notes",
      color: "from-green-500 to-emerald-600",
      intensity: 60
    },
    {
      id: 4,
      title: "Ocean Breeze",
      description: "Salty air and sea minerals",
      color: "from-blue-500 to-cyan-600",
      intensity: 85
    }
  ];

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-800/20 via-transparent to-teal-800/20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-teal-500/8 rounded-full blur-2xl"></div>
      </div>

      {/* Navigation header */}
      <div className="relative z-10 flex justify-between items-center p-6">
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
      <div className="relative z-10 flex-grow flex flex-col justify-center px-8 py-8">
        <div className="max-w-6xl w-full mx-auto">
          
          {/* Header section - properly centered */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-white to-teal-300 mb-6 animate-fade-in">
              Olfactory Experience
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
              Dive into a world of scents and aromas. Discover how different fragrances 
              can evoke memories, emotions, and transport you to different places.
            </p>
          </div>

          {/* Scent experience grid - properly aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {scentExperiences.map((scent) => (
              <div 
                key={scent.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveScent(scent.id)}
                onMouseLeave={() => setActiveScent(null)}
              >
                <div className="bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50 h-full flex flex-col">
                  
                  {/* Scent indicator */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${scent.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    
                    {/* Animated scent waves */}
                    {activeScent === scent.id && (
                      <>
                        <div className="absolute inset-0 border-2 border-white/30 rounded-xl animate-ping"></div>
                        <div className="absolute inset-0 border-2 border-white/20 rounded-xl animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      </>
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-200 group-hover:to-teal-200 transition-all duration-500">
                        {scent.title}
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        {scent.description}
                      </p>
                    </div>

                    {/* Intensity indicator */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-white/60">Intensity</span>
                        <span className="text-xs text-white/60">{scent.intensity}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${scent.color} h-2 rounded-full transition-all duration-1000`}
                          style={{ width: activeScent === scent.id ? `${scent.intensity}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Create Your Scent Profile</h2>
              <p className="text-white/70 mb-6">
                Hover over the scent cards above to explore different olfactory experiences
              </p>
              
              {activeScent && (
                <div className="animate-fade-in">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-block">
                    <p className="text-white font-medium">
                      Currently exploring: <span className="text-emerald-300">
                        {scentExperiences.find(s => s.id === activeScent)?.title}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation buttons - properly centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => onNavigate('subpage2')}
              className="group relative bg-white/15 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Back to Project</span>
              </span>
            </button>
            
            <button 
              onClick={() => onNavigate('subpage1')}
              className="group relative bg-white/15 backdrop-blur-md hover:bg-white/20 text-white font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 via-emerald-600/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <span>Return to Journey</span>
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
};

export default SubPage3;