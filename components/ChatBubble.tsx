'use client';

import { ChatMessage } from '@/lib/types';

interface ChatBubbleProps {
  message: ChatMessage;
  variant: 'sender' | 'receiver';
  currentUserId: string;
}

export function ChatBubble({ message, currentUserId }: ChatBubbleProps) {
  const isSender = message.senderId === currentUserId;
  
  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          chat-bubble px-4 py-2 rounded-lg
          ${isSender 
            ? 'bg-primary text-white rounded-br-sm' 
            : 'bg-gray-200 text-text-primary rounded-bl-sm'
          }
        `}
      >
        <p className="text-sm">{message.message}</p>
        <p className={`text-xs mt-1 ${isSender ? 'text-white/70' : 'text-text-secondary'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}
