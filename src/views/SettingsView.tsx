import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Clock,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  AlertTriangle,
  Play,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { runMathQuestTests, TestResult } from '../utils/testRunner';

export const SettingsView: React.FC = () => {
  const {
    settings,
    updateSettings,
    toggleTheme,
    resetProgress,
    aiStatus,
    checkAiHealth,
  } = useApp();

  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      const res = runMathQuestTests();
      setTestResults(res);
      setIsRunningTests(false);
    }, 400);
  };

  return (
    <div className="space-y-8 pb-20 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-violet-400 mb-2">
          <SettingsIcon className="w-4 h-4" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">Application Settings</h1>
        <p className="mt-2 text-sm text-slate-400">
          Configure appearance, audio effects, countdown alerts, run automated verification tests, and check backend connectivity.
        </p>
      </div>

      {/* Preferences Section */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-6 shadow-xl">
        <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">User Preferences</h2>

        {/* Theme Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-white">Visual Theme</div>
            <div className="text-xs text-slate-400">Choose between dark navy violet or clean daylight mode</div>
          </div>
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                settings.theme === 'dark'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-violet-300" />
              <span>Dark Navy</span>
            </button>
            <button
              type="button"
              onClick={() => updateSettings({ theme: 'light' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                settings.theme === 'light'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Clean Light</span>
            </button>
          </div>
        </div>

        {/* Sound Effects Toggle */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-white">Synthesizer Sound Effects</div>
            <div className="text-xs text-slate-400">Audio feedback on question clicks, timer cues, and perfect scores</div>
          </div>
          <button
            onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              settings.soundEffects
                ? 'bg-violet-600/20 border-violet-500/50 text-violet-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {settings.soundEffects ? <Volume2 className="w-4 h-4 text-violet-400" /> : <VolumeX className="w-4 h-4" />}
            <span>{settings.soundEffects ? 'Sound Enabled' : 'Muted'}</span>
          </button>
        </div>

        {/* Timer Warnings */}
        <div className="flex items-center justify-between border-t border-slate-800/80 pt-4">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-white">Time Warning Notification</div>
            <div className="text-xs text-slate-400">Pulsing audio and visual warning when &lt;60s remaining</div>
          </div>
          <button
            onClick={() => updateSettings({ showTimerWarning: !settings.showTimerWarning })}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors ${
              settings.showTimerWarning
                ? 'bg-cyan-600/20 border-cyan-500/50 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{settings.showTimerWarning ? 'Active' : 'Disabled'}</span>
          </button>
        </div>
      </div>

      {/* Backend & AI Health Prober */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white">Backend & AI Engine Diagnostics</h2>
            <p className="text-xs text-slate-400">Server-side proxy status and offline question bank availability</p>
          </div>
          <button
            onClick={checkAiHealth}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors"
          >
            {aiStatus.checking ? 'Testing...' : 'Check Connection'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Gemini 3.8 Flash Server Key:</span>
            {aiStatus.hasKey ? (
              <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Injected (Secure)
              </span>
            ) : (
              <span className="font-mono font-bold text-amber-400 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Fallback Ready
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Verified Fallback Bank:</span>
            <span className="font-mono font-bold text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 60 Questions Verified
            </span>
          </div>
        </div>
      </div>

      {/* Automated Verification Test Suite */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white">Automated System & Quality Verification Suite</h2>
            <p className="text-xs text-slate-400">
              Run automated regression tests for scoring, balanced distribution, option integrity, uniqueness, and refresh recovery.
            </p>
          </div>
          <button
            onClick={handleRunTests}
            disabled={isRunningTests}
            className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isRunningTests ? 'Running Test Suite...' : 'Run All Verification Tests'}</span>
          </button>
        </div>

        {testResults && (
          <div className="space-y-3">
            <div className="text-xs font-mono font-semibold text-slate-300">
              Results: {testResults.filter((t) => t.passed).length} of {testResults.length} Tests Passed
            </div>

            <div className="space-y-2.5">
              {testResults.map((t) => (
                <div
                  key={t.id}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 text-xs leading-relaxed transition-all ${
                    t.passed
                      ? 'border-emerald-500/30 bg-emerald-950/20'
                      : 'border-rose-500/40 bg-rose-950/20'
                  }`}
                >
                  {t.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{t.name}</span>
                      <span className="font-mono text-[10px] text-slate-400">{t.durationMs}ms</span>
                    </div>
                    <div className="text-slate-300 text-[11px]">{t.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="rounded-2xl border border-rose-500/30 bg-rose-950/10 p-6 space-y-4">
        <h2 className="text-base font-bold text-rose-300">Danger Zone</h2>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <div className="text-sm font-semibold text-white">Reset Learning Progress & Scores</div>
            <div className="text-xs text-slate-400">Clears all stored quiz scores, streak records, badges, and bookmarks from local storage.</div>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 text-xs font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Reset Progress
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5" />
              <span>Confirm Permanent Progress Reset</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              This will permanently delete your stored XP, quiz attempts, streak history, achievements, and bookmarks. This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  resetProgress();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
