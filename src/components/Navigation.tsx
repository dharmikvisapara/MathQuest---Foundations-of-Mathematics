import React from 'react';
import {
  Compass,
  BookOpen,
  Library,
  Swords,
  BarChart3,
  Trophy,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Flame,
  Sparkles,
} from 'lucide-react';
import { useApp, AppView } from '../context/AppContext';

export const Navigation: React.FC = () => {
  const { currentView, navigateTo, settings, toggleTheme, stats } = useApp();
  const isDark = settings.theme === 'dark';

  const navLinks: { view: AppView; label: string }[] = [
    { view: 'dashboard', label: 'Dashboard' },
    { view: 'units', label: 'Syllabus' },
    { view: 'formulas', label: 'Formulas' },
    { view: 'quiz-arena', label: 'Quiz Arena' },
    { view: 'progress', label: 'Analytics' },
  ];

  return (
    <>
      {/* Top Bar following Top Bar Contract: 3 zones separated by gap-8 */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-950/80' : 'border-slate-200 bg-white/95 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-8 px-3 sm:px-6 lg:px-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => navigateTo('dashboard')}
            className={`mathquest-wordmark flex items-center gap-2.5 text-lg font-bold tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity cursor-pointer ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span>MathQuest</span>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links */}
          <nav className={`nav-desktop-links hidden md:flex items-center gap-7 text-sm font-medium ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => navigateTo(link.view)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative cursor-pointer ${
                  currentView === link.view
                    ? `nav-link-active ${isDark ? 'text-white font-semibold' : 'text-slate-950 font-bold'}`
                    : isDark
                    ? 'hover:text-slate-200'
                    : 'hover:text-slate-950'
                }`}
              >
                {link.label}
                {currentView === link.view && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action or status pill and utility */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Streak & XP Display */}
            <div className={`hidden sm:flex items-center gap-3 text-xs pr-2 border-r ${
              isDark ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-200'
            }`}>
              <div className={`flex items-center gap-1 font-semibold font-mono ${isDark ? 'text-amber-400' : 'text-amber-700'}`} title="Daily Learning Streak">
                <Flame className="w-3.5 h-3.5" />
                <span>{stats.streakDays}d</span>
              </div>
              <div className={`flex items-center gap-1 font-semibold font-mono ${isDark ? 'text-violet-400' : 'text-violet-700'}`} title="Earned XP">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{stats.xp} XP</span>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
              }}
              className={`p-2 rounded-lg border transition-all shadow-sm active:scale-95 cursor-pointer ${
                isDark
                  ? 'border-slate-700/80 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
                  : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950'
              }`}
              title={`Switch to ${isDark ? 'Light' : 'Dark'} mode (Currently ${isDark ? 'Dark' : 'Light'})`}
              aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>

            {/* Achievements Link */}
            <button
              onClick={() => navigateTo('achievements')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'achievements'
                  ? isDark
                    ? 'text-amber-400 bg-amber-500/10'
                    : 'text-amber-700 bg-amber-100 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Achievements"
            >
              <Trophy className="w-4 h-4" />
            </button>

            {/* Settings Link */}
            <button
              onClick={() => navigateTo('settings')}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                currentView === 'settings'
                  ? isDark
                    ? 'text-white bg-slate-800'
                    : 'text-slate-950 bg-slate-200 font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Settings"
            >
              <SettingsIcon className="w-4 h-4" />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => navigateTo('quiz-arena')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-sm shadow-violet-500/25 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Swords className="w-3.5 h-3.5 text-white" />
              <span className="text-white">Start Quiz</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className={`mobile-bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md px-2 py-1.5 flex items-center justify-around transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-950/95' : 'border-slate-200 bg-white/95 shadow-lg'
      }`}>
        <button
          onClick={() => navigateTo('dashboard')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
            currentView === 'dashboard'
              ? isDark ? 'text-violet-400' : 'text-violet-700 font-bold'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => navigateTo('units')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
            currentView === 'units' || currentView === 'unit-detail' || currentView === 'lesson'
              ? isDark ? 'text-violet-400' : 'text-violet-700 font-bold'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus</span>
        </button>
        <button
          onClick={() => navigateTo('quiz-arena')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
            currentView === 'quiz-arena' || currentView === 'active-quiz'
              ? isDark ? 'text-violet-400 font-bold' : 'text-violet-700 font-bold'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Swords className={`w-4 h-4 ${isDark ? 'text-violet-400' : 'text-violet-700'}`} />
          <span>Quiz Arena</span>
        </button>
        <button
          onClick={() => navigateTo('formulas')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
            currentView === 'formulas'
              ? isDark ? 'text-violet-400' : 'text-violet-700 font-bold'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Library className="w-4 h-4" />
          <span>Formulas</span>
        </button>
        <button
          onClick={() => navigateTo('progress')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg text-[10px] font-medium transition-colors cursor-pointer ${
            currentView === 'progress'
              ? isDark ? 'text-violet-400' : 'text-violet-700 font-bold'
              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </nav>
    </>
  );
};
