/**
 * DECIDE - Deterministic Scoring & Ranking Engine
 * Supports Laptops, Smartphones, Audio, and Fashion/Clothing
 */

export function normalizeAttribute(attrKey, value, category) {
  if (value === undefined || value === null) return 70;

  switch (attrKey) {
    case 'battery':
    case 'battery_hours':
      if (category === 'laptop') {
        return Math.min(100, Math.max(20, Math.round((value / 15) * 100)));
      } else if (category === 'phone') {
        return Math.min(100, Math.max(20, Math.round((value / 18) * 100)));
      } else {
        return Math.min(100, Math.max(20, Math.round((value / 70) * 100)));
      }

    case 'portability':
    case 'weight_kg':
      if (typeof value === 'number' && value < 5) {
        return Math.min(100, Math.max(30, Math.round(100 - (value - 1.0) * 28)));
      }
      return typeof value === 'number' ? value : 75;

    // Fashion / Clothing Attributes
    case 'fabric':
    case 'fabric_quality':
    case 'comfort':
    case 'comfort_score':
    case 'durability':
    case 'durability_score':
    case 'breathability':
    case 'breathability_score':
    case 'fit':
    case 'fit_score':
    // Electronics Benchmarks
    case 'performance':
    case 'performance_score':
    case 'gaming':
    case 'gaming_score':
    case 'camera':
    case 'camera_score':
    case 'display':
    case 'display_score':
    case 'anc':
    case 'anc_score':
    case 'sound':
    case 'sound_quality':
    case 'build_quality':
      return Math.min(100, Math.max(20, Math.round(value)));

    default:
      return typeof value === 'number' ? Math.min(100, Math.max(0, value)) : 75;
  }
}

function getProductAttributeValue(product, priorityKey) {
  const attrs = product.attributes || {};
  const k = priorityKey.toLowerCase();

  // Fashion & Apparel Mappings
  if (k.includes('fabric') || k.includes('material') || k.includes('cotton')) return attrs.fabric_quality || 85;
  if (k.includes('comfort') || k.includes('soft')) return attrs.comfort_score || 88;
  if (k.includes('durab') || k.includes('stitch')) return attrs.durability_score || 85;
  if (k.includes('breath')) return attrs.breathability_score || 85;
  if (k.includes('fit') || k.includes('style')) return attrs.fit_score || 85;

  // Electronics Mappings
  if (k.includes('battery')) return attrs.battery_hours || attrs.battery_score || 6;
  if (k.includes('portab') || k.includes('weight')) return attrs.portability_score || attrs.weight_kg || 75;
  if (k.includes('perform') || k.includes('code') || k.includes('cpu')) return attrs.performance_score || 75;
  if (k.includes('gam') || k.includes('gpu')) return attrs.gaming_score || 60;
  if (k.includes('display') || k.includes('screen')) return attrs.display_score || 75;
  if (k.includes('camera') || k.includes('photo')) return attrs.camera_score || 75;
  if (k.includes('anc') || k.includes('noise')) return attrs.anc_score || 75;
  if (k.includes('sound') || k.includes('bass') || k.includes('audio')) return attrs.sound_quality || 75;

  return attrs[priorityKey] || 75;
}

export function scoreAndRankProducts(products, mission) {
  if (!products || products.length === 0) return [];

  const budgetMax = mission.budget_max || 70000;
  const priorities = mission.priorities || [];
  const category = mission.category || 'laptop';

  const totalWeight = priorities.reduce((sum, p) => sum + (Number(p.weight) || 0.1), 0);
  const normalizedPriorities = priorities.map(p => ({
    ...p,
    weight: (Number(p.weight) || 0.1) / totalWeight
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

    let finalMatchScore = rawWeightedScore;

    if (isOverBudget) {
      const penalty = 35 + Math.min(25, (budgetDiff / budgetMax) * 50);
      finalMatchScore = Math.max(10, finalMatchScore - penalty);
    }

    const sortedBreakdown = [...attributeBreakdown].sort((a, b) => b.normalizedScore - a.normalizedScore);
    const topStrength = sortedBreakdown[0] || { priorityLabel: 'Specifications', normalizedScore: 85 };
    const weakestAttribute = sortedBreakdown[sortedBreakdown.length - 1] || { priorityLabel: 'General', normalizedScore: 70 };

    const reasons = [
      `Top rating in ${topStrength.priorityLabel} (${topStrength.normalizedScore}/100)`,
      isOverBudget 
        ? `⚠️ Exceeds specified budget of ₹${budgetMax.toLocaleString('en-IN')}` 
        : `Well within budget cap of ₹${budgetMax.toLocaleString('en-IN')}`,
      `Verified rating: ★ ${product.rating} / 5.0`
    ];

    const tradeOff = isOverBudget
      ? `Price exceeds budget by ₹${budgetDiff.toLocaleString('en-IN')}`
      : `${weakestAttribute.priorityLabel} is relatively lower (${weakestAttribute.normalizedScore}/100)`;

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
