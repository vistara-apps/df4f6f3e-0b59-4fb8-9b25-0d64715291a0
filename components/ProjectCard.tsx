'use client';

import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'swiper';
  onSwipe?: (direction: 'left' | 'right') => void;
}

export function ProjectCard({ project, variant = 'default', onSwipe }: ProjectCardProps) {
  const handleSwipe = (direction: 'left' | 'right') => {
    if (onSwipe) {
      onSwipe(direction);
    }
  };

  return (
    <div className={`
      bg-surface rounded-lg p-6 card-shadow
      ${variant === 'swiper' ? 'swipe-card' : ''}
      transition-all duration-200 ease-in-out
    `}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center text-white text-xl">
            {project.creator?.avatar || '💡'}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary">{project.projectName}</h3>
            <p className="text-sm text-text-secondary">by {project.creator?.username}</p>
          </div>
        </div>
        {project.category && (
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {project.category}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-text-primary mb-4 leading-6">{project.description}</p>

      {/* Required Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-text-secondary mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Desired Outcomes */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-text-secondary mb-2">Goals</h4>
        <div className="flex flex-wrap gap-2">
          {project.desiredOutcomes.map((outcome, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {outcome}
            </span>
          ))}
        </div>
      </div>

      {/* Swipe Actions (only for swiper variant) */}
      {variant === 'swiper' && (
        <div className="flex space-x-4">
          <button
            onClick={() => handleSwipe('left')}
            className="flex-1 py-3 px-6 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition-colors duration-200"
          >
            Pass
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="flex-1 py-3 px-6 bg-green-100 text-green-600 rounded-lg font-semibold hover:bg-green-200 transition-colors duration-200"
          >
            Interested
          </button>
        </div>
      )}
    </div>
  );
}
