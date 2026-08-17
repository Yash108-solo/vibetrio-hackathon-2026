import React, { useState } from 'react';
import { Sparkles, Code2, Rocket, CheckCircle2, ShieldCheck, Zap, Terminal } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAIResponse } from './services/gemini';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleTestAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setAiOutput('');
    const res = await generateAIResponse(prompt, "You are the AI co-pilot for Team VibeTrio in VibeCode Hackathon 2.0. Give concise, impactful answers.");
    setAiOutput(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-8">
        
        {/* Header Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            VibeTrio Ready • Hackathon 2.0
          </div>
          <button 
            onClick={triggerConfetti}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
          >
            🎉 Celebrate Setup
          </button>
        </div>

        {/* Title Section */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
            Team VibeTrio Boilerplate
          </h1>
          <p className="text-slate-400 text-base">
            Pre-configured environment with React, Tailwind CSS, Lucide Icons, and Gemini AI SDK. Ready for the 9:30 AM problem statement drop!
          </p>
        </div>

        {/* Status Checklist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-slate-200">GitHub Linked</h3>
              <p className="text-xs text-slate-400">Collaborator repo configured</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-slate-200">Vite + Tailwind</h3>
              <p className="text-xs text-slate-400">High performance stack</p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-sm text-slate-200">Gemini AI Ready</h3>
              <p className="text-xs text-slate-400">SDK configured</p>
            </div>
          </div>
        </div>

        {/* Gemini AI Live Test Box */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <Terminal className="w-5 h-5 text-indigo-400" />
            <span>Test Gemini AI Integration</span>
          </div>

          <form onSubmit={handleTestAI} className="flex gap-2">
            <input 
              type="text" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything (e.g., 'Suggest 3 unique ideas for smart campus management')..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{loading ? "Thinking..." : "Generate"}</span>
            </button>
          </form>

          {aiOutput && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {aiOutput}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500">
          VibeCode Hackathon 2.0 • MHSSCE • Powered by VibeTrio
        </div>

      </div>
    </div>
  );
}
