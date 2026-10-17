import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Boxes,
  Calculator,
  TrendingUp,
  Network,
  Crown,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AchievementsView: React.FC = () => {
  const { stats, navigateTo } = useApp();

  const iconMap: Record<string, React.ReactNode> = {
    firstQuiz: <Award className="w-6 h-6 text-indigo-400" />,
    perfectScore: <Sparkles className="w-6 h-6 text-amber-400" />,
    combinatoricsChamp: <Boxes className="w-6 h-6 text-violet-400" />,
    numericalMaster: <Calculator className="w-6 h-6 text-cyan-400" />,
    orStrategist: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    booleanGenius: <Network className="w-6 h-6 text-orange-400" />,
    masterChampion: <Crown className="w-6 h-6 text-yellow-400" />,
  };

  const getIcon = (id: string) => {
    if (id === 'first-quiz') return iconMap.firstQuiz;
    if (id === 'perfect-score') return iconMap.perfectScore;
    if (id === 'combinatorics-champ') return iconMap.combinatoricsChamp;
    if (id === 'numerical-master') return iconMap.numericalMaster;
    if (id === 'or-strategist') return iconMap.orStrategist;
    if (id === 'boolean-genius') return iconMap.booleanGenius;
    if (id === 'master-champion') return iconMap.masterChampion;
    return <Trophy className="w-6 h-6 text-violet-400" />;
  };

  const unlockedCount = stats.achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
          <Trophy className="w-4 h-4" />
          <span>Hall of Mathematical Fame</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Achievements & Badges</h1>
        <p className="mt-2 text-sm text-slate-400">
          Earn prestigious badges as you master combinatorics, numerical algorithms, optimization, and abstract Boolean structures.
        </p>
      </div>

      {/* Progress Metric Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-white">
            Unlocked: <strong className="text-amber-400 font-mono text-base">{unlockedCount}</strong> of {stats.achievements.length} Badges
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete unit quizzes and the Master Quiz with distinction to unlock all awards.
          </p>
        </div>
        <button
          onClick={() => navigateTo('quiz-arena')}
          className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm transition-colors self-start sm:self-auto"
        >
          Earn More Badges in Quiz Arena
        </button>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {stats.achievements.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;

          return (
            <div
              key={ach.id}
              className={`rounded-2xl border p-6 backdrop-blur-sm transition-all shadow-lg flex items-start gap-4 ${
                isUnlocked
                  ? 'border-amber-500/40 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 text-white'
                  : 'border-slate-800/80 bg-slate-900/50 opacity-60 text-slate-400'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                  isUnlocked
                    ? 'bg-amber-500/10 border-amber-500/30'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                {isUnlocked ? getIcon(ach.id) : <Lock className="w-5 h-5 text-slate-500" />}
              </div>

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className={`text-base font-bold ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    {ach.title}
                  </h3>
                  {isUnlocked ? (
                    <span className="text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">Locked</span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>

                {isUnlocked && ach.unlockedAt && (
                  <div className="text-[11px] font-mono text-slate-500 pt-1">
                    Unlocked on: {ach.unlockedAt}
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
