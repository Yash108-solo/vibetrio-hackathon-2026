import React, { useState } from 'react';
import { 
  Sparkles, Search, Sliders, CheckCircle2, ArrowRight, 
  Laptop, Smartphone, Headphones, Zap, ShieldAlert,
  Database, RefreshCw, Terminal, Check, Info
} from 'lucide-react';
import { extractShoppingMission } from './services/geminiIntent';
import { saveMission, isSupabaseConfigured } from './services/supabase';
import { SEED_PRODUCTS } from './data/seedProducts';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState(null);
  const [jsonLog, setJsonLog] = useState('');

  // 3 Hero Examples as specified in blueprint
  const HERO_EXAMPLES = [
    {
      icon: Laptop,
      label: "CS Student Laptop",
      text: "I need a laptop under ₹70,000 for coding, college and occasional gaming. Battery and portability matter more than looks.",
      tag: "Laptop • Under ₹70k"
    },
    {
      icon: Smartphone,
      label: "Productivity Phone",
      text: "Looking for a smartphone under ₹25,000 with exceptional battery life and clean display for daily productivity.",
      tag: "Phone • Under ₹25k"
    },
    {
      icon: Headphones,
      label: "ANC Travel Audio",
      text: "I need wireless noise-cancelling headphones under ₹10,000 for study and travel with great comfort.",
      tag: "Audio • Under ₹10k"
    }
  ];

  const handleExtractMission = async (textToExtract) => {
    const targetText = textToExtract || query;
    if (!targetText.trim()) return;

    setLoading(true);
    try {
      const extracted = await extractShoppingMission(targetText);
      setMission(extracted);
      setJsonLog(JSON.stringify(extracted, null, 2));

      // Save to Supabase / Local storage
      await saveMission(extracted);
    } catch (error) {
      console.error("Extraction error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleText) => {
    setQuery(exampleText);
    handleExtractMission(exampleText);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/25">
              D
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                  DECIDE
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
                  Phase 2 Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">A Transparent Decision Model for Shopping</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-emerald-400 font-semibold">{SEED_PRODUCTS.length} Catalog Items</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Hero Pitch Headline */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Decision Intelligence • Not Just Search
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Make your next purchase <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-200 to-emerald-400 bg-clip-text text-transparent">
              make complete sense.
            </span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Tell us what you're buying, your budget, and what matters most. We build a visible decision model with trade-offs you can adjust.
          </p>
        </div>

        {/* Natural Language Input Box */}
        <div className="relative bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500 rounded-3xl p-3 sm:p-4 shadow-2xl transition duration-300">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleExtractMission(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. I need a laptop under ₹70,000 for coding and occasional gaming..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:opacity-50 text-white font-semibold px-6 py-3.5 rounded-2xl text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 shrink-0"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Extracting Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Find My Match</span>
                </>
              )}
            </button>
          </form>

          {/* 3 Clickable Example Missions */}
          <div className="mt-4 pt-4 border-t border-slate-800/80">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-indigo-400" />
              <span>Or click a sample mission to test:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {HERO_EXAMPLES.map((ex, i) => {
                const Icon = ex.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(ex.text)}
                    className="text-left p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 hover:border-indigo-500/50 transition group flex flex-col justify-between space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-200">
                      <span className="flex items-center gap-1.5 group-hover:text-indigo-300 transition">
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                        {ex.label}
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      "{ex.text}"
                    </p>
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded w-fit">
                      {ex.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Phase 2 Output: Extracted Decision Model Card */}
        {mission && (
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  <CheckCircle2 className="w-3 h-3" />
                  Gemini Call #1 Successful
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Your Extracted Decision Model</h2>
                <p className="text-xs text-slate-400 mt-0.5">{mission.summary}</p>
              </div>

              {/* Extracted Hard Constraints */}
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Category</div>
                  <div className="text-sm font-bold text-indigo-300 capitalize">{mission.category}</div>
                </div>
                <div className="bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800 text-right">
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Budget Cap</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">₹{mission.budget_max.toLocaleString('en-IN')} ✓</div>
                </div>
              </div>
            </div>

            {/* Extracted Priorities with Normalized Weights */}
            <div className="space-y-4">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Extracted Decision Weights (Normalized to 1.0)</span>
              </h3>

              <div className="space-y-3">
                {mission.priorities.map((p, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{p.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          p.importance === 'HIGH' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                          p.importance === 'MEDIUM' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {p.importance}
                        </span>
                        <span className="font-mono text-indigo-400 font-bold">{Math.round(p.weight * 100)}%</span>
                      </div>
                    </div>
                    {/* Weight Bar */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.round(p.weight * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JSON Schema Inspection Drawer for Judges */}
            <div className="pt-2">
              <details className="text-xs group">
                <summary className="cursor-pointer text-slate-500 hover:text-slate-300 font-mono flex items-center gap-2 select-none">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Inspect Extracted JSON Payload (Developer & Judge View)</span>
                </summary>
                <pre className="mt-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[11px] text-indigo-300 overflow-x-auto leading-relaxed">
                  {jsonLog}
                </pre>
              </details>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        DECIDE • VibeTrio • VibeCode Hackathon 2.0 (MHSSCE)
      </footer>
    </div>
  );
}
