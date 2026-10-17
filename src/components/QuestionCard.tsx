import React, { useEffect } from 'react';
import { Bookmark, ChevronLeft, ChevronRight, Flag } from 'lucide-react';
import { Question } from '../types';
import { MathView } from './MathView';
import { useApp } from '../context/AppContext';

interface QuestionCardProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  isMarkedForReview: boolean;
  onSelectOption: (optionId: string) => void;
  onToggleReview: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  isMarkedForReview,
  onSelectOption,
  onToggleReview,
  onNext,
  onPrevious,
  onSubmit,
}) => {
  const { settings } = useApp();
  const isDark = settings.theme === 'dark';

  // Keyboard navigation: A/B/C/D or 1/2/3/4 selects options
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        onSelectOption(key);
      } else if (key === '1') onSelectOption('A');
      else if (key === '2') onSelectOption('B');
      else if (key === '3') onSelectOption('C');
      else if (key === '4') onSelectOption('D');
      else if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) onNext();
      else if (e.key === 'ArrowLeft' && currentIndex > 0) onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, totalQuestions, onSelectOption, onNext, onPrevious]);

  const difficultyColors = isDark
    ? {
        easy: 'text-emerald-400 border-emerald-500/30 bg-emerald-950/30',
        medium: 'text-amber-400 border-amber-500/30 bg-amber-950/30',
        hard: 'text-rose-400 border-rose-500/30 bg-rose-950/30',
      }
    : {
        easy: 'text-emerald-800 border-emerald-300 bg-emerald-50 font-semibold',
        medium: 'text-amber-800 border-amber-300 bg-amber-50 font-semibold',
        hard: 'text-rose-800 border-rose-300 bg-rose-50 font-semibold',
      };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div
      className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between min-h-[480px] shadow-xl backdrop-blur-md transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-slate-200/60'
      }`}
    >
      <div>
        {/* Header Metadata */}
        <div className={`flex flex-wrap items-center justify-between gap-3 pb-4 border-b mb-6 ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600'
        }`}>
          <div className="flex items-center gap-2 text-xs">
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Question {currentIndex + 1}
            </span>
            <span aria-hidden="true">·</span>
            <span>of {totalQuestions}</span>
            <span aria-hidden="true">·</span>
            <span className={`font-semibold ${isDark ? 'text-violet-400' : 'text-violet-700'}`}>
              {question.topic}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-md border ${
                difficultyColors[question.difficulty] || difficultyColors.medium
              }`}
            >
              {question.difficulty}
            </span>

            <button
              onClick={onToggleReview}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                isMarkedForReview
                  ? isDark
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-medium'
                    : 'bg-amber-100 border-amber-300 text-amber-900 font-semibold'
                  : isDark
                  ? 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
              }`}
              title="Flag question to review later before submission"
            >
              <Flag className={`w-3.5 h-3.5 ${isMarkedForReview ? (isDark ? 'fill-amber-400 text-amber-400' : 'fill-amber-600 text-amber-600') : ''}`} />
              <span>{isMarkedForReview ? 'Marked' : 'Mark for Review'}</span>
            </button>
          </div>
        </div>

        {/* Question Text with KaTeX */}
        <div className="mb-8">
          <h3 className={`text-base sm:text-lg font-semibold leading-relaxed ${
            isDark ? 'text-slate-100' : 'text-slate-900'
          }`}>
            <MathView content={question.questionText} />
          </h3>
          {question.formulaReference && (
            <div className={`mt-3 inline-block px-3 py-1.5 rounded-lg border text-xs font-mono ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className={isDark ? 'text-slate-400 font-medium' : 'text-slate-600 font-medium'}>Formula Ref: </span>
              <MathView content={`$${question.formulaReference}$`} />
            </div>
          )}
        </div>

        {/* Four Options Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {question.options.map((option, idx) => {
            const letter = option.id || optionLetters[idx];
            const isSelected = selectedOptionId === letter;

            return (
              <button
                key={letter}
                onClick={() => onSelectOption(letter)}
                className={`relative group text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer question-option-btn ${
                  isSelected
                    ? isDark
                      ? 'question-option-selected border-violet-500 bg-gradient-to-r from-violet-950/70 to-indigo-950/70 text-white shadow-lg shadow-violet-500/15'
                      : 'question-option-selected border-violet-600 bg-violet-50 text-violet-950 ring-2 ring-violet-500/30 shadow-md font-semibold'
                    : isDark
                    ? 'question-option-unselected border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                    : 'question-option-unselected border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <div
                  className={`option-letter-badge w-7 h-7 rounded-lg shrink-0 flex items-center justify-center font-bold text-xs font-mono transition-colors border ${
                    isSelected
                      ? isDark
                        ? 'bg-violet-500 text-white border-violet-400 shadow-sm'
                        : 'bg-violet-600 text-white border-violet-600 shadow-sm'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 border-slate-700/60 group-hover:text-white group-hover:bg-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200 group-hover:bg-slate-200 group-hover:text-slate-900'
                  }`}
                >
                  {letter}
                </div>
                <div className={`option-answer-text text-sm font-medium leading-snug flex-1 pt-0.5 ${
                  isSelected
                    ? isDark ? 'text-white font-semibold' : 'text-violet-950 font-bold'
                    : isDark ? 'text-slate-200' : 'text-slate-800'
                }`}>
                  <MathView content={option.text} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className={`mt-8 pt-4 border-t flex items-center justify-between gap-4 ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer ${
            isDark ? 'text-slate-300 bg-slate-800/80 hover:bg-slate-800' : 'text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 shadow-sm'
          }`}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>

        <div className={`text-xs hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Use keys{' '}
          <kbd className={`px-1.5 py-0.5 rounded font-mono ${
            isDark ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-800'
          }`}>
            A-D
          </kbd>{' '}
          or{' '}
          <kbd className={`px-1.5 py-0.5 rounded font-mono ${
            isDark ? 'bg-slate-800 border border-slate-700 text-slate-300' : 'bg-slate-100 border border-slate-300 text-slate-800'
          }`}>
            1-4
          </kbd>{' '}
          to select
        </div>

        {currentIndex === totalQuestions - 1 ? (
          <button
            onClick={onSubmit}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            Review & Submit
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm shadow-violet-500/25 transition-colors cursor-pointer"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
