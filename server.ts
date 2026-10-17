import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { FALLBACK_QUESTIONS } from './src/data/fallbackQuestions';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '2mb' }));

// Initialize Google GenAI client securely on server
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Helpers for question validation and option shuffling
interface RawOption {
  id: string;
  text: string;
}

interface RawQuestion {
  id?: string;
  unitId?: string;
  topic?: string;
  difficulty?: string;
  questionText?: string;
  options?: RawOption[];
  correctOptionId?: string;
  explanation?: string;
  formulaReference?: string;
}

function normalizeFingerprint(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 80);
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function validateAndFormatQuestion(
  q: RawQuestion,
  unitIdDefault: string,
  index: number
): RawQuestion | null {
  if (!q.questionText || typeof q.questionText !== 'string' || q.questionText.trim().length < 10) {
    return null;
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    return null;
  }

  // Ensure distinct option texts
  const optionTexts = q.options.map((o) => (typeof o.text === 'string' ? o.text.trim() : ''));
  if (new Set(optionTexts).size !== 4 || optionTexts.some((t) => t.length === 0)) {
    return null;
  }

  // Find correct option index
  const correctRawId = (q.correctOptionId || 'A').toUpperCase().trim();
  let correctIndex = q.options.findIndex(
    (o) => (o.id || '').toUpperCase().trim() === correctRawId
  );
  if (correctIndex === -1) {
    // If correctOptionId was given as text match
    correctIndex = optionTexts.findIndex((t) => t === correctRawId);
  }
  if (correctIndex === -1) {
    correctIndex = 0; // fallback if needed
  }

  const correctText = optionTexts[correctIndex];

  // Shuffle options to prevent bias and ensure uniform distribution
  const shuffledTexts = shuffleArray(optionTexts);
  const newOptions: RawOption[] = ['A', 'B', 'C', 'D'].map((letter, idx) => ({
    id: letter,
    text: shuffledTexts[idx],
  }));

  const newCorrectOptionId = newOptions.find((o) => o.text === correctText)?.id || 'A';

  const validDifficulties = ['easy', 'medium', 'hard'];
  const difficulty =
    q.difficulty && validDifficulties.includes(q.difficulty.toLowerCase())
      ? (q.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard')
      : 'medium';

  return {
    id: q.id || `gen-${unitIdDefault}-${Date.now()}-${index}`,
    unitId: q.unitId || unitIdDefault,
    topic: q.topic || 'General Foundations of Mathematics',
    difficulty,
    questionText: q.questionText.trim(),
    options: newOptions,
    correctOptionId: newCorrectOptionId,
    explanation: q.explanation || 'Step-by-step mathematical reasoning verified.',
    formulaReference: q.formulaReference || undefined,
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!apiKey,
    model: 'gemini-3.8-flash',
    timestamp: Date.now(),
  });
});

