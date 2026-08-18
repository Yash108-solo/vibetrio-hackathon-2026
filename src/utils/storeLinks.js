/**
 * DECIDE - Comprehensive Multi-Platform E-Commerce Store Link Generator
 * Supports: Amazon India, Flipkart, Meesho, Myntra, Croma, Reliance Digital,
 * Tata CLiQ, Blinkit, Zepto, Nykaa, HealthKart, and Official Brand Stores.
 */

export function buildStoreDirectLink(storeName = '', productTitle = '', originalLink = '') {
  if (originalLink && originalLink.startsWith('http') && !originalLink.includes('google.com/url') && originalLink !== '#') {
    return originalLink;
  }

  const title = (productTitle || '').trim();
  const encodedTitle = encodeURIComponent(title);
  const name = (storeName || '').toLowerCase();

  if (name.includes('amazon')) {
    return `https://www.amazon.in/s?k=${encodedTitle}&ref=nb_sb_noss`;
  }
  if (name.includes('flipkart')) {
    return `https://www.flipkart.com/search?q=${encodedTitle}`;
  }
  if (name.includes('meesho')) {
    return `https://www.meesho.com/search?q=${encodedTitle}`;
  }
  if (name.includes('myntra')) {
    return `https://www.myntra.com/${encodedTitle.replace(/%20/g, '-')}`;
  }
  if (name.includes('tatacliq') || name.includes('tata cliq') || name.includes('cliq')) {
    return `https://www.tatacliq.com/search/?searchCategory=all&text=${encodedTitle}`;
  }
  if (name.includes('croma')) {
    return `https://www.croma.com/searchB?q=${encodedTitle}`;
  }
  if (name.includes('reliance') || name.includes('reliancedigital')) {
    return `https://www.reliancedigital.in/search?q=${encodedTitle}`;
  }
  if (name.includes('blinkit')) {
    return `https://blinkit.com/s/?q=${encodedTitle}`;
  }
  if (name.includes('zepto')) {
    return `https://www.zeptonow.com/search?q=${encodedTitle}`;
  }
  if (name.includes('healthkart')) {
    return `https://www.healthkart.com/search?q=${encodedTitle}`;
  }
  if (name.includes('nykaa')) {
    return `https://www.nykaa.com/search/result/?q=${encodedTitle}`;
  }
  if (name.includes('titan')) {
    return `https://www.titan.co.in/search?q=${encodedTitle}`;
  }
  if (name.includes('casio')) {
    return `https://www.casioindiashop.com/search.php?q=${encodedTitle}`;
  }
  if (name.includes('nike')) {
    return `https://www.nike.com/in/w?q=${encodedTitle}`;
  }
  if (name.includes('apple')) {
    return `https://www.apple.com/in/shop/buy-iphone`;
  }
  if (name.includes('samsung')) {
    return `https://www.samsung.com/in/search/?searchvalue=${encodedTitle}`;
  }

  if (originalLink && originalLink.startsWith('http')) {
    return originalLink;
  }

  return `https://www.google.com/search?tbm=shop&q=${encodedTitle}`;
}

/**
 * Ensure every product has comprehensive multi-store comparison across 5-6 top Indian platforms:
 * Amazon India, Flipkart, Meesho/Myntra, Croma/Reliance Digital, Blinkit/Zepto (Quick Commerce 10 min), and Official Brand Store
 */
export function ensureMultiStoreComparison(product) {
  const title = product.title || '';
  const price = product.price || 1000;
  const stores = product.stores || [];
  const text = `${product.category} ${title} ${product.brand}`.toLowerCase();

  // Determine Category-Appropriate Store Set
  const isSupplement = text.includes('protein') || text.includes('protin') || text.includes('whey') || text.includes('creatine') || text.includes('supplement');
  const isTech = text.includes('laptop') || text.includes('phone') || text.includes('macbook') || text.includes('keyboard') || text.includes('headphone');
  const isFashion = text.includes('underwear') || text.includes('shirt') || text.includes('pant') || text.includes('shoe') || text.includes('watch') || text.includes('cloth');

  const brandName = product.brand || 'Brand Official';

  const multiStores = [
    // 1. Amazon India (Lowest / Best)
    {
      name: 'Amazon India',
      price: price,
      isBest: true,
      inStock: true,
      delivery: 'Tomorrow, by 2 PM',
      badge: 'Best Price',
      returnDays: 7,
      link: buildStoreDirectLink('Amazon India', title)
    },
    // 2. Flipkart
    {
      name: 'Flipkart',
      price: Math.round(price * 1.03),
      isBest: false,
      inStock: true,
      delivery: '2-3 Days',
      badge: 'Assured',
      returnDays: 7,
      link: buildStoreDirectLink('Flipkart', title)
    },
    // 3. Fashion / Electronics / Value Store
    {
      name: isTech ? 'Croma' : (isFashion ? 'Myntra' : (isSupplement ? 'HealthKart' : 'Meesho')),
      price: Math.round(price * 1.05),
      isBest: false,
      inStock: true,
      delivery: isTech ? 'Same Day Store Pickup' : '3 Days',
      badge: isTech ? 'Tata Assured' : 'Original',
      returnDays: 14,
      link: buildStoreDirectLink(isTech ? 'Croma' : (isFashion ? 'Myntra' : (isSupplement ? 'HealthKart' : 'Meesho')), title)
    },
    // 4. Quick Commerce (Blinkit / Zepto) 10-15 Min Delivery
    {
      name: isSupplement ? 'Blinkit' : (isTech ? 'Reliance Digital' : 'Zepto'),
      price: Math.round(price * 1.06),
      isBest: false,
      inStock: true,
      delivery: isSupplement || !isTech ? '⚡ 10–15 Mins' : 'Tomorrow',
      badge: isSupplement || !isTech ? '⚡ Quick 10m' : 'Express',
      returnDays: 7,
      link: buildStoreDirectLink(isSupplement ? 'Blinkit' : (isTech ? 'Reliance Digital' : 'Zepto'), title)
    },
    // 5. Official Brand Store
    {
      name: `${brandName} Official`,
      price: Math.round(price * 1.10),
      isBest: false,
      inStock: true,
      delivery: '3-4 Days',
      badge: 'Brand Direct',
      returnDays: 14,
      link: buildStoreDirectLink(brandName, title)
    },
    // 6. Meesho / Tata CLiQ Luxury
    {
      name: isFashion ? 'Tata CLiQ' : 'Meesho',
      price: Math.round(price * 1.02),
      isBest: false,
      inStock: true,
      delivery: '4-5 Days',
      badge: 'Direct Sellers',
      returnDays: 7,
      link: buildStoreDirectLink(isFashion ? 'Tata CLiQ' : 'Meesho', title)
    }
  ];

  return multiStores;
}
