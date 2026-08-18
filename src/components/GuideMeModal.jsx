import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, Check, Target, DollarSign, Award, Edit3, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GuideMeModal({ isOpen, onClose, onComplete }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Product / Category
  const [selectedCategory, setSelectedCategory] = useState('');
  const [customProduct, setCustomProduct] = useState('');

  // Step 2: Budget
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customBudget, setCustomBudget] = useState('');

  // Step 3: Priorities & Custom Specs
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [customRequirements, setCustomRequirements] = useState('');

  // Step 4: Store & Delivery Preference
  const [storePreference, setStorePreference] = useState('lowest');
  const [customStorePref, setCustomStorePref] = useState('');

  if (!isOpen) return null;

  const POPULAR_CATEGORIES = [
    { label: '📱 Smartphones', query: 'smartphone' },
    { label: '💻 Laptops', query: 'laptop' },
    { label: '💪 Whey Protein', query: 'whey protein powder' },
    { label: '⌚ Watches', query: 'watch' },
    { label: '🩲 Innerwear', query: 'underwear' },
    { label: '👟 Shoes & Sneakers', query: 'running shoes' },
    { label: '🎧 Headphones', query: 'headphones' },
    { label: '🧴 Skincare', query: 'sunscreen moisturizer' },
    { label: '🎮 Gaming Gear', query: 'gaming keyboard mouse' },
    { label: '⚡ Smart TV', query: '4k smart tv' }
  ];

  const BUDGET_PRESETS = [
    { label: 'Under ₹500', value: 500 },
    { label: 'Under ₹1,500', value: 1500 },
    { label: 'Under ₹3,500', value: 3500 },
    { label: 'Under ₹7,000', value: 7000 },
    { label: 'Under ₹15,000', value: 15000 },
    { label: 'Under ₹30,000', value: 30000 },
    { label: 'Under ₹60,000', value: 60000 },
    { label: '₹1,00,000+', value: 100000 }
  ];

  const FEATURE_PRIORITIES = [
    '⚡ Long Battery Life / Endurance',
    '🚀 High Performance / Speed',
    '🛡️ Build Quality & Durability',
    '🏷️ Maximum Value for Money',
    '📸 Camera / Aesthetic Design',
    '🔬 Certified Purity / Lab Tested',
    '☁️ Softness & Comfort',
    '⚡ 10-Min Fast Delivery (Blinkit/Zepto)'
  ];

  const togglePriority = (feat) => {
    if (selectedPriorities.includes(feat)) {
      setSelectedPriorities(selectedPriorities.filter(f => f !== feat));
    } else {
      setSelectedPriorities([...selectedPriorities, feat]);
    }
  };

  const handleFinish = () => {
    // 1. Determine Product Query
    const productQuery = customProduct.trim() || selectedCategory || 'best recommended product';

    // 2. Determine Budget
    let budgetNum = 2500;
    if (customBudget.trim()) {
      const parsed = parseInt(customBudget.replace(/[^\d]/g, ''), 10);
      if (parsed > 0) budgetNum = parsed;
    } else if (selectedBudget) {
      budgetNum = selectedBudget;
    }

    // 3. Compile User Custom Requirements & Preferences
    const extraReqs = [];
    if (selectedPriorities.length > 0) {
      extraReqs.push(selectedPriorities.join(', '));
    }
    if (customRequirements.trim()) {
      extraReqs.push(customRequirements.trim());
    }
    if (customStorePref.trim()) {
      extraReqs.push(`Preferred store: ${customStorePref.trim()}`);
    } else if (storePreference === 'quick') {
      extraReqs.push('10-15 min quick commerce Blinkit/Zepto delivery');
    } else if (storePreference === 'official') {
      extraReqs.push('Official brand store warranty');
    }

    let finalPrompt = `${productQuery} under ₹${budgetNum}`;
    if (extraReqs.length > 0) {
      finalPrompt += ` with ${extraReqs.join(', ')}`;
    }

    confetti({ particleCount: 80, spread: 90, origin: { y: 0.6 } });
    onComplete(finalPrompt, budgetNum);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-indigo-500/40 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 flex items-center justify-center text-white text-lg shadow-lg shadow-indigo-500/30">
              🧙
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-white">Interactive Preference Questionnaire</h2>
                <span className="text-[10px] font-mono uppercase bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">
                  Step {step} of 4
                </span>
              </div>
              <p className="text-xs text-slate-400">Ask questions with options or write your exact custom preferences</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">

          {/* STEP 1: What Product are you looking for? */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Question 1: What product do you want to find?</span>
                </label>
                <p className="text-[11px] text-slate-400">Select a popular category or type any specific product in the world.</p>
              </div>

              {/* Category Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {POPULAR_CATEGORIES.map((cat, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.query);
                      setCustomProduct('');
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                      selectedCategory === cat.query && !customProduct
                        ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {selectedCategory === cat.query && !customProduct && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                  </button>
                ))}
              </div>

              {/* Custom Write-In Option */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Other / Manually Write Custom Product:</span>
                </label>
                <input
                  type="text"
                  value={customProduct}
                  onChange={(e) => {
                    setCustomProduct(e.target.value);
                    setSelectedCategory('');
                  }}
                  placeholder="e.g. Mechanical keyboard with RGB, Sony Bravia 55 inch TV, Whey Isolate Chocolate..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>
          )}

          {/* STEP 2: What is your Budget Limit? */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Question 2: What is your maximum budget cap?</span>
                </label>
                <p className="text-[11px] text-slate-400">Pick a preset bracket or type your exact maximum budget in INR (₹).</p>
              </div>

              {/* Preset Budget Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {BUDGET_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedBudget(preset.value);
                      setCustomBudget('');
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold text-center transition ${
                      selectedBudget === preset.value && !customBudget
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Custom Write-In Budget */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Other / Enter Exact Custom Budget (₹):</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 font-mono font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={customBudget}
                    onChange={(e) => {
                      setCustomBudget(e.target.value);
                      setSelectedBudget(null);
                    }}
                    placeholder="e.g. 4500, 18500, 65000..."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-2xl pl-9 pr-4 py-3 text-xs font-mono text-slate-100 placeholder-slate-500 focus:outline-none transition"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Priorities & Custom Feature Requirements */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Question 3: What key features matter most?</span>
                </label>
                <p className="text-[11px] text-slate-400">Select any priorities that apply, and/or write your custom specifications below.</p>
              </div>

              {/* Feature Priority Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {FEATURE_PRIORITIES.map((feat, idx) => {
                  const isChecked = selectedPriorities.includes(feat);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => togglePriority(feat)}
                      className={`p-3 rounded-xl border text-xs font-semibold text-left transition flex items-center justify-between ${
                        isChecked 
                          ? 'bg-indigo-600/20 border-indigo-500 text-white' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{feat}</span>
                      {isChecked && <Check className="w-4 h-4 text-indigo-400" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Write-In Requirements */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Other / Manually Write Specific Preferences:</span>
                </label>
                <textarea
                  rows={2}
                  value={customRequirements}
                  onChange={(e) => setCustomRequirements(e.target.value)}
                  placeholder="e.g. Must have metal strap for office wear, minimum 16GB RAM, double rich chocolate flavor, anti-bacterial fabric..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Store & Delivery Preferences */}
          {step === 4 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Question 4: Where do you prefer to shop?</span>
                </label>
                <p className="text-[11px] text-slate-400">Choose your buying preference or write your custom store choice.</p>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => { setStorePreference('lowest'); setCustomStorePref(''); }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    storePreference === 'lowest' && !customStorePref
                      ? 'bg-emerald-500/15 border-emerald-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <span>🏷️ Lowest Price Across All 6 Marketplaces</span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">RECOMMENDED</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Amazon India, Flipkart, Meesho, Croma absolute best deal</div>
                  </div>
                  {storePreference === 'lowest' && !customStorePref && <Check className="w-4 h-4 text-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => { setStorePreference('quick'); setCustomStorePref(''); }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    storePreference === 'quick' && !customStorePref
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">⚡ 10–15 Min Quick Commerce Delivery</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Prioritize Blinkit & Zepto stock for instant arrival</div>
                  </div>
                  {storePreference === 'quick' && !customStorePref && <Check className="w-4 h-4 text-indigo-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => { setStorePreference('official'); setCustomStorePref(''); }}
                  className={`w-full p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                    storePreference === 'official' && !customStorePref
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold">🛡️ Official Brand Direct Warranty</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Apple Store, Titan Official, Optimum Nutrition Official</div>
                  </div>
                  {storePreference === 'official' && !customStorePref && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              </div>

              {/* Custom Store Preference Write-in */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <label className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Other / Custom Store Preference:</span>
                </label>
                <input
                  type="text"
                  value={customStorePref}
                  onChange={(e) => setCustomStorePref(e.target.value)}
                  placeholder="e.g. Only Amazon Prime, Tata CLiQ Luxury, Reliance Digital store pickup..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition"
                />
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Navigation */}
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

          {step < 4 ? (
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
              <span>Generate Tailored Results</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
