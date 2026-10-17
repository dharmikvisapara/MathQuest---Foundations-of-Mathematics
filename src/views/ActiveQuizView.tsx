import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionPalette } from '../components/QuestionPalette';
import { QuizTimer } from '../components/QuizTimer';

export const ActiveQuizView: React.FC = () => {
  const {
    activeAttempt,
    activeQuestionIndex,
    timeRemaining,
    setActiveQuestionIndex,
    selectAnswer,
    toggleMarkForReview,
    submitQuiz,
    discardActiveQuiz,
    settings,
  } = useApp();

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showDiscardModal, setShowDiscardModal] = useState(false);

  if (!activeAttempt) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>No active quiz attempt found.</p>
      </div>
    );
  }

  const currentQuestion = activeAttempt.questions[activeQuestionIndex];
  const total = activeAttempt.totalQuestions;
  const answeredCount = Object.keys(activeAttempt.userAnswers).length;
  const unansweredCount = total - answeredCount;
  const progressPercent = Math.round((answeredCount / total) * 100);

  const handleNext = () => {
    if (activeQuestionIndex < total - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  const handleConfirmSubmit = () => {
    setShowSubmitModal(false);
    submitQuiz(false);
  };

  const isDark = settings.theme === 'dark';

  return (
    <div className="space-y-6 pb-20">
      {/* Quiz Top Action & Status Bar */}
      <div className={`rounded-2xl border p-4 sm:p-5 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-slate-200/60'
      }`}>
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-bold uppercase ${isDark ? 'text-violet-400' : 'text-violet-700'}`}>
                {activeAttempt.mode === 'master' ? 'Master Quiz' : `${activeAttempt.mode.toUpperCase()} Quiz`}
              </span>
              <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-300'}>·</span>
              {activeAttempt.isFallback ? (
                <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark ? 'text-cyan-400 bg-cyan-950/50 border-cyan-800/60' : 'text-cyan-900 bg-cyan-50 border-cyan-200'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified Offline Bank</span>
                </span>
              ) : (
                <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                  isDark ? 'text-violet-400 bg-violet-950/50 border-violet-800/60' : 'text-violet-900 bg-violet-50 border-violet-200'
                }`}>
                  <Sparkles className="w-3 h-3" />
                  <span>AI Generated (Unique)</span>
                </span>
              )}
            </div>
            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Answered <strong className={`font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>{answeredCount}</strong> of {total} questions
            </div>
          </div>
        </div>

        {/* Timer and Quit Controls */}
        <div className="flex items-center gap-3">
          <QuizTimer
            timeRemainingSeconds={timeRemaining}
            totalDurationSeconds={activeAttempt.durationSeconds}
          />

          <button
            onClick={() => setShowDiscardModal(true)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800' : 'text-slate-500 hover:text-rose-600 hover:bg-slate-100'
            }`}
            title="Quit and discard quiz"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
        <div
          className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Layout: Question Card (Left) & Question Palette (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        <div className="lg:col-span-3">
          <QuestionCard
            question={currentQuestion}
            currentIndex={activeQuestionIndex}
            totalQuestions={total}
            selectedOptionId={activeAttempt.userAnswers[currentQuestion.id]}
            isMarkedForReview={!!activeAttempt.markedForReview[currentQuestion.id]}
            onSelectOption={(optId) => selectAnswer(currentQuestion.id, optId)}
            onToggleReview={() => toggleMarkForReview(currentQuestion.id)}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSubmit={() => setShowSubmitModal(true)}
          />
        </div>

        <div className="lg:col-span-1">
          <QuestionPalette
            questions={activeAttempt.questions}
            currentIndex={activeQuestionIndex}
            userAnswers={activeAttempt.userAnswers}
            markedForReview={activeAttempt.markedForReview}
            onSelectIndex={(idx) => setActiveQuestionIndex(idx)}
            onSubmit={() => setShowSubmitModal(true)}
          />
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Confirm Quiz Submission</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to finalize your attempt? Answers cannot be changed once submitted.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-emerald-400">
                <span>Answered Questions:</span>
                <strong>{answeredCount}</strong>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>Unanswered Questions:</span>
                <strong>{unansweredCount}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Flagged for Review:</span>
                <strong>{Object.values(activeAttempt.markedForReview).filter(Boolean).length}</strong>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/30 border border-amber-500/30 p-3 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>You still have {unansweredCount} unanswered questions. Unanswered questions receive 0 marks.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Continue Quiz
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg shadow-md transition-all"
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Discard Confirmation Modal */}
      {showDiscardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Quit Quiz Attempt?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If you leave now, your current answers and timer progress will be lost.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDiscardModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Keep Playing
              </button>
              <button
                onClick={() => {
                  setShowDiscardModal(false);
                  discardActiveQuiz();
                }}
                className="px-4 py-2 text-xs font-bold text-rose-300 bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-lg transition-colors"
              >
                Quit Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
