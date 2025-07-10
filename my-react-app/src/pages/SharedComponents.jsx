// Reusable Navigation Header Component
export const NavigationHeader = ({ onNavigate }) => {
  return (
    <div className="relative z-10 flex justify-between items-center p-6">
      <button
        onClick={() => onNavigate('home')}
        className="group flex items-center space-x-2 transition-all duration-300 backdrop-blur-md px-4 py-2 rounded-full shadow-lg hover:shadow-xl border"
        style={{
          color: 'rgba(74, 55, 40, 0.8)',
          backgroundColor: 'rgba(139, 115, 85, 0.2)',
          borderColor: 'rgba(139, 115, 85, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#4A3728';
          e.target.style.borderColor = 'rgba(139, 115, 85, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'rgba(74, 55, 40, 0.8)';
          e.target.style.borderColor = 'rgba(139, 115, 85, 0.3)';
        }}
      >
        <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="font-medium text-sm">Back to Home</span>
      </button>

      <button
        onClick={() => onNavigate('home')}
        className="group p-3 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border"
        style={{
          color: 'rgba(74, 55, 40, 0.8)',
          backgroundColor: 'rgba(139, 115, 85, 0.2)',
          borderColor: 'rgba(139, 115, 85, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#4A3728';
          e.target.style.borderColor = 'rgba(139, 115, 85, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = 'rgba(74, 55, 40, 0.8)';
          e.target.style.borderColor = 'rgba(139, 115, 85, 0.3)';
        }}
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
  primaryColor = 'beige',
  children
}) => {
  const colorMap = {
    beige: {
      primary: 'rgba(201, 169, 110, 0.2)',
      secondary: 'rgba(180, 160, 130, 0.2)',
      accent1: 'rgba(139, 115, 85, 0.08)',
      accent2: 'rgba(201, 169, 110, 0.08)'
    },
    taupe: {
      primary: 'rgba(160, 145, 108, 0.2)',
      secondary: 'rgba(181, 160, 130, 0.2)',
      accent1: 'rgba(160, 145, 108, 0.08)',
      accent2: 'rgba(181, 160, 130, 0.08)'
    },
    nude: {
      primary: 'rgba(212, 196, 168, 0.2)',
      secondary: 'rgba(230, 215, 195, 0.2)',
      accent1: 'rgba(212, 196, 168, 0.08)',
      accent2: 'rgba(230, 215, 195, 0.08)'
    }
  };

  const colors = colorMap[primaryColor] || colorMap.beige;

  return (
    <div className="fixed inset-0 flex flex-col relative overflow-auto"
      style={{ background: 'linear-gradient(135deg, #F5F0E8 0%, #E6D7C3 50%, #D4C4A8 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(45deg, ${colors.primary} 0%, transparent 50%, ${colors.secondary} 100%)` }}></div>
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: colors.accent1 }}></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full blur-2xl"
          style={{ backgroundColor: colors.accent2 }}></div>
      </div>
      {children}
    </div>
  );
};

// Reusable Page Title Component
export const PageTitle = ({
  title,
  subtitle,
  gradient = 'linear-gradient(135deg, #4A3728 0%, #8B7355 50%, #A0916C 100%)',
  lineGradient = 'linear-gradient(90deg, #C9A96E 0%, #8B7355 100%)'
}) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text mb-6 animate-fade-in"
        style={{ backgroundImage: gradient }}>
        {title}
      </h1>
      <div className="w-24 h-0.5 mx-auto rounded-full mb-6"
        style={{ background: lineGradient }}></div>
      {subtitle && (
        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto animate-fade-in-delay"
          style={{ color: 'rgba(74, 55, 40, 0.9)' }}>
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
    primary: {
      backgroundColor: 'rgba(139, 115, 85, 0.15)',
      borderColor: 'rgba(139, 115, 85, 0.3)',
      hoverBg: 'rgba(139, 115, 85, 0.25)',
      hoverBorder: 'rgba(139, 115, 85, 0.5)'
    },
    secondary: {
      backgroundColor: 'rgba(139, 115, 85, 0.1)',
      borderColor: 'rgba(139, 115, 85, 0.2)',
      hoverBg: 'rgba(139, 115, 85, 0.2)',
      hoverBorder: 'rgba(139, 115, 85, 0.4)'
    }
  };

  const gradients = {
    primary: 'linear-gradient(135deg, rgba(201, 169, 110, 0.2) 0%, rgba(180, 160, 130, 0.2) 50%, rgba(139, 115, 85, 0.2) 100%)',
    secondary: 'linear-gradient(135deg, rgba(180, 160, 130, 0.2) 0%, rgba(201, 169, 110, 0.2) 50%, rgba(139, 115, 85, 0.2) 100%)'
  };

  const style = variants[variant];

  const ArrowIcon = () => (
    <svg className={`w-4 h-4 transform transition-transform duration-300 ${direction === 'back'
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
      className={`group relative font-bold py-3 px-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border overflow-hidden ${className}`}
      style={{
        color: '#4A3728',
        backgroundColor: style.backgroundColor,
        borderColor: style.borderColor
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = style.hoverBg;
        e.target.style.borderColor = style.hoverBorder;
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = style.backgroundColor;
        e.target.style.borderColor = style.borderColor;
      }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: gradients[variant] }}></div>
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
  gradient = 'linear-gradient(135deg, #C9A96E 0%, #8B7355 100%)',
  onClick,
  className = ''
}) => {
  return (
    <div className={`backdrop-blur-md rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border ${className}`}
      style={{
        backgroundColor: 'rgba(139, 115, 85, 0.15)',
        borderColor: 'rgba(139, 115, 85, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.target.style.borderColor = 'rgba(139, 115, 85, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.target.style.borderColor = 'rgba(139, 115, 85, 0.3)';
      }}>
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg"
        style={{ background: gradient }}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-center" style={{ color: '#4A3728' }}>{title}</h3>
      <p className="text-sm text-center" style={{ color: 'rgba(74, 55, 40, 0.7)' }}>{description}</p>
      {onClick && (
        <button
          onClick={onClick}
          className="w-full mt-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
          style={{
            backgroundColor: 'rgba(139, 115, 85, 0.1)',
            color: '#4A3728'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 115, 85, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(139, 115, 85, 0.1)';
          }}
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