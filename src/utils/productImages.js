/**
 * DECIDE - Universal Product Image Resolver
 * High-definition, category-accurate product photography for ANY product in the world.
 * Typo-tolerant, comprehensive dictionary covering fitness, apparel, electronics, grooming, and luxury.
 */

const CATEGORY_MAP = {
  // Protein & Fitness Supplements
  protein: [
    "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
  ],

  // Underwear & Innerwear
  underwear: [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
  ],

  // Watches & Smartwatches
  watch: [
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80"
  ],

  // Footwear & Shoes
  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"
  ],

  // Laptops & Computers
  laptop: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80"
  ],

  // Phones & Mobiles
  phone: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
  ],

  // Audio & Headphones
  headphones: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
  ],

  // Perfumes & Fragrances
  fragrance: [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=600&auto=format&fit=crop&q=80"
  ],

  // Keyboards & Gaming Tech
  keyboard: [
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
  ],

  // Skincare & Cosmetics
  skincare: [
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608248597359-5935928d227f?w=600&auto=format&fit=crop&q=80"
  ],

  // Clothing & Shirts
  clothing: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&auto=format&fit=crop&q=80"
  ],

  // Neutral Modern Product Showcase
  neutral: [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80"
  ]
};

/**
 * Typo-tolerant keyword matching to resolve the exact correct product photography
 */
export function getProductImage(category = '', title = '', rawUrl = '', index = 0) {
  // If rawUrl is a valid real image from Google Shopping (not our placeholder), use it directly
  if (rawUrl && rawUrl.startsWith('http') && !rawUrl.includes('photo-1523275335684-37898b6baf30')) {
    return rawUrl;
  }

  const text = `${category} ${title}`.toLowerCase();

  // 1. Protein / Gym / Supplements (including typos like 'protin', 'proten', 'whey', 'creatin')
  if (
    text.includes('protein') || text.includes('protin') || text.includes('proten') ||
    text.includes('whey') || text.includes('creatine') || text.includes('creatin') ||
    text.includes('supplement') || text.includes('bcaa') || text.includes('gainer') ||
    text.includes('isolate') || text.includes('peanut butter') || text.includes('nutrition')
  ) {
    const list = CATEGORY_MAP.protein;
    return list[index % list.length];
  }

  // 2. Underwear & Innerwear (including typos 'undrwear', 'chaddi', 'boxer', 'trunk', 'brief')
  if (
    text.includes('underwear') || text.includes('undrwear') || text.includes('innerwear') ||
    text.includes('boxer') || text.includes('trunk') || text.includes('brief') ||
    text.includes('lingerie') || text.includes('vest') || text.includes('chaddi') ||
    text.includes('panty') || text.includes('bra')
  ) {
    const list = CATEGORY_MAP.underwear;
    return list[index % list.length];
  }

  // 3. Watches (including 'titan', 'casio', 'fossil', 'rolex', 'watc', 'smartwatch')
  if (
    text.includes('watch') || text.includes('watc') || text.includes('timepiece') ||
    text.includes('titan') || text.includes('casio') || text.includes('fossil') ||
    text.includes('g-shock') || text.includes('fastrack') || text.includes('smartwatch')
  ) {
    const list = CATEGORY_MAP.watch;
    return list[index % list.length];
  }

  // 4. Footwear & Shoes (including 'shoe', 'shos', 'sneaker', 'snekers', 'boots', 'nike', 'puma')
  if (
    text.includes('shoe') || text.includes('shos') || text.includes('sneaker') ||
    text.includes('snekers') || text.includes('boot') || text.includes('footwear') ||
    text.includes('sandal') || text.includes('crocs') || text.includes('loafers') ||
    text.includes('slippers') || text.includes('running')
  ) {
    const list = CATEGORY_MAP.shoes;
    return list[index % list.length];
  }

  // 5. Perfumes & Fragrances
  if (
    text.includes('perfume') || text.includes('perfum') || text.includes('fragrance') ||
    text.includes('cologne') || text.includes('deodorant') || text.includes('deo') ||
    text.includes('attar') || text.includes('ittar') || text.includes('scent')
  ) {
    const list = CATEGORY_MAP.fragrance;
    return list[index % list.length];
  }

  // 6. Skincare & Cosmetics
  if (
    text.includes('skin') || text.includes('cream') || text.includes('serum') ||
    text.includes('facewash') || text.includes('moisturizer') || text.includes('sunscreen') ||
    text.includes('shampoo') || text.includes('lotion') || text.includes('cosmetic')
  ) {
    const list = CATEGORY_MAP.skincare;
    return list[index % list.length];
  }

  // 7. Laptops & Computers
  if (
    text.includes('laptop') || text.includes('lapto') || text.includes('macbook') ||
    text.includes('notebook') || text.includes('computer') || text.includes('pc')
  ) {
    const list = CATEGORY_MAP.laptop;
    return list[index % list.length];
  }

  // 8. Phones & Mobiles
  if (
    text.includes('phone') || text.includes('mobile') || text.includes('smartphone') ||
    text.includes('iphone') || text.includes('samsung') || text.includes('oneplus')
  ) {
    const list = CATEGORY_MAP.phone;
    return list[index % list.length];
  }

  // 9. Headphones & Audio
  if (
    text.includes('headphone') || text.includes('earphone') || text.includes('earbud') ||
    text.includes('airpods') || text.includes('tws') || text.includes('speaker') ||
    text.includes('audio') || text.includes('mic')
  ) {
    const list = CATEGORY_MAP.headphones;
    return list[index % list.length];
  }

  // 10. Keyboards & Mice
  if (text.includes('keyboard') || text.includes('keybord') || text.includes('mouse')) {
    const list = CATEGORY_MAP.keyboard;
    return list[index % list.length];
  }

  // 11. Apparel & Clothing
  if (
    text.includes('shirt') || text.includes('tshirt') || text.includes('t-shirt') ||
    text.includes('pant') || text.includes('jeans') || text.includes('trouser') ||
    text.includes('hoodie') || text.includes('jacket') || text.includes('dress') ||
    text.includes('kurta') || text.includes('cloth')
  ) {
    const list = CATEGORY_MAP.clothing;
    return list[index % list.length];
  }

  // Generic neutral product photo
  const neutral = CATEGORY_MAP.neutral;
  return neutral[index % neutral.length];
}
