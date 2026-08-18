import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Robust, bulletproof budget extractor
 */
export function extractBudgetNumber(query, category) {
  const q = query.toLowerCase();

  // 1. "k" notation: e.g. "50k", "1.5k", "800"
  const kMatch = q.match(/\b(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  // 2. "lakh" notation: e.g. "1.5 lakh", "1 lakh"
  const lakhMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)\b/i);
  if (lakhMatch) {
    return Math.round(parseFloat(lakhMatch[1]) * 100000);
  }

  // 3. Exact numbers: e.g. "50000", "999", "1299", "25000", "8990"
  const fullNumbers = q.match(/\b\d{1,3}(?:,\d{3})+\b|\b\d{3,7}\b/g);
  if (fullNumbers && fullNumbers.length > 0) {
    const raw = fullNumbers[0].replace(/,/g, '');
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= 100) {
      return val;
    }
  }

  // 4. Default category budgets if unspecified
  if (category === 'clothing' || category === 'fashion') return 1500;
  if (category === 'phone') return 25000;
  if (category === 'headphones') return 10000;
  return 70000;
}

/**
 * Deterministic fallback mission extractor for multi-category
 */
function getFallbackMission(query) {
  const q = query.toLowerCase();
  
  // 1. Detect Category
  let category = 'laptop';
  if (q.includes('shirt') || q.includes('tshirt') || q.includes('t-shirt') || q.includes('pant') || q.includes('trouser') || q.includes('cloth') || q.includes('dress') || q.includes('jeans') || q.includes('wear') || q.includes('hoodie')) {
    category = 'clothing';
  } else if (q.includes('phone') || q.includes('mobile') || q.includes('smartphone')) {
    category = 'phone';
  } else if (q.includes('headphone') || q.includes('earphone') || q.includes('audio') || q.includes('earbuds') || q.includes('anc')) {
    category = 'headphones';
  }

  // 2. Extract Budget
  const budget_max = extractBudgetNumber(query, category);

  // 3. Category-specific Priorities
  let priorities = [];
  if (category === 'clothing') {
    const comfortHigh = q.includes('comfort') || q.includes('soft') || q.includes('oversized');
    const fabricHigh = q.includes('cotton') || q.includes('fabric') || q.includes('pure') || q.includes('material');
    const styleHigh = q.includes('style') || q.includes('look') || q.includes('fit') || q.includes('design');

    priorities = [
      { attribute: 'fabric', label: 'Fabric & Material Quality', weight: fabricHigh ? 0.35 : 0.25, importance: 'HIGH' },
      { attribute: 'comfort', label: 'All-Day Comfort', weight: comfortHigh ? 0.35 : 0.25, importance: 'HIGH' },
      { attribute: 'durability', label: 'Durability & Stitching', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'breathability', label: 'Breathability', weight: 0.15, importance: 'MEDIUM' },
      { attribute: 'fit', label: 'Fit & Silhouette', weight: styleHigh ? 0.20 : 0.10, importance: styleHigh ? 'HIGH' : 'LOW' }
    ];
  } else if (category === 'laptop') {
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

  // Normalize weights to 1.0
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
  "category": "laptop" | "phone" | "headphones" | "clothing",
  "budget_max": number (CRITICAL: Exact integer in INR. e.g. "under 1000" -> 1000, "50000" -> 50000, "70k" -> 70000, "849 rs" -> 849. Do NOT add extra zeros),
  "priorities": [
    {
      "attribute": string (e.g. "battery", "performance", "fabric", "comfort", "durability", "breathability", "fit", "camera", "anc", "sound"),
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

    const sanitizedBudget = extractBudgetNumber(userQuery, parsed.category || 'laptop');
    parsed.budget_max = sanitizedBudget;

    const totalWeight = parsed.priorities.reduce((sum, p) => sum + (Number(p.weight) || 0.1), 0);
    parsed.priorities = parsed.priorities.map(p => ({
      ...p,
      weight: Number(((Number(p.weight) || 0.1) / totalWeight).toFixed(2))
    }));

    parsed.query = userQuery;
    return parsed;

  } catch (error) {
    console.warn("Gemini intent extraction fallback:", error);
    return getFallbackMission(userQuery);
  }
}
