import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Check,
  BookOpen,
  Sparkles,
  Swords,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SYLLABUS_UNITS } from '../data/syllabus';
import { MathView } from '../components/MathView';
import { InteractiveVisualizer } from '../components/InteractiveVisualizer';

export const TopicLessonView: React.FC = () => {
  const {
    selectedUnitId,
    selectedTopicId,
    navigateTo,
    stats,
    toggleCompleteLesson,
    startQuiz,
    isGeneratingQuiz,
    settings,
  } = useApp();
  const isDark = settings.theme === 'dark';

  const [activeTab, setActiveTab] = useState<'all' | 'theory' | 'formulas' | 'examples' | 'mistakes'>('all');

  // Find unit and topic
  const unit = SYLLABUS_UNITS.find((u) => u.id === selectedUnitId) || SYLLABUS_UNITS[0];
  const topicIndex = unit.topics.findIndex((t) => t.id === selectedTopicId);
  const topic = unit.topics[topicIndex !== -1 ? topicIndex : 0];

  const prevTopic = topicIndex > 0 ? unit.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < unit.topics.length - 1 ? unit.topics[topicIndex + 1] : null;

  const isCompleted = stats.completedLessons.includes(topic.id);

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Header Nav */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => navigateTo('unit-detail', { unitId: unit.id })}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {unit.title}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleCompleteLesson(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              isCompleted
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            {isCompleted ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Circle className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
          </button>

          <button
            onClick={() => startQuiz(unit.id as any, unit.id)}
            disabled={isGeneratingQuiz}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Test Knowledge</span>
          </button>
        </div>
      </div>

      {/* Lesson Title Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-violet-400 font-semibold uppercase tracking-wider">
          <span>Unit 0{unit.number}</span>
          <span aria-hidden="true">·</span>
          <span>Topic {topicIndex + 1} of {unit.topics.length}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {topic.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{topic.subtitle}</p>
      </div>

      {/* Tab Filter Control (Anti-Slop compliant functional tabs) */}
      <div className={`flex items-center gap-1 p-1 rounded-xl border max-w-md ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
            activeTab === 'all'
              ? isDark ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('theory')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
            activeTab === 'theory'
              ? isDark ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          Theory
        </button>
        <button
          onClick={() => setActiveTab('formulas')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
            activeTab === 'formulas'
              ? isDark ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          Formulas
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
            activeTab === 'examples'
              ? isDark ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          Examples
        </button>
        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex-1 py-1.5 text-xs rounded-lg transition-all cursor-pointer ${
            activeTab === 'mistakes'
              ? isDark ? 'bg-slate-800 text-white font-semibold shadow-sm' : 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-medium'
          }`}
        >
          Traps & Notes
        </button>
      </div>

      {/* Section 1: Definition & Simple Explanation */}
      {(activeTab === 'all' || activeTab === 'theory') && (
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-7 shadow-lg space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-violet-400" />
              <span>Rigorous Definition</span>
            </h2>
            <div className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
              <MathView content={topic.definition} />
            </div>

            <h3 className="text-sm font-bold text-slate-300 pt-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Intuitive Concept & Simple Explanation</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              <MathView content={topic.explanation} />
            </p>
          </div>
        </section>
      )}

      {/* Section 2: Interactive Sandbox Visualizer (if applicable) */}
      {(activeTab === 'all' || activeTab === 'theory') && topic.interactiveType && (
        <section className="space-y-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Interactive Computation & Visual Sandbox</span>
          </h2>
          <InteractiveVisualizer type={topic.interactiveType} />
        </section>
      )}

      {/* Section 3: Important Formulas with Symbol Breakdown */}
      {(activeTab === 'all' || activeTab === 'formulas') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Mathematical Formulations & Symbols</h2>
          <div className="space-y-4">
            {topic.formulas.map((formula, fIdx) => (
              <div key={fIdx} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-violet-300">{formula.name}</h3>
                </div>

                <div className="py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-center overflow-x-auto text-base sm:text-lg">
                  <MathView content={`$$${formula.latex}$$`} block />
                </div>

                {formula.symbols.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Symbol Reference
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {formula.symbols.map((sym, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
                          <span className="font-mono text-cyan-400 font-semibold px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                            <MathView content={`$${sym.symbol}$`} />
                          </span>
                          <span className="text-slate-300">{sym.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 4: Step-by-Step Method */}
      {(activeTab === 'all' || activeTab === 'theory') && topic.stepByStepMethod.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Standard Algorithmic Procedure</h2>
          <div className="space-y-3">
            {topic.stepByStepMethod.map((step) => (
              <div
                key={step.stepNumber}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 flex items-start gap-3.5"
              >
                <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/40 text-violet-300 shrink-0 flex items-center justify-center font-mono font-bold text-xs mt-0.5">
                  {step.stepNumber}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <MathView content={step.description} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 5: Worked Examples (At least two with complete steps) */}
      {(activeTab === 'all' || activeTab === 'examples') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white">Worked Numerical Examples</h2>
          <div className="space-y-5">
            {topic.workedExamples.map((ex, eIdx) => (
              <div
                key={eIdx}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                    Example 0{eIdx + 1}
                  </span>
                  <h3 className="text-sm font-bold text-white">{ex.title}</h3>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Problem Statement</div>
                  <p className="text-sm text-slate-100 bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80 leading-relaxed">
                    <MathView content={ex.problem} />
                  </p>
                </div>

                {ex.given && (
                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400 font-semibold">Given: </span>
                    <MathView content={ex.given} />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Step-by-Step Solution</div>
                  <div className="space-y-2">
                    {ex.steps.map((st, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <span className="text-violet-400 font-mono font-bold shrink-0">{sIdx + 1}.</span>
                        <div className="flex-1 leading-relaxed">
                          <MathView content={st} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-400">Final Answer:</span>
                  <span className="font-mono font-bold text-white">
                    <MathView content={ex.finalAnswer} />
                  </span>
                </div>

                {ex.notes && (
                  <p className="text-[11px] text-slate-400 italic">
                    <strong className="text-slate-400 not-italic">Note:</strong> {ex.notes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 6: Common Mistakes and Corrections */}
      {(activeTab === 'all' || activeTab === 'mistakes') && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <span>Common Exam Pitfalls & Traps</span>
          </h2>
          <div className="grid grid-cols-1 gap-3.5">
            {topic.commonMistakes.map((item, mIdx) => (
              <div
                key={mIdx}
                className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2"
              >
                <div className="flex items-start gap-2 text-xs text-rose-300">
                  <span className="font-bold text-rose-400 shrink-0">Common Mistake:</span>
                  <span><MathView content={item.mistake} /></span>
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-300 pt-1 border-t border-slate-800/80">
                  <span className="font-bold text-emerald-400 shrink-0">Correct Method:</span>
                  <span><MathView content={item.correction} /></span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 7: Quick Revision Notes */}
      {(activeTab === 'all' || activeTab === 'mistakes') && (
        <section className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-6 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Quick Revision Flash Notes</span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {topic.quickRevisionNotes.map((note, nIdx) => (
              <li key={nIdx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/40 border border-indigo-500/10">
                <span className="text-indigo-400 font-bold shrink-0">●</span>
                <span><MathView content={note} /></span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Previous / Next Topic Navigator */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
        {prevTopic ? (
          <button
            onClick={() => navigateTo('lesson', { unitId: unit.id, topicId: prevTopic.id })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400">Previous Topic</div>
              <div className="font-semibold truncate max-w-[150px] sm:max-w-xs">{prevTopic.title}</div>
            </div>
          </button>
        ) : <div />}

        {nextTopic ? (
          <button
            onClick={() => navigateTo('lesson', { unitId: unit.id, topicId: nextTopic.id })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs text-slate-300 hover:text-white transition-colors text-right"
          >
            <div className="text-right">
              <div className="text-[10px] text-slate-400">Next Topic</div>
              <div className="font-semibold truncate max-w-[150px] sm:max-w-xs">{nextTopic.title}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
};
