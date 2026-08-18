/**
 * DECIDE - Gemini AI Product Verdict Engine
 * Takes raw shopping results from Serper + user mission,
 * returns enriched, structured product data with:
 *   - Multi-store pricing grouped by product
 *   - AI purchase verdicts (BUY NOW / WAIT / DON'T BUY)
 *   - Technical attribute estimates for scoring engine
 *   - Price history estimates
 *   - Data confidence ratings
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getGeminiApiKey } from './geminiIntent';

/**
 * Analyze raw shopping results with Gemini and return structured product data
 * @param {Array} shoppingResults - raw results from Serper Shopping API
 * @param {Object} mission - extracted shopping mission (category, budget, priorities)
 * @returns {Array|null} - enriched product array matching our card format, or null on failure
 */
export async function analyzeProducts(shoppingResults, mission) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    console.warn('[GeminiVerdict] No Gemini API key. Skipping AI analysis.');
    return null;
  }
  if (!shoppingResults || shoppingResults.length === 0) {
    console.warn('[GeminiVerdict] No shopping results to analyze.');
    return null;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.2,
      maxOutputTokens: 4096
    }
  });

  const categoryAttrs = getCategoryAttributeSchema(mission.category);

  // Build a clean subset of Serper results (remove noise)
  const cleanResults = shoppingResults.slice(0, 18).map(r => ({
    title: r.title,
    price: r.price,
    source: r.source,
    link: r.link,
    imageUrl: r.imageUrl || r.thumbnail,
    rating: r.rating,
    ratingCount: r.ratingCount,
    delivery: r.delivery
  }));

  const prompt = `You are a transparent AI shopping analyst for the DECIDE app. Analyze these REAL shopping results from Google Shopping India and return structured product data.

=== USER'S SHOPPING INTENT ===
Category: ${mission.category}
Budget: ₹${mission.budget_max}
Key Priorities: ${mission.priorities.map(p => `${p.label} (weight: ${Math.round((p.weight || 0.2) * 100)}%)`).join(', ')}

=== RAW SHOPPING RESULTS FROM GOOGLE ===
${JSON.stringify(cleanResults, null, 2)}

=== YOUR TASK ===
1. Identify the TOP 5 DISTINCT products (group the same product from different stores).
2. For each product, collect ALL store listings with their prices and links.
3. Provide an HONEST AI purchase verdict based on the price vs value:
   - "BUY NOW" → genuinely great value, competitive price
   - "WAIT FOR SALE" → decent product but currently overpriced or likely to drop
   - "DON'T BUY" → poor value, better alternatives exist at this price
4. Estimate realistic technical attributes (0-100 scale) based on known specifications.
5. Mark the cheapest store as "isBest": true.

=== REQUIRED JSON OUTPUT FORMAT ===
Return a JSON array. Each element must have this EXACT structure:
[
  {
    "id": 1001,
    "title": "<full product name with key specs like RAM, storage, processor>",
    "brand": "<brand name>",
    "category": "${mission.category}",
    "price": <LOWEST price as INTEGER, no currency symbols>,
    "mrp": <original/MRP price as INTEGER, estimate 15-30% higher if unknown>,
    "rating": <rating as FLOAT, e.g. 4.5>,
    "reviewsCount": <review count as INTEGER>,
    "thumbnail": "<imageUrl from results>",
    "stores": [
      {
        "name": "<store name, e.g. Amazon, Flipkart, Croma>",
        "price": <price as INTEGER>,
        "inStock": true,
        "delivery": "<delivery estimate string>",
        "returnDays": 7,
        "isBest": true,
        "link": "<full product URL>"
      }
    ],
    "priceHistory": {
      "lowest30Days": <estimated 30-day low, ~5-10% below current>,
      "highest30Days": <estimated 30-day high, ~10-20% above current>,
      "trend": "<downward|stable|upward>",
      "points": [<5 price points showing recent trend>]
    },
    "verdict": "<BUY NOW|WAIT FOR SALE|DON'T BUY>",
    "verdictType": "<buy|wait|avoid>",
    "verdictReason": "<1-2 sentence factual justification for the verdict>",
    "verifiedAgo": "Live data",
    "dataConfidence": <85-99 based on data completeness>,
    "attributes": {
      ${categoryAttrs}
    }
  }
]

=== CRITICAL RULES ===
- Return between 3 and 5 products (fewer if less than 3 distinct products found)
- ALL prices MUST be plain integers (68990, NOT "₹68,990" or "68,990.00")
- Extract prices from strings like "₹68,990" or "₹1,04,990" correctly
- Budget is ₹${mission.budget_max} — include products both within AND slightly above for honest comparison
- Do NOT recommend everything as "BUY NOW" — be genuinely analytical
- Every product MUST have at least 1 store with a link
- Increment id starting from 1001
- thumbnail must be a valid URL (use imageUrl from results)`;

  try {
    console.log('[GeminiVerdict] Sending analysis request to Gemini...');
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    let products = JSON.parse(text);

    // Validate and sanitize every product
    products = products.map((p, idx) => sanitizeProduct(p, idx));

    console.log(`[GeminiVerdict] Successfully analyzed ${products.length} products with verdicts.`);
    return products;
  } catch (error) {
    console.error('[GeminiVerdict] Analysis failed:', error.message);
    return null;
  }
}

