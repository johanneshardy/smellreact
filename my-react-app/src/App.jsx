import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

import HomePage from './pages/HomePage';
import SubPage1 from './pages/SubPage1';
import SubPage2 from './pages/SubPage2';
import SubPage3 from './pages/SubPage3';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const navigate = useNavigate();
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const handleNavigate = (newPage) => {
    setIsPageTransitioning(true);
    setTimeout(() => {
      navigate(newPage === 'home' ? '/home' : `/${newPage}/`);
      setIsPageTransitioning(false);
    }, 150);
  };

  const pageProps = {
    onNavigate: handleNavigate,
    isTransitioning: isPageTransitioning
  };

  return (
    <div className="app-container">
      {isPageTransitioning && (
        <div className="transition-overlay">
          <div className="transition-spinner" />
        </div>
      )}
      <main className={`main-content`}>
        <Routes>
          <Route path="/home" element={<HomePage {...pageProps} />} />
          <Route path="/1/" element={<SubPage1 {...pageProps} />} />
          <Route path="/2/" element={<SubPage2 {...pageProps} />} />
          <Route path="/3/" element={<SubPage3 {...pageProps} />} />
          <Route path="/" element={<HomePage {...pageProps} />} />
          <Route path="*" element={<NotFoundPage {...pageProps} />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;