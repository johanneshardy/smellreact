import React from 'react';
// In a real project, you'd use ReactDOM.createRoot for React 18+
// import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component

// Tailwind CSS CDN script (would normally be in public/index.html or configured via PostCSS)
const TailwindCSS = () => (
  <script src="https://cdn.tailwindcss.com"></script>
);

// Custom styles for animations (would normally be in src/index.css or a global CSS file)
const CustomStyles = () => (
  <style>
    {`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap');
    body {
      font-family: 'Inter', sans-serif;
    }
    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
    .animate-fade-in-delay {
      animation: fadeIn 0.8s ease-out 0.3s forwards;
      opacity: 0;
    }
    .animate-slide-up {
      animation: slideUp 0.6s ease-out forwards;
      transform: translateY(20px);
      opacity: 0;
    }
    .animate-slide-up-delay {
      animation: slideUp 0.6s ease-out 0.2s forwards;
      transform: translateY(20px);
      opacity: 0;
    }
    .animate-zoom-in {
      animation: zoomIn 0.5s ease-out forwards;
      transform: scale(0.9);
      opacity: 0;
    }
    .animate-zoom-in-delay {
      animation: zoomIn 0.5s ease-out 0.2s forwards;
      transform: scale(0.9);
      opacity: 0;
    }

    @keyframes fadeIn {
      to { opacity: 1; }
    }
    @keyframes slideUp {
      to { transform: translateY(0); opacity: 1; }
    }
    @keyframes zoomIn {
      to { transform: scale(1); opacity: 1; }
    }
    `}
  </style>
);

// Main component export for Canvas environment
// In a local setup, you'd typically have:
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
export default function Index() {
  return (
    <>
      <TailwindCSS />
      <CustomStyles />
      <App />
    </>
  );
}