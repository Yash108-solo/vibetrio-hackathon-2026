import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Check, Zap, Target, DollarSign, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuideMeModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('phone');
  const [budgetTier, setBudgetTier] = useState('mid');
  const [featureFocus, setFeatureFocus] = useState('battery');
  const [brandPref, setBrandPref] = useState('any');

  if (!isOpen) return null;

  const CATEGORY_OPTIONS = [
    { id: 'phone', label: 'Smartphone / Tech', icon: '📱', desc: 'Phones, laptops, gadgets' },
    { id: 'protein', label: 'Protein & Fitness', icon: '💪', desc: 'Whey, creatine, supplements' },
    { id: 'watch', label: 'Watch / Timepiece', icon: '⌚', desc: 'Titan, Casio, smartwatches' },
    { id: 'apparel', label: 'Innerwear & Apparel', icon: '👕', desc: 'Jockey cotton trunks, t-shirts' }
  ];

  const BUDGET_TIERS = {
    phone: [
      { id: 'budget', label: 'Budget Hero', range: 'Under ₹20,000', budget: 20000, desc: 'Maximum value for daily tasks' },
      { id: 'mid', label: 'Mid-Range Power', range: '₹20,000 - ₹50,000', budget: 45000, desc: 'Sweet spot for gaming & camera' },
      { id: 'flagship', label: 'Flagship Ultimate', range: '₹50,000 - ₹1,00,000+', budget: 85000, desc: 'No-compromise pro tier' }
    ],
    protein: [
      { id: 'budget', label: 'Budget Starter', range: 'Under ₹1,200', budget: 1200, desc: 'As-It-Is / Raw Whey' },
      { id: 'mid', label: 'Performance Choice', range: '₹1,200 - ₹2,500', budget: 2200, desc: 'MuscleBlaze Biozyme / Whey Blend' },
      { id: 'flagship', label: 'Gold Standard Isolate', range: '₹2,500 - ₹4,500+', budget: 3500, desc: 'Optimum Nutrition / 100% Isolate' }
    ],
    watch: [
      { id: 'budget', label: 'Daily Essential', range: 'Under ₹2,500', budget: 2500, desc: 'Casio Digital / Fastrack' },
      { id: 'mid', label: 'Office & Classic', range: '₹2,500 - ₹6,000', budget: 4500, desc: 'Titan Neo / Chronograph Metal' },
      { id: 'flagship', label: 'Luxury & Sapphire', range: '₹6,000 - ₹15,000+', budget: 9500, desc: 'Titan Edge / Fossil / G-Shock' }
    ],
    apparel: [
      { id: 'budget', label: 'Budget Value Pack', range: 'Under ₹500', budget: 500, desc: 'Cotton trunks & basic innerwear' },
      { id: 'mid', label: 'Super Combed Comfort', range: '₹500 - ₹1,200', budget: 999, desc: 'Jockey / Van Heusen MicroModal' },
      { id: 'flagship', label: 'Luxury Modern Stretch', range: '₹1,200 - ₹2,500+', budget: 1800, desc: 'Calvin Klein / Tommy Hilfiger' }
    ]
  };

  const FEATURE_OPTIONS = {
    phone: [
      { id: 'battery', label: '⚡ 7,000mAh Monster Battery', sub: '2-day endurance, fast charging' },
      { id: 'camera', label: '📸 200MP Pro Camera', sub: 'OIS Nightography, 4K recording' },
      { id: 'gaming', label: '🎮 144Hz Gaming & Speed', sub: 'Snapdragon / Dimensity chipset' },
      { id: 'display', label: '✨ 1.5K AMOLED Clean Display', sub: 'Slim bezel, lightweight build' }
    ],
    protein: [
      { id: 'purity', label: '🔬 100% Whey Isolate Purity', sub: 'Labdoor certified, 27g+ protein/scoop' },
      { id: 'digest', label: '🍃 Enhanced Enzyme Digestibility', sub: 'Zero bloating, fast absorbing' },
      { id: 'taste', label: '🍫 Rich Taste & Mixability', sub: 'Double Rich Chocolate, dissolves instantly' },
      { id: 'speed', label: '⚡ 10-Min Quick Commerce', sub: 'Blinkit / Zepto express delivery' }
    ],
    watch: [
      { id: 'water', label: '🌊 50M Water Resistance', sub: 'Rain & swim safe, mineral glass' },
      { id: 'strap', label: '⛓️ Stainless Steel Metal Strap', sub: 'Office wear, durable folding clasp' },
      { id: 'movement', label: '⏱️ Multi-Dial Chronograph', sub: 'Precision quartz movement' },
      { id: 'vintage', label: '📻 Vintage Retro Style', sub: 'Casio classic gunmetal series' }
    ],
    apparel: [
      { id: 'soft', label: '☁️ 100% Super-Combed Cotton', sub: 'Ultra-breathable anti-bacterial fabric' },
      { id: 'elastic', label: '🩲 No-Roll Waistband Elastic', sub: 'Snug fit, leaves no skin marks' },
      { id: 'antichaf', label: '🏃 Anti-Chafing MicroModal', sub: 'All-day sports & active wear' },
      { id: 'pack', label: '📦 Multi-Pack Savings', sub: 'Pack of 2 or 3 best value' }
    ]
  };

  const handleFinish = () => {
    const selectedTiers = BUDGET_TIERS[category] || BUDGET_TIERS.phone;
    const tierObj = selectedTiers.find(t => t.id === budgetTier) || selectedTiers[1];
    const featObj = (FEATURE_OPTIONS[category] || FEATURE_OPTIONS.phone).find(f => f.id === featureFocus);

    let generatedQuery = '';
    if (category === 'phone') {
      generatedQuery = `Smartphone ${tierObj.desc} with ${featObj?.label || 'great battery'} under ₹${tierObj.budget}`;
    } else if (category === 'protein') {
      generatedQuery = `Whey Protein Powder ${tierObj.desc} with ${featObj?.label || 'high protein'} under ₹${tierObj.budget}`;
    } else if (category === 'watch') {
      generatedQuery = `Titan watch ${tierObj.desc} with ${featObj?.label || 'metal strap'} under ₹${tierObj.budget}`;
    } else {
      generatedQuery = `Underwear ${tierObj.desc} with ${featObj?.label || 'cotton softness'} under ₹${tierObj.budget}`;
    }

    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
    onComplete(generatedQuery, tierObj.budget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/30">
              🧙
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Interactive Preference Questionnaire</h2>
                <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                  Step {step} of 3
                </span>
              </div>
              <p className="text-xs text-slate-400">Answer 3 quick questions for instant 100% tailored decision recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">

          {/* STEP 1: Category & Budget Tier */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>1. What are you shopping for?</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {CATEGORY_OPTIONS.map(c => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCategory(c.id)}
                      className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                        category === c.id 
                          ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <div className="text-xs font-bold">{c.label}</div>
                        <div className="text-[10px] text-slate-500">{c.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Select your budget bracket:</span>
                </label>
                <div className="space-y-2">
                  {(BUDGET_TIERS[category] || BUDGET_TIERS.phone).map(tier => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setBudgetTier(tier.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                        budgetTier === tier.id 
                          ? 'bg-emerald-500/15 border-emerald-500/50 text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-extrabold flex items-center gap-2">
                          <span>{tier.label}</span>
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                            {tier.range}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{tier.desc}</div>
                      </div>
                      {budgetTier === tier.id && <Check className="w-4 h-4 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Feature Priority */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" />
                <span>What feature matters most to you?</span>
              </label>
              <div className="space-y-2.5">
                {(FEATURE_OPTIONS[category] || FEATURE_OPTIONS.phone).map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFeatureFocus(f.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      featureFocus === f.id 
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-extrabold">{f.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{f.sub}</div>
                    </div>
                    {featureFocus === f.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Delivery Speed & Brand Trust */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Preferred Shopping Priority:</span>
              </label>
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => setBrandPref('lowest')}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    brandPref === 'lowest' 
                      ? 'bg-emerald-500/15 border-emerald-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold flex items-center gap-1.5">
                      <span>🏷️ Lowest Price Across All 6 Stores</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">RECOMMENDED</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Amazon / Flipkart / Meesho absolute cheapest deal</div>
                  </div>
                  {brandPref === 'lowest' && <Check className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setBrandPref('quick')}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    brandPref === 'quick' 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold">⚡ 10–15 Min Quick Commerce Delivery</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Prioritize Blinkit & Zepto stock for instant arrival</div>
                  </div>
                  {brandPref === 'quick' && <Check className="w-4 h-4 text-indigo-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setBrandPref('official')}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                    brandPref === 'official' 
                      ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-extrabold">🛡️ 100% Brand Direct Warranty</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Prioritize official brand flagships (Apple, Titan, ON, Samsung)</div>
                  </div>
                  {brandPref === 'official' && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(s => s - 1)}
              className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-400 hover:text-white transition"
            >
              ← Back
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              className="text-xs font-bold px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="text-xs font-bold px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg shadow-emerald-600/25 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate Ranked Recommendations</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
