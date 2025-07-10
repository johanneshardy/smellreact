import { useState, useEffect } from 'react';

const HomePage = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#fcd71a]">
      {/* Navigation Header */}
      <header className="relative z-10 bg-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2 pl-2 pr-2 md:pl-4 md:pr-4 lg:px-8">
              <img src='/src/assets/writing-center-logo.png' alt="Logo" className='w-16 h-16' />
              <div className="text-white font-bold text-lg">
                UM-SJTU<br />
                Writing Center
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-white hover:text-yellow-200 font-bold transition-colors duration-300">
                SMELL MAP
              </a>
              <a href="#" className="text-white hover:text-yellow-200 font-bold transition-colors duration-300">
                SMELL DAILY
              </a>
              <a href="#" className="text-white hover:text-yellow-200 font-bold transition-colors duration-300">
                SMELL LIBRARY
              </a>
              <a href="#" className="text-white hover:text-yellow-200 font-bold transition-colors duration-300">
                CONTACT
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">

          {/* Cartoon Character */}
          <div className='flex justify-center items-center select-none'>
            <img
              src='/src/assets/smellcharacter.png'
              alt="Cartoon Character"
              className={`w-[400px] h-[400px] mr-[50px] transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            />

            {/* Main Title */}
            <div className={`w-[600px] h-[400px] flex flex-col justify-center relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="text-6xl md:text-8xl font-black mb-4 absolute top-0 pl-[50px]" style={{ lineHeight: 1.4, textAlign: 'left' }}>
                <span className="text-white">SMELL</span><br />
                <span className="text-white">PROJECT</span><br />
              </div>
              <div className="text-6xl md:text-8xl font-black mb-4 absolute top-[60px]" style={{ lineHeight: 1.4, textAlign: 'center' }}>
                <span className="text-black">READY</span><br />
                <span className="text-black whitespace-nowrap">TO SMELL ?</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button
              onClick={() => onNavigate('subpage1')}
              className="bg-[#8cc5d5] hover:bg-blue-400 text-black font-bold text-[50px] px-[150px] py-[10px] rounded-full border-4 border-black transform transition-all duration-300 hover:scale-105"
              style={{
                boxShadow: '0 4px 0 0 #8cc5d5'
              }}
            >
              START
            </button>
          </div>

          {/* OR Divider */}
          <div className={`mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-black font-bold text-[30px]">OR</p>
          </div>

          {/* Learn More Section */}
          <div className={`mb-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-black font-bold text-[50px] mb-8">LEARN MORE ABOUT US ...</h2>
          </div>

          {/* Info Cards Section */}
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

            {/* Our Vision Card */}
            <div
              className="text-left cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate('subpage2')}
            >
              <h3 className="text-black font-bold text-[50px] mb-4">OUR VISION</h3>
              <div className="bg-yellow-300 border-4 border-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-black font-bold text-[20px] leading-relaxed">
                  This project aims to help modern people rediscover and experience the power of smell, exploring how olfaction influences our emotions and memories in this digital age.
                </p>
              </div>
            </div>

            {/* Our Team Card */}
            <div
              className="text-left cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate('subpage2')}
            >
              <h3 className="text-black font-bold text-[50px] mb-4">OUR TEAM</h3>
              <div className="bg-yellow-300 border-4 border-black rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-black font-bold text-[20px] leading-relaxed">
                  The project is developed by a student team from the SJTU-U Writing Center.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-orange-400 border-4 border-black rounded-lg px-6 py-4 shadow-lg">
            <p className="text-black font-medium">
              Made with 💛 by UM-SJTU Writing Center © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;