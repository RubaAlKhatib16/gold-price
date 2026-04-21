// src/components/LoadingScreen.jsx
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center">
      {/* أيقونة متحركة */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-2 border-4 border-primary-container rounded-full animate-spin border-t-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
            payments
          </span>
        </div>
      </div>

      {/* نص متحرك */}
      <h2 className="text-2xl font-headline font-bold text-primary mb-2 animate-pulse">
        Gold Portfolio Tracker
      </h2>
      <p className="text-on-surface-variant text-sm">Loading your vault...</p>

      {/* شريط تقدم متحرك */}
      <div className="w-48 h-1 bg-surface-container-high rounded-full mt-8 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full animate-loading-bar"></div>
      </div>

      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;