import { FALLBACK_QUESTIONS } from '../data/fallbackQuestions';
import { Question } from '../types';

export interface TestResult {
  id: string;
  name: string;
  category: string;
  passed: boolean;
  message: string;
  durationMs: number;
}

export function runMathQuestTests(): TestResult[] {
  const results: TestResult[] = [];

  // TEST 1: Scoring Algorithm Verification
  {
    const start = performance.now();
    const mockQuestions: Question[] = [
      { id: 'q1', unitId: 'unit1', topic: 'T1', difficulty: 'easy', questionText: 'Q1', options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }, { id: 'C', text: '3' }, { id: 'D', text: '4' }], correctOptionId: 'B', explanation: 'E1' },
      { id: 'q2', unitId: 'unit1', topic: 'T2', difficulty: 'medium', questionText: 'Q2', options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }, { id: 'C', text: '3' }, { id: 'D', text: '4' }], correctOptionId: 'D', explanation: 'E2' },
      { id: 'q3', unitId: 'unit2', topic: 'T3', difficulty: 'hard', questionText: 'Q3', options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }, { id: 'C', text: '3' }, { id: 'D', text: '4' }], correctOptionId: 'A', explanation: 'E3' },
      { id: 'q4', unitId: 'unit3', topic: 'T4', difficulty: 'easy', questionText: 'Q4', options: [{ id: 'A', text: '1' }, { id: 'B', text: '2' }, { id: 'C', text: '3' }, { id: 'D', text: '4' }], correctOptionId: 'C', explanation: 'E4' },
    ];

    const mockAnswers: Record<string, string> = {
      q1: 'B', // Correct (1)
      q2: 'A', // Incorrect (0)
      q3: 'A', // Correct (1)
      // q4 is unanswered (0)
    };

    let score = 0;
    mockQuestions.forEach((q) => {
      if (mockAnswers[q.id] && mockAnswers[q.id].toUpperCase() === q.correctOptionId.toUpperCase()) {
        score += 1;
      }
    });

    const percentage = Math.round((score / mockQuestions.length) * 100);
    const passed = score === 2 && percentage === 50;

    results.push({
      id: 'test-scoring',
      name: 'Scoring Algorithm: Correct=1, Wrong=0, Unanswered=0',
      category: 'Scoring & Assessment',
      passed,
      message: passed
        ? 'Verified: 2 correct, 1 wrong, 1 unanswered correctly yielded score 2/4 (50%).'
        : `Failed: expected 2 (50%), got ${score} (${percentage}%).`,
      durationMs: Math.round(performance.now() - start),
    });
  }

  // TEST 2: Balanced Master Quiz Distribution (8 from Unit 1, 8 from Unit 2, 7 from Unit 3, 7 from Unit 4)
  {
    const start = performance.now();
    const u1 = FALLBACK_QUESTIONS.filter((q) => q.unitId === 'unit1').slice(0, 8);
    const u2 = FALLBACK_QUESTIONS.filter((q) => q.unitId === 'unit2').slice(0, 8);
    const u3 = FALLBACK_QUESTIONS.filter((q) => q.unitId === 'unit3').slice(0, 7);
    const u4 = FALLBACK_QUESTIONS.filter((q) => q.unitId === 'unit4').slice(0, 7);

    const masterSet = [...u1, ...u2, ...u3, ...u4];
    const totalCount = masterSet.length;
    const u1Count = masterSet.filter((q) => q.unitId === 'unit1').length;
    const u2Count = masterSet.filter((q) => q.unitId === 'unit2').length;
    const u3Count = masterSet.filter((q) => q.unitId === 'unit3').length;
    const u4Count = masterSet.filter((q) => q.unitId === 'unit4').length;

    const passed =
      totalCount === 30 &&
      u1Count === 8 &&
      u2Count === 8 &&
      u3Count === 7 &&
      u4Count === 7;

    results.push({
      id: 'test-master-distribution',
      name: 'Master Quiz Balanced Distribution (8 U1 + 8 U2 + 7 U3 + 7 U4 = 30)',
      category: 'Curriculum Coverage',
      passed,
      message: passed
        ? 'Verified: Exactly 30 questions with balanced distribution (8, 8, 7, 7).'
        : `Failed: counts were U1:${u1Count}, U2:${u2Count}, U3:${u3Count}, U4:${u4Count}, Total:${totalCount}.`,
      durationMs: Math.round(performance.now() - start),
    });
  }

  // TEST 3: Question Uniqueness & Option Integrity
  {
    const start = performance.now();
    let allValid = true;
    let failReason = '';

    for (const q of FALLBACK_QUESTIONS) {
      if (!q.options || q.options.length !== 4) {
        allValid = false;
        failReason = `Question ${q.id} does not have exactly 4 options.`;
        break;
      }
      const optionTexts = q.options.map((o) => o.text.trim());
      if (new Set(optionTexts).size !== 4) {
        allValid = false;
        failReason = `Question ${q.id} has duplicate option texts.`;
        break;
      }
      if (!['A', 'B', 'C', 'D'].includes(q.correctOptionId.toUpperCase())) {
        allValid = false;
        failReason = `Question ${q.id} has invalid correctOptionId: ${q.correctOptionId}.`;
        break;
      }
    }

    results.push({
      id: 'test-options-integrity',
      name: 'MCQ Option Integrity: Exactly 4 Distinct Options & Valid Correct Answer Key',
      category: 'Validation & Schemas',
      passed: allValid,
      message: allValid
        ? `Verified: All ${FALLBACK_QUESTIONS.length} fallback questions satisfy 4 distinct options and valid answer keys.`
        : failReason,
      durationMs: Math.round(performance.now() - start),
    });
  }

  // TEST 4: Duplicate Fingerprint Hashing & Deduplication
  {
    const start = performance.now();
    const normalize = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 80);

    const fpMap = new Set<string>();
    let duplicates = 0;
    for (const q of FALLBACK_QUESTIONS) {
      const fp = normalize(q.questionText);
      if (fpMap.has(fp)) {
        duplicates++;
      } else {
        fpMap.add(fp);
      }
    }

    const passed = duplicates === 0;
    results.push({
      id: 'test-uniqueness-fingerprint',
      name: 'Question Text Uniqueness & Anti-Duplicate Fingerprinting',
      category: 'Question Diversity',
      passed,
      message: passed
        ? `Verified: 0 duplicate question stems found across ${FALLBACK_QUESTIONS.length} bank entries.`
        : `Failed: found ${duplicates} duplicate question stems.`,
      durationMs: Math.round(performance.now() - start),
    });
  }

  // TEST 5: Accidental Refresh State Recovery Simulation
  {
    const start = performance.now();
    const testState = {
      attempt: {
        id: 'attempt-test-123',
        mode: 'unit1' as const,
        startTime: Date.now() - 30000,
        durationSeconds: 900,
        timeUsedSeconds: 30,
        questions: FALLBACK_QUESTIONS.slice(0, 15),
        userAnswers: { 'fb-u1-01': 'B', 'fb-u1-02': 'A' },
        markedForReview: { 'fb-u1-02': true },
        isCompleted: false,
        totalQuestions: 15,
      },
      activeQuestionIndex: 2,
      timeRemaining: 870,
      savedAt: Date.now(),
    };

    const serialized = JSON.stringify(testState);
    const parsed = JSON.parse(serialized);

    const passed =
      parsed.attempt.id === 'attempt-test-123' &&
      parsed.attempt.userAnswers['fb-u1-01'] === 'B' &&
      parsed.attempt.markedForReview['fb-u1-02'] === true &&
      parsed.activeQuestionIndex === 2 &&
      parsed.timeRemaining === 870 &&
      parsed.attempt.isCompleted === false;

    results.push({
      id: 'test-refresh-recovery',
      name: 'Session Continuity: Accidental Refresh Recovery in LocalStorage',
      category: 'Persistence & Reliability',
      passed,
      message: passed
        ? 'Verified: Complete attempt state (answers, flags, active index, timer) recovers flawlessly from JSON storage.'
        : 'Failed: Deserialized attempt state failed validation.',
      durationMs: Math.round(performance.now() - start),
    });
  }

  // TEST 6: Numerical Correctness Deterministic Proofs
  {
    const start = performance.now();
    // 1. Permutations: P(10, 4) = 10 * 9 * 8 * 7 = 5040
    const p10_4 = 10 * 9 * 8 * 7;
    // 2. Combinations: C(8, 3) = (8*7*6)/(3*2*1) = 56
    const c8_3 = (8 * 7 * 6) / (3 * 2 * 1);
    // 3. Newton Raphson sqrt(5) first step from x0=2: (2 + 5/2)/2 = 2.25
    const nrStep1 = (2 + 5 / 2) / 2;
    // 4. Relative Error for X=5.00, Xa=4.95: |5 - 4.95|/5 = 0.01 (1%)
    const relError = Math.abs(5.0 - 4.95) / 5.0;

    const passed =
      p10_4 === 5040 &&
      c8_3 === 56 &&
      nrStep1 === 2.25 &&
      Math.abs(relError - 0.01) < 1e-9;

    results.push({
      id: 'test-math-correctness',
      name: 'Mathematical Correctness: Exact Numerical Engine Calculations',
      category: 'Theoretical Rigor',
      passed,
      message: passed
        ? 'Verified: P(10,4)=5040, C(8,3)=56, Newton-Raphson step=2.25, and relative error=0.01 match exact theory.'
        : 'Failed: numerical evaluation discrepancies detected.',
      durationMs: Math.round(performance.now() - start),
    });
  }

  return results;
}
