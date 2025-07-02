import React from 'react';

// Reusable Navigation Header Component
export const NavigationHeader = ({ onNavigate, currentPage = 'unknown' }) => {
  return (
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
  );
};

// Reusable Background Component
export const PageBackground = ({ 
  primaryColor = 'blue', 
  secondaryColor = 'purple', 
  children 
}) => {
  const colorMap = {
    blue: { primary: 'blue-800/20', secondary: 'purple-800/20', accent1: 'blue-500/8', accent2: 'purple-500/8' },
    purple: { primary: 'purple-800/20', secondary: 'pink-800/20', accent1: 'purple-500/8', accent2: 'pink-500/8' },
    emerald: { primary: 'emerald-800/20', secondary: 'teal-800/20', accent1: 'emerald-500/8', accent2: 'teal-500/8' },
    red: { primary: 'red-800/20', secondary: 'orange-800/20', accent1: 'red-500/8', accent2: 'orange-500/8' }
  };

  const colors = colorMap[primaryColor] || colorMap.blue;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 flex flex-col relative overflow-auto">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-tr from-${colors.primary} via-transparent to-${colors.secondary}`}></div>
        <div className={`absolute top-20 right-20 w-96 h-96 bg-${colors.accent1} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 left-20 w-80 h-80 bg-${colors.accent2} rounded-full blur-2xl`}></div>
      </div>
      {children}
    </div>
  );
};

// Reusable Page Title Component
export const PageTitle = ({ 
  title, 
  subtitle, 
  gradient = 'from-white via-blue-200 to-purple-200',
  lineGradient = 'from-blue-300 to-purple-400'
}) => {
  return (
    <div className="text-center mb-12">
      <h1 className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-6 animate-fade-in`}>
        {title}
      </h1>
      <div className={`w-24 h-0.5 bg-gradient-to-r ${lineGradient} mx-auto rounded-full mb-6`}></div>
      {subtitle && (
        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto animate-fade-in-delay">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Reusable Navigation Button Component
export const NavigationButton = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  direction = 'forward',
  className = ''
}) => {
  const variants = {
    primary: 'bg-white/15 backdrop-blur-md hover:bg-white/20 border-white/30 hover:border-white/50',
    secondary: 'bg-white/10 backdrop-blur-md hover:bg-white/15 border-white/20 hover:border-white/40'
  };

  const gradients = {
    primary: 'from-blue-600/20 via-purple-600/20 to-pink-600/20',
    secondary: 'from-purple-600/20 via-pink-600/20 to-blue-600/20'
  };

  const ArrowIcon = () => (
    <svg className={`w-4 h-4 transform transition-transform duration-300 ${
      direction === 'back' 
        ? 'group-hover:-translate-x-1' 
        : 'group-hover:translate-x-1'
    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
        d={direction === 'back' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
    </svg>
  );

  return (
    <button 
      onClick={onClick}
      className={`group relative ${variants[variant]} text-white font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border overflow-hidden ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${gradients[variant]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      <span className="relative flex items-center space-x-2">
        {direction === 'back' && <ArrowIcon />}
        <span>{children}</span>
        {direction === 'forward' && <ArrowIcon />}
      </span>
    </button>
  );
};

// Reusable Feature Card Component
export const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  gradient = 'from-blue-500 to-blue-600',
  onClick,
  className = ''
}) => {
  return (
    <div className={`bg-white/15 backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/30 hover:border-white/50 ${className}`}>
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 text-center">{title}</h3>
      <p className="text-white/70 text-sm text-center">{description}</p>
      {onClick && (
        <button 
          onClick={onClick}
          className="w-full mt-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-white text-sm font-medium"
        >
          Learn More
        </button>
      )}
    </div>
  );
};

// Reusable Content Section Component
export const ContentSection = ({ children, className = '' }) => {
  return (
    <div className={`relative z-10 flex-grow flex items-center justify-center px-8 py-8 ${className}`}>
      <div className="max-w-6xl w-full mx-auto">
        {children}
      </div>
    </div>
  );
};

// Reusable Button Group Component
export const ButtonGroup = ({ buttons, className = '' }) => {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${className}`}>
      {buttons.map((button, index) => (
        <NavigationButton
          key={index}
          onClick={button.onClick}
          variant={button.variant || 'primary'}
          direction={button.direction || 'forward'}
          className={button.className}
        >
          {button.label}
        </NavigationButton>
      ))}
    </div>
  );
};