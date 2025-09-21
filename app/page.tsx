'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { ProfileCard } from '@/components/ProfileCard';
import { SwipeButton } from '@/components/SwipeButton';
import { MatchNotification } from '@/components/MatchNotification';
import { ChatBubble } from '@/components/ChatBubble';
import { Navigation } from '@/components/Navigation';
import { mockProjects, mockUser, mockMatches } from '@/lib/mockData';
import { Project, Match, ChatMessage, SwipeDirection } from '@/lib/types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'discover' | 'profile' | 'matches' | 'chat'>('discover');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [newMatch, setNewMatch] = useState<Match | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      matchId: '1',
      senderId: '2',
      message: 'Hey! Excited to work on the DeFi dashboard together!',
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      matchId: '1',
      senderId: '1',
      message: 'Same here! I have some great ideas for the UI/UX.',
      timestamp: new Date('2024-01-15T10:35:00'),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const currentProject = projects[currentProjectIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      // Simulate a match (50% chance for demo)
      if (Math.random() > 0.5) {
        const match: Match = {
          matchId: Date.now().toString(),
          userId1: mockUser.userId,
          userId2: currentProject.creatorId,
          projectId: currentProject.projectId,
          project: currentProject,
          matchedAt: new Date(),
        };
        setMatches(prev => [...prev, match]);
        setNewMatch(match);
        setShowMatchNotification(true);
      }
    }

    // Move to next project
    if (currentProjectIndex < projects.length - 1) {
      setCurrentProjectIndex(prev => prev + 1);
    } else {
      // Reset to beginning for demo
      setCurrentProjectIndex(0);
    }
  };

  const handleCloseMatch = () => {
    setShowMatchNotification(false);
    setNewMatch(null);
  };

  const handleStartChat = () => {
    setShowMatchNotification(false);
    setNewMatch(null);
    setCurrentPage('chat');
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        matchId: '1', // Using first match for demo
        senderId: mockUser.userId,
        message: newMessage,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const renderDiscoverPage = () => (
    <div className="max-w-lg mx-auto px-4 py-6 pb-20">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Project Palooza</h1>
        <p className="text-white/80">Find your perfect project partner, the fun way.</p>
      </div>

      {currentProject ? (
        <div className="space-y-6">
          <ProjectCard project={currentProject} variant="swiper" onSwipe={handleSwipe} />
          
          <div className="flex justify-center space-x-8">
            <SwipeButton variant="dislike" onClick={() => handleSwipe('left')} />
            <SwipeButton variant="like" onClick={() => handleSwipe('right')} />
          </div>
        </div>
      ) : (
        <div className="text-center text-white">
          <p>No more projects to show!</p>
        </div>
      )}
    </div>
  );

  const renderProfilePage = () => (
    <div className="max-w-lg mx-auto px-4 py-6 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
      </div>
      <ProfileCard user={mockUser} />
    </div>
  );

  const renderMatchesPage = () => (
    <div className="max-w-lg mx-auto px-4 py-6 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Your Matches</h1>
      </div>
      
      <div className="space-y-4">
        {matches.map((match) => (
          <div key={match.matchId} className="bg-surface rounded-lg p-4 card-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white">
                  {match.project?.creator?.avatar || '💡'}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{match.project?.projectName}</h3>
                  <p className="text-sm text-text-secondary">with {match.project?.creator?.username}</p>
                </div>
              </div>
              <button
                onClick={() => setCurrentPage('chat')}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90 transition-colors duration-200"
              >
                Chat
              </button>
            </div>
          </div>
        ))}
        
        {matches.length === 0 && (
          <div className="text-center text-white">
            <p>No matches yet. Keep swiping!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderChatPage = () => (
    <div className="max-w-lg mx-auto px-4 py-6 pb-20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Chat</h1>
      </div>
      
      <div className="bg-surface rounded-lg card-shadow h-96 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {chatMessages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              variant={message.senderId === mockUser.userId ? 'sender' : 'receiver'}
              currentUserId={mockUser.userId}
            />
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen">
      {currentPage === 'discover' && renderDiscoverPage()}
      {currentPage === 'profile' && renderProfilePage()}
      {currentPage === 'matches' && renderMatchesPage()}
      {currentPage === 'chat' && renderChatPage()}
      
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {showMatchNotification && newMatch && (
        <MatchNotification
          match={newMatch}
          onClose={handleCloseMatch}
          onStartChat={handleStartChat}
        />
      )}
    </main>
  );
}
