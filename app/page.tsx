'use client';

import { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { ProfileCard } from '@/components/ProfileCard';
import { SwipeButton } from '@/components/SwipeButton';
import { MatchNotification } from '@/components/MatchNotification';
import { ChatBubble } from '@/components/ChatBubble';
import { Navigation } from '@/components/Navigation';
import { Loading, LoadingScreen } from '@/components/Loading';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProjectService } from '@/lib/services/project-service';
import { MatchService } from '@/lib/services/match-service';
import { AuthService } from '@/lib/auth';
import { Project, Match, ChatMessage, User } from '@/lib/types';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'discover' | 'profile' | 'matches' | 'chat'>('discover');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showMatchNotification, setShowMatchNotification] = useState(false);
  const [newMatch, setNewMatch] = useState<Match | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentProject = projects[currentProjectIndex];

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load projects
        const fetchedProjects = await ProjectService.getProjects(20, 0);
        setProjects(fetchedProjects);

        // For demo purposes, we'll simulate a user
        // In production, this would come from Farcaster authentication
        const demoUser = await AuthService.authenticateUser('demo-user', 'demo_user');
        setCurrentUser(demoUser);

        // Load matches for demo user
        if (demoUser) {
          const userMatches = await MatchService.getMatchesForUser(demoUser.userId);
          setMatches(userMatches);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentUser || !currentProject) return;

    try {
      // Record swipe
      await MatchService.recordSwipe({
        swiperId: currentUser.userId,
        projectId: currentProject.projectId,
        direction,
      });

      // Check for match if swiped right
      if (direction === 'right') {
        const match = await MatchService.checkForMatch(currentUser.userId, currentProject.projectId);
        if (match) {
          setMatches(prev => [...prev, match]);
          setNewMatch(match);
          setShowMatchNotification(true);
        }
      }

      // Move to next project
      if (currentProjectIndex < projects.length - 1) {
        setCurrentProjectIndex(prev => prev + 1);
      } else {
        // Reset to beginning
        setCurrentProjectIndex(0);
      }
    } catch (err) {
      console.error('Error handling swipe:', err);
      setError('Failed to record swipe. Please try again.');
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
    if (newMessage.trim() && currentUser && matches.length > 0) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        matchId: matches[0].matchId, // Using first match for demo
        senderId: currentUser.userId,
        message: newMessage,
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const renderDiscoverPage = () => {
    if (isLoading) {
      return <LoadingScreen message="Loading projects..." />;
    }

    if (error) {
      return (
        <div className="max-w-lg mx-auto px-4 py-6 pb-20">
          <div className="text-center text-white">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
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
            <p>No projects available. Create one to get started!</p>
          </div>
        )}
      </div>
    );
  };

  const renderProfilePage = () => {
    if (isLoading) {
      return <LoadingScreen message="Loading profile..." />;
    }

    if (!currentUser) {
      return (
        <div className="max-w-lg mx-auto px-4 py-6 pb-20">
          <div className="text-center text-white">
            <p>Please authenticate to view your profile.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-lg mx-auto px-4 py-6 pb-20">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        </div>
        <ProfileCard user={currentUser} />
      </div>
    );
  };

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
              variant={message.senderId === currentUser?.userId ? 'sender' : 'receiver'}
              currentUserId={currentUser?.userId || ''}
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}
