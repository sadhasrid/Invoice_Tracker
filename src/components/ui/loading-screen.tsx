import React from 'react';

type LoadingScreenProps = {
  message?: string;
};

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = 'Loading…' }) => {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background/80 backdrop-blur-sm">
      <div className="relative flex items-center gap-4 rounded-xl border bg-card p-6 shadow-lg">
        <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" aria-hidden />
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Please wait</span>
          <span className="text-base font-medium">{message}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;


