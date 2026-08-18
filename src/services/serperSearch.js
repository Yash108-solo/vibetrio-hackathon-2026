/**
 * DECIDE - Serper API Integration
 * Real-time product search using Google Shopping via Serper.dev
 * Fallback: returns null → App uses seed catalog
 */

const SERPER_API_KEY = import.meta.env.VITE_SERPER_API_KEY;

/**
 * Search for real products via Serper Shopping API
 * @param {string} query - user's raw shopping query
 * @param {number} numResults - max results to fetch (default 20)
 * @returns {Array|null} - raw shopping results or null on failure
 */
export async function searchProducts(query, numResults = 20) {
  if (!SERPER_API_KEY) {
    console.warn('[Serper] No API key configured. Set VITE_SERPER_API_KEY in .env');
    return null;
  }

  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'X-API-KEY': SERPER_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        q: query,
        gl: 'in',   // India locale
        hl: 'en',
        num: numResults
      })
    });

    if (!response.ok) {
      throw new Error(`Serper API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[Serper] Found ${data.shopping?.length || 0} shopping results for: "${query}"`);
    return data.shopping || [];
  } catch (error) {
    console.error('[Serper] Search failed:', error.message);
    return null;
  }
}

/**
 * Build an optimized shopping search query from the mission intent
 * Combines category, top priorities, and budget into a Google Shopping-friendly query
 */
export function buildSearchQuery(mission, originalQuery) {
  if (!mission) return originalQuery;

  const parts = [];

  // Add category
  if (mission.category) {
    parts.push(`best ${mission.category}`);
  }

  // Add top 2 priority labels for relevance
  if (mission.priorities?.length) {
    const topPriorities = [...mission.priorities]
      .sort((a, b) => (b.weight || 0) - (a.weight || 0))
      .slice(0, 2)
      .map(p => p.label?.toLowerCase())
      .filter(Boolean);
    parts.push(...topPriorities);
  }

  // Add budget constraint
  if (mission.budget_max) {
    parts.push(`under ₹${mission.budget_max}`);
  }

  // India-specific
  parts.push('India 2025');

  const searchQuery = parts.join(' ');
  console.log(`[Serper] Built search query: "${searchQuery}"`);
  return searchQuery;
}
