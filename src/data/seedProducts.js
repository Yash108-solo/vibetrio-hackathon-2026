/**
 * DECIDE / ShopSense AI - Multi-Category Grounded Product Catalog
 * Includes Laptops, Watches, Phones, Audio, Fashion, etc.
 * Enriched with BuyHatke-style price history and multi-store pricing.
 */

export const SEED_PRODUCTS = [
  // ==========================================
  // WATCHES (TITAN, FASTRACK, CASIO, FOSSIL)
  // ==========================================
  {
    id: 501,
    title: "Titan Neo Splash Analog Black Dial Men Watch (Water Resistant 50M, Stainless Steel)",
    brand: "Titan",
    category: "watch",
    price: 3995,
    mrp: 4995,
    rating: 4.5,
    reviewsCount: 3850,
    thumbnail: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Titan.co.in", price: 3995, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://titan.co.in" },
      { name: "Amazon India", price: 4195, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false, link: "https://amazon.in" },
      { name: "Flipkart", price: 4350, inStock: true, delivery: "2 Days", returnDays: 10, isBest: false, link: "https://flipkart.com" }
    ],
    priceHistory: {
      lowest30Days: 3899,
      highest30Days: 4995,
      averagePrice: 4450,
      trend: "downward",
      priceDropChance: 15,
      priceDropPrediction: "🔥 Current price (₹3,995) is within 2.4% of its 60-day lowest record! Best time to buy.",
      historyPoints: [
        { date: "15 Jul", price: 4995 },
        { date: "28 Jul", price: 4650 },
        { date: "06 Aug", price: 4350 },
        { date: "14 Aug", price: 4195 },
        { date: "Today", price: 3995 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Price has dropped 20% from MRP and is at its lowest record. Premium mineral glass and 50M water resistance.",
    tradeOff: "Mineral glass is scratch-resistant but not sapphire.",
    verifiedAgo: "Verified 2 mins ago",
    dataConfidence: 99,
    attributes: {
      build_quality: 94,
      style_design: 92,
      water_resistance: 88,
      battery_movement: 90
    }
  },
  {
    id: 502,
    title: "Titan Workwear Chronograph Silver Dial Men Watch (Quartz, Brown Leather Strap)",
    brand: "Titan",
    category: "watch",
    price: 4495,
    mrp: 5995,
    rating: 4.6,
    reviewsCount: 2100,
    thumbnail: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon India", price: 4495, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://amazon.in" },
      { name: "Tata CLiQ", price: 4695, inStock: true, delivery: "2 Days", returnDays: 14, isBest: false, link: "https://tatacliq.com" },
      { name: "Myntra", price: 4995, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: false, link: "https://myntra.com" }
    ],
    priceHistory: {
      lowest30Days: 4299,
      highest30Days: 5995,
      averagePrice: 5100,
      trend: "downward",
      priceDropChance: 25,
      priceDropPrediction: "⚡ Price is ₹605 below historical average. Great value for genuine chronograph.",
      historyPoints: [
        { date: "18 Jul", price: 5995 },
        { date: "30 Jul", price: 5495 },
        { date: "08 Aug", price: 4895 },
        { date: "15 Aug", price: 4695 },
        { date: "Today", price: 4495 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Functional sub-dial chronograph with genuine leather strap from Titan's flagship Workwear collection under ₹4,500.",
    tradeOff: "Leather strap requires care around excessive water/sweat.",
    verifiedAgo: "Verified 5 mins ago",
    dataConfidence: 98,
    attributes: {
      build_quality: 92,
      style_design: 95,
      water_resistance: 82,
      battery_movement: 92
    }
  },
  {
    id: 503,
    title: "Casio Vintage Digital Gunmetal Stainless Steel Watch (A168WGG-1BDF, Illuminator)",
    brand: "Casio",
    category: "watch",
    price: 3495,
    mrp: 3995,
    rating: 4.7,
    reviewsCount: 9400,
    thumbnail: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon India", price: 3495, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://amazon.in" },
      { name: "Casio Store", price: 3995, inStock: true, delivery: "3 Days", returnDays: 7, isBest: false, link: "https://casio.com" }
    ],
    priceHistory: {
      lowest30Days: 3295,
      highest30Days: 3995,
      averagePrice: 3695,
      trend: "stable",
      priceDropChance: 20,
      priceDropPrediction: "Price is stable and rarely discounts more than ₹200. Safe to buy now.",
      historyPoints: [
        { date: "15 Jul", price: 3995 },
        { date: "28 Jul", price: 3795 },
        { date: "06 Aug", price: 3695 },
        { date: "14 Aug", price: 3495 },
        { date: "Today", price: 3495 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Iconic streetwear classic with 7-year battery life, EL backlight, and durable ion plating.",
    tradeOff: "Digital display rather than analog formal style.",
    verifiedAgo: "Verified 1 min ago",
    dataConfidence: 99,
    attributes: {
      build_quality: 96,
      style_design: 94,
      water_resistance: 85,
      battery_movement: 99
    }
  },

  // ==========================================
  // LAPTOPS
  // ==========================================
  {
    id: 101,
    title: "Lenovo LOQ 15 (Ryzen 7 7840HS, RTX 4050, 16GB RAM, 512GB SSD)",
    brand: "Lenovo",
    category: "laptop",
    price: 68990,
    mrp: 84990,
    rating: 4.5,
    reviewsCount: 1420,
    thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 68990, inStock: true, delivery: "Tomorrow, 2 PM", returnDays: 7, isBest: true, link: "https://amazon.in" },
      { name: "Flipkart", price: 69990, inStock: true, delivery: "2 Days", returnDays: 7, isBest: false, link: "https://flipkart.com" },
      { name: "Croma", price: 71490, inStock: true, delivery: "In-store pickup", returnDays: 15, isBest: false, link: "https://croma.com" }
    ],
    priceHistory: {
      lowest30Days: 67990,
      highest30Days: 73990,
      averagePrice: 71000,
      trend: "downward",
      priceDropChance: 15,
      priceDropPrediction: "🔥 Current price is near 60-day lowest record. Excellent value for RTX 4050.",
      historyPoints: [
        { date: "15 Jul", price: 73990 },
        { date: "28 Jul", price: 72500 },
        { date: "06 Aug", price: 71000 },
        { date: "14 Aug", price: 69990 },
        { date: "Today", price: 68990 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Current price (₹68,990) is within 1.4% of its 60-day all-time low. Excellent value for RTX 4050.",
    tradeOff: "Heavy chassis (2.4kg) and 6-hour modest battery.",
    verifiedAgo: "Verified 4 mins ago",
    dataConfidence: 98,
    attributes: {
      battery: 60,
      performance: 92,
      portability: 65,
      gaming: 88
    }
  },
  {
    id: 102,
    title: "ASUS Vivobook 15 OLED (Intel Core i5-13500H, 16GB, 512GB, 2.8K 120Hz)",
    brand: "ASUS",
    category: "laptop",
    price: 64990,
    mrp: 79990,
    rating: 4.4,
    reviewsCount: 980,
    thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Flipkart", price: 64990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://flipkart.com" },
      { name: "Amazon", price: 65490, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false, link: "https://amazon.in" }
    ],
    priceHistory: {
      lowest30Days: 63990,
      highest30Days: 68990,
      averagePrice: 66500,
      trend: "stable",
      priceDropChance: 25,
      priceDropPrediction: "Price is stabilized. Best in-class OLED display under ₹65k.",
      historyPoints: [
        { date: "15 Jul", price: 68990 },
        { date: "28 Jul", price: 67490 },
        { date: "06 Aug", price: 66000 },
        { date: "14 Aug", price: 64990 },
        { date: "Today", price: 64990 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Best in-class OLED display under ₹65k. Price is stabilized and reliable.",
    tradeOff: "Integrated graphics only, not suitable for AAA gaming.",
    verifiedAgo: "Verified 9 mins ago",
    dataConfidence: 96,
    attributes: {
      battery: 80,
      performance: 84,
      portability: 88,
      gaming: 45
    }
  },

  // ==========================================
  // SMARTPHONES
  // ==========================================
  {
    id: 201,
    title: "Nothing Phone (2a) 5G (8GB, 128GB, Dimensity 7200 Pro, Glyph Interface)",
    brand: "Nothing",
    category: "phone",
    price: 23999,
    mrp: 25999,
    rating: 4.5,
    reviewsCount: 3400,
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Flipkart", price: 23999, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://flipkart.com" },
      { name: "Amazon", price: 24499, inStock: true, delivery: "2 Days", returnDays: 7, isBest: false, link: "https://amazon.in" }
    ],
    priceHistory: {
      lowest30Days: 23999,
      highest30Days: 25999,
      averagePrice: 24800,
      trend: "downward",
      priceDropChance: 15,
      priceDropPrediction: "Lowest recorded price. Clean bloatware-free OS.",
      historyPoints: [
        { date: "15 Jul", price: 25999 },
        { date: "28 Jul", price: 24999 },
        { date: "06 Aug", price: 24499 },
        { date: "14 Aug", price: 23999 },
        { date: "Today", price: 23999 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Clean bloatware-free OS, best design and battery in ₹20-25k segment.",
    tradeOff: "No charger in box (45W sold separately).",
    verifiedAgo: "Verified 3 mins ago",
    dataConfidence: 97,
    attributes: {
      battery: 88,
      camera: 84,
      performance: 82,
      display: 88
    }
  },

  // ==========================================
  // HEADPHONES & AUDIO
  // ==========================================
  {
    id: 301,
    title: "Sony WH-CH720N Wireless Over-Ear Active Noise Cancelling Headphones",
    brand: "Sony",
    category: "headphones",
    price: 8990,
    mrp: 14990,
    rating: 4.5,
    reviewsCount: 5200,
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 8990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true, link: "https://amazon.in" },
      { name: "Flipkart", price: 9490, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false, link: "https://flipkart.com" }
    ],
    priceHistory: {
      lowest30Days: 8490,
      highest30Days: 10990,
      averagePrice: 9800,
      trend: "downward",
      priceDropChance: 20,
      priceDropPrediction: "Uses Sony V1 chip. Lowest price since Prime Day.",
      historyPoints: [
        { date: "15 Jul", price: 10990 },
        { date: "28 Jul", price: 9990 },
        { date: "06 Aug", price: 9490 },
        { date: "14 Aug", price: 8990 },
        { date: "Today", price: 8990 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Uses Sony V1 Integrated Processor for class-leading ANC under ₹10k.",
    tradeOff: "Earcups do not fold inwards (only swivel flat).",
    verifiedAgo: "Verified 6 mins ago",
    dataConfidence: 98,
    attributes: {
      anc: 88,
      sound: 86,
      battery: 92,
      comfort: 92
    }
  },

  // ==========================================
  // FASHION & APPAREL
  // ==========================================
  {
    id: 401,
    title: "Levis Men 100% Supima Pure Heavyweight Cotton Crew T-Shirt (220 GSM)",
    brand: "Levis",
    category: "clothing",
    price: 999,
    mrp: 1799,
    rating: 4.6,
    reviewsCount: 1800,
    thumbnail: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 999, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: true, link: "https://amazon.in" },
      { name: "Myntra", price: 1099, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: false, link: "https://myntra.com" }
    ],
    priceHistory: {
      lowest30Days: 899,
      highest30Days: 1299,
      averagePrice: 1100,
      trend: "stable",
      priceDropChance: 18,
      priceDropPrediction: "Stable price for 220 GSM heavyweight cotton.",
      historyPoints: [
        { date: "15 Jul", price: 1299 },
        { date: "28 Jul", price: 1199 },
        { date: "06 Aug", price: 1049 },
        { date: "14 Aug", price: 999 },
        { date: "Today", price: 999 }
      ]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Heavyweight 220 GSM Supima cotton that will not shrink or lose color in washes.",
    tradeOff: "Heavy GSM is warm for peak humid summer.",
    verifiedAgo: "Verified 7 mins ago",
    dataConfidence: 96,
    attributes: {
      fabric: 95,
      comfort: 94,
      durability: 90,
      fit: 88
    }
  }
];
