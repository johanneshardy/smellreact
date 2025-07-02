import React from 'react';
import { 
  NavigationHeader, 
  PageBackground, 
  PageTitle, 
  ContentSection, 
  FeatureCard, 
  ButtonGroup 
} from './SharedComponents';

const SubPage1 = ({ onNavigate }) => {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Start Fast",
      description: "Begin your journey with powerful tools and intuitive design that gets you moving quickly.",
      gradient: "from-blue-400 to-blue-500"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Innovate",
      description: "Discover new possibilities and push the boundaries of what's possible with cutting-edge technology.",
      gradient: "from-purple-400 to-purple-500"
    },
    {
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "Achieve",
      description: "Reach your goals with guided pathways and measurable results that drive real impact.",
      gradient: "from-pink-400 to-pink-500"
    }
  ];

  const navigationButtons = [
    {
      label: "Continue to Project",
      onClick: () => onNavigate('subpage2'),
      variant: 'primary',
      direction: 'forward'
    }
  ];

  return (
    <PageBackground primaryColor="blue">
      <NavigationHeader onNavigate={onNavigate} currentPage="subpage1" />
      
      <ContentSection>
        <PageTitle 
          title="Your Journey"
          subtitle="Welcome to an extraordinary adventure where discovery meets innovation. Every step forward opens new possibilities."
          gradient="from-blue-200 via-white to-purple-200"
          lineGradient="from-blue-300 to-purple-400"
        />

        {/* Feature cards with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-slide-up">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              className="h-full"
            />
          ))}
        </div>

        {/* Additional content section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Begin?</h2>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              Your journey starts here. Each step builds upon the last, creating a comprehensive 
              experience that transforms ideas into reality.
            </p>
            
            {/* Progress indicators */}
            <div className="flex justify-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="text-white/70 text-sm">Current Step</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                <span className="text-white/50 text-sm">Next: Project</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-white/20 rounded-full"></div>
                <span className="text-white/40 text-sm">Final: Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action buttons - properly centered */}
        <ButtonGroup 
          buttons={navigationButtons}
          className="mt-8"
        />
      </ContentSection>
    </PageBackground>
  );
};

export default SubPage1;