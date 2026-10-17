import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, ChevronRight, Check } from 'lucide-react';
import { MathView } from './MathView';

interface VisualizerProps {
  type: 'root-finding' | 'difference-table' | 'simplex' | 'transportation' | 'hasse' | 'truth-table';
}

export const InteractiveVisualizer: React.FC<VisualizerProps> = ({ type }) => {
  if (type === 'root-finding') return <RootFindingVisualizer />;
  if (type === 'difference-table') return <DifferenceTableVisualizer />;
  if (type === 'hasse') return <HasseDiagramVisualizer />;
  if (type === 'transportation') return <TransportationVisualizer />;
  if (type === 'truth-table') return <TruthTableVisualizer />;
  if (type === 'simplex') return <SimplexTableauVisualizer />;
  return null;
};

// 1. Root Finding Visualizer
const RootFindingVisualizer: React.FC = () => {
  const [method, setMethod] = useState<'newton' | 'bisection'>('newton');
  const [step, setStep] = useState<number>(0);

  // Solving f(x) = x^2 - 5 = 0, root is sqrt(5) ≈ 2.2360679
  const newtonSteps = useMemo(() => {
    const list = [{ n: 0, x: 2.0, fx: -1.0, error: 0.2360679 }];
    let curr = 2.0;
    for (let i = 1; i <= 4; i++) {
      const next = (curr + 5 / curr) / 2;
      const fx = next * next - 5;
      const error = Math.abs(next - Math.sqrt(5));
      list.push({ n: i, x: next, fx, error });
      curr = next;
    }
    return list;
  }, []);

  const bisectionSteps = useMemo(() => {
    let a = 2.0;
    let b = 3.0;
    const list = [];
    for (let i = 0; i <= 5; i++) {
      const m = (a + b) / 2;
      const fm = m * m - 5;
      const error = Math.abs(m - Math.sqrt(5));
      list.push({ n: i, a, b, m, fm, error });
      if (fm < 0) a = m;
      else b = m;
    }
    return list;
  }, []);

  const maxSteps = method === 'newton' ? newtonSteps.length - 1 : bisectionSteps.length - 1;

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Interactive Root Convergence Simulator</h4>
          <p className="text-xs text-slate-400">Solving $f(x) = x^2 - 5 = 0$ (Target $\sqrt{5} \approx 2.236068$)</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={() => { setMethod('newton'); setStep(0); }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              method === 'newton' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Newton-Raphson
          </button>
          <button
            onClick={() => { setMethod('bisection'); setStep(0); }}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              method === 'bisection' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Bisection
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {method === 'newton' ? (
          <table className="w-full text-left text-xs text-slate-300 tabular-nums">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Iteration (n)</th>
                <th className="py-2 px-3">Estimate $x_n$</th>
                <th className="py-2 px-3">$f(x_n) = x_n^2 - 5$</th>
                <th className="py-2 px-3">Absolute Error</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {newtonSteps.slice(0, step + 1).map((row, idx) => (
                <tr key={idx} className={`border-b border-slate-800/50 ${idx === step ? 'bg-cyan-950/40 text-cyan-200' : ''}`}>
                  <td className="py-2 px-3 font-mono">{row.n}</td>
                  <td className="py-2 px-3 font-mono font-medium">{row.x.toFixed(7)}</td>
                  <td className="py-2 px-3 font-mono">{row.fx.toFixed(6)}</td>
                  <td className="py-2 px-3 font-mono text-amber-400">{row.error.toExponential(3)}</td>
                  <td className="py-2 px-3">
                    {row.error < 1e-6 ? (
                      <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-semibold"><Check className="w-3 h-3" /> Converged</span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Iterating...</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-xs text-slate-300 tabular-nums">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-2 px-3">Step</th>
                <th className="py-2 px-3">Bracket $[a, b]$</th>
                <th className="py-2 px-3">Midpoint $m$</th>
                <th className="py-2 px-3">$f(m)$</th>
                <th className="py-2 px-3">Error</th>
              </tr>
            </thead>
            <tbody>
              {bisectionSteps.slice(0, step + 1).map((row, idx) => (
                <tr key={idx} className={`border-b border-slate-800/50 ${idx === step ? 'bg-cyan-950/40 text-cyan-200' : ''}`}>
                  <td className="py-2 px-3 font-mono">{row.n}</td>
                  <td className="py-2 px-3 font-mono">[{row.a.toFixed(4)}, {row.b.toFixed(4)}]</td>
                  <td className="py-2 px-3 font-mono font-medium">{row.m.toFixed(6)}</td>
                  <td className="py-2 px-3 font-mono">{row.fm.toFixed(4)}</td>
                  <td className="py-2 px-3 font-mono text-amber-400">{row.error.toExponential(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3">
        <span className="text-xs text-slate-400">
          Step <strong className="text-white font-mono">{step}</strong> of {maxSteps}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setStep(0)}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg disabled:opacity-40 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
          <button
            onClick={() => setStep((s) => Math.min(s + 1, maxSteps))}
            disabled={step >= maxSteps}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg disabled:opacity-40 font-semibold transition-colors"
          >
            Step Forward <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// 2. Finite Difference Table Visualizer
const DifferenceTableVisualizer: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<number[]>([1, 8, 27, 64]); // y = x^3

  const diffTable = useMemo(() => {
    const col0 = [...dataPoints];
    const col1 = [];
    for (let i = 0; i < col0.length - 1; i++) col1.push(col0[i + 1] - col0[i]);
    const col2 = [];
    for (let i = 0; i < col1.length - 1; i++) col2.push(col1[i + 1] - col1[i]);
    const col3 = [];
    for (let i = 0; i < col2.length - 1; i++) col3.push(col2[i + 1] - col2[i]);
    return { col0, col1, col2, col3 };
  }, [dataPoints]);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Newton Finite Difference Table Generator</h4>
          <p className="text-xs text-slate-400">Notice that 3rd degree cubic polynomial yields constant $\Delta^3 y = 6$</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDataPoints([1, 8, 27, 64])}
            className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
          >
            Cubic $x^3$
          </button>
          <button
            onClick={() => setDataPoints([1, 4, 9, 16])}
            className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
          >
            Quadratic $x^2$
          </button>
          <button
            onClick={() => setDataPoints([2, 5, 10, 17])}
            className="px-2.5 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors"
          >
            $x^2 + 1$
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs text-slate-200 font-mono tabular-nums">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3">Node $x$</th>
              <th className="py-2 px-3">Value $y$</th>
              <th className="py-2 px-3 text-cyan-400">$\\Delta y$</th>
              <th className="py-2 px-3 text-violet-400">$\\Delta^2 y$</th>
              <th className="py-2 px-3 text-emerald-400">$\\Delta^3 y$ (Constant)</th>
            </tr>
          </thead>
          <tbody>
            {diffTable.col0.map((y, idx) => (
              <tr key={idx} className="border-b border-slate-800/40">
                <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                <td className="py-2 px-3 font-semibold text-white">{y}</td>
                <td className="py-2 px-3 text-cyan-300">{diffTable.col1[idx] !== undefined ? diffTable.col1[idx] : '—'}</td>
                <td className="py-2 px-3 text-violet-300">{diffTable.col2[idx] !== undefined ? diffTable.col2[idx] : '—'}</td>
                <td className="py-2 px-3 font-bold text-emerald-400">{diffTable.col3[idx] !== undefined ? diffTable.col3[idx] : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-slate-400 italic">
        Fundamental theorem of difference calculus: The $n$-th forward difference of a polynomial of degree $n$ is constant and equals $n! a_n h^n$.
      </p>
    </div>
  );
};

// 3. Hasse Diagram Visualizer
const HasseDiagramVisualizer: React.FC = () => {
  const [selectedPoset, setSelectedPoset] = useState<'D12' | 'D30' | 'P2'>('D12');

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Interactive Hasse Diagram & Lattice Explorer</h4>
          <p className="text-xs text-slate-400">Observe levels, covering edges, maximal/minimal and bounded elements</p>
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={() => setSelectedPoset('D12')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedPoset === 'D12' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Divisors $D_{12}$
          </button>
          <button
            onClick={() => setSelectedPoset('P2')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedPoset === 'P2' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {'Power Set P({a, b})'}
          </button>
          <button
            onClick={() => setSelectedPoset('D30')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
              selectedPoset === 'D30' ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Boolean $D_{30}$
          </button>
        </div>
      </div>

      <div className="h-64 flex items-center justify-center relative bg-slate-950/60 rounded-xl border border-slate-800/80 p-4">
        {selectedPoset === 'D12' && (
          <div className="flex flex-col items-center justify-between h-full w-full max-w-xs py-2">
            {/* Level 3: Top */}
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 flex items-center justify-center font-bold text-sm shadow-md">
              12
            </div>
            {/* Level 2: Middle */}
            <div className="flex items-center justify-between w-full px-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 flex items-center justify-center font-semibold text-xs">
                4
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 flex items-center justify-center font-semibold text-xs">
                6
              </div>
            </div>
            {/* Level 1: Prime Divisors */}
            <div className="flex items-center justify-between w-full px-6">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 flex items-center justify-center font-semibold text-xs">
                2
              </div>
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 flex items-center justify-center font-semibold text-xs">
                3
              </div>
            </div>
            {/* Level 0: Bottom */}
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 flex items-center justify-center font-bold text-sm shadow-md">
              1
            </div>
          </div>
        )}

        {selectedPoset === 'P2' && (
          <div className="flex flex-col items-center justify-between h-full w-full max-w-xs py-2">
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-bold text-xs shadow-md">
              {'{a, b}'} (1)
            </div>
            <div className="flex items-center justify-between w-full px-4">
              <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-semibold text-xs">
                {'{a}'} (Atom)
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-600 text-slate-200 font-semibold text-xs">
                {'{b}'} (Atom)
              </div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 font-bold text-xs shadow-md">
              ∅ (0)
            </div>
          </div>
        )}

        {selectedPoset === 'D30' && (
          <div className="flex flex-col items-center justify-between h-full w-full max-w-sm py-2">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 flex items-center justify-center font-bold text-xs">
              30
            </div>
            <div className="flex items-center justify-around w-full">
              <span className="w-8 h-8 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-[11px] font-mono">10</span>
              <span className="w-8 h-8 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-[11px] font-mono">15</span>
              <span className="w-8 h-8 rounded bg-slate-800 border border-slate-600 flex items-center justify-center text-[11px] font-mono">6</span>
            </div>
            <div className="flex items-center justify-around w-full">
              <span className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center justify-center text-[11px] font-mono font-bold">2</span>
              <span className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center justify-center text-[11px] font-mono font-bold">3</span>
              <span className="w-8 h-8 rounded bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 flex items-center justify-center text-[11px] font-mono font-bold">5</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border-2 border-amber-400 text-amber-200 flex items-center justify-center font-bold text-xs">
              1
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <div>
          {selectedPoset === 'D12' && <span>Notice: Elements 2 and 3 are incomparable ($2 \nmid 3$ and $3 \nmid 2$). Element 1 is least, 12 is greatest.</span>}
          {selectedPoset === 'P2' && <span>Isomorphic to Boolean Algebra $B_2$: 2 atoms ({'{a}'}, {'{b}'}), cardinality $|B_2| = 2^2 = 4$.</span>}
          {selectedPoset === 'D30' && <span>Square-free integer $30 = 2 \times 3 \times 5$. Forms a Boolean algebra with $2^3 = 8$ elements and 3 atoms.</span>}
        </div>
      </div>
    </div>
  );
};

// 4. Transportation Visualizer
const TransportationVisualizer: React.FC = () => {
  const [supply, setSupply] = useState<[number, number]>([30, 50]);
  const [demand, setDemand] = useState<[number, number]>([40, 40]);

  // Cost matrix: O1:[3, 1], O2:[4, 2]
  // NWCR allocation
  const nwcr = useMemo(() => {
    let s1 = supply[0];
    let s2 = supply[1];
    let d1 = demand[0];
    let d2 = demand[1];

    const a11 = Math.min(s1, d1);
    s1 -= a11;
    d1 -= a11;

    const a21 = Math.min(s2, d1);
    s2 -= a21;
    d1 -= a21;

    const a12 = Math.min(s1, d2);
    s1 -= a12;
    d2 -= a12;

    const a22 = Math.min(s2, d2);

    const cost = a11 * 3 + a12 * 1 + a21 * 4 + a22 * 2;
    return { a11, a12, a21, a22, cost };
  }, [supply, demand]);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-4">
        <div>
          <h4 className="text-sm font-semibold text-white">Interactive Transportation Tableau Solver (NWCR)</h4>
          <p className="text-xs text-slate-400">Balanced $2 \times 2$ shipping cost model ($m + n - 1 = 3$ allocations)</p>
        </div>
        <div className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-lg">
          Total Cost = ${nwcr.cost}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs text-slate-200 border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3 text-left">Origin \ Dest</th>
              <th className="py-2 px-3">Destination 1</th>
              <th className="py-2 px-3">Destination 2</th>
              <th className="py-2 px-3 text-amber-400">Supply</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800/60">
              <td className="py-2 px-3 font-semibold text-left">Origin 1</td>
              <td className="py-2 px-3">
                <div className="bg-slate-800/80 rounded p-2 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Cost: $3</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">Alloc: {nwcr.a11}</div>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="bg-slate-800/80 rounded p-2 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Cost: $1</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">Alloc: {nwcr.a12}</div>
                </div>
              </td>
              <td className="py-2 px-3 font-bold font-mono text-amber-300">{supply[0]}</td>
            </tr>
            <tr className="border-b border-slate-800/60">
              <td className="py-2 px-3 font-semibold text-left">Origin 2</td>
              <td className="py-2 px-3">
                <div className="bg-slate-800/80 rounded p-2 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Cost: $4</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">Alloc: {nwcr.a21}</div>
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="bg-slate-800/80 rounded p-2 border border-slate-700">
                  <div className="text-[10px] text-slate-400">Cost: $2</div>
                  <div className="text-sm font-bold text-cyan-400 font-mono">Alloc: {nwcr.a22}</div>
                </div>
              </td>
              <td className="py-2 px-3 font-bold font-mono text-amber-300">{supply[1]}</td>
            </tr>
            <tr>
              <td className="py-2 px-3 font-semibold text-amber-400 text-left">Demand</td>
              <td className="py-2 px-3 font-bold font-mono text-amber-300">{demand[0]}</td>
              <td className="py-2 px-3 font-bold font-mono text-amber-300">{demand[1]}</td>
              <td className="py-2 px-3 font-mono text-xs text-slate-400">Total: {supply[0] + supply[1]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 5. Truth Table Visualizer
const TruthTableVisualizer: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="border-b border-slate-800 pb-3 mb-4">
        <h4 className="text-sm font-semibold text-white">De Morgan\'s Law Truth Table Verification</h4>
        <p className="text-xs text-slate-400">Comparing $(x \land y)\'$ with $x\' \lor y\'$ for all truth valuations</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs text-slate-200 font-mono tabular-nums">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3">$x$</th>
              <th className="py-2 px-3">$y$</th>
              <th className="py-2 px-3">$x \\land y$</th>
              <th className="py-2 px-3 font-bold text-cyan-400">$(x \\land y)\'$</th>
              <th className="py-2 px-3">$x\'$</th>
              <th className="py-2 px-3">$y\'$</th>
              <th className="py-2 px-3 font-bold text-emerald-400">$x\' \\lor y\'$</th>
              <th className="py-2 px-3">Equivalence</th>
            </tr>
          </thead>
          <tbody>
            {[
              { x: 1, y: 1 },
              { x: 1, y: 0 },
              { x: 0, y: 1 },
              { x: 0, y: 0 },
            ].map((row, idx) => {
              const andVal = row.x && row.y ? 1 : 0;
              const notAnd = andVal ? 0 : 1;
              const notX = row.x ? 0 : 1;
              const notY = row.y ? 0 : 1;
              const orVal = notX || notY ? 1 : 0;
              const eq = notAnd === orVal;

              return (
                <tr key={idx} className="border-b border-slate-800/50">
                  <td className="py-2 px-3">{row.x}</td>
                  <td className="py-2 px-3">{row.y}</td>
                  <td className="py-2 px-3">{andVal}</td>
                  <td className="py-2 px-3 font-bold text-cyan-300 bg-cyan-950/20">{notAnd}</td>
                  <td className="py-2 px-3 text-slate-400">{notX}</td>
                  <td className="py-2 px-3 text-slate-400">{notY}</td>
                  <td className="py-2 px-3 font-bold text-emerald-300 bg-emerald-950/20">{orVal}</td>
                  <td className="py-2 px-3">
                    <span className="text-emerald-400 font-semibold flex items-center justify-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Identical
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 6. Simplex Tableau Visualizer
const SimplexTableauVisualizer: React.FC = () => {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 p-5 backdrop-blur-sm shadow-xl">
      <div className="border-b border-slate-800 pb-3 mb-4">
        <h4 className="text-sm font-semibold text-white">Simplex Tableau Structure & Minimum Ratio Test</h4>
        <p className="text-xs text-slate-400">Maximize $Z = 4x_1 + 3x_2$ subject to $2x_1 + x_2 \le 10$, $x_1 + 2x_2 \le 8$</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-center text-xs text-slate-200 font-mono tabular-nums border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2 px-3 text-left">Basis</th>
              <th className="py-2 px-3 text-cyan-400">$x_1$ (Pivot Col)</th>
              <th className="py-2 px-3">$x_2$</th>
              <th className="py-2 px-3">$s_1$</th>
              <th className="py-2 px-3">$s_2$</th>
              <th className="py-2 px-3 text-amber-400">RHS ($b$)</th>
              <th className="py-2 px-3 text-violet-400 font-sans">{'Ratio θ = b_i / a_ir'}</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800/50">
              <td className="py-2 px-3 text-left font-bold text-slate-300">$s_1$</td>
              <td className="py-2 px-3 font-bold text-cyan-300 bg-cyan-950/30">2 (Pivot)</td>
              <td className="py-2 px-3">1</td>
              <td className="py-2 px-3">1</td>
              <td className="py-2 px-3">0</td>
              <td className="py-2 px-3 text-amber-300">10</td>
              <td className="py-2 px-3 text-violet-300 font-bold bg-violet-950/30">10 / 2 = 5 (Leaving)</td>
            </tr>
            <tr className="border-b border-slate-800/50">
              <td className="py-2 px-3 text-left font-bold text-slate-300">$s_2$</td>
              <td className="py-2 px-3 text-cyan-300 bg-cyan-950/30">1</td>
              <td className="py-2 px-3">2</td>
              <td className="py-2 px-3">0</td>
              <td className="py-2 px-3">1</td>
              <td className="py-2 px-3 text-amber-300">8</td>
              <td className="py-2 px-3 text-violet-300">8 / 1 = 8</td>
            </tr>
            <tr className="bg-slate-950/80 font-bold">
              <td className="py-2 px-3 text-left text-slate-400">$z_j - c_j$</td>
              <td className="py-2 px-3 text-rose-400 bg-cyan-950/30">-4 (Most negative)</td>
              <td className="py-2 px-3 text-rose-400">-3</td>
              <td className="py-2 px-3">0</td>
              <td className="py-2 px-3">0</td>
              <td className="py-2 px-3 text-amber-300">$Z = 0$</td>
              <td className="py-2 px-3 text-slate-500">—</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] text-slate-400">
        {'Key rule: Variable $x_1$ enters the basis (steepest negative evaluation -4). Row 1 leaves because ratio 5 < 8.'}
      </p>
    </div>
  );
};
