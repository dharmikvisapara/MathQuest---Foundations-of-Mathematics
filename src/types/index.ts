export type UnitId = 'unit1' | 'unit2' | 'unit3' | 'unit4';
export type QuizMode = 'unit1' | 'unit2' | 'unit3' | 'unit4' | 'master';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  unitId: UnitId;
  topic: string;
  difficulty: Difficulty;
  questionText: string;
  options: QuestionOption[];
  correctOptionId: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
  formulaReference?: string;
}

export interface QuizAttempt {
  id: string;
  mode: QuizMode;
  unitId?: UnitId;
  startTime: number;
  endTime?: number;
  durationSeconds: number;
  timeUsedSeconds: number;
  questions: Question[];
  userAnswers: Record<string, string>; // questionId -> optionId
  markedForReview: Record<string, boolean>;
  isCompleted: boolean;
  score?: number;
  totalQuestions: number;
  percentage?: number;
  isFallback?: boolean;
}

export interface WorkedExample {
  title: string;
  problem: string;
  given: string;
  steps: string[];
  finalAnswer: string;
  notes?: string;
}

export interface TopicLesson {
  id: string;
  unitId: UnitId;
  title: string;
  subtitle: string;
  definition: string;
  explanation: string;
  formulas: {
    name: string;
    latex: string;
    symbols: { symbol: string; meaning: string }[];
  }[];
  stepByStepMethod: {
    stepNumber: number;
    title: string;
    description: string;
  }[];
  workedExamples: WorkedExample[];
  commonMistakes: {
    mistake: string;
    correction: string;
  }[];
  quickRevisionNotes: string[];
  interactiveType?: 'root-finding' | 'difference-table' | 'simplex' | 'transportation' | 'hasse' | 'truth-table';
}

export interface UnitInfo {
  id: UnitId;
  number: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  topics: TopicLesson[];
}

export interface FormulaEntry {
  id: string;
  unitId: UnitId;
  topic: string;
  name: string;
  latex: string;
  symbols: { symbol: string; meaning: string }[];
  description: string;
  usageNotes?: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  xp: number;
  totalQuizzes: number;
  bestScorePercentage: number;
  averageScorePercentage: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[]; // topic IDs
  bookmarkedFormulas: string[]; // formula IDs
  recentFingerprints: string[]; // hash/question snippets to avoid duplicate AI generation
  attempts: QuizAttempt[];
  achievements: Achievement[];
}

export interface AppSettings {
  theme: 'dark' | 'light';
  fontSize: 'standard' | 'large';
  soundEffects: boolean;
  showTimerWarning: boolean;
}
