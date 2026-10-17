import React, { useState, useMemo } from 'react';
import { Search, Bookmark, BookmarkCheck, Copy, Check, Filter, Library } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FORMULA_LIBRARY } from '../data/formulas';
import { MathView } from '../components/MathView';
import { UnitId } from '../types';

export const FormulaLibraryView: React.FC = () => {
  const { stats, toggleBookmarkFormula, settings } = useApp();
  const isDark = settings.theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnit, setSelectedUnit] = useState<UnitId | 'all'>('all');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyFormulaLatex = (id: string, latex: string) => {
    navigator.clipboard.writeText(latex).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const filteredFormulas = useMemo(() => {
    return FORMULA_LIBRARY.filter((f) => {
      if (selectedUnit !== 'all' && f.unitId !== selectedUnit) return false;
      if (showBookmarksOnly && !stats.bookmarkedFormulas.includes(f.id)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(query);
        const matchesTopic = f.topic.toLowerCase().includes(query);
        const matchesDesc = f.description.toLowerCase().includes(query);
        const matchesTags = f.tags.some((t) => t.toLowerCase().includes(query));
        return matchesName || matchesTopic || matchesDesc || matchesTags;
      }
      return true;
    });
  }, [searchQuery, selectedUnit, showBookmarksOnly, stats.bookmarkedFormulas]);

  const unitLabels: Record<string, string> = {
    all: 'All Units',
    unit1: 'Unit 1: Combinatorics',
    unit2: 'Unit 2: Numerical',
    unit3: 'Unit 3: Operations Research',
    unit4: 'Unit 4: Boolean Algebra',
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className={`border-b pb-5 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
        <div className={`flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider mb-2 ${
          isDark ? 'text-violet-400' : 'text-violet-700'
        }`}>
          <Library className="w-4 h-4" />
          <span>Quick Reference Engine</span>
        </div>
        <h1 className={`text-3xl font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Searchable Formula Library
        </h1>
        <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Instant mathematical lookup across all four units. Bookmark key identities, explore symbol meanings, and copy LaTeX formulas for exams and assignments.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-slate-400' : 'text-slate-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas by name, topic, or keyword (e.g. Newton, Pascal, MODI, De Morgan)..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/30 ${
                isDark
                  ? 'border-slate-800 bg-slate-900/90 text-white placeholder-slate-500 focus:border-violet-500'
                  : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-violet-600 shadow-xs'
              }`}
            />
          </div>

          <button
            onClick={() => setShowBookmarksOnly((prev) => !prev)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              showBookmarksOnly
                ? isDark
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                  : 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-xs'
            }`}
          >
            {showBookmarksOnly ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
            <span>Bookmarked ({stats.bookmarkedFormulas.length})</span>
          </button>
        </div>

        {/* Unit Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {(['all', 'unit1', 'unit2', 'unit3', 'unit4'] as const).map((uid) => (
            <button
              key={uid}
              onClick={() => setSelectedUnit(uid)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                selectedUnit === uid
                  ? 'bg-violet-600 text-white shadow-sm'
                  : isDark
                  ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-950 border border-slate-200 shadow-xs'
              }`}
            >
              {unitLabels[uid]}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      {filteredFormulas.length === 0 ? (
        <div className={`rounded-2xl border p-12 text-center space-y-3 ${
          isDark
            ? 'border-slate-800 bg-slate-900/50 text-slate-400'
            : 'border-slate-200 bg-white text-slate-600 shadow-sm'
        }`}>
          <Library className="w-10 h-10 mx-auto text-slate-400" />
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            No matching formulas found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search keywords or removing the bookmark filter to view all available formulas.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredFormulas.map((f) => {
            const isBookmarked = stats.bookmarkedFormulas.includes(f.id);
            const isCopied = copiedId === f.id;

            return (
              <div
                key={f.id}
                className={`rounded-2xl border p-5 shadow-lg backdrop-blur-sm flex flex-col justify-between space-y-4 transition-all ${
                  isDark
                    ? 'border-slate-800/90 bg-slate-900/80 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300 shadow-slate-200/50'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className={`text-[10px] font-mono font-semibold uppercase tracking-wider ${
                        isDark ? 'text-violet-400' : 'text-violet-700'
                      }`}>
                        {f.topic}
                      </span>
                      <h3 className={`text-base font-bold mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {f.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyFormulaLatex(f.id, f.latex)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                        }`}
                        title="Copy LaTeX formula to clipboard"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleBookmarkFormula(f.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isDark
                            ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-800'
                            : 'text-slate-500 hover:text-amber-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark formula'}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Rendered Math Formula Display Box */}
                  <div className={`formula-display-box my-3 py-3.5 px-3 rounded-xl border text-center text-sm sm:text-base overflow-x-auto transition-colors ${
                    isDark
                      ? 'bg-slate-950 border-slate-800/90 text-slate-100 shadow-inner'
                      : 'bg-slate-50/90 border-slate-200 text-slate-900 shadow-xs'
                  }`}>
                    <MathView content={`$$${f.latex}$$`} block />
                  </div>

                  <p className={`text-xs leading-relaxed mb-3 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {f.description}
                  </p>

                  {/* Variables & Symbols */}
                  {f.symbols.length > 0 && (
                    <div className={`space-y-1.5 pt-2 border-t text-[11px] ${
                      isDark ? 'border-slate-800/70' : 'border-slate-200'
                    }`}>
                      <div className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                        Variables & Symbols:
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {f.symbols.map((sym, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2">
                            <span className={`font-mono font-semibold shrink-0 ${
                              isDark ? 'text-cyan-300' : 'text-cyan-700'
                            }`}>
                              <MathView content={`$${sym.symbol}$`} />:
                            </span>
                            <span className={isDark ? 'text-slate-400 truncate' : 'text-slate-600 truncate'}>
                              {sym.meaning}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer tags */}
                <div className={`flex flex-wrap items-center gap-1.5 pt-2 border-t ${
                  isDark ? 'border-slate-800/60' : 'border-slate-200'
                }`}>
                  {f.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        isDark
                          ? 'text-slate-400 bg-slate-950/80 border-slate-800'
                          : 'text-slate-600 bg-slate-100 border-slate-200 font-medium'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
