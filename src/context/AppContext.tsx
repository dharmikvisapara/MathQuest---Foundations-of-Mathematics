import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  UnitId,
  QuizMode,
  Question,
  QuizAttempt,
  UserStats,
  AppSettings,
  Achievement,
} from '../types';
import { sounds } from '../utils/sound';

export type AppView =
  | 'dashboard'
  | 'units'
  | 'unit-detail'
  | 'lesson'
  | 'formulas'
  | 'quiz-arena'
  | 'active-quiz'
  | 'results'
  | 'review'
  | 'progress'
  | 'achievements'
  | 'settings'
  | 'tests';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-quiz',
    title: 'First Step to Mastery',
    description: 'Complete your very first MathQuest quiz.',
    icon: 'Award',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'perfect-score',
    title: 'Flawless Intellect',
    description: 'Score a perfect 100% on any unit or master quiz.',
    icon: 'Sparkles',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'combinatorics-champ',
    title: 'Combinatorics Champion',
    description: 'Score 80% or higher on the Unit 1 Combinatorics Quiz.',
    icon: 'Boxes',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'numerical-master',
    title: 'Numerical Master',
    description: 'Score 80% or higher on the Unit 2 Numerical Methods Quiz.',
    icon: 'Calculator',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'or-strategist',
    title: 'OR Strategist',
    description: 'Score 80% or higher on the Unit 3 Operations Research Quiz.',
    icon: 'TrendingUp',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'boolean-genius',
    title: 'Boolean Genius',
    description: 'Score 80% or higher on the Unit 4 Lattices & Boolean Algebra Quiz.',
    icon: 'Network',
    progress: 0,
    maxProgress: 1,
  },
  {
    id: 'master-champion',
    title: 'Grandmaster of Foundations',
    description: 'Achieve 80% or higher on the comprehensive 30-question Master Quiz.',
    icon: 'Crown',
    progress: 0,
    maxProgress: 1,
  },
];

const INITIAL_STATS: UserStats = {
  xp: 0,
  totalQuizzes: 0,
  bestScorePercentage: 0,
  averageScorePercentage: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedLessons: [],
  bookmarkedFormulas: ['f-binomial-theorem', 'f-newton-raphson', 'f-modi-optimality', 'f-boolean-demorgan'],
  recentFingerprints: [],
  attempts: [],
  achievements: INITIAL_ACHIEVEMENTS,
};

const INITIAL_SETTINGS: AppSettings = {
  theme: 'dark',
  fontSize: 'standard',
  soundEffects: true,
  showTimerWarning: true,
};

