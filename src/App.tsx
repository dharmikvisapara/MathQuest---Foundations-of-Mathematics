import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navigation } from './components/Navigation';
import { HomeView } from './views/HomeView';
import { UnitsView } from './views/UnitsView';
import { UnitDetailView } from './views/UnitDetailView';
import { TopicLessonView } from './views/TopicLessonView';
import { FormulaLibraryView } from './views/FormulaLibraryView';
import { QuizArenaView } from './views/QuizArenaView';
import { ActiveQuizView } from './views/ActiveQuizView';
import { QuizResultsView } from './views/QuizResultsView';
import { AnswerReviewView } from './views/AnswerReviewView';
import { ProgressView } from './views/ProgressView';
import { AchievementsView } from './views/AchievementsView';
import { SettingsView } from './views/SettingsView';

const MainContent: React.FC = () => {
  const { currentView, settings } = useApp();
  const isDark = settings.theme === 'dark';

  return (
    <main className={`min-h-screen flex flex-col transition-colors duration-200 ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <Navigation />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentView === 'dashboard' && <HomeView />}
        {currentView === 'units' && <UnitsView />}
        {currentView === 'unit-detail' && <UnitDetailView />}
        {currentView === 'lesson' && <TopicLessonView />}
        {currentView === 'formulas' && <FormulaLibraryView />}
        {currentView === 'quiz-arena' && <QuizArenaView />}
        {currentView === 'active-quiz' && <ActiveQuizView />}
        {currentView === 'results' && <QuizResultsView />}
        {currentView === 'review' && <AnswerReviewView />}
        {currentView === 'progress' && <ProgressView />}
        {currentView === 'achievements' && <AchievementsView />}
        {currentView === 'settings' && <SettingsView />}
      </div>

      {/* Quiet, Accessible Footer */}
      <footer className={`border-t mt-auto py-8 text-xs transition-colors ${
        isDark ? 'border-slate-800/80 text-slate-400' : 'border-slate-200 text-slate-600 bg-white/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>MathQuest</span>
            <span>·</span>
            <span>Foundations of Mathematics Learning & Assessment Game</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Combinatorics</span>
            <span>·</span>
            <span>Numerical Methods</span>
            <span>·</span>
            <span>Operations Research</span>
            <span>·</span>
            <span>Boolean Algebra</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
