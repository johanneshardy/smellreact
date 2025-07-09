import React, { useState, useEffect } from 'react';

const SubPage2 = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [activeFeature, setActiveFeature] = useState(null);
  const [animatedStats, setAnimatedStats] = useState({
    satisfaction: 0,
    months: 0,
    lines: 0
  });

  // Generate floating elements like homepage
  useEffect(() => {
    const elements = [];
    const nudeColors = ['#C9A96E', '#B5A082', '#8B7355', '#A0916C', '#D4C4A8', '#E6D7C3'];
    for (let i = 0; i < 10; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 18 + 10,
        color: nudeColors[Math.floor(Math.random() * nudeColors.length)],
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2
      });
    }
    setFloatingElements(elements);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  // Animate stats counter
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedStats(prev => ({
            satisfaction: Math.min(prev.satisfaction + 3, 95),
            months: Math.min(prev.months + 1, 12),
            lines: Math.min(prev.lines + 2000, 50000)
          }));
        }, 50);

        setTimeout(() => clearInterval(interval), 2000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const projectFeatures = [
    {
      id: 'vision',
      icon: '💡',
      title: "Our Vision",
      description: "Creating innovative solutions that bridge technology and human experience, making complex concepts accessible to everyone through intuitive design.",
      gradient: "linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)",
      hoverColor: '#C9A96E'
    },
    {
      id: 'team',
      icon: '👥',
      title: "Our Team",
      description: "A diverse group of researchers, designers, and innovators working together to push the boundaries of what's possible in digital experiences.",
      gradient: "linear-gradient(135deg, #B5A082 0%, #A0916C 100%)",
      hoverColor: '#B5A082'
    },
    {
      id: 'impact',
      icon: '📈',
      title: "Our Impact",
      description: "Measuring success through meaningful metrics that demonstrate real-world value and positive change in user experiences.",
      gradient: "linear-gradient(135deg, #8B7355 0%, #C9A96E 100%)",
      hoverColor: '#8B7355'
    },
    {
      id: 'research',
      icon: '🔬',
      title: "Our Research",
      description: "Evidence-based methodologies and cutting-edge research that inform every decision in our development process.",
      gradient: "linear-gradient(135deg, #A0916C 0%, #D4C4A8 100%)",
      hoverColor: '#A0916C'
    }
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden"
         style={{
           background: 'linear-gradient(135deg, #F5F0E8 0%, #E6D7C3 25%, #D4C4A8 50%, #C9A96E 75%, #B5A082 100%)'
         }}>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute rounded-full opacity-12 animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: `${element.size}px`,
              height: `${element.size}px`,
              backgroundColor: element.color,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Fun geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-16 w-20 h-20 rounded-full opacity-15 animate-bounce" 
             style={{backgroundColor: '#C9A96E', animationDuration: '3s'}}></div>
        <div className="absolute top-1/4 right-24 w-16 h-16 opacity-12 rotate-45 animate-spin" 
             style={{backgroundColor: '#8B7355', animationDuration: '8s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 rounded-full opacity-15 animate-pulse" 
             style={{backgroundColor: '#B5A082', animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-16 w-18 h-18 opacity-12 animate-bounce" 
             style={{backgroundColor: '#A0916C', animationDuration: '4s'}}></div>
      </div>

      {/* Fun Navigation header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <button 
          onClick={() => onNavigate('home')}
          className="group flex items-center space-x-2 transition-all duration-300 backdrop-blur-md px-6 py-3 rounded-full shadow-lg hover:shadow-xl border-2 font-medium hover:scale-105"
          style={{
            color: '#4A3728',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: 'rgba(139, 115, 85, 0.3)'
          }}
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Back to Home</span>
        </button>
        
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text"
              style={{backgroundImage: 'linear-gradient(135deg, #4A3728 0%, #8B7355 50%, #C9A96E 100%)'}}>
            Project Introduction 📚
          </h1>
        </div>
        
        <div className="w-12"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 flex-grow flex items-center justify-center px-8 py-8">
        <div className="max-w-6xl w-full mx-auto">
          
          {/* Fun Title Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl"
                style={{color: '#4A3728'}}>
              {'Project Hub'.split('').map((letter, index) => (
                letter === ' ' ? (
                  <span key={index} className="inline-block mx-4">✨</span>
                ) : (
                  <span 
                    key={index}
                    className="inline-block hover:rotate-12 hover:scale-110 transition-transform duration-300 cursor-default"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {letter}
                  </span>
                )
              ))}
            </h1>
            <div className="w-24 h-0.5 mx-auto rounded-full mb-6"
                 style={{background: 'linear-gradient(90deg, #C9A96E 0%, #8B7355 100%)'}}></div>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
               style={{color: 'rgba(74, 55, 40, 0.9)'}}>
              Discover the vision, mission, and innovative approach that drives our project forward. Learn about our goals and the impact we aim to create! 🚀
            </p>
          </div>

          {/* Project Features Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {projectFeatures.map((feature, index) => (
              <div
                key={feature.id}
                className="group relative bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1 cursor-pointer border-4"
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                style={{
                  borderColor: activeFeature === feature.id ? 'rgba(139, 115, 85, 0.4)' : 'transparent'
                }}
              >
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                     style={{background: feature.gradient}}></div>
                
                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg text-white text-2xl"
                       style={{background: feature.gradient}}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 transition-colors duration-300"
                      style={{
                        color: activeFeature === feature.id ? feature.hoverColor : '#4A3728'
                      }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed"
                     style={{color: 'rgba(74, 55, 40, 0.7)'}}>
                    {feature.description}
                  </p>
                  
                  {activeFeature === feature.id && (
                    <div className="absolute -top-2 -right-2 text-white text-xs px-3 py-1 rounded-full animate-bounce"
                         style={{backgroundColor: feature.hoverColor}}>
                      Amazing! ⭐
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Fun Timeline Section */}
          <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-8 mb-12 border shadow-xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
               style={{borderColor: 'rgba(139, 115, 85, 0.2)'}}>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center space-x-3"
                  style={{color: '#4A3728'}}>
                <span>🗓️</span>
                <span>Project Timeline</span>
                <span>🚀</span>
              </h2>
              <p className="text-lg mb-8 max-w-3xl mx-auto leading-relaxed"
                 style={{color: 'rgba(74, 55, 40, 0.8)'}}>
                Our development follows a structured approach, with each phase building upon previous discoveries 
                to create a comprehensive and meaningful experience.
              </p>
            </div>

            {/* Timeline visualization with emojis */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex flex-col items-center text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg text-2xl"
                     style={{background: 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)', color: 'white'}}>
                  🔍
                </div>
                <h3 className="font-semibold mb-2" style={{color: '#4A3728'}}>Research Phase</h3>
                <p className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Foundation & Discovery</p>
              </div>

              {/* Fun connection line */}
              <div className="hidden md:block flex-1 h-1 rounded-full mx-4 relative overflow-hidden"
                   style={{background: 'linear-gradient(90deg, #C9A96E 0%, #B5A082 100%)'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg text-2xl"
                     style={{background: 'linear-gradient(135deg, #B5A082 0%, #A0916C 100%)', color: 'white'}}>
                  🛠️
                </div>
                <h3 className="font-semibold mb-2" style={{color: '#4A3728'}}>Development</h3>
                <p className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Building & Testing</p>
              </div>

              {/* Fun connection line */}
              <div className="hidden md:block flex-1 h-1 rounded-full mx-4 relative overflow-hidden"
                   style={{background: 'linear-gradient(90deg, #B5A082 0%, #8B7355 100%)'}}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>

              <div className="flex flex-col items-center text-center group hover:scale-110 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-3 shadow-lg text-2xl"
                     style={{background: 'linear-gradient(135deg, #8B7355 0%, #C9A96E 100%)', color: 'white'}}>
                  🚀
                </div>
                <h3 className="font-semibold mb-2" style={{color: '#4A3728'}}>Implementation</h3>
                <p className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Launch & Refinement</p>
              </div>
            </div>
          </div>

          {/* Animated Key Metrics */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                 style={{borderColor: 'rgba(139, 115, 85, 0.2)'}}>
              <div className="text-4xl mb-2">😊</div>
              <div className="text-4xl font-bold mb-2" style={{color: '#C9A96E'}}>{animatedStats.satisfaction}%</div>
              <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>User Satisfaction</div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                 style={{borderColor: 'rgba(139, 115, 85, 0.2)'}}>
              <div className="text-4xl mb-2">📅</div>
              <div className="text-4xl font-bold mb-2" style={{color: '#B5A082'}}>{animatedStats.months}+</div>
              <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Months Development</div>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 text-center border shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                 style={{borderColor: 'rgba(139, 115, 85, 0.2)'}}>
              <div className="text-4xl mb-2">💻</div>
              <div className="text-4xl font-bold mb-2" style={{color: '#8B7355'}}>{animatedStats.lines.toLocaleString()}+</div>
              <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Lines of Code</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage2;