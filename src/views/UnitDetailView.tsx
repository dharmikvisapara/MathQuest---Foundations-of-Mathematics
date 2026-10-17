import React from 'react';
import { ArrowLeft, BookOpen, Swords, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_UNITS } from '../data/syllabus';

export const UnitDetailView: React.FC = () => {
  const { selectedUnitId, navigateTo, startQuiz, stats, toggleCompleteLesson, isGeneratingQuiz, settings } = useApp();
  const isDark = settings.theme === 'dark';

  const currentUnit = SYLLABUS_UNITS.find((u) => u.id === selectedUnitId) || SYLLABUS_UNITS[0];

  const completedCount = currentUnit.topics.filter((t) => stats.completedLessons.includes(t.id)).length;
  const progressPct = Math.round((completedCount / currentUnit.topics.length) * 100);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Breadcrumb & Action Bar */}
      <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-5 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <button
          onClick={() => navigateTo('units')}
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Syllabus</span>
        </button>

        <button
          onClick={() => startQuiz(currentUnit.id as any, currentUnit.id)}
          disabled={isGeneratingQuiz}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-md transition-all disabled:opacity-50 cursor-pointer"
        >
          <Swords className="w-4 h-4" />
          <span>{isGeneratingQuiz ? 'Generating Quiz...' : `Launch ${currentUnit.title} Quiz (15 MCQs)`}</span>
        </button>
      </div>

      {/* Unit Header Banner */}
      <div className={`rounded-2xl border p-6 sm:p-8 shadow-xl transition-colors ${
        isDark
          ? 'border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950'
          : 'border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-slate-200/60'
      }`}>
        <div className="max-w-3xl space-y-3">
          <span className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isDark ? 'text-violet-400' : 'text-violet-700'
          }`}>
            Unit 0{currentUnit.number} Dashboard
          </span>
          <h1 className={`text-2xl sm:text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {currentUnit.title}
          </h1>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {currentUnit.description}
          </p>

          <div className={`pt-3 flex items-center gap-4 text-xs font-mono ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            <span>Completed: <strong className={`font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>{completedCount}</strong> of {currentUnit.topics.length} topics</span>
            <span>·</span>
            <span>Mastery: <strong className={`font-bold ${isDark ? 'text-violet-400' : 'text-violet-700'}`}>{progressPct}%</strong></span>
          </div>
        </div>
      </div>

      {/* Topic List */}
      <div className="space-y-4">
        <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Topics in this Unit ({currentUnit.topics.length})
        </h2>

        <div className="grid grid-cols-1 gap-4">
          {currentUnit.topics.map((topic, index) => {
            const isCompleted = stats.completedLessons.includes(topic.id);

            return (
              <div
                key={topic.id}
                className={`group rounded-xl border p-5 backdrop-blur-sm transition-all shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDark
                    ? 'border-slate-800/90 bg-slate-900/70 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-slate-200/50'
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCompleteLesson(topic.id)}
                      className="text-slate-500 hover:text-emerald-500 transition-colors cursor-pointer"
                      title={isCompleted ? 'Mark topic as uncompleted' : 'Mark topic as completed'}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-slate-600" />
                      )}
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </span>
                    <h3 className={`text-base font-bold transition-colors ${
                      isDark ? 'text-white group-hover:text-violet-300' : 'text-slate-900 group-hover:text-violet-700'
                    }`}>
                      {topic.title}
                    </h3>
                  </div>

                  <p className={`text-xs line-clamp-2 pl-8 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {topic.subtitle}
                  </p>

                  <div className="pl-8 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                    <span>{topic.formulas.length} Formulas</span>
                    <span>·</span>
                    <span>{topic.workedExamples.length} Worked Examples</span>
                    <span>·</span>
                    <span>{topic.stepByStepMethod.length} Method Steps</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:self-center pl-8 sm:pl-0">
                  <button
                    onClick={() => navigateTo('lesson', { unitId: currentUnit.id, topicId: topic.id })}
                    className={`study-lesson-btn flex-1 sm:flex-none px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs ${
                      isDark
                        ? 'text-white bg-slate-800 hover:bg-slate-700 border border-slate-700'
                        : 'text-violet-950 bg-violet-100/90 hover:bg-violet-200 border border-violet-300 font-bold'
                    }`}
                  >
                    <BookOpen className={`w-3.5 h-3.5 ${isDark ? 'text-violet-400' : 'text-violet-700'}`} />
                    <span>Study Lesson</span>
                    <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-violet-700'}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
