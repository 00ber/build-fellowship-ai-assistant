import { Play, Pause, RotateCcw } from 'lucide-react';

interface DemoControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  isPlaying: boolean;
  isComplete: boolean;
}

export default function DemoControls({
  onPlay,
  onPause,
  onReset,
  isPlaying,
  isComplete,
}: DemoControlsProps) {
  return (
    <div className="flex items-center gap-2 p-3 bg-surface rounded-lg border border-border">
      {/* Play / Pause */}
      {isPlaying ? (
        <button
          onClick={onPause}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-text-primary hover:bg-gray-200 transition-colors text-sm font-medium"
        >
          <Pause size={16} />
          Pause
        </button>
      ) : (
        <button
          onClick={onPlay}
          disabled={isComplete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-white hover:bg-primary-hover transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={16} />
          {isComplete ? 'Complete' : 'Play'}
        </button>
      )}

      {/* Reset */}
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gray-100 text-text-secondary hover:bg-gray-200 hover:text-text-primary transition-colors text-sm font-medium"
      >
        <RotateCcw size={16} />
        Reset
      </button>

      {/* Status indicator */}
      <div className="ml-auto flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isComplete
              ? 'bg-success'
              : isPlaying
                ? 'bg-primary animate-pulse-soft'
                : 'bg-gray-300'
          }`}
        />
        <span className="text-xs text-text-secondary">
          {isComplete ? 'Complete' : isPlaying ? 'Running' : 'Ready'}
        </span>
      </div>
    </div>
  );
}
