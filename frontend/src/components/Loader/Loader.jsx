import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-primary-container/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
          <div className="absolute inset-4 rounded-full bg-primary/10 blur-sm"></div>
        </div>
        <p className="font-label-md text-label-md text-primary tracking-wider animate-pulse uppercase">
          Loading TaskFlow...
        </p>
      </div>
    </div>
  );
};

export default Loader;
