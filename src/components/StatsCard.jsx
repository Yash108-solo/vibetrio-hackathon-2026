import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, change, isPositive = true, icon: Icon, color = 'indigo' }) {
  const colorMap = {
    indigo: 'from-indigo-500/20 text-indigo-400 border-indigo-500/30',
    emerald: 'from-emerald-500/20 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 text-amber-400 border-amber-500/30',
    blue: 'from-blue-500/20 text-blue-400 border-blue-500/30',
    rose: 'from-rose-500/20 text-rose-400 border-rose-500/30',
  };

  return (
    <div className="relative overflow-hidden bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition duration-300 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-xl bg-gradient-to-br ${colorMap[color] || colorMap.indigo} border`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{value}</h2>
        {change && (
          <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
