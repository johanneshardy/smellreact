import { useState } from 'react';
import './App.css';

// Import the page components
import HomePage from './pages/HomePage';
import SubPage1 from './pages/SubPage1';
import SubPage2 from './pages/SubPage2';
import SubPage3 from './pages/SubPage3';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Handle page navigation with smooth transitions
  const handleNavigate = (newPage) => {
    if (newPage === currentPage) return;
    
    setIsPageTransitioning(true);
    
    // Small delay for smooth transition
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageTransitioning(false);
    }, 150);
  };

  // Page component router
  const PageRouter = () => {
    const pageProps = { 
      onNavigate: handleNavigate,
      isTransitioning: isPageTransitioning 
    };

    switch (currentPage) {
      case 'home':
        return <HomePage {...pageProps} />;
      case 'subpage1':
        return <SubPage1 {...pageProps} />;
      case 'subpage2':
        return <SubPage2 {...pageProps} />;
      case 'subpage3':
        return <SubPage3 {...pageProps} />;
      default:
        return <NotFoundPage {...pageProps} />;
    }
  };

  return (
    <div className="app-container">
      {/* Page transition overlay */}
      {isPageTransitioning && (
        <div className="transition-overlay">
          <div className="transition-spinner" />
        </div>
      )}

      {/* Main page content - now supports scrolling */}
      <main className={`main-content ${currentPage === 'home' ? 'full-screen-page' : 'scrollable-page'}`}>
        <PageRouter />
      </main>
    </div>
  );
};

export default App;