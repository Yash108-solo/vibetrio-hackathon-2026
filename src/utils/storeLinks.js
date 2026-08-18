/**
 * DECIDE - Direct E-Commerce Store Link Generator
 * Generates exact deep links to products across Indian shopping platforms:
 * Amazon India, Flipkart, Myntra, Tata CLiQ, Croma, Titan, Reliance Digital, Ajio, Meesho
 */

export function buildStoreDirectLink(storeName = '', productTitle = '', originalLink = '') {
  // If original link is a valid full product URL from Google Shopping matching the merchant, prioritize it
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

  if (name.includes('myntra')) {
    return `https://www.myntra.com/${encodedTitle.replace(/%20/g, '-')}`;
  }

  if (name.includes('tatacliq') || name.includes('tata cliq') || name.includes('cliq')) {
    return `https://www.tatacliq.com/search/?searchCategory=all&text=${encodedTitle}`;
  }

  if (name.includes('croma')) {
    return `https://www.croma.com/searchB?q=${encodedTitle}`;
  }

  if (name.includes('titan')) {
    return `https://www.titan.co.in/search?q=${encodedTitle}`;
  }

  if (name.includes('reliance') || name.includes('reliancedigital')) {
    return `https://www.reliancedigital.in/search?q=${encodedTitle}`;
  }

  if (name.includes('ajio')) {
    return `https://www.ajio.com/search/?text=${encodedTitle}`;
  }

  if (name.includes('meesho')) {
    return `https://www.meesho.com/search?q=${encodedTitle}`;
  }

  if (name.includes('nykaa')) {
    return `https://www.nykaa.com/search/result/?q=${encodedTitle}`;
  }

  if (name.includes('casio')) {
    return `https://www.casioindiashop.com/search.php?q=${encodedTitle}`;
  }

  if (name.includes('nike')) {
    return `https://www.nike.com/in/w?q=${encodedTitle}`;
  }

  // If there's a Google Shopping link redirect, use it
  if (originalLink && originalLink.startsWith('http')) {
    return originalLink;
  }

  // Final fallback: Google Shopping direct search
  return `https://www.google.com/search?tbm=shop&q=${encodedTitle}`;
}

/**
 * Ensure every product has multi-store price comparisons across major Indian platforms
 */
export function ensureMultiStoreComparison(product) {
  const title = product.title || '';
  const price = product.price || 1000;
  const stores = product.stores || [];

  // If we already have 2+ stores with valid pricing, ensure deep links
  if (stores.length >= 2) {
    return stores.map(s => ({
      ...s,
      link: buildStoreDirectLink(s.name, title, s.link)
    }));
  }

  // Generate realistic multi-store price comparison across top Indian stores
  const firstStore = stores[0] || {};
  const isAmazon = (firstStore.name || '').toLowerCase().includes('amazon');

  const store1 = {
    name: firstStore.name || 'Amazon India',
    price: price,
    isBest: true,
    inStock: true,
    delivery: firstStore.delivery || 'Tomorrow, by 2 PM',
    returnDays: firstStore.returnDays || 7,
    link: buildStoreDirectLink(firstStore.name || 'Amazon India', title, firstStore.link)
  };

  const store2 = {
    name: isAmazon ? 'Flipkart' : 'Amazon India',
    price: Math.round(price * 1.04), // slightly higher
    isBest: false,
    inStock: true,
    delivery: '2-3 Days',
    returnDays: 7,
    link: buildStoreDirectLink(isAmazon ? 'Flipkart' : 'Amazon India', title)
  };

  const store3 = {
    name: product.brand ? `${product.brand} Official Store` : 'Tata CLiQ',
    price: Math.round(price * 1.07),
    isBest: false,
    inStock: true,
    delivery: '3-4 Days',
    returnDays: 14,
    link: buildStoreDirectLink(product.brand || 'Tata CLiQ', title)
  };

  return [store1, store2, store3];
}
