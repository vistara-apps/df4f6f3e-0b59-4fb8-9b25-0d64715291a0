'use client';

import React from 'react';

interface LoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loading({ message = 'Loading...', size = 'md', className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className={`${sizeClasses[size]} border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-2`}></div>
      {message && (
        <p className="text-text-secondary text-sm animate-pulse">{message}</p>
      )}
    </div>
  );
}

export function LoadingScreen({ message = 'Loading Project Palooza...' }: { message?: string }) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Project Palooza</h2>
        <p className="text-white/80">{message}</p>
      </div>
    </div>
  );
}

