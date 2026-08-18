import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Minus, Bell, Check, Sparkles, AlertCircle, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PriceHistoryGraph({ priceHistory, currentPrice, productTitle }) {
  const [alertSet, setAlertSet] = useState(false);
  const [alertTargetPrice, setAlertTargetPrice] = useState(Math.round(currentPrice * 0.95));

  if (!priceHistory || !priceHistory.historyPoints || priceHistory.historyPoints.length === 0) {
    return null;
  }

  const points = priceHistory.historyPoints;
  const lowest = priceHistory.lowest30Days || Math.min(...points.map(p => p.price));
  const highest = priceHistory.highest30Days || Math.max(...points.map(p => p.price));
  const avg = priceHistory.averagePrice || Math.round((lowest + highest) / 2);

  // SVG Chart Calculations
  const minP = Math.min(lowest, ...points.map(p => p.price)) * 0.96;
  const maxP = Math.max(highest, ...points.map(p => p.price)) * 1.04;
  const range = maxP - minP || 1;

  const width = 360;
  const height = 90;
  const padX = 25;
  const padY = 15;

  const getX = (idx) => padX + (idx / (points.length - 1)) * (width - padX * 2);
  const getY = (price) => height - padY - ((price - minP) / range) * (height - padY * 2);

  const polylinePoints = points.map((p, i) => `${getX(i)},${getY(p.price)}`).join(' ');
  const areaPoints = `${getX(0)},${height} ${polylinePoints} ${getX(points.length - 1)},${height}`;

  const isAtLowest = currentPrice <= lowest * 1.03;
  const priceDiffFromAvg = Math.round(((currentPrice - avg) / avg) * 100);

  const handleSetAlert = () => {
    setAlertSet(true);
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
  };

  return (
    <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3.5">
      
      {/* Header: Title & Drop Prediction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <BarChart2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <span>Price Tracker & Analytics</span>
              <span className="text-[9px] font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded font-mono">BuyHatke Model</span>
            </h4>
          </div>
        </div>

        {/* Prediction Badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold">
          {isAtLowest ? (
            <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <TrendingDown className="w-3 h-3 text-emerald-400" />
              <span>🔥 Lowest 60-Day Price Record</span>
            </span>
          ) : (
            <span className="bg-amber-500/15 border border-amber-500/30 text-amber-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Minus className="w-3 h-3 text-amber-400" />
              <span>Avg: ₹{avg.toLocaleString('en-IN')} ({priceDiffFromAvg > 0 ? `+${priceDiffFromAvg}%` : `${priceDiffFromAvg}%`})</span>
            </span>
          )}
        </div>
      </div>

      {/* SVG Interactive Line Graph */}
      <div className="relative pt-1">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-24 overflow-visible">
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#priceGradient)" />

          {/* Price Line */}
          <polyline
            fill="none"
            stroke="#818cf8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={polylinePoints}
          />

          {/* Data Points */}
          {points.map((p, i) => {
            const cx = getX(i);
            const cy = getY(p.price);
            const isLast = i === points.length - 1;

            return (
              <g key={i} className="group cursor-pointer">
                <circle
                  cx={cx}
                  cy={cy}
                  r={isLast ? 4.5 : 3}
                  className={`${isLast ? 'fill-emerald-400 stroke-slate-950 stroke-2' : 'fill-indigo-400 stroke-slate-900 stroke-1'} hover:r-5 transition-all`}
                />
                {/* Price Label on hover / last */}
                <text
                  x={cx}
                  y={cy - 8}
                  textAnchor="middle"
                  className={`text-[9px] font-mono font-bold ${isLast ? 'fill-emerald-300' : 'fill-slate-400'} select-none`}
                >
                  ₹{p.price >= 1000 ? `${(p.price / 1000).toFixed(1)}k` : p.price}
                </text>
                {/* Date Label on bottom */}
                <text
                  x={cx}
                  y={height - 2}
                  textAnchor="middle"
                  className="text-[8px] font-sans fill-slate-500 select-none"
                >
                  {p.date}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* BuyHatke Price Insight Box & Alert Button */}
      <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-xs">
        <div className="space-y-0.5">
          <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>BuyHatke Intelligence:</span>
          </div>
          <p className="text-[11px] text-slate-200 font-medium">
            {priceHistory.priceDropPrediction || (
              isAtLowest 
                ? "Price is at the lowest recorded range. Excellent time to buy." 
                : `Historically lowest was ₹${lowest.toLocaleString('en-IN')}. Set alert below if not urgent.`
            )}
          </p>
        </div>

        {/* Set Price Drop Alert Button */}
        <div className="shrink-0 w-full sm:w-auto">
          {alertSet ? (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Alert Set for ₹{alertTargetPrice.toLocaleString('en-IN')} ✓</span>
            </div>
          ) : (
            <button
              onClick={handleSetAlert}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 text-[11px] font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-3 py-1.5 rounded-xl transition"
            >
              <Bell className="w-3 h-3 text-amber-400" />
              <span>Alert on Drop</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
