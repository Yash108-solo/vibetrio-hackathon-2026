import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Zap, Terminal, BarChart3, 
  Download, MessageSquare, Award, ArrowRight, Layers,
  Users, Activity, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateAIResponse } from './services/gemini';
import AIChatDrawer from './components/AIChatDrawer';
import StatsCard from './components/StatsCard';
import { exportElementToPDF } from './utils/pdfExport';

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handleTestAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setAiOutput('');
    const res = await generateAIResponse(
      prompt,
      "You are the AI engine for Team VibeTrio. Provide punchy, innovative, technically sound insights."
    );
    setAiOutput(res);
    setLoading(false);
  };

  return (
    <div id="main-dashboard" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased">
      
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white font-bold shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                VibeTrio <span className="text-indigo-400 font-mono text-sm">v2.0</span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">IEEE MHSSCE Hackathon</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportElementToPDF('main-dashboard', 'VibeTrio_Hackathon_Overview.pdf')}
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 rounded-xl transition"
            >
              <Download className="w-4 h-4 text-slate-400" />
              <span>Export PDF Report</span>
            </button>

            <button
              onClick={() => setIsAIChatOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-2 rounded-xl shadow-lg shadow-indigo-600/30 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Assistant</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-950 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational • Hackathon Mode
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to code, innovate, and <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">dominate</span>.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Plug-and-play architecture with high-speed GenAI integration, interactive KPI analytics, and instant data persistence.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button 
                onClick={triggerConfetti}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition"
              >
                <Award className="w-4 h-4" />
                <span>Test Micro-Interactions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="System Throughput" 
            value="99.8%" 
            change="+4.2%" 
            isPositive={true} 
            icon={Activity} 
            color="emerald" 
          />
          <StatsCard 
            title="AI Response Time" 
            value="0.42s" 
            change="⚡ Ultra-Fast" 
            isPositive={true} 
            icon={Zap} 
            color="indigo" 
          />
          <StatsCard 
            title="Active Modules" 
            value="12 / 12" 
            change="Ready" 
            isPositive={true} 
            icon={Layers} 
            color="blue" 
          />
          <StatsCard 
            title="Team Readiness" 
            value="100%" 
            change="Rank #1" 
            isPositive={true} 
            icon={Award} 
            color="amber" 
          />
        </div>

        {/* AI Testing Interactive Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-200 font-semibold text-sm">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Direct AI Engine Interface</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
              gemini-1.5-flash
            </span>
          </div>

          <form onSubmit={handleTestAI} className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask anything (e.g. 'Generate 3 USP features for smart energy conservation')..."
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition disabled:opacity-50 flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-indigo-600/30"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{loading ? "Processing..." : "Generate Insights"}</span>
            </button>
          </form>

          {aiOutput && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
              {aiOutput}
            </div>
          )}
        </div>

      </main>

      {/* Embedded Slide-over AI Chat Assistant */}
      <AIChatDrawer 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
        systemContext="Team VibeTrio Hackathon prototype"
      />
    </div>
  );
}
