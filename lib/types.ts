export interface User {
  userId: string;
  username: string;
  bio: string;
  skills: string[];
  interests: string[];
  farcasterId?: string;
  walletAddress?: string;
  avatar?: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  description: string;
  requiredSkills: string[];
  desiredOutcomes: string[];
  creatorId: string;
  creator?: User;
  category?: string;
  tags?: string[];
}

export interface Swipe {
  swipeId: string;
  swiperId: string;
  projectId: string;
  direction: 'left' | 'right';
  timestamp: Date;
}

export interface Match {
  matchId: string;
  userId1: string;
  userId2: string;
  projectId: string;
  project?: Project;
  matchedAt: Date;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  message: string;
  timestamp: Date;
}

export interface SwipeDirection {
  direction: 'left' | 'right';
  projectId: string;
}
