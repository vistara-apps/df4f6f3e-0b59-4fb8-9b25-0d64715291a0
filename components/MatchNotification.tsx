'use client';

import { Match } from '@/lib/types';

interface MatchNotificationProps {
  match: Match;
  variant?: 'popup';
  onClose: () => void;
  onStartChat: () => void;
}

export function MatchNotification({ 
  match, 
  variant = 'popup', 
  onClose, 
  onStartChat 
}: MatchNotificationProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-lg p-6 max-w-sm w-full card-shadow">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">It&apos;s a Match!</h2>
          <p className="text-text-secondary mb-6">
            You both are interested in <span className="font-semibold text-primary">
              {match.project?.projectName}
            </span>
          </p>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 text-text-secondary rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Keep Swiping
            </button>
            <button
              onClick={onStartChat}
              className="flex-1 py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
