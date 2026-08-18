import { createClient } from '@supabase/supabase-js';
import { SEED_PRODUCTS } from '../data/seedProducts';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local persistent keys
const LOCAL_MISSIONS_KEY = 'decide_missions_history';
const LOCAL_DECISIONS_KEY = 'decide_saved_decisions';

/**
 * Fetch products by category with budget constraint
 * Reads from Supabase if connected, else falls back to curated database
 */
export async function getProductsByCategory(category = 'laptop') {
  const normCategory = category.toLowerCase().trim();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .ilike('category', `%${normCategory}%`);

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local dataset:", err);
    }
  }

  // Fallback / Instant local catalog
  return SEED_PRODUCTS.filter(p => 
    p.category.toLowerCase().includes(normCategory) || 
    normCategory.includes(p.category.toLowerCase())
  );
}

/**
 * Persist a user shopping mission (intent + extracted priorities)
 */
export async function saveMission(mission) {
  const newMission = {
    id: crypto.randomUUID ? crypto.randomUUID() : `m_${Date.now()}`,
    query: mission.query,
    category: mission.category,
    budget_max: mission.budget_max,
    priorities: mission.priorities,
    created_at: new Date().toISOString()
  };

  // 1. Save to Supabase
  if (supabase) {
    try {
      await supabase.from('missions').insert([newMission]);
    } catch (err) {
      console.warn("Supabase mission save error:", err);
    }
  }

  // 2. Always persist locally
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_MISSIONS_KEY) || '[]');
    localStorage.setItem(LOCAL_MISSIONS_KEY, JSON.stringify([newMission, ...existing.slice(0, 19)]));
  } catch (err) {
    console.error("Local storage error:", err);
  }

  return newMission;
}

/**
 * Persist a final user choice/decision with trade-offs
 */
export async function saveDecision(decision) {
  const newDecision = {
    id: crypto.randomUUID ? crypto.randomUUID() : `d_${Date.now()}`,
    mission_id: decision.mission_id,
    product_id: decision.product_id,
    product_title: decision.product_title,
    product_price: decision.product_price,
    product_thumbnail: decision.product_thumbnail,
    match_score: decision.match_score,
    key_reason: decision.key_reason,
    trade_off: decision.trade_off,
    saved: true,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      await supabase.from('decisions').insert([newDecision]);
    } catch (err) {
      console.warn("Supabase decision save error:", err);
    }
  }

  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_DECISIONS_KEY) || '[]');
    localStorage.setItem(LOCAL_DECISIONS_KEY, JSON.stringify([newDecision, ...existing.filter(d => d.product_id !== decision.product_id)]));
  } catch (err) {
    console.error("Local storage error:", err);
  }

  return newDecision;
}

/**
 * Retrieve saved decision history
 */
export async function getDecisionHistory() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('decisions')
        .select('*, products(*)')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn("Supabase history fetch error:", err);
    }
  }

  return JSON.parse(localStorage.getItem(LOCAL_DECISIONS_KEY) || '[]');
}
