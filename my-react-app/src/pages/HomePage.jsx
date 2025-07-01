import React, { useState, useEffect } from 'react';

const HomePage = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
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

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 w-screen h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Softer animated background with multiple layers */}
      <div className="absolute inset-0">
        {/* Base gradient - softer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"></div>
        
        {/* Overlay gradient - much softer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/20 via-transparent to-purple-800/20"></div>
        
        {/* Dynamic mesh gradient - gentler */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 animate-pulse"></div>
        </div>
      </div>

      {/* Floating geometric shapes - softer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating orbs - much softer */}
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
        
        {/* Smaller animated particles - softer */}
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

      {/* Enhanced time display - more visible */}
      <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white text-sm font-mono px-4 py-2 rounded-full border border-white/30 shadow-xl">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      {/* Main content with enhanced animations */}
      <div className={`relative z-10 w-full max-w-6xl mx-auto px-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Enhanced title with multiple effects */}
        <div className="text-center mb-16">
          <div className="relative">
            {/* Glowing background text */}
            <h1 className="absolute inset-0 text-4xl md:text-6xl font-black text-white/5 blur-sm scale-110 animate-pulse">
              title
            </h1>
            {/* Main title */}
            <h1 className="relative text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-6 tracking-tight leading-none animate-fade-in">
              title
            </h1>
          </div>
          
          {/* Enhanced decorative line */}
          <div className="relative w-20 h-0.5 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced main call-to-action - more visible */}
        <div className="text-center mb-20">
          <button 
            onClick={() => onNavigate('subpage1')}
            className="group relative text-2xl md:text-3xl font-bold text-white leading-tight px-8 py-4 rounded-2xl transition-all duration-500 hover:scale-110 transform-gpu overflow-hidden bg-white/15 backdrop-blur-md border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl"
            onMouseEnter={() => setHoveredCard('main')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Animated background - more visible */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
            
            {/* Glowing border effect - softer */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm scale-105" />
            
            <span className="relative group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:via-purple-200 group-hover:to-pink-200 transition-all duration-500">
              start your journey
            </span>
            
            {/* Enhanced arrow with glow */}
            <span className="inline-block ml-4 transform group-hover:translate-x-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
              <span className="text-white drop-shadow-lg">→</span>
            </span>
          </button>
        </div>

        {/* Enhanced navigation cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          
          {/* Project card with unified theme */}
          <div 
            className="group relative"
            onMouseEnter={() => setHoveredCard('project')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <button 
              onClick={() => onNavigate('subpage2')}
              className="w-full text-left p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/25 transform-gpu overflow-hidden"
            >
              {/* Card glow effect - softer */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Animated border - more visible */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
              
              {/* Card number with glow - more visible */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-blue-400/30 backdrop-blur-sm text-blue-200 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 border border-blue-300/40">
                01
              </div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-500">
                    introduction to the project
                  </h3>
                  
                  {/* Enhanced progress bar - more visible */}
                  <div className="w-full bg-white/25 rounded-full h-1 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-300 to-purple-300 h-1 rounded-full transition-all duration-1000 group-hover:w-3/4 w-0 shadow-lg"></div>
                  </div>
                  
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Discover the vision behind our initiative
                  </p>
                </div>
                
                <div className="text-white/60 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 ml-4">
                  <svg className="w-6 h-6 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
          
          {/* Smell card with unified theme */}
          <div 
            className="group relative"
            onMouseEnter={() => setHoveredCard('smell')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <button 
              onClick={() => onNavigate('subpage3')}
              className="w-full text-left p-6 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/25 transform-gpu overflow-hidden"
            >
              {/* Card glow effect - softer */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Animated border - more visible */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/40 via-pink-400/40 to-blue-400/40 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
              
              {/* Card number with glow - more visible */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-purple-400/30 backdrop-blur-sm text-purple-200 rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 border border-purple-300/40">
                02
              </div>
              
              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-500">
                    something about smell
                  </h3>
                  
                  {/* Enhanced progress bar - more visible */}
                  <div className="w-full bg-white/25 rounded-full h-1 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-300 to-pink-300 h-1 rounded-full transition-all duration-1000 group-hover:w-2/3 w-0 shadow-lg"></div>
                  </div>
                  
                  <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    Explore olfactory experiences
                  </p>
                </div>
                
                <div className="text-white/60 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 ml-4">
                  <svg className="w-6 h-6 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced footer indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-white/60 text-xs font-medium tracking-wider mb-3 animate-pulse">
            Click to explore
          </div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Starfield effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;