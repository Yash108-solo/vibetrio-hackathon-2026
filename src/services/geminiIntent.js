import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Robust, bulletproof budget extractor
 * Correctly parses 50000, 50,000, 50k, 70k, 1.5L, 25000 rupees without regex truncating
 */
export function extractBudgetNumber(query, category) {
  const q = query.toLowerCase();

  // 1. Check for "k" notation: e.g. "50k", "70k", "25.5k", "8 k"
  const kMatch = q.match(/\b(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  // 2. Check for "lakh" or "lac": e.g. "1.5 lakh", "1 lakh"
  const lakhMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)\b/i);
  if (lakhMatch) {
    return Math.round(parseFloat(lakhMatch[1]) * 100000);
  }

  // 3. Check for exact full numbers: e.g. "50000", "50,000", "70000", "25000", "8990"
  const fullNumbers = q.match(/\b\d{1,3}(?:,\d{3})+\b|\b\d{4,7}\b/g);
  if (fullNumbers && fullNumbers.length > 0) {
    const raw = fullNumbers[0].replace(/,/g, '');
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= 1000) {
      return val;
    }
  }

  // 4. Check for any digit following budget keywords
  const keywordMatch = q.match(/(?:under|below|budget|max|upto|around|within|price|cost|rs\.?|inr|₹)\s*(\d[\d,]*)/i);
  if (keywordMatch && keywordMatch[1]) {
    const val = parseInt(keywordMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(val) && val > 0) {
      return val < 500 ? val * 1000 : val;
    }
  }

  // 5. Default category budgets if unspecified
  if (category === 'phone') return 25000;
  if (category === 'headphones') return 10000;
  return 70000;
}

/**
 * Deterministic fallback mission extractor
 */
function getFallbackMission(query) {
  const q = query.toLowerCase();
  
  // 1. Detect Category
  let category = 'laptop';
  if (q.includes('phone') || q.includes('mobile') || q.includes('smartphone')) {
    category = 'phone';
  } else if (q.includes('headphone') || q.includes('earphone') || q.includes('audio') || q.includes('earbuds') || q.includes('anc')) {
    category = 'headphones';
  }

  // 2. Extract Budget (Bulletproof)
  const budget_max = extractBudgetNumber(query, category);

  // 3. Category-specific Priorities
  let priorities = [];
  if (category === 'laptop') {
    const batteryHigh = q.includes('battery') || q.includes('backup');
    const gamingHigh = q.includes('game') || q.includes('gaming') || q.includes('gpu');
    const portHigh = q.includes('portab') || q.includes('travel') || q.includes('light') || q.includes('weight');
    const codingHigh = q.includes('code') || q.includes('coding') || q.includes('perform') || q.includes('cs') || q.includes('program');

    priorities = [
      { attribute: 'battery', label: 'Battery Life', weight: batteryHigh ? 0.30 : 0.20, importance: batteryHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'performance', label: 'Performance & Coding', weight: codingHigh ? 0.30 : 0.25, importance: 'HIGH' },
      { attribute: 'portability', label: 'Portability & Weight', weight: portHigh ? 0.25 : 0.20, importance: portHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'gaming', label: 'Gaming & GPU', weight: gamingHigh ? 0.20 : 0.15, importance: gamingHigh ? 'HIGH' : 'LOW' },
      { attribute: 'display', label: 'Display Quality', weight: 0.10, importance: 'LOW' }
    ];
  } else if (category === 'phone') {
    const batteryHigh = q.includes('battery') || q.includes('day');
    const cameraHigh = q.includes('camera') || q.includes('photo') || q.includes('video');
    const gamingHigh = q.includes('game') || q.includes('gaming');

    priorities = [
      { attribute: 'battery', label: 'Battery & Endurance', weight: batteryHigh ? 0.35 : 0.25, importance: 'HIGH' },
      { attribute: 'camera', label: 'Camera Quality', weight: cameraHigh ? 0.30 : 0.20, importance: cameraHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'performance', label: 'Speed & Multitasking', weight: 0.20, importance: 'HIGH' },
      { attribute: 'display', label: 'Display & Refresh Rate', weight: 0.15, importance: 'MEDIUM' },
      { attribute: 'gaming', label: 'Gaming Capability', weight: gamingHigh ? 0.20 : 0.10, importance: 'LOW' }
    ];
  } else { // headphones
    const ancHigh = q.includes('noise') || q.includes('anc') || q.includes('cancel');
    const batteryHigh = q.includes('battery') || q.includes('hours') || q.includes('play');
    const comfortHigh = q.includes('comfort') || q.includes('travel') || q.includes('study');

    priorities = [
      { attribute: 'anc', label: 'Active Noise Cancelling', weight: ancHigh ? 0.35 : 0.25, importance: 'HIGH' },
      { attribute: 'sound', label: 'Sound Quality & Bass', weight: 0.25, importance: 'HIGH' },
      { attribute: 'battery', label: 'Battery Playback', weight: batteryHigh ? 0.20 : 0.15, importance: 'MEDIUM' },
      { attribute: 'comfort', label: 'Fit & Comfort', weight: comfortHigh ? 0.20 : 0.15, importance: comfortHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'portability', label: 'Portability & Foldability', weight: 0.10, importance: 'LOW' }
    ];
  }

  // Normalize weights so sum is 1.0
  const sumWeights = priorities.reduce((acc, p) => acc + p.weight, 0);
  priorities = priorities.map(p => ({ ...p, weight: Number((p.weight / sumWeights).toFixed(2)) }));

  return {
    query,
    category,
    budget_max,
    priorities,
    summary: `Decision model for ${category} with strict cap of ₹${budget_max.toLocaleString('en-IN')}`
  };
}

