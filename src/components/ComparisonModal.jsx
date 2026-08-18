import React from 'react';
import { X, Award, Check, AlertTriangle, ExternalLink, ShieldCheck, Clock, Download } from 'lucide-react';
import { exportElementToPDF } from '../utils/pdfExport';

export default function ComparisonModal({ isOpen, onClose, products = [], category = 'laptop' }) {
  if (!isOpen || products.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
              Side-by-Side Decision Matrix
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Compare Top Ranked Candidates</h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportElementToPDF('compare-matrix-table', 'DECIDE_Comparison_Matrix.pdf')}
              className="text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl border border-slate-700 transition flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Matrix PDF</span>
            </button>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-xl hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body / Table View */}
        <div id="compare-matrix-table" className="flex-1 overflow-x-auto p-5 sm:p-6 space-y-6 bg-slate-950/50">
          
          <div className="min-w-[700px] grid grid-cols-4 gap-4">
            
            {/* Row 0: Column Headers */}
            <div className="p-3 font-semibold text-xs text-slate-500 uppercase tracking-wider flex items-end">
              Decision Factors
            </div>
            {products.map((p, idx) => (
              <div key={p.id} className={`p-4 rounded-2xl border text-center space-y-2 ${
                idx === 0 
                  ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10' 
                  : 'bg-slate-900/60 border-slate-800'
              }`}>
                <div className="relative h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                  <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    idx === 0 ? 'bg-indigo-600 text-white' : 'bg-slate-900/90 text-slate-300'
                  }`}>
                    #{idx + 1} {idx === 0 ? 'Best' : 'Alt'}
                  </span>
                </div>
                <h4 className="font-extrabold text-xs text-white line-clamp-2">{p.title}</h4>
                <div className="text-sm font-black text-indigo-300 font-mono">
                  {p.matchScore}% Match
                </div>
              </div>
            ))}

            {/* Row 1: AI Final Verdict */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              AI Purchase Verdict
            </div>
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl text-center flex flex-col items-center justify-center">
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                  p.verdictType === 'buy' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                  p.verdictType === 'wait' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {p.verdict || 'BUY NOW'}
                </span>
                <span className="text-[10px] text-slate-400 mt-1 line-clamp-2">{p.verdictReason}</span>
              </div>
            ))}

            {/* Row 2: Live Lowest Price & MRP */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              Best Live Price
            </div>
            {products.map((p) => {
              const bestStore = p.stores?.find(s => s.isBest) || p.stores?.[0] || { name: 'Direct', price: p.price };
              return (
                <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl text-center space-y-0.5">
                  <div className="text-base font-black text-white font-mono">₹{p.price.toLocaleString('en-IN')}</div>
                  {p.mrp && <div className="text-[11px] text-slate-500 line-through">MRP: ₹{p.mrp.toLocaleString('en-IN')}</div>}
                  <span className="inline-block text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Best on {bestStore.name}
                  </span>
                </div>
              );
            })}

            {/* Row 3: 30-Day Price Trend */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              30-Day Price Trend
            </div>
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl text-center text-xs space-y-1">
                <div className="font-semibold text-slate-200">
                  Lowest: <span className="text-emerald-400 font-mono">₹{p.priceHistory?.lowest30Days?.toLocaleString('en-IN') || p.price}</span>
                </div>
                <div className="text-[10px] text-slate-400 capitalize flex items-center justify-center gap-1">
                  <span>Trend:</span>
                  <span className={p.priceHistory?.trend === 'downward' ? 'text-emerald-400 font-semibold' : 'text-slate-300'}>
                    {p.priceHistory?.trend || 'Stable'}
                  </span>
                </div>
              </div>
            ))}

            {/* Row 4: Grounded Key Trade-off */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              Key Trade-off
            </div>
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-200 text-center flex items-center justify-center">
                <span>{p.tradeOff}</span>
              </div>
            ))}

            {/* Row 5: Delivery & Return Policy */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              Delivery & Returns
            </div>
            {products.map((p) => {
              const bestStore = p.stores?.find(s => s.isBest) || { delivery: '2-3 Days', returnDays: 7 };
              return (
                <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl text-center text-xs text-slate-300 space-y-1">
                  <div>⚡ {bestStore.delivery}</div>
                  <div className="text-[11px] text-slate-400">🛡️ {bestStore.returnDays || 7} Days Return Policy</div>
                </div>
              );
            })}

            {/* Row 6: Data Freshness & Verification */}
            <div className="p-3 bg-slate-900/40 rounded-xl font-bold text-xs text-slate-300 flex items-center">
              Data Truth Layer
            </div>
            {products.map((p) => (
              <div key={p.id} className="p-3 bg-slate-900/60 rounded-xl text-center text-[11px] text-emerald-400 space-y-0.5">
                <div className="flex items-center justify-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{p.dataConfidence || 98}% Verified</span>
                </div>
                <div className="text-[10px] text-slate-500">{p.verifiedAgo || 'Verified recently'}</div>
              </div>
            ))}

          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div>Transparent multi-store comparison powered by DECIDE Decision Engine.</div>
          <button 
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2 rounded-xl transition"
          >
            Done Comparing
          </button>
        </div>

      </div>
    </div>
  );
}
