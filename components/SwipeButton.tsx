'use client';

interface SwipeButtonProps {
  variant: 'like' | 'dislike';
  onClick: () => void;
  disabled?: boolean;
}

export function SwipeButton({ variant, onClick, disabled = false }: SwipeButtonProps) {
  const isLike = variant === 'like';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-16 h-16 rounded-full flex items-center justify-center text-2xl
        transition-all duration-200 ease-in-out transform
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
        ${isLike 
          ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' 
          : 'bg-red-500 hover:bg-red-600 text-white shadow-lg'
        }
      `}
    >
      {isLike ? '❤️' : '✖️'}
    </button>
  );
}
