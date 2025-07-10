const NotFoundPage = ({ onNavigate }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-800/20 via-transparent to-orange-800/20"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-500/8 rounded-full blur-2xl"></div>

        {/* Floating error symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white/5 text-6xl font-bold animate-pulse"
              style={{
                left: `${10 + i * 6}%`,
                top: `${15 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + i * 0.3}s`,
                transform: `rotate(${i * 15}deg)`
              }}
            >
              404
            </div>
          ))}
        </div>
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

      {/* Main content - properly centered */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-8">
        <div className="max-w-4xl w-full text-center">

          {/* Large 404 display */}
          <div className="mb-12">
            <div className="relative">
              {/* Glowing background 404 */}
              <h1 className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/10 blur-lg scale-110 animate-pulse">
                404
              </h1>
              {/* Main 404 */}
              <h1 className="relative text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 mb-6 animate-fade-in">
                404
              </h1>
            </div>

            <div className="w-32 h-0.5 bg-gradient-to-r from-red-400 to-orange-500 mx-auto rounded-full mb-8"></div>
          </div>

          {/* Error message */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in-delay">
              Oops! Page Not Found
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-8 animate-slide-up">
              The page you're looking for seems to have wandered off into the digital void.
              Don't worry, it happens to the best of us!
            </p>
          </div>

          {/* Helpful suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 animate-slide-up-delay">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Go Home</h3>
              <p className="text-white/70 text-sm">Return to our beautiful homepage</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Explore</h3>
              <p className="text-white/70 text-sm">Check out our project sections</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Refresh</h3>
              <p className="text-white/70 text-sm">Try reloading the page</p>
            </div>
          </div>

          {/* Action buttons - properly centered */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('home')}
              className="group relative bg-white/15 backdrop-blur-md hover:bg-white/20 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Take Me Home</span>
              </span>
            </button>

            <button
              onClick={() => window.location.reload()}
              className="group relative bg-white/15 backdrop-blur-md hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/30 hover:border-white/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-teal-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center space-x-2">
                <svg className="w-4 h-4 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reload Page</span>
              </span>
            </button>
          </div>

          {/* Fun fact */}
          <div className="mt-12 animate-fade-in">
            <p className="text-white/50 text-sm">
              Did you know? The first 404 error was at CERN in 1992 when Tim Berners-Lee's server couldn't find a requested page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;