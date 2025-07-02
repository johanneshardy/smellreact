import { useState, useEffect } from 'react';

const HomePage = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Enhanced mouse tracking with smoothing
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden full-screen-page select-none">
      {/* Academic Header with Logo */}
      <div className="z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 shadow-lg">
              <img 
              src="/src/assets/last2-WRITING-CENTER-LOGO-e1746460777646.png" 
              alt="UWC Logo" 
              className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white ">
              <h2 className="text-lg font-bold tracking-wide">UM-SJTU</h2>
              <p className="text-xs text-white/80 uppercase mb-0">Writing Center</p>
            </div>
          </div>
              
          <nav className="hidden md:flex items-center space-x-6 text-sm text-white/80">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Services</a>
            <a href="#" className="hover:text-white transition-colors">Resources</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>
        </div>
      </div>

      {/* Enhanced animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-transparent to-purple-800/20"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 animate-pulse"></div>
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-10 blur-3xl transition-all duration-[3000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.3}px) rotate(${scrollY * 0.1}deg)`,
            top: '10%',
            right: '10%'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-8 blur-2xl transition-all duration-[4000ms] ease-out"
          style={{
            background: 'radial-gradient(circle, #34d399 0%, #60a5fa 50%, #a78bfa 100%)',
            transform: `translate(-${mousePosition.x * 0.3}px, ${mousePosition.y * 0.4}px) rotate(-${scrollY * 0.15}deg)`,
            bottom: '15%',
            left: '15%'
          }}
        />
        
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 7}%`,
              top: `${20 + (i % 4) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${3 + i * 0.2}s`,
              transform: `translate(${Math.sin(i) * 10}px, ${Math.cos(i) * 10}px)`
            }}
          />
        ))}
      </div>

      {/* Main content container - middle section with flex-1 */}
      <div className="flex-1 relative z-10 overflow-auto">
        <div className="min-h-full flex flex-col justify-center items-center py-8">
          <div className={`w-full max-w-6xl mx-auto px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
          {/* Academic Title section - more professional */}
          <div className="text-center mb-8">
            <div className="relative mb-6">
              <h1 className="relative text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-200 tracking-tight leading-none animate-fade-in">
                Academic Excellence
              </h1>
            </div>
            
            {/* Professional subtitle */}
            <p className="text-xl md:text-2xl text-white/90 font-light mb-6 tracking-wide animate-fade-in-delay">
              Advancing Knowledge Through Writing & Research
            </p>
            
            {/* Institution decorative line */}
            <div className="relative w-40 h-0.5 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full"></div>
            </div>
          </div>

          {/* Professional CTA - more academic */}
          <div className="text-center mb-12">
            <button 
              onClick={() => onNavigate('subpage1')}
              className="group relative text-2xl md:text-3xl font-semibold text-white leading-tight px-12 py-6 md:px-16 md:py-8 rounded-2xl transition-all duration-500 hover:scale-105 transform-gpu overflow-hidden bg-slate-800/40 backdrop-blur-md border border-amber-400/30 hover:border-amber-400/60 shadow-2xl hover:shadow-3xl"
            >
              {/* Professional background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              <span className="relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-500">
                Explore Our Programs
              </span>
              
              <span className="inline-block ml-4 transform group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                <span className="text-amber-200 drop-shadow-lg text-2xl">→</span>
              </span>
            </button>
          </div>

          {/* Academic service cards - more professional */}
          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Writing Services card - Academic focused */}
            <div className="group relative">
              <button 
                onClick={() => onNavigate('subpage2')}
                className="w-full text-left p-6 rounded-xl bg-slate-800/30 backdrop-blur-md border border-amber-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-800/40 transform-gpu overflow-hidden h-full flex flex-col"
              >
                {/* Academic card effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Service icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-amber-400/20 backdrop-blur-sm text-amber-200 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 border border-amber-300/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <div className="relative flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-orange-200 transition-all duration-300">
                      Writing Services
                    </h3>
                    
                    {/* Academic progress indicator */}
                    <div className="w-full bg-white/20 rounded-full h-0.5 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-300 to-orange-300 h-0.5 rounded-full transition-all duration-1000 group-hover:w-4/5 w-0"></div>
                    </div>
                    
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 mb-2">
                      Professional writing support and academic guidance
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Learn More
                    </span>
                    <div className="text-white/60 group-hover:text-amber-200 transition-all duration-300 transform group-hover:scale-110">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
            
            {/* Research Resources card - Academic focused */}
            <div className="group relative">
              <button
                onClick={() => onNavigate('subpage3')}
                className="w-full text-left p-6 rounded-xl bg-slate-800/30 backdrop-blur-md border border-amber-400/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-slate-800/40 transform-gpu overflow-hidden h-full flex flex-col"
              >
                {/* Academic card effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Research icon */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-orange-400/20 backdrop-blur-sm text-orange-200 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 border border-orange-300/30">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <div className="relative flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-200 group-hover:to-yellow-200 transition-all duration-300">
                      Research Resources
                    </h3>
                    
                    {/* Academic progress indicator */}
                    <div className="w-full bg-white/20 rounded-full h-0.5 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                      <div className="bg-gradient-to-r from-orange-300 to-yellow-300 h-0.5 rounded-full transition-all duration-1000 group-hover:w-3/4 w-0"></div>
                    </div>
                    
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 mb-2">
                      Access comprehensive research tools and databases
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white/60 text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Explore Resources
                    </span>
                    <div className="text-white/60 group-hover:text-orange-200 transition-all duration-300 transform group-hover:scale-110">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Academic Footer */}
      <div className="z-50 bg-slate-900/60 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center">
          <p className="text-white/70 text-sm">
            &copy; {new Date().getFullYear()} UM-SJTU Joint Institute. All rights reserved.
          </p>
        </div>
      </div>

      </div>

    </div>
  );
};

export default HomePage;