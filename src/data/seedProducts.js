/**
 * DECIDE / ShopSense AI - Multi-Store Grounded Product Catalog
 * Includes real multi-marketplace pricing (Amazon, Flipkart, Croma),
 * price history graphs, AI final verdicts, and verification badges.
 */

export const SEED_PRODUCTS = [
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
      { name: "Amazon", price: 68990, inStock: true, delivery: "Tomorrow, 2 PM", returnDays: 7, isBest: true },
      { name: "Flipkart", price: 69990, inStock: true, delivery: "2 Days", returnDays: 7, isBest: false },
      { name: "Croma", price: 71490, inStock: true, delivery: "In-store pickup", returnDays: 15, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 67990,
      highest30Days: 73990,
      trend: "downward",
      points: [73990, 72500, 71000, 69990, 68990]
    },
    verdict: "BUY NOW",
    verdictType: "buy", // buy | wait | avoid
    verdictReason: "Current price (₹68,990) is within 1.4% of its 60-day all-time low. Excellent value for RTX 4050.",
    verifiedAgo: "Verified 4 mins ago",
    dataConfidence: 98,
    attributes: {
      battery_hours: 6.0,
      weight_kg: 2.4,
      performance_score: 92,
      gaming_score: 88,
      portability_score: 65,
      display_score: 75,
      build_quality: 82,
      warranty_years: 1,
      ram_expandable: "Up to 32GB"
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
      { name: "Amazon", price: 65490, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false },
      { name: "Flipkart", price: 64990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "Reliance Digital", price: 67990, inStock: true, delivery: "3 Days", returnDays: 10, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 63990,
      highest30Days: 68990,
      trend: "stable",
      points: [68990, 67490, 66000, 64990, 64990]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Best in-class OLED display under ₹65k. Price is stabilized and reliable.",
    verifiedAgo: "Verified 9 mins ago",
    dataConfidence: 96,
    attributes: {
      battery_hours: 8.5,
      weight_kg: 1.7,
      performance_score: 84,
      gaming_score: 45,
      portability_score: 88,
      display_score: 98,
      build_quality: 80,
      warranty_years: 1,
      ram_expandable: "Yes"
    }
  },
  {
    id: 103,
    title: "Acer Swift Go 14 OLED (Intel Core Ultra 5 125H, 16GB, AI Boost NPU)",
    brand: "Acer",
    category: "laptop",
    price: 69990,
    mrp: 89990,
    rating: 4.6,
    reviewsCount: 650,
    thumbnail: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 69990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "Flipkart", price: 71990, inStock: false, delivery: "Out of Stock", returnDays: 7, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 69990,
      highest30Days: 74990,
      trend: "downward",
      points: [74990, 73990, 71990, 70990, 69990]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Includes latest Core Ultra AI NPU. Highest battery life in this performance segment.",
    verifiedAgo: "Verified 2 mins ago",
    dataConfidence: 97,
    attributes: {
      battery_hours: 11.5,
      weight_kg: 1.32,
      performance_score: 86,
      gaming_score: 55,
      portability_score: 96,
      display_score: 95,
      build_quality: 88,
      warranty_years: 2,
      ram_expandable: "No (LPDDR5X)"
    }
  },
  {
    id: 104,
    title: "HP Victus 15 (Ryzen 5 5600H, RTX 3050, 16GB, 512GB SSD)",
    brand: "HP",
    category: "laptop",
    price: 58990,
    mrp: 72000,
    rating: 4.2,
    reviewsCount: 2100,
    thumbnail: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 58990, inStock: true, delivery: "2 Days", returnDays: 7, isBest: true },
      { name: "Flipkart", price: 59490, inStock: true, delivery: "3 Days", returnDays: 7, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 54990,
      highest30Days: 61990,
      trend: "upward",
      points: [54990, 56000, 57490, 58990, 58990]
    },
    verdict: "WAIT FOR SALE",
    verdictType: "wait",
    verdictReason: "Historically drops to ₹54,990 during monthly weekend sales. Wait if not urgent.",
    verifiedAgo: "Verified 15 mins ago",
    dataConfidence: 95,
    attributes: {
      battery_hours: 4.5,
      weight_kg: 2.37,
      performance_score: 78,
      gaming_score: 79,
      portability_score: 60,
      display_score: 68,
      build_quality: 74,
      warranty_years: 1,
      ram_expandable: "Up to 32GB"
    }
  },
  {
    id: 105,
    title: "Apple MacBook Air M1 (8GB, 256GB SSD, 13.3-inch Retina Display)",
    brand: "Apple",
    category: "laptop",
    price: 65990,
    mrp: 92900,
    rating: 4.8,
    reviewsCount: 8900,
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 65990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "Flipkart", price: 66990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false },
      { name: "Imagine Store", price: 69900, inStock: true, delivery: "Same Day", returnDays: 14, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 64990,
      highest30Days: 69900,
      trend: "stable",
      points: [69900, 68000, 66990, 65990, 65990]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Best battery (15h) & build quality in the market. 8GB RAM is non-upgradable.",
    verifiedAgo: "Verified 1 min ago",
    dataConfidence: 99,
    attributes: {
      battery_hours: 15.0,
      weight_kg: 1.29,
      performance_score: 85,
      gaming_score: 40,
      portability_score: 99,
      display_score: 92,
      build_quality: 98,
      warranty_years: 1,
      ram_expandable: "No"
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
      { name: "Flipkart", price: 23999, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "Amazon", price: 24499, inStock: true, delivery: "2 Days", returnDays: 7, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 23999,
      highest30Days: 25999,
      trend: "downward",
      points: [25999, 24999, 24499, 23999, 23999]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Clean bloatware-free OS, best design and battery in ₹20-25k segment.",
    verifiedAgo: "Verified 3 mins ago",
    dataConfidence: 97,
    attributes: {
      battery_hours: 14.5,
      performance_score: 82,
      camera_score: 84,
      display_score: 88,
      build_quality: 86,
      gaming_score: 78,
      os_experience: "Nothing OS 2.5",
      charging_speed: "45W"
    }
  },
  {
    id: 202,
    title: "OnePlus Nord CE4 5G (8GB, 128GB, 100W SuperVOOC Charger in Box)",
    brand: "OnePlus",
    category: "phone",
    price: 24999,
    mrp: 26999,
    rating: 4.4,
    reviewsCount: 4200,
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Amazon", price: 24999, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "OnePlus Store", price: 24999, inStock: true, delivery: "2 Days", returnDays: 15, isBest: true }
    ],
    priceHistory: {
      lowest30Days: 24999,
      highest30Days: 26999,
      trend: "stable",
      points: [26999, 25999, 24999, 24999, 24999]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Fastest 100W charging in the segment with massive 5500mAh battery.",
    verifiedAgo: "Verified 5 mins ago",
    dataConfidence: 98,
    attributes: {
      battery_hours: 16.0,
      performance_score: 85,
      camera_score: 80,
      display_score: 86,
      build_quality: 82,
      gaming_score: 82,
      os_experience: "OxygenOS 14",
      charging_speed: "100W"
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
      { name: "Amazon", price: 8990, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: true },
      { name: "Flipkart", price: 9490, inStock: true, delivery: "Tomorrow", returnDays: 7, isBest: false },
      { name: "Sony Center", price: 9990, inStock: true, delivery: "Same Day", returnDays: 10, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 8490,
      highest30Days: 10990,
      trend: "downward",
      points: [10990, 9990, 9490, 8990, 8990]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Uses Sony V1 Integrated Processor for class-leading ANC under ₹10k.",
    verifiedAgo: "Verified 6 mins ago",
    dataConfidence: 98,
    attributes: {
      battery_hours: 35.0,
      anc_score: 88,
      sound_quality: 86,
      comfort_score: 92,
      portability_score: 80,
      anc_modes: "Dual Sensor V1",
      weight_g: 192
    }
  },

  // ==========================================
  // FASHION & CLOTHING
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
      { name: "Amazon", price: 999, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: true },
      { name: "Myntra", price: 1099, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: false },
      { name: "Ajio", price: 1149, inStock: true, delivery: "2 Days", returnDays: 10, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 899,
      highest30Days: 1299,
      trend: "stable",
      points: [1299, 1199, 1049, 999, 999]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Heavyweight 220 GSM Supima cotton that will not shrink or lose color in washes.",
    verifiedAgo: "Verified 7 mins ago",
    dataConfidence: 96,
    attributes: {
      fabric_quality: 95,
      comfort_score: 94,
      durability_score: 90,
      breathability_score: 92,
      fit_score: 88,
      gsm_weight: "220 GSM",
      fabric_type: "100% Supima Cotton"
    }
  },
  {
    id: 402,
    title: "The Souled Store Supima Minimal Drop-Shoulder Oversized Tee",
    brand: "The Souled Store",
    category: "clothing",
    price: 849,
    mrp: 1299,
    rating: 4.5,
    reviewsCount: 3100,
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    stores: [
      { name: "Souled Store App", price: 849, inStock: true, delivery: "2 Days", returnDays: 30, isBest: true },
      { name: "Myntra", price: 899, inStock: true, delivery: "Tomorrow", returnDays: 14, isBest: false }
    ],
    priceHistory: {
      lowest30Days: 799,
      highest30Days: 999,
      trend: "stable",
      points: [999, 949, 899, 849, 849]
    },
    verdict: "BUY NOW",
    verdictType: "buy",
    verdictReason: "Trending streetwear drop-shoulder fit with pre-shrunk bio-washed cotton.",
    verifiedAgo: "Verified 10 mins ago",
    dataConfidence: 95,
    attributes: {
      fabric_quality: 92,
      comfort_score: 96,
      durability_score: 86,
      breathability_score: 90,
      fit_score: 95,
      gsm_weight: "240 GSM",
      fabric_type: "Bio-Washed Cotton"
    }
  }
];