/**
 * Sanitize a single product from Gemini output to ensure type safety
 */
function sanitizeProduct(p, idx) {
  const price = extractNumericPrice(p.price);
  const mrp = extractNumericPrice(p.mrp) || Math.round(price * 1.2);

  return {
    ...p,
    id: p.id || 1001 + idx,
    price,
    mrp,
    rating: Number(p.rating) || 4.0,
    reviewsCount: Number(p.reviewsCount) || 0,
    dataConfidence: Number(p.dataConfidence) || 90,
    thumbnail: p.thumbnail || p.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    stores: (p.stores || []).map(s => ({
      ...s,
      price: extractNumericPrice(s.price) || price,
      inStock: s.inStock !== false,
      isBest: s.isBest || false,
      returnDays: s.returnDays || 7,
      link: s.link || '#'
    })),
    priceHistory: p.priceHistory ? {
      lowest30Days: extractNumericPrice(p.priceHistory.lowest30Days) || Math.round(price * 0.92),
      highest30Days: extractNumericPrice(p.priceHistory.highest30Days) || Math.round(price * 1.12),
      trend: p.priceHistory.trend || 'stable',
      points: (p.priceHistory.points || []).map(v => extractNumericPrice(v) || price)
    } : {
      lowest30Days: Math.round(price * 0.92),
      highest30Days: Math.round(price * 1.12),
      trend: 'stable',
      points: [price * 1.1, price * 1.05, price, price * 0.98, price].map(Math.round)
    },
    verdict: p.verdict || 'BUY NOW',
    verdictType: p.verdictType || 'buy',
    verdictReason: p.verdictReason || 'Reasonable value for the price point.',
    verifiedAgo: 'Live data',
  };
}

/**
 * Extract a numeric price from various formats:
 * "₹68,990" → 68990, "1,04,990" → 104990, 68990 → 68990
 */
function extractNumericPrice(val) {
  if (typeof val === 'number') return Math.round(val);
  if (typeof val === 'string') {
    const cleaned = val.replace(/[₹$,\s]/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : Math.round(num);
  }
  return 0;
}

/**
 * Return category-specific attribute schema for the Gemini prompt
 */
function getCategoryAttributeSchema(category) {
  switch (category) {
    case 'laptop':
      return `"battery_hours": "<number 3-20, estimated battery life>",
      "weight_kg": "<number 0.9-3.5, weight in kg>",
      "performance_score": "<0-100 based on processor/RAM>",
      "gaming_score": "<0-100 based on GPU capability>",
      "portability_score": "<0-100, lighter+thinner=higher>",
      "display_score": "<0-100 based on resolution/panel type>",
      "build_quality": "<0-100>"`;
    case 'phone':
      return `"battery_hours": "<number 8-20>",
      "performance_score": "<0-100 based on chipset>",
      "camera_score": "<0-100 based on camera specs>",
      "display_score": "<0-100 based on display type/refresh>",
      "build_quality": "<0-100>",
      "gaming_score": "<0-100>"`;
    case 'headphones':
      return `"battery_hours": "<number 5-60>",
      "anc_score": "<0-100, 0 if no ANC>",
      "sound_quality": "<0-100>",
      "comfort_score": "<0-100>",
      "portability_score": "<0-100>"`;
    case 'clothing':
      return `"fabric_quality": "<0-100>",
      "comfort_score": "<0-100>",
      "durability_score": "<0-100>",
      "breathability_score": "<0-100>",
      "fit_score": "<0-100>"`;
    default:
      return `"quality_score": "<0-100>",
      "value_score": "<0-100>",
      "durability_score": "<0-100>",
      "performance_score": "<0-100>"`;
  }
}
