/**
 * DECIDE - Universal Product Image Resolver
 * Provides category-accurate, high-resolution product photography for ANY product in the world.
 */

const CATEGORY_IMAGES = {
  underwear: [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80"
  ],
  clothing: [
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop&q=80"
  ],
  watch: [
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80"
  ],
  shoes: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80"
  ],
  laptop: [
    "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80"
  ],
  phone: [
    "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80"
  ],
  headphones: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
  ],
  fragrance: [
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&auto=format&fit=crop&q=80"
  ],
  fitness: [
    "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80"
  ],
  keyboard: [
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&auto=format&fit=crop&q=80"
  ],
  generic: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80"
  ]
};

/**
 * Resolve the most accurate product image URL based on query/title/category
 */
export function getProductImage(category = '', title = '', rawUrl = '', index = 0) {
  // If rawUrl is a valid non-placeholder image from Google Shopping, use it!
  if (rawUrl && rawUrl.startsWith('http') && !rawUrl.includes('photo-1523275335684-37898b6baf30')) {
    return rawUrl;
  }

  const text = `${category} ${title}`.toLowerCase();

  if (text.includes('underwear') || text.includes('boxer') || text.includes('trunk') || text.includes('brief') || text.includes('innerwear') || text.includes('lingerie') || text.includes('vest')) {
    const list = CATEGORY_IMAGES.underwear;
    return list[index % list.length];
  }

  if (text.includes('watch') || text.includes('timepiece') || text.includes('smartwatch')) {
    const list = CATEGORY_IMAGES.watch;
    return list[index % list.length];
  }

  if (text.includes('shoe') || text.includes('sneaker') || text.includes('boot') || text.includes('footwear') || text.includes('sandal')) {
    const list = CATEGORY_IMAGES.shoes;
    return list[index % list.length];
  }

  if (text.includes('laptop') || text.includes('macbook') || text.includes('notebook') || text.includes('computer')) {
    const list = CATEGORY_IMAGES.laptop;
    return list[index % list.length];
  }

  if (text.includes('phone') || text.includes('mobile') || text.includes('smartphone')) {
    const list = CATEGORY_IMAGES.phone;
    return list[index % list.length];
  }

  if (text.includes('headphone') || text.includes('earphone') || text.includes('audio') || text.includes('earbud') || text.includes('tws') || text.includes('speaker')) {
    const list = CATEGORY_IMAGES.headphones;
    return list[index % list.length];
  }

  if (text.includes('perfume') || text.includes('fragrance') || text.includes('cologne') || text.includes('deodorant') || text.includes('scent')) {
    const list = CATEGORY_IMAGES.fragrance;
    return list[index % list.length];
  }

  if (text.includes('protein') || text.includes('supplement') || text.includes('creatine') || text.includes('gym') || text.includes('whey')) {
    const list = CATEGORY_IMAGES.fitness;
    return list[index % list.length];
  }

  if (text.includes('keyboard') || text.includes('mouse') || text.includes('keycap')) {
    const list = CATEGORY_IMAGES.keyboard;
    return list[index % list.length];
  }

  if (text.includes('shirt') || text.includes('tshirt') || text.includes('pant') || text.includes('jeans') || text.includes('jacket') || text.includes('hoodie') || text.includes('cloth') || text.includes('dress')) {
    const list = CATEGORY_IMAGES.clothing;
    return list[index % list.length];
  }

  const genericList = CATEGORY_IMAGES.generic;
  return genericList[index % genericList.length];
}
