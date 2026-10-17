import React from 'react';
import { Flag, CheckCircle2, Circle } from 'lucide-react';
import { Question } from '../types';
import { useApp } from '../context/AppContext';

interface QuestionPaletteProps {
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, string>;
  markedForReview: Record<string, boolean>;
  onSelectIndex: (index: number) => void;
  onSubmit: () => void;
}

export const QuestionPalette: React.FC<QuestionPaletteProps> = ({
  questions,
  currentIndex,
  userAnswers,
  markedForReview,
  onSelectIndex,
  onSubmit,
}) => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';

  const total = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const markedCount = Object.values(markedForReview).filter(Boolean).length;
  const unansweredCount = total - answeredCount;

  return (
    <div className={`rounded-2xl border p-5 shadow-xl backdrop-blur-md flex flex-col justify-between transition-colors ${
      isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-slate-200/60'
    }`}>
      <div>
        <div className={`border-b pb-3 mb-4 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Question Palette
          </h4>
          <div className="mt-2 flex items-center justify-between text-xs font-mono">
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Answered: <strong className={isDark ? 'text-emerald-400' : 'text-emerald-700 font-bold'}>{answeredCount}</strong>/{total}
            </span>
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Flagged: <strong className={isDark ? 'text-amber-400' : 'text-amber-700 font-bold'}>{markedCount}</strong>
            </span>
          </div>
        </div>

        {/* Question Numbers Grid */}
        <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-1">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = !!userAnswers[q.id];
            const isMarked = !!markedForReview[q.id];

            let cellClass = isDark
              ? 'palette-cell-unanswered border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
              : 'palette-cell-unanswered border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100';

            if (isCurrent) {
              cellClass = isDark
                ? 'palette-cell-current border-violet-500 bg-violet-600/30 text-white font-bold ring-2 ring-violet-500/50'
                : 'palette-cell-current border-violet-600 bg-violet-100 text-violet-900 font-bold ring-2 ring-violet-500/40';
            } else if (isMarked) {
              cellClass = isDark
                ? 'palette-cell-marked border-amber-500/60 bg-amber-950/40 text-amber-300 font-medium'
                : 'palette-cell-marked border-amber-300 bg-amber-50 text-amber-900 font-semibold';
            } else if (isAnswered) {
              cellClass = isDark
                ? 'palette-cell-answered border-emerald-500/40 bg-emerald-950/30 text-emerald-300 font-medium'
                : 'palette-cell-answered border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold';
            }

            return (
              <button
                key={q.id}
                onClick={() => onSelectIndex(idx)}
                className={`relative h-9 rounded-lg border text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${cellClass}`}
                title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}${isMarked ? ' (Marked for Review)' : ''}`}
              >
                {idx + 1}
                {isMarked && (
                  <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border ${
                    isDark ? 'bg-amber-400 border-slate-900' : 'bg-amber-500 border-white'
                  }`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`mt-4 pt-3 border-t space-y-1.5 text-[11px] ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded border ${
              isDark ? 'bg-emerald-500/30 border-emerald-500/50' : 'bg-emerald-100 border-emerald-300'
            }`} />
            <span>Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded border ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-300'
            }`} />
            <span>Unanswered ({unansweredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded border ${
              isDark ? 'bg-amber-500/30 border-amber-500/60' : 'bg-amber-100 border-amber-300'
            }`} />
            <span>Marked for Review ({markedCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded border ${
              isDark ? 'bg-violet-600/40 border-violet-500' : 'bg-violet-100 border-violet-600'
            }`} />
            <span>Current Question</span>
          </div>
        </div>
      </div>

      <div className={`mt-5 pt-4 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
        <button
          onClick={onSubmit}
          className="w-full py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl shadow-md shadow-violet-500/20 transition-all text-center cursor-pointer"
        >
          Submit Quiz Attempt
        </button>
      </div>
    </div>
  );
};
