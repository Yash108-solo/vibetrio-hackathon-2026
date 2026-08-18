/**
 * DECIDE - Universal Deterministic Scoring & Ranking Engine
 * Evaluates candidates for ANY category (Watches, Laptops, Phones, Shoes, Audio, Fashion, etc.)
 */

export function normalizeAttribute(attrKey, value, category) {
  if (value === undefined || value === null) return 75;

  if (typeof value === 'number') {
    // If it's already a 0-100 score
    if (value <= 100 && value >= 0) {
      return Math.round(value);
    }
    // If it's battery hours (e.g. 6 to 40)
    if (attrKey.includes('battery')) {
      return Math.min(100, Math.max(30, Math.round((value / 15) * 100)));
    }
    // If it's weight in kg (e.g. 1.2 to 3.0)
    if (attrKey.includes('weight')) {
      return Math.min(100, Math.max(30, Math.round(100 - (value - 1.0) * 28)));
    }
  }

  return 75;
}

function getProductAttributeValue(product, priorityKey) {
  const attrs = product.attributes || {};
  const k = priorityKey.toLowerCase();

  // Check direct key match
  if (attrs[priorityKey] !== undefined) return attrs[priorityKey];

  // Fuzzy match in attributes object
  for (const [key, val] of Object.entries(attrs)) {
    if (key.toLowerCase().includes(k) || k.includes(key.toLowerCase())) {
      return val;
    }
  }

  // Common attribute aliases
  if (k.includes('build') || k.includes('glass') || k.includes('strap') || k.includes('water')) return attrs.build_quality || attrs.water_resistance || 88;
  if (k.includes('style') || k.includes('design') || k.includes('look')) return attrs.style_design || attrs.fit || 90;
  if (k.includes('cushion') || k.includes('comfort') || k.includes('soft')) return attrs.comfort || attrs.comfort_cushion || 88;
  if (k.includes('durab') || k.includes('sole') || k.includes('stitch')) return attrs.durability || 85;
  if (k.includes('grip') || k.includes('tract')) return attrs.grip || 85;
  if (k.includes('battery') || k.includes('movement')) return attrs.battery || attrs.battery_movement || 85;
  if (k.includes('perform') || k.includes('speed') || k.includes('cpu')) return attrs.performance || 85;
  if (k.includes('gam') || k.includes('gpu')) return attrs.gaming || 75;
  if (k.includes('camera') || k.includes('photo')) return attrs.camera || 80;
  if (k.includes('display') || k.includes('screen')) return attrs.display || 85;
  if (k.includes('anc') || k.includes('noise')) return attrs.anc || 85;
  if (k.includes('sound') || k.includes('bass') || k.includes('audio')) return attrs.sound || 85;
  if (k.includes('fabric') || k.includes('cotton')) return attrs.fabric || 88;

  return 80;
}

export function scoreAndRankProducts(products, mission) {
  if (!products || products.length === 0) return [];

  const budgetMax = mission.budget_max || 50000;
  const priorities = mission.priorities || [];
  const category = mission.category || 'product';

  const totalWeight = priorities.reduce((sum, p) => sum + (Number(p.weight) || 0.2), 0) || 1;
  const normalizedPriorities = priorities.map(p => ({
    ...p,
    weight: (Number(p.weight) || 0.2) / totalWeight
  }));

  const scoredProducts = products.map(product => {
    let rawWeightedScore = 0;
    const attributeBreakdown = [];

    normalizedPriorities.forEach(priority => {
      const rawVal = getProductAttributeValue(product, priority.attribute);
      const normalizedScore = normalizeAttribute(priority.attribute, rawVal, category);
      const contribution = normalizedScore * priority.weight;

      rawWeightedScore += contribution;
      attributeBreakdown.push({
        priorityLabel: priority.label,
        attribute: priority.attribute,
        rawValue: rawVal,
        normalizedScore,
        weight: priority.weight,
        weightedPoints: Math.round(contribution * 10) / 10
      });
    });

    const isOverBudget = product.price > budgetMax;
    const budgetDiff = product.price - budgetMax;

    let finalMatchScore = rawWeightedScore || 75;

    // Price adjustment
    if (isOverBudget) {
      const penalty = 30 + Math.min(30, (budgetDiff / budgetMax) * 50);
      finalMatchScore = Math.max(15, finalMatchScore - penalty);
    } else {
      // Bonus for being within budget
      finalMatchScore = Math.min(99, finalMatchScore + 5);
    }

    const sortedBreakdown = [...attributeBreakdown].sort((a, b) => b.normalizedScore - a.normalizedScore);
    const topStrength = sortedBreakdown[0] || { priorityLabel: 'Quality & Value', normalizedScore: 88 };
    const weakestAttribute = sortedBreakdown[sortedBreakdown.length - 1] || { priorityLabel: 'Secondary Features', normalizedScore: 75 };

    const reasons = product.reasons && product.reasons.length > 0 ? product.reasons : [
      `Top rating in ${topStrength.priorityLabel} (${topStrength.normalizedScore}/100)`,
      isOverBudget 
        ? `⚠️ Exceeds specified budget of ₹${budgetMax.toLocaleString('en-IN')}` 
        : `Well within budget cap of ₹${budgetMax.toLocaleString('en-IN')}`,
      `Verified rating: ★ ${product.rating} / 5.0`
    ];

    const tradeOff = product.tradeOff || (isOverBudget
      ? `Price exceeds budget by ₹${budgetDiff.toLocaleString('en-IN')}`
      : `${weakestAttribute.priorityLabel} is relatively lower (${weakestAttribute.normalizedScore}/100)`);

    return {
      ...product,
      matchScore: Math.min(99, Math.max(25, Math.round(finalMatchScore))),
      isOverBudget,
      attributeBreakdown,
      reasons,
      tradeOff,
      topStrengthLabel: topStrength.priorityLabel
    };
  });

  scoredProducts.sort((a, b) => {
    if (b.matchScore !== a.matchScore) {
      return b.matchScore - a.matchScore;
    }
    if (a.price !== b.price) {
      return a.price - b.price;
    }
    return b.rating - a.rating;
  });

  return scoredProducts;
}
