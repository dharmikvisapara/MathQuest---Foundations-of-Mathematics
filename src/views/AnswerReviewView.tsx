import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MathView } from '../components/MathView';

export const AnswerReviewView: React.FC = () => {
  const { lastCompletedAttempt, navigateTo, startQuiz, isGeneratingQuiz, settings } = useApp();
  const isDark = settings.theme === 'dark';

  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct' | 'unanswered'>('all');

  if (!lastCompletedAttempt) {
    return (
      <div className={`text-center py-20 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        <p>No attempt available to review.</p>
        <button
          onClick={() => navigateTo('quiz-arena')}
          className="mt-4 px-4 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg cursor-pointer"
        >
          Go to Quiz Arena
        </button>
      </div>
    );
  }

  const att = lastCompletedAttempt;

  const filteredQuestions = useMemo(() => {
    return att.questions.filter((q) => {
      const userAns = att.userAnswers[q.id];
      const isCorrect = userAns && userAns.toUpperCase() === q.correctOptionId.toUpperCase();
      const isUnanswered = !userAns;

      if (filterMode === 'incorrect') return userAns && !isCorrect;
      if (filterMode === 'correct') return isCorrect;
      if (filterMode === 'unanswered') return isUnanswered;
      return true;
    });
  }, [att, filterMode]);

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <button
          onClick={() => navigateTo('results')}
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Score Report</span>
        </button>

        <button
          onClick={() => startQuiz(att.mode, att.unitId)}
          disabled={isGeneratingQuiz}
          className="px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-white" />
          <span className="text-white">{isGeneratingQuiz ? 'Generating...' : 'Retake with New Questions'}</span>
        </button>
      </div>

      {/* Review Header Banner */}
      <div className="space-y-2">
        <h1 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Detailed Answer & Solutions Review
        </h1>
        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Scored <strong className={isDark ? 'text-white' : 'text-slate-900'}>{att.score} / {att.totalQuestions}</strong> ({att.percentage}%) · Every question includes step-by-step mathematical reasoning.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className={`tab-control-bar flex items-center gap-1 p-1 rounded-xl border max-w-md ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setFilterMode('all')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filterMode === 'all'
              ? isDark ? 'bg-slate-800 text-white font-semibold' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({att.totalQuestions})
        </button>
        <button
          onClick={() => setFilterMode('incorrect')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filterMode === 'incorrect'
              ? isDark ? 'bg-rose-950/80 text-rose-300 font-semibold' : 'bg-rose-100 text-rose-900 font-bold shadow-xs border border-rose-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Incorrect
        </button>
        <button
          onClick={() => setFilterMode('correct')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filterMode === 'correct'
              ? isDark ? 'bg-emerald-950/80 text-emerald-300 font-semibold' : 'bg-emerald-100 text-emerald-900 font-bold shadow-xs border border-emerald-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Correct
        </button>
        <button
          onClick={() => setFilterMode('unanswered')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            filterMode === 'unanswered'
              ? isDark ? 'bg-amber-950/80 text-amber-300 font-semibold' : 'bg-amber-100 text-amber-900 font-bold shadow-xs border border-amber-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Unanswered
        </button>
      </div>

      {/* Questions Review List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const userAns = att.userAnswers[q.id];
          const isCorrect = userAns && userAns.toUpperCase() === q.correctOptionId.toUpperCase();
          const isUnanswered = !userAns;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-6 sm:p-7 shadow-lg backdrop-blur-sm space-y-5 transition-all ${
                isDark
                  ? isCorrect
                    ? 'border-emerald-500/30 bg-slate-900/80'
                    : isUnanswered
                    ? 'border-amber-500/30 bg-slate-900/80'
                    : 'border-rose-500/30 bg-slate-900/80'
                  : isCorrect
                  ? 'border-emerald-200 bg-white shadow-emerald-500/5'
                  : isUnanswered
                  ? 'border-amber-200 bg-white shadow-amber-500/5'
                  : 'border-rose-200 bg-white shadow-rose-500/5'
              }`}
            >
              {/* Question Header & Verdict */}
              <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Question {idx + 1}</span>
                  <span aria-hidden="true">·</span>
                  <span className={isDark ? 'text-violet-400' : 'text-violet-700 font-semibold'}>{q.topic}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase text-[10px] font-mono">{q.difficulty}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isCorrect && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'text-emerald-400 bg-emerald-950/50 border-emerald-500/40'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct (+1 Mark)
                    </span>
                  )}
                  {!isCorrect && !isUnanswered && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'text-rose-400 bg-rose-950/50 border-rose-500/40'
                        : 'text-rose-800 bg-rose-50 border-rose-200'
                    }`}>
                      <XCircle className="w-3.5 h-3.5" /> Incorrect (0 Marks)
                    </span>
                  )}
                  {isUnanswered && (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'text-amber-400 bg-amber-950/50 border-amber-500/40'
                        : 'text-amber-800 bg-amber-50 border-amber-200'
                    }`}>
                      <HelpCircle className="w-3.5 h-3.5" /> Unanswered (0 Marks)
                    </span>
                  )}
                </div>
              </div>

              {/* Question Text with KaTeX */}
              <div className={`text-sm sm:text-base font-medium leading-relaxed ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <MathView content={q.questionText} />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {q.options.map((opt) => {
                  const isUserPick = userAns === opt.id;
                  const isCorrectAnswer = q.correctOptionId.toUpperCase() === opt.id.toUpperCase();

                  let borderClass = isDark
                    ? 'border-slate-800 bg-slate-950/60 text-slate-300'
                    : 'border-slate-200 bg-slate-50 text-slate-800';
                  let badgeClass = isDark
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-slate-200 text-slate-700';

                  if (isCorrectAnswer) {
                    borderClass = isDark
                      ? 'border-emerald-500/80 bg-emerald-950/30 text-white font-medium ring-1 ring-emerald-500/40'
                      : 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                    badgeClass = 'bg-emerald-600 text-white font-bold';
                  } else if (isUserPick) {
                    borderClass = isDark
                      ? 'border-rose-500/80 bg-rose-950/30 text-rose-200 ring-1 ring-rose-500/40'
                      : 'border-rose-400 bg-rose-50 text-rose-950 font-semibold ring-1 ring-rose-300';
                    badgeClass = 'bg-rose-600 text-white font-bold';
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed transition-all ${borderClass}`}
                    >
                      <div className={`w-6 h-6 rounded-md shrink-0 flex items-center justify-center font-mono text-xs ${badgeClass}`}>
                        {opt.id}
                      </div>
                      <div className="flex-1 pt-0.5">
                        <MathView content={opt.text} />
                        {isCorrectAnswer && (
                          <div className={`text-[10px] font-semibold mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>✓ Correct Option</div>
                        )}
                        {isUserPick && !isCorrectAnswer && (
                          <div className={`text-[10px] font-semibold mt-1 ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>✗ Your Selection</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Verified Explanation & Formula Reference */}
              <div className={`pt-4 border-t space-y-2 ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
                <div className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <BookOpen className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-700'}`} />
                  <span>Mathematical Solution & Explanation</span>
                </div>
                <div className={`text-xs leading-relaxed p-4 rounded-xl border ${
                  isDark
                    ? 'text-slate-200 bg-slate-950/80 border-slate-800/80'
                    : 'text-slate-800 bg-slate-50 border-slate-200'
                }`}>
                  <MathView content={q.explanation} />
                </div>
                {q.formulaReference && (
                  <div className={`text-xs font-mono pt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    <span>Applicable Formula: </span>
                    <span className={`font-semibold ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>
                      <MathView content={`$${q.formulaReference}$`} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
