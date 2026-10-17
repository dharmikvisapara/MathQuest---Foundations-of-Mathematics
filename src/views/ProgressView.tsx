import React from 'react';
import {
  BarChart3,
  Flame,
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Boxes,
  Calculator,
  Network,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_UNITS } from '../data/syllabus';

export const ProgressView: React.FC = () => {
  const { stats, navigateTo, settings } = useApp();
  const isDark = settings.theme === 'dark';

  const totalLessons = SYLLABUS_UNITS.reduce((acc, u) => acc + u.topics.length, 0);
  const completedLessonsCount = stats.completedLessons.length;
  const overallTheoryPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  const unitIcons: Record<string, React.ReactNode> = {
    unit1: <Boxes className="w-5 h-5 text-indigo-400" />,
    unit2: <Calculator className="w-5 h-5 text-cyan-400" />,
    unit3: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    unit4: <Network className="w-5 h-5 text-amber-400" />,
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className={`border-b pb-5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
          isDark ? 'text-violet-400' : 'text-violet-700'
        }`}>
          <BarChart3 className="w-4 h-4" />
          <span>Real-time Learning Analytics</span>
        </div>
        <h1 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Student Progress & Mastery
        </h1>
        <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Track your curriculum progression, quiz attempts, historical accuracy metrics, and daily learning momentum.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Experience Points</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className={`text-3xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.xp}</div>
          <p className="text-xs text-slate-500 mt-1">Level {Math.floor(stats.xp / 500) + 1}</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Study Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className={`text-3xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.streakDays} Days</div>
          <p className="text-xs text-slate-500 mt-1">Last active today</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Quizzes Completed</span>
            <Trophy className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-3xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalQuizzes}</div>
          <p className="text-xs text-slate-500 mt-1">Attempts recorded</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Mean Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className={`text-3xl font-bold font-mono tabular-nums ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            {stats.averageScorePercentage}%
          </div>
          <p className="text-xs text-slate-500 mt-1">Personal Best: {stats.bestScorePercentage}%</p>
        </div>
      </div>

      {/* Curriculum Mastery by Unit */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Curriculum Topic Progress</h2>
            <p className="text-xs text-slate-400">Total syllabus theory coverage across all modules</p>
          </div>
          <div className="text-xs font-mono font-semibold text-violet-400">
            {completedLessonsCount} / {totalLessons} Lessons ({overallTheoryPercent}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SYLLABUS_UNITS.map((u) => {
            const completedInUnit = u.topics.filter((t) => stats.completedLessons.includes(t.id)).length;
            const unitPct = Math.round((completedInUnit / u.topics.length) * 100);

            return (
              <div
                key={u.id}
                className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {unitIcons[u.id]}
                    <h3 className="text-sm font-bold text-white">{u.title}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">{unitPct}%</span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${unitPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>{completedInUnit} of {u.topics.length} topics studied</span>
                  <button
                    onClick={() => navigateTo('unit-detail', { unitId: u.id })}
                    className="text-violet-400 hover:text-violet-300 font-semibold"
                  >
                    View Topics →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz Performance History Chart / Log */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Recent Quiz Performance Trajectory</h2>
          <p className="text-xs text-slate-400">Score percentages across your chronological attempts</p>
        </div>

        {stats.attempts.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-xs">
            No quiz attempts recorded yet. Launch a quiz from the Quiz Arena to build your performance graph!
          </div>
        ) : (
          <div className="space-y-4">
            <div className="h-44 flex items-end gap-3 pt-4 px-2 border-b border-slate-800/80 pb-2 overflow-x-auto">
              {stats.attempts.slice(0, 12).reverse().map((att, idx) => {
                const pct = att.percentage || 0;
                const heightPct = Math.max(8, pct);

                return (
                  <div key={att.id} className="flex-1 min-w-[36px] flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {pct}%
                    </span>
                    <div className="w-full bg-slate-800 rounded-t-lg overflow-hidden flex items-end h-32">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          pct >= 80
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                            : pct >= 50
                            ? 'bg-gradient-to-t from-violet-600 to-indigo-400'
                            : 'bg-gradient-to-t from-rose-600 to-orange-400'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 truncate max-w-[40px]">
                      #{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Chronological Attempts (Earliest → Most Recent)</span>
              <span>Bar color: Emerald ≥80% · Violet ≥50% · Coral &lt;50%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
