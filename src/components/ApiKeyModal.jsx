import React, { useState, useEffect } from 'react';
import { Key, X, Eye, EyeOff, Check, ShieldCheck, ExternalLink, Sparkles, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [serperKey, setSerperKey] = useState('');
  const [showGemini, setShowGemini] = useState(false);
  const [showSerper, setShowSerper] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setGeminiKey(localStorage.getItem('DECIDE_GEMINI_KEY') || import.meta.env.VITE_GEMINI_API_KEY || '');
      setSerperKey(localStorage.getItem('DECIDE_SERPER_KEY') || import.meta.env.VITE_SERPER_API_KEY || '');
      setSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('DECIDE_GEMINI_KEY', geminiKey.trim());
    localStorage.setItem('DECIDE_SERPER_KEY', serperKey.trim());
    setSaved(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem('DECIDE_GEMINI_KEY');
    localStorage.removeItem('DECIDE_SERPER_KEY');
    setGeminiKey('');
    setSerperKey('');
    setSaved(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Live API Key Settings</h2>
              <p className="text-xs text-slate-400">Integrate real-time web search & Gemini AI verdicts</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Gemini Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Google Gemini API Key</span>
              </label>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input
                type={showGemini ? 'text' : 'password'}
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 pr-10 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowGemini(!showGemini)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showGemini ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Powers natural language intent extraction and transparent purchase verdicts.
            </p>
          </div>

          {/* Serper Key */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-slate-200 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Serper.dev API Key (Google Shopping)</span>
              </label>
              <a 
                href="https://serper.dev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
              >
                <span>Get Free Key</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <input
                type={showSerper ? 'text' : 'password'}
                value={serperKey}
                onChange={(e) => setSerperKey(e.target.value)}
                placeholder="Enter your Serper.dev API key..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-3.5 py-2.5 pr-10 text-xs font-mono text-slate-100 placeholder-slate-600 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowSerper(!showSerper)}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
              >
                {showSerper ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Scans live product prices across Amazon, Flipkart, Croma & more in India.
            </p>
          </div>

          {/* Security notice */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 flex items-start gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>Keys are stored locally in your browser (LocalStorage). They are never sent to any third-party server.</span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="text-xs text-slate-500 hover:text-rose-400 transition"
          >
            Clear Stored Keys
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-xs font-bold px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/25 transition flex items-center gap-1.5"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Key className="w-3.5 h-3.5" />
                  <span>Save & Activate</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
