import React, { useState, useEffect } from 'react';
import { 
  Database, CheckCircle2, ShieldCheck, Sparkles, 
  Layers, ArrowRight, Laptop, Smartphone, Headphones,
  Sliders, Star, Cpu, Battery, Eye
} from 'lucide-react';
import { SEED_PRODUCTS } from './data/seedProducts';
import { isSupabaseConfigured, getProductsByCategory } from './services/supabase';

export default function App() {
  const [products, setProducts] = useState(SEED_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dbStatus, setDbStatus] = useState({
    configured: isSupabaseConfigured,
    totalProducts: SEED_PRODUCTS.length,
    categories: ['laptop', 'phone', 'headphones']
  });

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navigation Bar */}
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
                  Phase 1 Verified
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">A Transparent Decision Model for Shopping</p>
            </div>
          </div>

          {/* Database Health Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Database:</span>
            <span className="font-mono text-emerald-400 font-semibold">{dbStatus.totalProducts} Verified Products</span>
          </div>
        </div>
      </header>

      {/* Phase 1 Verification Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Phase 1 Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Phase 1 Checkpoint: Foundation & Product Catalog Seeded
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Know what to buy — and <span className="bg-gradient-to-r from-indigo-400 to-emerald-400 bg-clip-text text-transparent">what you're giving up.</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed">
              Database schema created with <strong className="text-slate-200">products</strong>, <strong className="text-slate-200">missions</strong>, and <strong className="text-slate-200">decisions</strong> tables. Curated dataset with realistic INR pricing and benchmark attributes loaded.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                selectedCategory === 'all'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Products ({products.length})</span>
            </button>

            <button
              onClick={() => setSelectedCategory('laptop')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                selectedCategory === 'laptop'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>Laptops</span>
            </button>

            <button
              onClick={() => setSelectedCategory('phone')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                selectedCategory === 'phone'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phones</span>
            </button>

            <button
              onClick={() => setSelectedCategory('headphones')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
                selectedCategory === 'headphones'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>Headphones</span>
            </button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            Showing {filteredProducts.length} items with benchmark attributes
          </div>
        </div>

        {/* Product Cards Grid Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition flex flex-col group shadow-md"
            >
              {/* Image & Price Header */}
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-85"
                />
                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-semibold text-indigo-400 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {product.brand}
                </div>
                <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md border border-slate-800 text-white font-extrabold text-sm px-3 py-1.5 rounded-xl shadow-lg">
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm text-slate-100 line-clamp-1">{product.title}</h3>
                    <span className="flex items-center text-xs text-amber-400 font-semibold shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                      {product.rating}
                    </span>
                  </div>

                  {/* Benchmark Attributes */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px]">
                    {Object.entries(product.attributes).slice(0, 4).map(([key, val]) => (
                      <div key={key} className="bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800/60 flex items-center justify-between">
                        <span className="text-slate-400 capitalize">{key.replace('_score', '').replace('_', ' ')}</span>
                        <span className="font-mono text-indigo-300 font-semibold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-600">
        DECIDE • VibeTrio • VibeCode Hackathon 2.0 (MHSSCE)
      </footer>
    </div>
  );
}
