import React, { useMemo } from 'react';
import {
  Trophy,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  ShieldAlert,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuizResultsView: React.FC = () => {
  const {
    lastCompletedAttempt,
    navigateTo,
    startQuiz,
    isGeneratingQuiz,
    settings,
  } = useApp();
  const isDark = settings.theme === 'dark';

  if (!lastCompletedAttempt) {
    return (
      <div className={`text-center py-20 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
        <p>No completed attempt to display.</p>
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
  const total = att.totalQuestions;
  const score = att.score || 0;
  const percentage = att.percentage || 0;

  // Compute breakdown: correct, incorrect, unanswered
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const topicBreakdown: Record<string, { total: number; correct: number }> = {};

  att.questions.forEach((q) => {
    const userAns = att.userAnswers[q.id];
    if (!topicBreakdown[q.topic]) {
      topicBreakdown[q.topic] = { total: 0, correct: 0 };
    }
    topicBreakdown[q.topic].total += 1;

    if (!userAns) {
      unansweredCount++;
    } else if (userAns.toUpperCase() === q.correctOptionId.toUpperCase()) {
      correctCount++;
      topicBreakdown[q.topic].correct += 1;
    } else {
      incorrectCount++;
    }
  });

  const minutesUsed = Math.floor(att.timeUsedSeconds / 60);
  const secondsUsed = att.timeUsedSeconds % 60;

  // Performance tier
  let performanceTier = {
    title: 'Needs Revision',
    color: isDark ? 'text-amber-400' : 'text-amber-700 font-bold',
    badgeBg: isDark ? 'bg-amber-950/40 border-amber-500/40 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900 font-bold',
    description: 'Review the theory lessons and formula library to reinforce foundational concepts.',
  };
  if (percentage === 100) {
    performanceTier = {
      title: 'Flawless Master',
      color: isDark ? 'text-emerald-400' : 'text-emerald-700 font-bold',
      badgeBg: isDark ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold',
      description: 'Outstanding! You achieved complete mathematical perfection across all questions.',
    };
  } else if (percentage >= 80) {
    performanceTier = {
      title: 'Distinction Achiever',
      color: isDark ? 'text-violet-400' : 'text-violet-700 font-bold',
      badgeBg: isDark ? 'bg-violet-950/40 border-violet-500/40 text-violet-300' : 'bg-violet-100 border-violet-300 text-violet-900 font-bold',
      description: 'Superb command of mathematical theory, computational procedures, and proofs.',
    };
  } else if (percentage >= 60) {
    performanceTier = {
      title: 'Proficient Competitor',
      color: isDark ? 'text-cyan-400' : 'text-cyan-700 font-bold',
      badgeBg: isDark ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300' : 'bg-cyan-100 border-cyan-300 text-cyan-900 font-bold',
      description: 'Solid understanding of core techniques with minor opportunities for optimization.',
    };
  }

  const xpEarned = 50 + correctCount * 20 + (percentage >= 80 ? 100 : 0);

  return (
    <div className="space-y-10 pb-20 max-w-4xl mx-auto">
      {/* Hero Score Showcase Card */}
      <div className={`rounded-3xl border p-8 sm:p-10 shadow-2xl text-center space-y-6 transition-colors ${
        isDark
          ? 'border-slate-800 bg-gradient-to-b from-slate-900 via-indigo-950/30 to-slate-950'
          : 'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100/90 shadow-slate-200/70'
      }`}>
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-bold font-mono uppercase tracking-wider mx-auto ${
          performanceTier.badgeBg
        }`}>
          <Award className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={performanceTier.color}>{performanceTier.title}</span>
        </div>

        <div className="space-y-2">
          <div className={`text-5xl sm:text-7xl font-extrabold font-mono tracking-tight tabular-nums ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {score} <span className={`text-2xl sm:text-3xl font-normal ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>/ {total}</span>
          </div>
          <div className={`text-2xl sm:text-3xl font-bold font-mono tabular-nums ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            {percentage}%
          </div>
        </div>

        <p className={`text-sm max-w-lg mx-auto leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {performanceTier.description}
        </p>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigateTo('review')}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-white" />
            <span className="text-white">Review All Questions & Solutions</span>
          </button>

          <button
            onClick={() => startQuiz(att.mode, att.unitId)}
            disabled={isGeneratingQuiz}
            className={`px-6 py-3 rounded-xl font-bold text-xs border transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 hover:text-slate-950 border-slate-300 shadow-xs'
            }`}
          >
            <RotateCcw className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`} />
            <span>{isGeneratingQuiz ? 'Generating New Set...' : 'Play Again (New Questions)'}</span>
          </button>
        </div>
      </div>

      {/* Numerical Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Correct */}
        <div className={`rounded-2xl border p-4 text-center transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className={`flex items-center justify-center gap-1.5 mb-1 ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Correct</span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {correctCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">+{correctCount * 1} marks</div>
        </div>

        {/* Incorrect */}
        <div className={`rounded-2xl border p-4 text-center transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className={`flex items-center justify-center gap-1.5 mb-1 ${
            isDark ? 'text-rose-400' : 'text-rose-600'
          }`}>
            <XCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Incorrect</span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {incorrectCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">0 marks</div>
        </div>

        {/* Unanswered */}
        <div className={`rounded-2xl border p-4 text-center transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className={`flex items-center justify-center gap-1.5 mb-1 ${
            isDark ? 'text-amber-400' : 'text-amber-600'
          }`}>
            <HelpCircle className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Unanswered</span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {unansweredCount}
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">0 marks</div>
        </div>

        {/* Time Taken */}
        <div className={`rounded-2xl border p-4 text-center transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className={`flex items-center justify-center gap-1.5 mb-1 ${
            isDark ? 'text-cyan-400' : 'text-cyan-700'
          }`}>
            <Clock className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase">Time Taken</span>
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {minutesUsed}m {secondsUsed}s
          </div>
          <div className="text-[11px] text-slate-500 font-mono mt-0.5">
            of {Math.floor(att.durationSeconds / 60)}m max
          </div>
        </div>
      </div>

      {/* Topic-Wise Strengths & Weaknesses Analysis */}
      <div className={`rounded-2xl border p-6 sm:p-7 shadow-xl space-y-5 transition-colors ${
        isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white shadow-slate-200/50'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h2 className={`text-base font-bold flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <TrendingUp className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-700'}`} />
            <span>Topic-Wise Strengths & Weaknesses</span>
          </h2>
          <span className={`text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Performance by Concept
          </span>
        </div>

        <div className="space-y-4">
          {Object.entries(topicBreakdown).map(([topicName, data]) => {
            const topicPct = Math.round((data.correct / data.total) * 100);
            const isStrength = topicPct >= 75;

            return (
              <div key={topicName} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800 font-semibold'}>
                    {topicName}
                  </span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                      {data.correct} / {data.total}
                    </span>
                    <span
                      className={`font-bold ${
                        isStrength
                          ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                          : topicPct >= 50
                          ? isDark ? 'text-amber-400' : 'text-amber-700'
                          : isDark ? 'text-rose-400' : 'text-rose-700'
                      }`}
                    >
                      {topicPct}%
                    </span>
                  </div>
                </div>

                <div className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}>
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isStrength
                        ? 'bg-emerald-500'
                        : topicPct >= 50
                        ? 'bg-amber-500'
                        : 'bg-rose-500'
                    }`}
                    style={{ width: `${topicPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
