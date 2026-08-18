import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Deterministic fallback mission extractor
 * Guarantees 100% demo-proof response even if offline or if API key is missing
 */
function getFallbackMission(query) {
  const q = query.toLowerCase();
  
  // 1. Detect Category
  let category = 'laptop';
  if (q.includes('phone') || q.includes('mobile') || q.includes('smartphone')) {
    category = 'phone';
  } else if (q.includes('headphone') || q.includes('earphone') || q.includes('audio') || q.includes('earbuds')) {
    category = 'headphones';
  }

  // 2. Extract Budget
  let budget_max = 70000;
  if (category === 'phone') budget_max = 25000;
  if (category === 'headphones') budget_max = 10000;

  const budgetMatch = q.match(/(?:under|below|budget|around|upto|max)\s*(?:₹|rs\.?|inr)?\s*(\d{1,3}(?:,\d{3})*|\d+)(?:\s*k)?/i);
  if (budgetMatch) {
    let numStr = budgetMatch[1].replace(/,/g, '');
    let num = parseInt(numStr, 10);
    if (q.includes(`${budgetMatch[1]}k`) || q.includes(`${budgetMatch[1]} k`)) {
      num = num * 1000;
    } else if (num < 1000) {
      num = num * 1000; // e.g. "70k" or "under 70"
    }
    if (!isNaN(num) && num > 0) budget_max = num;
  }

  // 3. Category-specific Priorities
  let priorities = [];
  if (category === 'laptop') {
    const batteryHigh = q.includes('battery') || q.includes('backup');
    const gamingHigh = q.includes('game') || q.includes('gaming');
    const portHigh = q.includes('portab') || q.includes('travel') || q.includes('light');
    const codingHigh = q.includes('code') || q.includes('coding') || q.includes('perform') || q.includes('cs');

    priorities = [
      { attribute: 'battery', label: 'Battery Life', weight: batteryHigh ? 0.30 : 0.20, importance: batteryHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'performance', label: 'Performance & Coding', weight: codingHigh ? 0.30 : 0.20, importance: 'HIGH' },
      { attribute: 'portability', label: 'Portability & Weight', weight: portHigh ? 0.20 : 0.15, importance: portHigh ? 'HIGH' : 'MEDIUM' },
      { attribute: 'gaming', label: 'Gaming & GPU', weight: gamingHigh ? 0.15 : 0.10, importance: gamingHigh ? 'HIGH' : 'LOW' },
      { attribute: 'display', label: 'Display Quality', weight: 0.05, importance: 'LOW' }
    ];
  } else if (category === 'phone') {
    const batteryHigh = q.includes('battery') || q.includes('day');
    const cameraHigh = q.includes('camera') || q.includes('photo');
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
    const batteryHigh = q.includes('battery') || q.includes('hours');
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
    summary: `Extracted intent for ${category} under ₹${budget_max.toLocaleString('en-IN')}`
  };
}

/**
 * GEMINI CALL #1: Structured Intent Extraction
 * Extracts category, max budget, and normalized priority weights from natural language
 */
export async function extractShoppingMission(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    throw new Error("Query cannot be empty");
  }

  // If no Gemini API key is configured, instantly use deterministic extractor
  if (!apiKey || !genAI) {
    console.log("Using deterministic intent extractor (offline / no API key)");
    const fallback = getFallbackMission(userQuery);
    console.log("🎯 Extracted Mission JSON:", fallback);
    return fallback;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
      systemInstruction: `You are the Intent Extraction Engine for DECIDE, a transparent shopping decision system.
Analyze the user's natural language shopping need and output ONLY a valid JSON object matching this schema:

{
  "category": "laptop" | "phone" | "headphones",
  "budget_max": number (in INR, e.g. 70000, 25000, 10000. Extract from text like "under 70k", "under ₹70,000", "below 25000", etc. If unspecified, use defaults: laptop 70000, phone 25000, headphones 10000),
  "priorities": [
    {
      "attribute": "battery" | "performance" | "portability" | "gaming" | "display" | "camera" | "anc" | "sound" | "comfort",
      "label": "Human Readable Label",
      "weight": number (between 0.05 and 0.50, all weights MUST sum to exactly 1.0),
      "importance": "HIGH" | "MEDIUM" | "LOW"
    }
  ],
  "summary": "Concise 1-line statement of user's core trade-off priorities"
}

Rule: Always include 4 to 5 relevant priority attributes for the detected category. Weights MUST sum to 1.0.`
    });

    const result = await model.generateContent(userQuery);
    const text = result.response.text();
    const parsed = JSON.parse(text);

    // Sanitize and validate
    if (!parsed.category || !parsed.budget_max || !Array.isArray(parsed.priorities)) {
      throw new Error("Invalid structure from Gemini");
    }

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
