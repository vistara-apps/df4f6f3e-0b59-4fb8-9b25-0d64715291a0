'use client';

import { User } from '@/lib/types';

interface ProfileCardProps {
  user: User;
  variant?: 'default';
}

export function ProfileCard({ user, variant = 'default' }: ProfileCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 card-shadow">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white text-2xl">
          {user.avatar || user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary">{user.username}</h2>
          {user.farcasterId && (
            <p className="text-text-secondary">@{user.farcasterId}</p>
          )}
        </div>
      </div>

      {/* Bio */}
      <p className="text-text-primary mb-4 leading-6">{user.bio}</p>

      {/* Skills */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-text-primary mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