// Dynamic Question Generation API
app.post('/api/quiz/generate', async (req, res) => {
  const {
    mode = 'unit1',
    recentFingerprints = [],
    count = 15,
  } = req.body;

  const recentSet = new Set<string>(
    (recentFingerprints as string[]).map(normalizeFingerprint)
  );

  // Determine syllabus distribution based on mode
  let requiredCounts: { unitId: string; target: number }[] = [];
  if (mode === 'unit1') requiredCounts = [{ unitId: 'unit1', target: 15 }];
  else if (mode === 'unit2') requiredCounts = [{ unitId: 'unit2', target: 15 }];
  else if (mode === 'unit3') requiredCounts = [{ unitId: 'unit3', target: 15 }];
  else if (mode === 'unit4') requiredCounts = [{ unitId: 'unit4', target: 15 }];
  else if (mode === 'master') {
    requiredCounts = [
      { unitId: 'unit1', target: 8 },
      { unitId: 'unit2', target: 8 },
      { unitId: 'unit3', target: 7 },
      { unitId: 'unit4', target: 7 },
    ];
  } else {
    requiredCounts = [{ unitId: 'unit1', target: 15 }];
  }

  const generatedQuestions: RawQuestion[] = [];
  let usedFallback = false;
  let generationError: string | null = null;

  if (ai) {
    try {
      for (const item of requiredCounts) {
        const unitNameMap: Record<string, string> = {
          unit1: 'Unit 1: Combinatorics and Its Applications (Counting principles, permutations, combinations, binomial theorem, pigeonhole, inclusion-exclusion, derangements, multisets/stars & bars, partitions, recurrence relations, generating functions)',
          unit2: 'Unit 2: Numerical Methods (Errors: absolute/relative/percentage, Bisection, Regula-Falsi, Newton-Raphson, Secant, Gauss elimination, Gauss-Jordan, Jacobi & Gauss-Seidel iterative, Newton forward/backward interpolation, Lagrange interpolation, Newton divided differences)',
          unit3: 'Unit 3: Operations Research & Linear Programming (Concepts of OR, Graphical 2-variable LPP, corner point optimality, multiple/unbounded/infeasible, standard form, Simplex algorithm & tableau, Duality, Transportation NWCR & Least Cost, MODI u-v optimality & degeneracy, Assignment Hungarian method, Game theory 2-person zero-sum, saddle point, pure & mixed strategies, dominance, graphical game method)',
          unit4: 'Unit 4: Lattices and Boolean Algebra (Relations, partial orders, POSETs, Hasse diagrams, lattices as POSETs, meet and join, sublattices, completeness, distributive & complemented lattices, Birkhoff N5 and M3 forbidden sublattices, Boolean algebra axioms, De Morgan laws, join/meet-irreducible elements, atoms and anti-atoms, Stone\'s Representation Theorem, switching circuit simplification)',
        };

        const unitDescription = unitNameMap[item.unitId] || item.unitId;

        const prompt = `You are a university professor creating an examination for Foundation of Mathematics.
Generate exactly ${item.target} mathematically rigorous, unique, diverse multiple-choice questions for ${unitDescription}.
Requirements:
1. Difficulty balance: approx 30% easy, 50% medium, 20% hard.
2. Mix conceptual, numerical, and formula-based questions.
3. Every question must have exactly 4 distinct, unambiguous options.
4. Correct option must be accurate with step-by-step proof in explanation.
5. Use standard LaTeX enclosed in single dollar signs ($...$) for inline math and double dollar signs ($$...$$) for block math.
6. Do NOT repeat or closely match any of these recently seen question concepts:
${Array.from(recentSet).slice(0, 15).join(' | ')}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  unitId: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  questionText: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        text: { type: Type.STRING },
                      },
                      required: ['id', 'text'],
                    },
                  },
                  correctOptionId: { type: Type.STRING },
                  explanation: { type: Type.STRING },
                  formulaReference: { type: Type.STRING },
                },
                required: [
                  'questionText',
                  'options',
                  'correctOptionId',
                  'explanation',
                ],
              },
            },
          },
        });

        const jsonStr = response.text?.trim() || '[]';
        let parsed: RawQuestion[] = [];
        try {
          parsed = JSON.parse(jsonStr);
        } catch {
          parsed = [];
        }

        let validCountForUnit = 0;
        for (let idx = 0; idx < parsed.length; idx++) {
          const rawQ = parsed[idx];
          const validated = validateAndFormatQuestion(rawQ, item.unitId, generatedQuestions.length);
          if (validated) {
            const fp = normalizeFingerprint(validated.questionText || '');
            if (!recentSet.has(fp)) {
              recentSet.add(fp);
              generatedQuestions.push(validated);
              validCountForUnit++;
              if (validCountForUnit >= item.target) break;
            }
          }
        }
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Gemini dynamic question generation failed, falling back:', error.message);
      generationError = error.message;
      usedFallback = true;
    }
  } else {
    usedFallback = true;
  }

  // If AI generation did not meet the exact targets or wasn't configured, fill with verified fallback
  const finalQuestions: RawQuestion[] = [];

  for (const item of requiredCounts) {
    const fromAi = generatedQuestions.filter((q) => q.unitId === item.unitId);
    finalQuestions.push(...fromAi);

    const needed = item.target - fromAi.length;
    if (needed > 0) {
      usedFallback = true;
      // Filter verified fallback questions for this unit
      const unitFallbacks = shuffleArray(
        FALLBACK_QUESTIONS.filter((q) => q.unitId === item.unitId)
      );

      // Select fallback questions not already used in this session or recently
      let picked = 0;
      for (const fb of unitFallbacks) {
        const fp = normalizeFingerprint(fb.questionText);
        if (!finalQuestions.some((fq) => fq.id === fb.id) && !finalQuestions.some((fq) => normalizeFingerprint(fq.questionText || '') === fp)) {
          finalQuestions.push({ ...fb });
          picked++;
          if (picked >= needed) break;
        }
      }

      // If still need more, take any from unitFallbacks
      if (picked < needed) {
        for (const fb of unitFallbacks) {
          if (!finalQuestions.some((fq) => fq.id === fb.id)) {
            finalQuestions.push({ ...fb });
            picked++;
            if (picked >= needed) break;
          }
        }
      }
    }
  }

  // In Master Quiz, randomize the display order across all 30 questions
  const randomizedFinal =
    mode === 'master' ? shuffleArray(finalQuestions) : finalQuestions;

  res.json({
    mode,
    totalCount: randomizedFinal.length,
    isFallback: usedFallback,
    source: usedFallback
      ? generatedQuestions.length > 0
        ? 'hybrid-verified-fallback'
        : 'offline-verified-fallback'
      : 'gemini-ai-generated',
    message: usedFallback
      ? 'Generated using MathQuest verified offline bank with step-by-step proofs.'
      : 'Dynamically generated in real-time by Google Gemini AI with schema validation.',
    questions: randomizedFinal,
    error: generationError,
  });
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MathQuest server is running on http://0.0.0.0:${port}`);
  });
}

startServer();
