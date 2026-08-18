import { supabase, isSupabaseConfigured } from './supabase';
import { SEED_PRODUCTS } from '../data/seedProducts';

/**
 * Seed all curated products into Supabase products table
 */
export async function seedSupabaseCatalog() {
  if (!isSupabaseConfigured || !supabase) {
    console.log("Supabase not configured. Using local dataset of", SEED_PRODUCTS.length, "products.");
    return { success: true, count: SEED_PRODUCTS.length, mode: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .upsert(SEED_PRODUCTS, { onConflict: 'id' });

    if (error) throw error;
    console.log("Successfully seeded", SEED_PRODUCTS.length, "products into Supabase!");
    return { success: true, count: SEED_PRODUCTS.length, mode: 'supabase' };
  } catch (err) {
    console.error("Supabase seeding error:", err);
    return { success: false, error: err.message, mode: 'fallback_local' };
  }
}