interface AppContextType {
  currentView: AppView;
  selectedUnitId: UnitId | null;
  selectedTopicId: string | null;
  activeAttempt: QuizAttempt | null;
  lastCompletedAttempt: QuizAttempt | null;
  activeQuestionIndex: number;
  timeRemaining: number;
  isGeneratingQuiz: boolean;
  generationError: string | null;
  stats: UserStats;
  settings: AppSettings;
  aiStatus: { hasKey: boolean; checking: boolean };
  navigateTo: (view: AppView, params?: { unitId?: UnitId; topicId?: string }) => void;
  startQuiz: (mode: QuizMode, unitId?: UnitId) => Promise<void>;
  selectAnswer: (questionId: string, optionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  setActiveQuestionIndex: (index: number) => void;
  submitQuiz: (forcedByTimer?: boolean) => void;
  discardActiveQuiz: () => void;
  toggleBookmarkFormula: (formulaId: string) => void;
  toggleCompleteLesson: (topicId: string) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
  viewAttemptResults: (attempt: QuizAttempt) => void;
  reviewAttempt: (attempt: QuizAttempt) => void;
  checkAiHealth: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedUnitId, setSelectedUnitId] = useState<UnitId | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Active quiz session states
  const [activeAttempt, setActiveAttempt] = useState<QuizAttempt | null>(null);
  const [lastCompletedAttempt, setLastCompletedAttempt] = useState<QuizAttempt | null>(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // App settings & progress
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('mathquest_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STATS;
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('mathquest_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_SETTINGS;
  });

  const [aiStatus, setAiStatus] = useState<{ hasKey: boolean; checking: boolean }>({
    hasKey: false,
    checking: true,
  });

  // Check backend health and Gemini availability on mount
  const checkAiHealth = useCallback(async () => {
    setAiStatus((prev) => ({ ...prev, checking: true }));
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setAiStatus({ hasKey: !!data.hasGeminiKey, checking: false });
      } else {
        setAiStatus({ hasKey: false, checking: false });
      }
    } catch {
      setAiStatus({ hasKey: false, checking: false });
    }
  }, []);

  useEffect(() => {
    checkAiHealth();
  }, [checkAiHealth]);

  // Sync dark/light theme to document root and body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      body?.classList.add('dark');
      body?.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      body?.classList.add('light');
      body?.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('mathquest_settings', JSON.stringify(settings));
  }, [settings.theme]);

  // Sync user stats to localStorage
  useEffect(() => {
    localStorage.setItem('mathquest_stats', JSON.stringify(stats));
  }, [stats]);

  // Check for active quiz recovery across accidental refresh
  useEffect(() => {
    try {
      const savedActive = localStorage.getItem('mathquest_active_quiz');
      if (savedActive) {
        const parsed = JSON.parse(savedActive);
        if (parsed.attempt && !parsed.attempt.isCompleted) {
          const elapsedSinceSave = Math.floor((Date.now() - (parsed.savedAt || Date.now())) / 1000);
          const remaining = Math.max(0, (parsed.timeRemaining || 0) - elapsedSinceSave);

          if (remaining > 0) {
            setActiveAttempt(parsed.attempt);
            setActiveQuestionIndex(parsed.activeQuestionIndex || 0);
            setTimeRemaining(remaining);
            setCurrentView('active-quiz');
          } else {
            localStorage.removeItem('mathquest_active_quiz');
          }
        }
      }
    } catch {}
  }, []);

  // Save active attempt to localStorage on every answer/tick
  useEffect(() => {
    if (activeAttempt && !activeAttempt.isCompleted) {
      localStorage.setItem(
        'mathquest_active_quiz',
        JSON.stringify({
          attempt: activeAttempt,
          activeQuestionIndex,
          timeRemaining,
          savedAt: Date.now(),
        })
      );
    }
  }, [activeAttempt, activeQuestionIndex, timeRemaining]);

  // Active quiz countdown timer
  useEffect(() => {
    if (!activeAttempt || activeAttempt.isCompleted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time runs out
          if (settings.soundEffects) sounds.playWarning();
          submitQuiz(true);
          return 0;
        }

        // Sound warning at 60s
        if (prev === 60 && settings.soundEffects && settings.showTimerWarning) {
          sounds.playWarning();
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeAttempt, settings.soundEffects, settings.showTimerWarning]);

  // Navigation controller
  const navigateTo = (view: AppView, params?: { unitId?: UnitId; topicId?: string }) => {
    if (params?.unitId !== undefined) setSelectedUnitId(params.unitId);
    if (params?.topicId !== undefined) setSelectedTopicId(params.topicId);
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch a new dynamically generated quiz
  const startQuiz = async (mode: QuizMode, unitId?: UnitId) => {
    setIsGeneratingQuiz(true);
    setGenerationError(null);
    if (settings.soundEffects) sounds.playClick();

    const durationSeconds = mode === 'master' ? 30 * 60 : 15 * 60; // 30 mins for master, 15 mins for unit
    const targetUnitId = mode === 'master' ? undefined : (unitId || (mode as UnitId));

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          recentFingerprints: stats.recentFingerprints.slice(-30),
        }),
      });

      if (!response.ok) {
        throw new Error(`Generation server returned status ${response.status}`);
      }

      const data = await response.json();
      const questions: Question[] = data.questions || [];

      if (questions.length === 0) {
        throw new Error('No valid questions received from generator');
      }

      // Add fingerprints to history
      const newFingerprints = questions.map((q) =>
        q.questionText.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80)
      );

      setStats((prev) => ({
        ...prev,
        recentFingerprints: Array.from(new Set([...prev.recentFingerprints, ...newFingerprints])).slice(-100),
      }));

      const newAttempt: QuizAttempt = {
        id: `attempt-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        mode,
        unitId: targetUnitId,
        startTime: Date.now(),
        durationSeconds,
        timeUsedSeconds: 0,
        questions,
        userAnswers: {},
        markedForReview: {},
        isCompleted: false,
        totalQuestions: questions.length,
        isFallback: data.isFallback,
      };

      setActiveAttempt(newAttempt);
      setActiveQuestionIndex(0);
      setTimeRemaining(durationSeconds);
      setIsGeneratingQuiz(false);
      setCurrentView('active-quiz');
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Quiz generation error:', error);
      setGenerationError(error.message || 'Failed to generate quiz. Please retry.');
      setIsGeneratingQuiz(false);
    }
  };

  // Select option for question
  const selectAnswer = (questionId: string, optionId: string) => {
    if (!activeAttempt || activeAttempt.isCompleted) return;
    if (settings.soundEffects) sounds.playClick();

    setActiveAttempt((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        userAnswers: {
          ...prev.userAnswers,
          [questionId]: optionId,
        },
      };
    });
  };

  // Mark/unmark for review
  const toggleMarkForReview = (questionId: string) => {
    if (!activeAttempt || activeAttempt.isCompleted) return;
    if (settings.soundEffects) sounds.playClick();

    setActiveAttempt((prev) => {
      if (!prev) return null;
      const isMarked = !!prev.markedForReview[questionId];
      return {
        ...prev,
        markedForReview: {
          ...prev.markedForReview,
          [questionId]: !isMarked,
        },
      };
    });
  };

  // Submit and score current attempt
  const submitQuiz = (forcedByTimer = false) => {
    if (!activeAttempt || activeAttempt.isCompleted) return;

    const timeUsed = Math.min(
      activeAttempt.durationSeconds,
      activeAttempt.durationSeconds - timeRemaining
    );

    // Compute score: correct = 1, wrong = 0, unanswered = 0
    let correctCount = 0;
    activeAttempt.questions.forEach((q) => {
      const userSelected = activeAttempt.userAnswers[q.id];
      if (userSelected && userSelected.toUpperCase() === q.correctOptionId.toUpperCase()) {
        correctCount++;
      }
    });

    const total = activeAttempt.totalQuestions;
    const percentage = Math.round((correctCount / total) * 100);

    const completedAttempt: QuizAttempt = {
      ...activeAttempt,
      isCompleted: true,
      endTime: Date.now(),
      timeUsedSeconds: timeUsed,
      score: correctCount,
      percentage,
    };

    // Calculate XP reward: Base 50 XP + 20 XP per correct question + 100 bonus for ≥80%
    const xpReward = 50 + correctCount * 20 + (percentage >= 80 ? 100 : 0);

    // Check perfect score celebration
    if (percentage === 100) {
      if (settings.soundEffects) sounds.playCorrect();
      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#8b5cf6', '#6366f1', '#06b6d4', '#10b981', '#f59e0b'],
        });
      } catch {}
    } else if (percentage >= 60 && settings.soundEffects) {
      sounds.playCorrect();
    }

    // Update Achievements
    const today = new Date().toISOString().split('T')[0];
    const updatedAchievements = stats.achievements.map((ach) => {
      if (ach.id === 'first-quiz') {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'perfect-score' && percentage === 100) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'combinatorics-champ' && activeAttempt.mode === 'unit1' && percentage >= 80) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'numerical-master' && activeAttempt.mode === 'unit2' && percentage >= 80) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'or-strategist' && activeAttempt.mode === 'unit3' && percentage >= 80) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'boolean-genius' && activeAttempt.mode === 'unit4' && percentage >= 80) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      if (ach.id === 'master-champion' && activeAttempt.mode === 'master' && percentage >= 80) {
        return { ...ach, progress: 1, unlockedAt: ach.unlockedAt || today };
      }
      return ach;
    });

    // Update streak if active today
    let streakDays = stats.streakDays;
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (stats.lastActiveDate === yesterday) {
        streakDays += 1;
      } else {
        streakDays = 1;
      }
    }

    const allAttempts = [completedAttempt, ...stats.attempts];
    const totalScoreSum = allAttempts.reduce((sum, a) => sum + (a.percentage || 0), 0);
    const newAverage = Math.round(totalScoreSum / allAttempts.length);
    const newBest = Math.max(stats.bestScorePercentage, percentage);

    setStats((prev) => ({
      ...prev,
      xp: prev.xp + xpReward,
      totalQuizzes: prev.totalQuizzes + 1,
      bestScorePercentage: newBest,
      averageScorePercentage: newAverage,
      streakDays,
      lastActiveDate: today,
      attempts: allAttempts.slice(0, 50),
      achievements: updatedAchievements,
    }));

    // Clear saved active attempt
    localStorage.removeItem('mathquest_active_quiz');
    setActiveAttempt(null);
    setLastCompletedAttempt(completedAttempt);
    setCurrentView('results');
  };

  // Discard attempt
  const discardActiveQuiz = () => {
    localStorage.removeItem('mathquest_active_quiz');
    setActiveAttempt(null);
    setCurrentView('quiz-arena');
  };

  // Bookmark formula toggle
  const toggleBookmarkFormula = (formulaId: string) => {
    if (settings.soundEffects) sounds.playClick();
    setStats((prev) => {
      const exists = prev.bookmarkedFormulas.includes(formulaId);
      const updated = exists
        ? prev.bookmarkedFormulas.filter((id) => id !== formulaId)
        : [...prev.bookmarkedFormulas, formulaId];
      return { ...prev, bookmarkedFormulas: updated };
    });
  };

  // Complete lesson toggle
  const toggleCompleteLesson = (topicId: string) => {
    if (settings.soundEffects) sounds.playClick();
    setStats((prev) => {
      const exists = prev.completedLessons.includes(topicId);
      const updated = exists
        ? prev.completedLessons.filter((id) => id !== topicId)
        : [...prev.completedLessons, topicId];
      return { ...prev, completedLessons: updated };
    });
  };

  // Update app settings
  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem('mathquest_settings', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleTheme = () => {
    if (settings.soundEffects) sounds.playClick();
    setSettings((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      const body = document.body;
      if (nextTheme === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        body?.classList.add('dark');
        body?.classList.remove('light');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
        body?.classList.add('light');
        body?.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
      const updated = { ...prev, theme: nextTheme as 'dark' | 'light' };
      localStorage.setItem('mathquest_settings', JSON.stringify(updated));
      return updated;
    });
  };

  // Reset all progress
  const resetProgress = () => {
    localStorage.removeItem('mathquest_stats');
    localStorage.removeItem('mathquest_active_quiz');
    setStats(INITIAL_STATS);
    setActiveAttempt(null);
    setLastCompletedAttempt(null);
    setCurrentView('dashboard');
  };

  const viewAttemptResults = (attempt: QuizAttempt) => {
    setLastCompletedAttempt(attempt);
    setCurrentView('results');
  };

  const reviewAttempt = (attempt: QuizAttempt) => {
    setLastCompletedAttempt(attempt);
    setCurrentView('review');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedUnitId,
        selectedTopicId,
        activeAttempt,
        lastCompletedAttempt,
        activeQuestionIndex,
        timeRemaining,
        isGeneratingQuiz,
        generationError,
        stats,
        settings,
        aiStatus,
        navigateTo,
        startQuiz,
        selectAnswer,
        toggleMarkForReview,
        setActiveQuestionIndex,
        submitQuiz,
        discardActiveQuiz,
        toggleBookmarkFormula,
        toggleCompleteLesson,
        updateSettings,
        toggleTheme,
        resetProgress,
        viewAttemptResults,
        reviewAttempt,
        checkAiHealth,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
