/**
 * DECIDE - Serper API Integration
 * Real-time product search using Google Shopping via Serper.dev
 */

export function getSerperApiKey() {
  return localStorage.getItem('DECIDE_SERPER_KEY') || import.meta.env.VITE_SERPER_API_KEY || '';
}

/**
 * Search for real products via Serper Shopping API
 * @param {string} query - search query
 * @param {number} numResults - max results to fetch (default 20)
 * @returns {Array|null} - raw shopping results or null on failure
 */
export async function searchProducts(query, numResults = 20) {
  const apiKey = getSerperApiKey();
  if (!apiKey) {
    console.warn('[Serper] No API key configured. Set in UI or VITE_SERPER_API_KEY in .env');
    return null;
  }

  try {
    const response = await fetch('https://google.serper.dev/shopping', {
      method: 'POST',
      headers: {
        'X-API-KEY': apiKey,
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
 * Build an accurate, clean Google Shopping search query from the mission intent
 * E.g., mission.searchTerm = "Titan watches", budget_max = 4500
 * Output: "Titan watches under ₹4500"
 */
export function buildSearchQuery(mission, originalQuery) {
  if (!mission) return originalQuery;

  const term = mission.searchTerm || originalQuery;
  const budget = mission.budget_max;

  let query = term.trim();

  // If budget exists and isn't already in query, append it
  if (budget && !query.toLowerCase().includes('under') && !query.toLowerCase().includes('₹')) {
    query = `${query} under ₹${budget}`;
  }

  console.log(`[Serper] Built accurate shopping query: "${query}"`);
  return query;
}
