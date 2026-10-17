import React from 'react';
import { Boxes, Calculator, TrendingUp, Network, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_UNITS } from '../data/syllabus';

export const UnitsView: React.FC = () => {
  const { navigateTo, startQuiz, stats, isGeneratingQuiz } = useApp();

  const unitIcons: Record<string, React.ReactNode> = {
    unit1: <Boxes className="w-6 h-6 text-indigo-400" />,
    unit2: <Calculator className="w-6 h-6 text-cyan-400" />,
    unit3: <TrendingUp className="w-6 h-6 text-emerald-400" />,
    unit4: <Network className="w-6 h-6 text-amber-400" />,
  };

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b border-slate-800 pb-5">
        <h1 className="text-3xl font-extrabold text-white">Course Syllabus & Curriculum</h1>
        <p className="mt-2 text-sm text-slate-400">
          Four comprehensive academic units covering discrete mathematics, computational algorithms, optimization, and abstract order theory.
        </p>
      </div>

      <div className="space-y-6">
        {SYLLABUS_UNITS.map((unit) => {
          const completedInUnit = unit.topics.filter((t) => stats.completedLessons.includes(t.id)).length;
          const progressPct = Math.round((completedInUnit / unit.topics.length) * 100);

          return (
            <div
              key={unit.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shrink-0">
                    {unitIcons[unit.id]}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-semibold uppercase text-violet-400 tracking-wider">
                      Unit 0{unit.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">{unit.title}</h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {unit.description}
                </p>

                {/* Topics Preview Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {unit.topics.slice(0, 4).map((topic) => {
                    const isDone = stats.completedLessons.includes(topic.id);
                    return (
                      <span
                        key={topic.id}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${
                          isDone
                            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Circle className="w-3 h-3 text-slate-500" />}
                        <span>{topic.title}</span>
                      </span>
                    );
                  })}
                  {unit.topics.length > 4 && (
                    <span className="text-xs text-slate-500 self-center">
                      +{unit.topics.length - 4} more topics
                    </span>
                  )}
                </div>
              </div>

              {/* Action and Progress Column */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 lg:min-w-[220px] pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                <div className="w-full text-left lg:text-right">
                  <div className="text-xs text-slate-400 font-mono mb-1">
                    Progress: <strong className="text-white font-bold">{completedInUnit}</strong>/{unit.topics.length} Lessons
                  </div>
                  <div className="w-full lg:w-44 h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => navigateTo('unit-detail', { unitId: unit.id })}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View All Topics</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => startQuiz(unit.id as any, unit.id)}
                    disabled={isGeneratingQuiz}
                    className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <span>Unit Quiz</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
