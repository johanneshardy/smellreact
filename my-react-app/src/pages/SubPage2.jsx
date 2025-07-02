import React from 'react';
import { 
  NavigationHeader, 
  PageBackground, 
  PageTitle, 
  ContentSection, 
  FeatureCard, 
  ButtonGroup 
} from './SharedComponents';

const SubPage2 = ({ onNavigate }) => {
  const projectFeatures = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: "Our Vision",
      description: "Creating innovative solutions that bridge technology and human experience, making complex concepts accessible to everyone through intuitive design.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Our Team",
      description: "A diverse group of researchers, designers, and innovators working together to push the boundaries of what's possible in digital experiences.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "Our Impact",
      description: "Measuring success through meaningful metrics that demonstrate real-world value and positive change in user experiences.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Our Research",
      description: "Evidence-based methodologies and cutting-edge research that inform every decision in our development process.",
      gradient: "from-emerald-500 to-emerald-600"
    }
  ];

  const navigationButtons = [
    {
      label: "Back to Journey",
      onClick: () => onNavigate('subpage1'),
      variant: 'secondary',
      direction: 'back'
    },
    {
      label: "Explore Smell",
      onClick: () => onNavigate('subpage3'),
      variant: 'primary',
      direction: 'forward'
    }
  ];

  return (
    <PageBackground primaryColor="purple">
      <NavigationHeader onNavigate={onNavigate} currentPage="subpage2" />
      
      <ContentSection>
        <PageTitle 
          title="Project Introduction"
          subtitle="Discover the vision, mission, and innovative approach that drives our project forward. Learn about our goals and the impact we aim to create."
          gradient="from-purple-300 via-white to-pink-300"
          lineGradient="from-purple-400 to-pink-500"
        />

        {/* Project details grid - improved layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 animate-slide-up">
          {projectFeatures.map((feature, index) => (
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

        {/* Project timeline section */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Project Timeline</h2>
            <p className="text-white/80 text-lg mb-8 max-w-3xl mx-auto">
              Our development follows a structured approach, with each phase building upon previous discoveries 
              to create a comprehensive and meaningful experience.
            </p>
          </div>

          {/* Timeline visualization */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <span className="text-white font-bold text-sm">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Research Phase</h3>
              <p className="text-white/70 text-sm">Foundation & Discovery</p>
            </div>

            {/* Connection line */}
            <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-4"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <span className="text-white font-bold text-sm">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Development</h3>
              <p className="text-white/70 text-sm">Building & Testing</p>
            </div>

            {/* Connection line */}
            <div className="hidden md:block flex-1 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 mx-4"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mb-3 shadow-lg">
                <span className="text-white font-bold text-sm">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Implementation</h3>
              <p className="text-white/70 text-sm">Launch & Refinement</p>
            </div>
          </div>
        </div>

        {/* Key metrics section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-purple-300 mb-2">95%</div>
            <div className="text-white/80 text-sm">User Satisfaction</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-pink-300 mb-2">12+</div>
            <div className="text-white/80 text-sm">Months Development</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center border border-white/20">
            <div className="text-3xl font-bold text-blue-300 mb-2">50K+</div>
            <div className="text-white/80 text-sm">Lines of Code</div>
          </div>
        </div>

        {/* Navigation buttons - properly centered */}
        <ButtonGroup 
          buttons={navigationButtons}
          className="mt-8"
        />
      </ContentSection>
    </PageBackground>
  );
};

export default SubPage2;