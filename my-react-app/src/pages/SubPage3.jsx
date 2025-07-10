import { useState, useEffect } from 'react';

const SubPage3 = ({ onNavigate }) => {
  const [activeScent, setActiveScent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [floatingElements, setFloatingElements] = useState([]);
  const [scentAnimation, setScentAnimation] = useState({});

  // Generate floating elements like homepage
  useEffect(() => {
    const elements = [];
    const nudeColors = ['#C9A96E', '#B5A082', '#8B7355', '#A0916C', '#D4C4A8', '#E6D7C3'];
    for (let i = 0; i < 12; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 16 + 8,
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

  // Scent bubble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScentAnimation(prev => ({
        ...prev,
        [Math.random()]: {
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 30 + 10
        }
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scentExperiences = [
    {
      id: 1,
      title: "Floral Essence",
      description: "Delicate rose and jasmine blend",
      emoji: "🌸",
      color: "#C9A96E",
      bgGradient: "linear-gradient(135deg, rgba(201, 169, 110, 0.4) 0%, rgba(180, 160, 130, 0.4) 100%)",
      intensity: 75
    },
    {
      id: 2,
      title: "Citrus Burst",
      description: "Fresh lemon and orange zest",
      emoji: "🍊",
      color: "#B5A082",
      bgGradient: "linear-gradient(135deg, rgba(181, 160, 130, 0.4) 0%, rgba(160, 145, 108, 0.4) 100%)",
      intensity: 90
    },
    {
      id: 3,
      title: "Forest Deep",
      description: "Earthy pine and moss notes",
      emoji: "🌲",
      color: "#8B7355",
      bgGradient: "linear-gradient(135deg, rgba(139, 115, 85, 0.4) 0%, rgba(201, 169, 110, 0.4) 100%)",
      intensity: 60
    },
    {
      id: 4,
      title: "Ocean Breeze",
      description: "Salty air and sea minerals",
      emoji: "🌊",
      color: "#A0916C",
      bgGradient: "linear-gradient(135deg, rgba(160, 145, 108, 0.4) 0%, rgba(212, 196, 168, 0.4) 100%)",
      intensity: 85
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

      {/* Scent bubbles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Object.entries(scentAnimation).map(([key, bubble]) => (
          <div
            key={key}
            className="absolute rounded-full opacity-20 animate-ping"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: '#C9A96E',
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Fun geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-24 left-20 w-24 h-24 rounded-full opacity-15 animate-bounce"
          style={{ backgroundColor: '#C9A96E', animationDuration: '3s' }}></div>
        <div className="absolute top-1/3 right-16 w-20 h-20 opacity-12 rotate-45 animate-spin"
          style={{ backgroundColor: '#8B7355', animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 rounded-full opacity-15 animate-pulse"
          style={{ backgroundColor: '#B5A082', animationDuration: '2s' }}></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 opacity-12 animate-bounce"
          style={{ backgroundColor: '#A0916C', animationDuration: '4s' }}></div>
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
            style={{ backgroundImage: 'linear-gradient(135deg, #4A3728 0%, #8B7355 50%, #C9A96E 100%)' }}>
            Smell Magic Experience 🌸
          </h1>
        </div>

        <div className="w-12"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center px-8 py-8">
        <div className="max-w-6xl w-full mx-auto">

          {/* Fun Header section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl"
              style={{ color: '#4A3728' }}>
              {'Olfactory Wonder'.split('').map((letter, index) => (
                letter === ' ' ? (
                  <span key={index} className="inline-block mx-4">👃</span>
                ) : (
                  <span
                    key={index}
                    className="inline-block hover:rotate-12 hover:scale-110 transition-transform duration-300 cursor-default"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {letter}
                  </span>
                )
              ))}
            </h1>
            <div className="w-24 h-0.5 mx-auto rounded-full mb-6"
              style={{ background: 'linear-gradient(90deg, #C9A96E 0%, #8B7355 100%)' }}></div>
            <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto"
              style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
              Dive into a world of scents and aromas! Discover how different fragrances
              can evoke memories, emotions, and transport you to different places. 🌈✨
            </p>
          </div>

          {/* Scent experience grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {scentExperiences.map((scent) => (
              <div
                key={scent.id}
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveScent(scent.id)}
                onMouseLeave={() => setActiveScent(null)}
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-2 border-4 h-full flex flex-col"
                  style={{
                    borderColor: activeScent === scent.id ? 'rgba(139, 115, 85, 0.4)' : 'transparent'
                  }}>

                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: scent.bgGradient }}></div>

                  {/* Scent indicator with emoji */}
                  <div className="relative text-center">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg relative overflow-hidden text-2xl"
                      style={{ backgroundColor: scent.color, color: 'white' }}>
                      {scent.emoji}

                      {/* Animated scent waves */}
                      {activeScent === scent.id && (
                        <>
                          <div className="absolute inset-0 border-2 border-white/30 rounded-xl animate-ping"></div>
                          <div className="absolute inset-0 border-2 border-white/20 rounded-xl animate-ping"
                            style={{ animationDelay: '0.5s' }}></div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2 transition-colors duration-300"
                          style={{
                            color: activeScent === scent.id ? scent.color : '#4A3728'
                          }}>
                          {scent.title}
                        </h3>
                        <p className="text-sm mb-4" style={{ color: 'rgba(74, 55, 40, 0.7)' }}>
                          {scent.description}
                        </p>
                      </div>

                      {/* Intensity indicator */}
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-medium" style={{ color: 'rgba(74, 55, 40, 0.6)' }}>Intensity</span>
                          <span className="text-xs font-medium" style={{ color: 'rgba(74, 55, 40, 0.6)' }}>{scent.intensity}%</span>
                        </div>
                        <div className="w-full rounded-full h-2"
                          style={{ backgroundColor: 'rgba(139, 115, 85, 0.2)' }}>
                          <div
                            className="h-2 rounded-full transition-all duration-1000"
                            style={{
                              width: activeScent === scent.id ? `${scent.intensity}%` : '0%',
                              backgroundColor: scent.color
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {activeScent === scent.id && (
                      <div className="absolute -top-2 -right-2 text-white text-xs px-3 py-1 rounded-full animate-bounce"
                        style={{ backgroundColor: scent.color }}>
                        Smell it! 👃
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive section */}
          <div className={`bg-white/90 backdrop-blur-md rounded-3xl p-8 border shadow-xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ borderColor: 'rgba(139, 115, 85, 0.2)' }}>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center space-x-3"
                style={{ color: '#4A3728' }}>
                <span>🎨</span>
                <span>Create Your Scent Profile</span>
                <span>✨</span>
              </h2>
              <p className="mb-6" style={{ color: 'rgba(74, 55, 40, 0.7)' }}>
                Hover over the scent cards above to explore different olfactory experiences and discover your favorites!
              </p>

              {activeScent && (
                <div className="animate-fade-in">
                  <div className="inline-block rounded-2xl p-4 border"
                    style={{
                      backgroundColor: 'rgba(201, 169, 110, 0.2)',
                      borderColor: 'rgba(139, 115, 85, 0.3)'
                    }}>
                    <p className="font-medium flex items-center space-x-2"
                      style={{ color: '#4A3728' }}>
                      <span>Currently exploring:</span>
                      <span style={{ color: scentExperiences.find(s => s.id === activeScent)?.color }}>
                        {scentExperiences.find(s => s.id === activeScent)?.emoji} {scentExperiences.find(s => s.id === activeScent)?.title}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubPage3;