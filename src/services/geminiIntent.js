import { GoogleGenerativeAI } from '@google/generative-ai';

export function getGeminiApiKey() {
  return localStorage.getItem('DECIDE_GEMINI_KEY') || import.meta.env.VITE_GEMINI_API_KEY || '';
}

/**
 * Robust, bulletproof budget extractor for any query
 */
export function extractBudgetNumber(query, fallbackDefault = 50000) {
  const q = query.toLowerCase();

  // 1. "k" notation: e.g. "50k", "4.5k", "800k", "70k"
  const kMatch = q.match(/\b(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    return Math.round(parseFloat(kMatch[1]) * 1000);
  }

  // 2. "lakh" notation: e.g. "1.5 lakh", "1 lakh"
  const lakhMatch = q.match(/\b(\d+(?:\.\d+)?)\s*(?:lakh|lac|l)\b/i);
  if (lakhMatch) {
    return Math.round(parseFloat(lakhMatch[1]) * 100000);
  }

  // 3. Numbers following 'under', 'below', '<', 'upto', 'budget', 'rs', 'inr', '₹'
  const prefixMatch = q.match(/(?:under|below|<|upto|budget|rs\.?|inr|₹)\s*[:=]?\s*(\d{1,3}(?:,\d{3})+|\d{3,7})/i);
  if (prefixMatch) {
    const val = parseInt(prefixMatch[1].replace(/,/g, ''), 10);
    if (!isNaN(val) && val >= 50) return val;
  }

  // 4. Exact numbers standalone
  const fullNumbers = q.match(/\b\d{1,3}(?:,\d{3})+\b|\b\d{3,7}\b/g);
  if (fullNumbers && fullNumbers.length > 0) {
    const raw = fullNumbers[0].replace(/,/g, '');
    const val = parseInt(raw, 10);
    if (!isNaN(val) && val >= 50) {
      return val;
    }
  }

  return fallbackDefault;
}

/**
 * Clean and extract the actual core product search keywords from user prompt
 */
export function extractSearchTerm(query) {
  let cleaned = query
    .replace(/(?:i\s+need|i\s+want|looking\s+for|show\s+me|search\s+for|find\s+me|recommend|best|suggest|can\s+you\s+find)/gi, '')
    .replace(/(?:under|below|budget|less\s+than|upto|around|inr|rs\.?|₹|\bk\b|\blakh\b|\d+)/gi, '')
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return cleaned || query.trim();
}

/**
 * Deterministic Universal Fallback Mission Extractor
 */
function getFallbackMission(query) {
  const q = query.toLowerCase();
  const searchTerm = extractSearchTerm(query) || query;

  let category = 'product';
  let priorities = [];
  let defaultBudget = 5000;

  if (q.includes('watch')) {
    category = 'watch';
    defaultBudget = 5000;
    priorities = [
      { attribute: 'build_quality', label: 'Build & Dial Glass', weight: 0.30, importance: 'HIGH' },
      { attribute: 'style_design', label: 'Design & Aesthetics', weight: 0.30, importance: 'HIGH' },
      { attribute: 'water_resistance', label: 'Water Resistance', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'battery_movement', label: 'Movement / Battery', weight: 0.20, importance: 'MEDIUM' }
    ];
  } else if (q.includes('shoe') || q.includes('sneaker') || q.includes('boot')) {
    category = 'shoes';
    defaultBudget = 3500;
    priorities = [
      { attribute: 'comfort_cushion', label: 'Cushioning & Comfort', weight: 0.35, importance: 'HIGH' },
      { attribute: 'durability', label: 'Sole & Upper Durability', weight: 0.25, importance: 'HIGH' },
      { attribute: 'grip', label: 'Grip & Traction', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'breathability', label: 'Breathability', weight: 0.20, importance: 'MEDIUM' }
    ];
  } else if (q.includes('shirt') || q.includes('tshirt') || q.includes('underwear') || q.includes('trunk') || q.includes('cloth')) {
    category = 'clothing';
    defaultBudget = 1500;
    priorities = [
      { attribute: 'fabric', label: 'Fabric & Material Quality', weight: 0.35, importance: 'HIGH' },
      { attribute: 'comfort', label: 'All-Day Comfort', weight: 0.30, importance: 'HIGH' },
      { attribute: 'durability', label: 'Durability & Stitching', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'fit', label: 'Fit & Silhouette', weight: 0.15, importance: 'MEDIUM' }
    ];
  } else if (q.includes('laptop') || q.includes('macbook') || q.includes('computer')) {
    category = 'laptop';
    defaultBudget = 65000;
    priorities = [
      { attribute: 'performance', label: 'Performance & Coding', weight: 0.30, importance: 'HIGH' },
      { attribute: 'battery', label: 'Battery Life', weight: 0.30, importance: 'HIGH' },
      { attribute: 'portability', label: 'Portability & Weight', weight: 0.25, importance: 'MEDIUM' },
      { attribute: 'gaming', label: 'Gaming & GPU', weight: 0.15, importance: 'LOW' }
    ];
  } else if (q.includes('phone') || q.includes('mobile') || q.includes('smartphone')) {
    category = 'phone';
    defaultBudget = 25000;
    priorities = [
      { attribute: 'battery', label: 'Battery & Endurance', weight: 0.35, importance: 'HIGH' },
      { attribute: 'camera', label: 'Camera Quality', weight: 0.30, importance: 'HIGH' },
      { attribute: 'performance', label: 'Speed & Multitasking', weight: 0.20, importance: 'HIGH' },
      { attribute: 'display', label: 'Display & Refresh Rate', weight: 0.15, importance: 'MEDIUM' }
    ];
  } else if (q.includes('protein') || q.includes('protin') || q.includes('whey') || q.includes('creatine')) {
    category = 'protein';
    defaultBudget = 2500;
    priorities = [
      { attribute: 'protein_content', label: 'Protein Purity & Labdoor Test', weight: 0.35, importance: 'HIGH' },
      { attribute: 'digestibility', label: 'Digestibility & Enzymes', weight: 0.30, importance: 'HIGH' },
      { attribute: 'flavor', label: 'Taste & Mixability', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'value', label: 'Cost Per Scoop', weight: 0.15, importance: 'MEDIUM' }
    ];
  } else {
    category = searchTerm;
    defaultBudget = 5000;
    priorities = [
      { attribute: 'build_quality', label: 'Build Quality & Reliability', weight: 0.35, importance: 'HIGH' },
      { attribute: 'value_for_money', label: 'Value for Money', weight: 0.30, importance: 'HIGH' },
      { attribute: 'features', label: 'Key Features & Performance', weight: 0.20, importance: 'MEDIUM' },
      { attribute: 'brand_reputation', label: 'Brand & Warranty', weight: 0.15, importance: 'MEDIUM' }
    ];
  }

  const budget_max = extractBudgetNumber(query, defaultBudget);

  return {
    query,
    searchTerm,
    category,
    budget_max,
    priorities,
    summary: `Decision model for ${searchTerm} with budget cap of ₹${budget_max.toLocaleString('en-IN')}`
  };
}

/**
 * GEMINI CALL #1: Structured Intent Extraction (with 3-second timeout)
 */
export async function extractShoppingMission(userQuery) {
  if (!userQuery || !userQuery.trim()) {
    throw new Error("Query cannot be empty");
  }

  const activeKey = getGeminiApiKey();
  if (!activeKey) {
    return getFallbackMission(userQuery);
  }

  try {
    const genAI = new GoogleGenerativeAI(activeKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
      systemInstruction: `You are the Intent Extraction Engine for DECIDE.
Analyze the user's shopping query for ANY product and return JSON:
{
  "searchTerm": string,
  "category": string,
  "budget_max": number,
  "priorities": [
    { "attribute": string, "label": string, "weight": number, "importance": "HIGH" | "MEDIUM" | "LOW" }
  ],
  "summary": string
}`
    });

    // Race Gemini with a 3-second timeout so the UI NEVER hangs
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Gemini timeout")), 3000)
    );

    const result = await Promise.race([
      model.generateContent(userQuery),
      timeoutPromise
    ]);

    const text = result.response.text();
    const parsed = JSON.parse(text);

    const sanitizedBudget = extractBudgetNumber(userQuery, parsed.budget_max || 5000);
    parsed.budget_max = sanitizedBudget;

    if (!parsed.searchTerm) {
      parsed.searchTerm = extractSearchTerm(userQuery);
    }

    const totalWeight = (parsed.priorities || []).reduce((sum, p) => sum + (Number(p.weight) || 0.1), 0) || 1;
    parsed.priorities = (parsed.priorities || []).map(p => ({
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
