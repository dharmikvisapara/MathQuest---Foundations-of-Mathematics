import React from 'react';
import {
  Sparkles,
  Flame,
  Trophy,
  Swords,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Brain,
  CheckCircle,
  Clock,
  Boxes,
  Calculator,
  Network,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_UNITS } from '../data/syllabus';
import { MathView } from '../components/MathView';

export const HomeView: React.FC = () => {
  const { navigateTo, startQuiz, stats, isGeneratingQuiz, settings } = useApp();
  const isDark = settings.theme === 'dark';

  const unitIcons: Record<string, React.ReactNode> = {
    unit1: <Boxes className="w-5 h-5 text-indigo-400" />,
    unit2: <Calculator className="w-5 h-5 text-cyan-400" />,
    unit3: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    unit4: <Network className="w-5 h-5 text-amber-400" />,
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Banner */}
      <section className={`relative overflow-hidden rounded-3xl border p-8 sm:p-10 shadow-2xl transition-colors ${
        isDark
          ? 'border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950'
          : 'border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-slate-200/60'
      }`}>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-violet-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-4 ${
            isDark ? 'bg-violet-500/10 border-violet-500/30 text-violet-300' : 'bg-violet-100 border-violet-300 text-violet-800 font-bold'
          }`}>
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Mathematics Arena</span>
          </div>

          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Master the Foundations of Mathematics
          </h1>

          <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}>
            Explore 4 rigorous curriculum units with KaTeX typography, interactive computational sandboxes, and take dynamic, Gemini AI-validated quizzes with zero question repetition.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => startQuiz('master')}
              disabled={isGeneratingQuiz}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-violet-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <Swords className="w-4 h-4 text-white" />
              <span className="text-white">{isGeneratingQuiz ? 'Generating Master Quiz...' : 'Launch Master Quiz (30 MCQs)'}</span>
            </button>

            <button
              onClick={() => navigateTo('units')}
              className={`px-6 py-3 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700/80'
                  : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-950 border-slate-200 shadow-xs'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore All 4 Units</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real-time KPI Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Experience</span>
            <Sparkles className="w-4 h-4 text-violet-400" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.xp}</div>
          <p className="text-xs text-slate-400 mt-1">Total earned XP</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Learning Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.streakDays} Days</div>
          <p className="text-xs text-slate-400 mt-1">Keep practicing daily</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Quizzes Taken</span>
            <Swords className="w-4 h-4 text-cyan-400" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.totalQuizzes}</div>
          <p className="text-xs text-slate-400 mt-1">Unit & Master challenges</p>
        </div>

        <div className={`rounded-2xl border p-5 backdrop-blur-sm transition-colors ${
          isDark ? 'border-slate-800/80 bg-slate-900/60' : 'border-slate-200 bg-white shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Best Accuracy</span>
            <Trophy className="w-4 h-4 text-emerald-400" />
          </div>
          <div className={`text-2xl font-bold font-mono tabular-nums ${
            isDark ? 'text-emerald-400' : 'text-emerald-600'
          }`}>
            {stats.bestScorePercentage}%
          </div>
          <p className="text-xs text-slate-400 mt-1">Average: {stats.averageScorePercentage}%</p>
        </div>
      </section>

      {/* Syllabus Units Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Syllabus Breakdown</h2>
            <p className="text-xs text-slate-400 mt-0.5">Four core mathematical domains with comprehensive theory and dynamic quizzes</p>
          </div>
          <button
            onClick={() => navigateTo('units')}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            View Syllabus <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SYLLABUS_UNITS.map((unit) => {
            const completedInUnit = unit.topics.filter((t) => stats.completedLessons.includes(t.id)).length;
            const progressPct = Math.round((completedInUnit / unit.topics.length) * 100);

            return (
              <div
                key={unit.id}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/80 p-6 hover:border-slate-700 transition-all shadow-xl hover:shadow-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center">
                      {unitIcons[unit.id]}
                    </div>
                    <span className="text-xs font-mono font-semibold text-slate-400 uppercase">
                      Unit 0{unit.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                    {unit.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {unit.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                      <span>Theory Progress</span>
                      <span>{completedInUnit}/{unit.topics.length} Lessons ({progressPct}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-500"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 pt-3 border-t border-slate-800/60">
                  <button
                    onClick={() => navigateTo('unit-detail', { unitId: unit.id })}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-center"
                  >
                    Explore Lessons
                  </button>
                  <button
                    onClick={() => startQuiz(unit.id as any, unit.id)}
                    disabled={isGeneratingQuiz}
                    className="py-2 px-3.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm transition-colors text-center flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>Unit Quiz</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Master Quiz CTA Card */}
      <section className="rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
            <span>30 QUESTIONS · 30 MINUTES</span>
          </div>
          <h2 className="text-2xl font-bold text-white">The Comprehensive Master Quiz</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Test your combined mastery across all four foundation units with an exact balanced distribution: 8 from Combinatorics, 8 from Numerical Methods, 7 from Operations Research, and 7 from Boolean Algebra.
          </p>
        </div>

        <button
          onClick={() => startQuiz('master')}
          disabled={isGeneratingQuiz}
          className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 disabled:opacity-50"
        >
          <Swords className="w-4 h-4" />
          <span>Start Master Challenge</span>
        </button>
      </section>
    </div>
  );
};