/**
 * GEMINI CALL #1: Structured Intent Extraction
 */
export async function extractShoppingMission(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    throw new Error("Query cannot be empty");
  }

  if (!apiKey || !genAI) {
    const fallback = getFallbackMission(userQuery);
    console.log("🎯 Extracted Mission JSON (Deterministic Engine):", fallback);
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
      systemInstruction: `You are the Intent Extraction Engine for DECIDE.
Analyze the user's natural language shopping need and output ONLY a valid JSON object matching this schema:

{
  "category": "laptop" | "phone" | "headphones",
  "budget_max": number (CRITICAL: Exact integer in INR. e.g. "50000 rupees" -> 50000, "70k" -> 70000, "25,000" -> 25000, "8990" -> 8990. Do NOT add extra zeros),
  "priorities": [
    {
      "attribute": "battery" | "performance" | "portability" | "gaming" | "display" | "camera" | "anc" | "sound" | "comfort",
      "label": "Human Readable Label",
      "weight": number (between 0.05 and 0.50, all weights MUST sum to exactly 1.0),
      "importance": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "summary": "Concise 1-line statement of user's core trade-off priorities"
}`
    });

    const result = await model.generateContent(userQuery);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    // Double-check budget parsing with regex sanitizer in case Gemini hallucinated a multiplier
    const sanitizedBudget = extractBudgetNumber(userQuery, parsed.category || 'laptop');
    parsed.budget_max = sanitizedBudget;

    // Ensure weights sum to 1.0
    const totalWeight = parsed.priorities.reduce((sum, p) => sum + (Number(p.weight) || 0.1), 0);
    parsed.priorities = parsed.priorities.map(p => ({
      ...p,
      weight: Number(((Number(p.weight) || 0.1) / totalWeight).toFixed(2))
    }));

    parsed.query = userQuery;
    console.log("🎯 Gemini Call #1 - Extracted Mission JSON:", parsed);
    return parsed;

  } catch (error) {
    console.warn("Gemini intent extraction failed, falling back to deterministic parser:", error);
    const fallback = getFallbackMission(userQuery);
    console.log("🎯 Extracted Mission JSON (Fallback):", fallback);
    return fallback;
  }
}
