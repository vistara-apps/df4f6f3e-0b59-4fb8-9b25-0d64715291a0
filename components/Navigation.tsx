'use client';

import { useState } from 'react';

interface NavigationProps {
  currentPage: 'discover' | 'profile' | 'matches' | 'chat';
  onPageChange: (page: 'discover' | 'profile' | 'matches' | 'chat') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-200 px-4 py-2">
      <div className="max-w-lg mx-auto flex justify-around">
        <button
          onClick={() => onPageChange('discover')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
            currentPage === 'discover' 
              ? 'text-primary bg-primary/10' 
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <span className="text-xl mb-1">🔍</span>
          <span className="text-xs">Discover</span>
        </button>
        
        <button
          onClick={() => onPageChange('matches')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
            currentPage === 'matches' 
              ? 'text-primary bg-primary/10' 
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <span className="text-xl mb-1">💫</span>
          <span className="text-xs">Matches</span>
        </button>
        
        <button
          onClick={() => onPageChange('chat')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
            currentPage === 'chat' 
              ? 'text-primary bg-primary/10' 
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <span className="text-xl mb-1">💬</span>
          <span className="text-xs">Chat</span>
        </button>
        
        <button
          onClick={() => onPageChange('profile')}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors duration-200 ${
            currentPage === 'profile' 
              ? 'text-primary bg-primary/10' 
              : 'text-text-secondary hover:text-primary'
          }`}
        >
          <span className="text-xl mb-1">👤</span>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );
}
