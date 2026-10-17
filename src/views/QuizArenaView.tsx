import React from 'react';
import {
  Swords,
  Crown,
  Clock,
  Sparkles,
  Trophy,
  AlertCircle,
  RotateCw,
  Boxes,
  Calculator,
  TrendingUp,
  Network,
  History,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuizMode } from '../types';

export const QuizArenaView: React.FC = () => {
  const {
    startQuiz,
    isGeneratingQuiz,
    generationError,
    aiStatus,
    stats,
    viewAttemptResults,
    reviewAttempt,
  } = useApp();

  const quizModes: {
    id: QuizMode;
    title: string;
    subtitle: string;
    unitNum?: number;
    count: number;
    time: string;
    icon: React.ReactNode;
    color: string;
    border: string;
  }[] = [
    {
      id: 'unit1',
      title: 'Unit 1: Combinatorics Quiz',
      subtitle: 'Counting principles, permutations, binomial theorem, pigeonhole, and derangements.',
      unitNum: 1,
      count: 15,
      time: '15 Minutes',
      icon: <Boxes className="w-6 h-6 text-indigo-400" />,
      color: 'from-indigo-600/20 to-slate-900',
      border: 'border-indigo-500/30',
    },
    {
      id: 'unit2',
      title: 'Unit 2: Numerical Methods Quiz',
      subtitle: 'Root finding (Bisection, Newton), linear systems, and polynomial interpolation.',
      unitNum: 2,
      count: 15,
      time: '15 Minutes',
      icon: <Calculator className="w-6 h-6 text-cyan-400" />,
      color: 'from-cyan-600/20 to-slate-900',
      border: 'border-cyan-500/30',
    },
    {
      id: 'unit3',
      title: 'Unit 3: Operations Research Quiz',
      subtitle: 'Graphical LPP, Simplex algorithm, duality, Transportation NWCR/MODI, and Game Theory.',
      unitNum: 3,
      count: 15,
      time: '15 Minutes',
      icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-600/20 to-slate-900',
      border: 'border-emerald-500/30',
    },
    {
      id: 'unit4',
      title: 'Unit 4: Lattices & Boolean Algebra Quiz',
      subtitle: 'POSETs, Hasse diagrams, lattice properties, atoms, Stone theorem, and logic circuits.',
      unitNum: 4,
      count: 15,
      time: '15 Minutes',
      icon: <Network className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-600/20 to-slate-900',
      border: 'border-amber-500/30',
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-400 mb-2">
          <Swords className="w-4 h-4" />
          <span>Competitive Examination Arena</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Dynamic Quiz Arena</h1>
        <p className="mt-2 text-sm text-slate-400 max-w-3xl">
          Every time you click <strong className="text-slate-200">Start New Quiz</strong>, our secure backend calls Google Gemini to dynamically generate mathematically verified, non-repeating multiple-choice questions with balanced difficulties.
        </p>
      </div>

      {/* AI Backend Status Notice */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300">
            Backend Engine: <strong className="text-white font-mono">Gemini 3.8 Flash</strong> with Structured Schema & Verified Offline Fallback Bank
          </span>
        </div>
        <div className="text-slate-400 font-mono text-[11px]">
          {stats.recentFingerprints.length} questions memorized to prevent duplicates
        </div>
      </div>

      {generationError && (
        <div className="rounded-xl border border-rose-500/40 bg-rose-950/30 p-4 flex items-center gap-3 text-xs text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{generationError}</span>
        </div>
      )}

      {/* Flagship: Master Quiz Showcase Card */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-violet-950/80 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>THE GRANDMASTER EXAMINATION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Comprehensive Master Quiz (30 MCQs)
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Exactly 30 dynamically generated questions with guaranteed syllabus balance: <strong>8 from Unit 1</strong>, <strong>8 from Unit 2</strong>, <strong>7 from Unit 3</strong>, and <strong>7 from Unit 4</strong>. Questions and options are randomized across your screen.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>30 Minutes Time Limit</span>
              </div>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Max 30 Marks (1 Mark / Question)</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => startQuiz('master')}
            disabled={isGeneratingQuiz}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 disabled:opacity-50"
          >
            {isGeneratingQuiz ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Generating Unique Exam...</span>
              </>
            ) : (
              <>
                <Swords className="w-5 h-5" />
                <span>Start Master Quiz</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Individual Unit Quizzes (15 MCQs each) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Individual Unit Quizzes (15 MCQs · 15 Mins)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizModes.map((mode) => (
            <div
              key={mode.id}
              className={`rounded-2xl border ${mode.border} bg-gradient-to-b ${mode.color} p-6 shadow-xl backdrop-blur-sm flex flex-col justify-between space-y-5`}
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center">
                    {mode.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                    15 Questions · 15m
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white">{mode.title}</h3>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">{mode.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400">Max Score: 15</span>
                <button
                  onClick={() => startQuiz(mode.id, mode.id as any)}
                  disabled={isGeneratingQuiz}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm shadow-violet-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Swords className="w-4 h-4" />
                  <span>Start Unit Quiz</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Attempts Log */}
      {stats.attempts.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              <span>Recent Quiz Attempts</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {stats.attempts.length} attempts recorded
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60 font-mono">
                    <th className="py-3 px-4">Quiz Mode</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Time Taken</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.attempts.slice(0, 6).map((att) => {
                    const mins = Math.floor(att.timeUsedSeconds / 60);
                    const secs = att.timeUsedSeconds % 60;
                    const passed = (att.percentage || 0) >= 60;

                    return (
                      <tr key={att.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4 font-semibold text-white capitalize">
                          {att.mode === 'master' ? 'Master Quiz (30 MCQs)' : `${att.mode.toUpperCase()} Quiz`}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold">
                          {att.score} / {att.totalQuestions}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono font-bold ${
                              passed ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {att.percentage}%
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-400">
                          {mins}m {secs}s
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[11px] text-slate-400">
                            {att.isFallback ? 'Verified Offline' : 'Gemini AI'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => viewAttemptResults(att)}
                            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                          >
                            Results
                          </button>
                          <button
                            onClick={() => reviewAttempt(att)}
                            className="px-2.5 py-1 text-xs font-semibold text-violet-300 hover:text-white bg-violet-950/60 hover:bg-violet-900/60 border border-violet-800/60 rounded-md transition-colors"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
