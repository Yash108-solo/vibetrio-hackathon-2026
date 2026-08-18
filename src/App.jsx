import React, { useState } from 'react';
import { 
  Sparkles, Search, Sliders, CheckCircle2, ArrowRight, 
  Laptop, Smartphone, Headphones, Zap, ShieldAlert,
  Database, RefreshCw, Terminal, Check, Info, Award,
  AlertTriangle, Star, Bookmark, ExternalLink, ThumbsUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { extractShoppingMission } from './services/geminiIntent';
import { getProductsByCategory, saveMission, saveDecision, isSupabaseConfigured } from './services/supabase';
import { scoreAndRankProducts } from './services/scoringEngine';
import { SEED_PRODUCTS } from './data/seedProducts';

export default function App() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState(null);
  const [rankedProducts, setRankedProducts] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [jsonLog, setJsonLog] = useState('');

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

  const handleRunMission = async (textToExtract) => {
    const targetText = textToExtract || query;
    if (!targetText.trim()) return;

    setLoading(true);
    try {
      // 1. Extract Intent & Priorities via Gemini / Deterministic Parser
      const extractedMission = await extractShoppingMission(targetText);
      setMission(extractedMission);
      setJsonLog(JSON.stringify(extractedMission, null, 2));

      // 2. Fetch Catalog Products for the extracted category
      const rawProducts = await getProductsByCategory(extractedMission.category);

      // 3. Run Deterministic Scoring Engine
      const ranked = scoreAndRankProducts(rawProducts, extractedMission);
      setRankedProducts(ranked);

      // 4. Persist Mission
      await saveMission(extractedMission);

    } catch (error) {
      console.error("Pipeline error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProductDecision = async (product) => {
    if (savedIds.includes(product.id)) return;

    try {
      await saveDecision({
        mission_id: mission?.id || `m_${Date.now()}`,
        product_id: product.id,
        product_title: product.title,
        product_price: product.price,
        product_thumbnail: product.thumbnail,
        match_score: product.matchScore,
        key_reason: product.reasons[0] || 'Top match for your priorities',
        trade_off: product.tradeOff || 'None noted',
      });

      setSavedIds(prev => [...prev, product.id]);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const top3 = rankedProducts.slice(0, 3);

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
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                  Phase 3 & 4 Verified
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

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Pitch Headline */}
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
            Tell us what you're buying, your budget, and what matters most. We calculate transparent trade-offs with deterministic scoring.
          </p>
        </div>

        {/* Natural Language Input Box */}
        <div className="relative bg-slate-900/90 border border-slate-800 focus-within:border-indigo-500 rounded-3xl p-3 sm:p-4 shadow-2xl transition duration-300">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleRunMission(); }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-slate-500 absolute left-4 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. I need a laptop under ₹70,000 for coding, college and occasional gaming..."
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
                  <span>Scoring Catalog...</span>
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
                    onClick={() => { setQuery(ex.text); handleRunMission(ex.text); }}
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

        {/* Decision Model & Top 3 Results View */}
        {mission && top3.length > 0 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Decision Model Summary Bar */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider mb-1">
                  Active Decision Model
                </div>
                <h3 className="text-lg font-bold text-white">
                  Category: <span className="text-indigo-300 capitalize">{mission.category}</span> • Budget Cap: <span className="text-emerald-400 font-mono">₹{mission.budget_max.toLocaleString('en-IN')} ✓</span>
                </h3>
              </div>

              {/* Priority Chips */}
              <div className="flex flex-wrap items-center gap-1.5">
                {mission.priorities.map((p, idx) => (
                  <span key={idx} className="text-xs bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl text-slate-300 flex items-center gap-1.5">
                    <span>{p.label}</span>
                    <span className="font-mono text-indigo-400 font-bold">{Math.round(p.weight * 100)}%</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Top 3 Ranked Cards Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  <span>Top Ranked Matches</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ranked deterministically using your weighted priorities and budget cap.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                {rankedProducts.length} Qualified Candidates
              </span>
            </div>

            {/* Top 3 Product Cards Stack */}
            <div className="space-y-5">
              {top3.map((product, rankIdx) => {
                const isWinner = rankIdx === 0;
                const isSaved = savedIds.includes(product.id);

                return (
                  <div 
                    key={product.id}
                    className={`relative rounded-3xl transition-all duration-300 p-6 sm:p-7 ${
                      isWinner 
                        ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/10' 
                        : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      
                      {/* Product Thumbnail with Rank Badge */}
                      <div className="relative w-full lg:w-56 h-48 sm:h-52 rounded-2xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img 
                          src={product.thumbnail} 
                          alt={product.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className={`absolute top-3 left-3 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg ${
                          isWinner ? 'bg-indigo-600 text-white' : 'bg-slate-900/90 text-slate-300 border border-slate-700'
                        }`}>
                          {isWinner && <Award className="w-3.5 h-3.5 text-amber-300" />}
                          <span>#{rankIdx + 1} {isWinner ? 'Best Overall' : 'Alternative'}</span>
                        </div>
                      </div>

                      {/* Details & Trade-offs */}
                      <div className="flex-1 space-y-4 w-full">
                        
                        {/* Title, Brand & Match Score */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                              {product.brand}
                            </div>
                            <h3 className="text-xl font-extrabold text-white leading-snug">
                              {product.title}
                            </h3>
                          </div>

                          {/* Match Score Badge */}
                          <div className="text-right shrink-0">
                            <div className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-mono font-black text-xl">
                              {product.matchScore}%
                              <span className="text-xs font-sans font-medium text-slate-400">Match</span>
                            </div>
                          </div>
                        </div>

                        {/* Price & Rating */}
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-white font-mono">
                            ₹{product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="flex items-center text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-xl">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                            {product.rating} / 5.0
                          </span>
                          {product.isOverBudget ? (
                            <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-xl">
                              Over Budget
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-xl">
                              ✓ Within Budget Cap
                            </span>
                          )}
                        </div>

                        {/* Grounded Reasons List */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {product.reasons.map((r, i) => (
                            <div key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>

                        {/* Grounded Trade-off Warning */}
                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-amber-200">
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-semibold">Key Trade-off to Know:</strong> {product.tradeOff}
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="pt-2 flex items-center justify-between">
                          <div className="text-[11px] text-slate-500 font-mono">
                            Deterministic Score ID: #{product.id}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSaveProductDecision(product)}
                              className={`text-xs font-semibold px-4 py-2 rounded-xl transition flex items-center gap-1.5 ${
                                isSaved 
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                              }`}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                              <span>{isSaved ? 'Decision Saved ✓' : 'Save Decision'}</span>
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
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
