'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-surface rounded-lg p-8 card-shadow text-center">
          <div className="text-6xl mb-4">😅</div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-text-secondary mb-6">
            Don't worry, even the best projects have bugs. Let's get you back to finding your perfect project partner!
          </p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
