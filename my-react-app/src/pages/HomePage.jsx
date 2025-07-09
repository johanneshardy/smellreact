import { useState, useEffect } from 'react';

const HomePage = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [floatingElements, setFloatingElements] = useState([]);
  const [hoveredNav, setHoveredNav] = useState(null);

  // Generate random floating elements with nude color palette
  useEffect(() => {
    const elements = [];
    const nudeColors = ['#C9A96E', '#B5A082', '#8B7355', '#A0916C', '#D4C4A8', '#E6D7C3', '#F5F0E8'];
    for (let i = 0; i < 15; i++) {
      elements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        color: nudeColors[Math.floor(Math.random() * nudeColors.length)],
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
      });
    }
    setFloatingElements(elements);
  }, []);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fun emoji reactions for cards
  const cardEmojis = {
    intro: ['📚', '🎨', '🌟', '💫'],
    smell: ['🌸', '🍃', '🎭', '🌈']
  };

  const [emojiIndex, setEmojiIndex] = useState({
    intro: 0,
    smell: 0
  });

  // Rotate emojis every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setEmojiIndex(prev => ({
        intro: (prev.intro + 1) % cardEmojis.intro.length,
        smell: (prev.smell + 1) % cardEmojis.smell.length
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
            className="absolute rounded-full opacity-15 animate-pulse"
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

      {/* Fun geometric shapes with nude tones */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full opacity-20 animate-bounce" 
             style={{backgroundColor: '#C9A96E', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-32 w-24 h-24 opacity-15 rotate-45 animate-spin" 
             style={{backgroundColor: '#8B7355', animationDuration: '8s'}}></div>
        <div className="absolute bottom-32 left-40 w-28 h-28 rounded-full opacity-20 animate-pulse" 
             style={{backgroundColor: '#B5A082', animationDuration: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 opacity-15 animate-bounce" 
             style={{backgroundColor: '#A0916C', animationDuration: '4s'}}></div>
      </div>

      {/* Simple Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-spin" 
                 style={{animationDuration: '10s'}}>
              <span className="text-2xl">🎓</span>
            </div>
            <div>
              <h2 className="text-xl font-bold drop-shadow-lg" style={{color: '#4A3728'}}>UM-SJTU</h2>
              <p className="text-sm" style={{color: 'rgba(74, 55, 40, 0.8)'}}>Writing Center</p>
            </div>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {['About', 'Services', 'Resources', 'Contact'].map((item, index) => (
              <a 
                key={item}
                href="#" 
                className="font-medium px-3 py-2 rounded-full transition-all duration-300 hover:scale-110"
                style={{
                  color: hoveredNav === item ? '#4A3728' : 'rgba(74, 55, 40, 0.8)',
                  backgroundColor: hoveredNav === item ? 'rgba(139, 115, 85, 0.2)' : 'transparent'
                }}
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          
          {/* Fun Title with Animation */}
          <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl" style={{color: '#4A3728'}}>
              {'Smell Project'.split('').map((letter, index) => (
                letter === ' ' ? (
                  <span key={index} className="inline-block mx-4">🌈</span>
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
            <p className="text-2xl font-light mb-8 max-w-3xl mx-auto leading-relaxed" 
               style={{color: 'rgba(74, 55, 40, 0.9)'}}>
              Discover the magical world of scents, writing, and creativity! ✨
            </p>
          </div>

          {/* Fun CTA Button */}
          <div className={`mb-16 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={() => onNavigate('subpage1')}
              className="group relative bg-white font-bold text-2xl px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transform transition-all duration-500 hover:scale-110 hover:-rotate-2 overflow-hidden border-2"
              style={{
                color: '#4A3728',
                borderColor: 'rgba(139, 115, 85, 0.3)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.2) 0%, rgba(180, 160, 130, 0.2) 50%, rgba(139, 115, 85, 0.2) 100%)'}}></div>
              <span className="relative transition-colors duration-500 flex items-center space-x-3">
                <span>Start Adventure</span>
                <span className="text-3xl group-hover:animate-bounce">🚀</span>
              </span>
            </button>
          </div>

          {/* Colorful Cards Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Project Intro Card */}
            <div 
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-2 cursor-pointer border-4"
              onClick={() => onNavigate('subpage2')}
              onMouseEnter={() => setActiveCard('intro')}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                borderColor: activeCard === 'intro' ? 'rgba(201, 169, 110, 0.3)' : 'transparent'
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                   style={{background: 'linear-gradient(135deg, rgba(201, 169, 110, 0.4) 0%, rgba(180, 160, 130, 0.4) 100%)'}}></div>
              
              <div className="relative text-center">
                <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                  {cardEmojis.intro[emojiIndex.intro]}
                </div>
                <h3 className="text-2xl font-bold mb-4 transition-colors duration-300"
                    style={{color: activeCard === 'intro' ? '#C9A96E' : '#4A3728'}}>
                  Learn More
                </h3>
                <p className="transition-colors duration-300"
                   style={{color: 'rgba(74, 55, 40, 0.7)'}}>
                  Discover our mission, vision, and the amazing team behind this project!
                </p>
                
                {activeCard === 'intro' && (
                  <div className="absolute -top-2 -right-2 text-white text-xs px-3 py-1 rounded-full animate-bounce"
                       style={{backgroundColor: '#C9A96E'}}>
                    Discover! 🌟
                  </div>
                )}
              </div>
            </div>

            {/* Smell Experience Card */}
            <div 
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-2 cursor-pointer border-4"
              onClick={() => onNavigate('subpage3')}
              onMouseEnter={() => setActiveCard('smell')}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                borderColor: activeCard === 'smell' ? 'rgba(180, 160, 130, 0.3)' : 'transparent'
              }}
            >
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                   style={{background: 'linear-gradient(135deg, rgba(180, 160, 130, 0.4) 0%, rgba(160, 145, 108, 0.4) 100%)'}}></div>
              
              <div className="relative text-center">
                <div className="text-6xl mb-4 transform group-hover:scale-125 transition-transform duration-500">
                  {cardEmojis.smell[emojiIndex.smell]}
                </div>
                <h3 className="text-2xl font-bold mb-4 transition-colors duration-300"
                    style={{color: activeCard === 'smell' ? '#B5A082' : '#4A3728'}}>
                  Smell Magic
                </h3>
                <p className="transition-colors duration-300"
                   style={{color: 'rgba(74, 55, 40, 0.7)'}}>
                  Experience the wonderful world of scents and their amazing effects!
                </p>
                
                {activeCard === 'smell' && (
                  <div className="absolute -top-2 -right-2 text-white text-xs px-3 py-1 rounded-full animate-bounce"
                       style={{backgroundColor: '#B5A082'}}>
                    Smell it! 👃
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Fun Stats Counter */}
          <div className={`mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-xl border"
                 style={{borderColor: 'rgba(139, 115, 85, 0.2)'}}>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-1" style={{color: '#8B7355'}}>12+</div>
                  <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Cultural Sites</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{color: '#C9A96E'}}>100+</div>
                  <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Happy Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1" style={{color: '#B5A082'}}>∞</div>
                  <div className="text-sm" style={{color: 'rgba(74, 55, 40, 0.7)'}}>Fun Moments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="relative z-10 py-6 text-center">
        <div className="backdrop-blur-sm rounded-2xl max-w-2xl mx-auto px-6 py-4"
             style={{backgroundColor: 'rgba(139, 115, 85, 0.2)'}}>
          <p className="text-sm" style={{color: 'rgba(74, 55, 40, 0.8)'}}>
            Made with 💜 by UM-SJTU Writing Center © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;