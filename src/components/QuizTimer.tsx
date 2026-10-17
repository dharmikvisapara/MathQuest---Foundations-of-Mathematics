import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface QuizTimerProps {
  timeRemainingSeconds: number;
  totalDurationSeconds: number;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({
  timeRemainingSeconds,
  totalDurationSeconds,
}) => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';

  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;

  const isLowTime = timeRemainingSeconds <= 180; // under 3 minutes
  const isCritical = timeRemainingSeconds <= 60; // under 1 minute

  let colorClasses = isDark
    ? 'text-cyan-400 border-cyan-500/30 bg-cyan-950/40'
    : 'text-cyan-900 border-cyan-300 bg-cyan-50 shadow-sm';

  if (isCritical) {
    colorClasses = isDark
      ? 'text-rose-400 border-rose-500/50 bg-rose-950/40 animate-pulse'
      : 'text-rose-900 border-rose-300 bg-rose-50 animate-pulse shadow-sm';
  } else if (isLowTime) {
    colorClasses = isDark
      ? 'text-amber-400 border-amber-500/40 bg-amber-950/30'
      : 'text-amber-900 border-amber-300 bg-amber-50 shadow-sm';
  }

  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl border backdrop-blur-md transition-all ${colorClasses}`}>
      {isCritical ? (
        <AlertTriangle className={`w-4 h-4 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
      ) : (
        <Clock className={`w-4 h-4 ${isDark ? 'text-cyan-400' : 'text-cyan-700'}`} />
      )}
      <div className="flex flex-col">
        <span className="text-xs font-mono font-bold tracking-wider tabular-nums leading-none">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </span>
        <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90 mt-0.5">
          Time Remaining
        </span>
      </div>
    </div>
  );
};
