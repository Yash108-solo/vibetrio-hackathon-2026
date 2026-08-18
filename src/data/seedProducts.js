/**
 * DECIDE - Curated Multi-Category Product Catalog
 * Expanded to cover Laptops, Phones, Audio, Fashion & Clothing, and Smartwatches
 */

export const SEED_PRODUCTS = [
  // ==========================================
  // LAPTOPS
  // ==========================================
  {
    id: 101,
    title: "Lenovo LOQ 15 (Ryzen 7 7840HS, RTX 4050, 16GB)",
    brand: "Lenovo",
    category: "laptop",
    price: 68990,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 6.0,
      weight_kg: 2.4,
      performance_score: 92,
      gaming_score: 88,
      portability_score: 65,
      display_score: 75,
      build_quality: 82
    }
  },
  {
    id: 102,
    title: "ASUS Vivobook 15 OLED (Intel Core i5-13500H, 16GB, 512GB)",
    brand: "ASUS",
    category: "laptop",
    price: 64990,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 8.5,
      weight_kg: 1.7,
      performance_score: 84,
      gaming_score: 45,
      portability_score: 88,
      display_score: 98,
      build_quality: 80
    }
  },
  {
    id: 103,
    title: "Acer Swift Go 14 OLED (Intel Core Ultra 5 125H, 16GB, AI Boost)",
    brand: "Acer",
    category: "laptop",
    price: 69990,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 11.5,
      weight_kg: 1.32,
      performance_score: 86,
      gaming_score: 55,
      portability_score: 96,
      display_score: 95,
      build_quality: 88
    }
  },
  {
    id: 104,
    title: "HP Victus 15 (Ryzen 5 5600H, RTX 3050, 16GB, 512GB)",
    brand: "HP",
    category: "laptop",
    price: 58990,
    rating: 4.2,
    thumbnail: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 4.5,
      weight_kg: 2.37,
      performance_score: 78,
      gaming_score: 79,
      portability_score: 60,
      display_score: 68,
      build_quality: 74
    }
  },
  {
    id: 105,
    title: "Apple MacBook Air M1 (8GB, 256GB SSD, 13.3-inch Retina)",
    brand: "Apple",
    category: "laptop",
    price: 65990,
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 15.0,
      weight_kg: 1.29,
      performance_score: 85,
      gaming_score: 40,
      portability_score: 99,
      display_score: 92,
      build_quality: 98
    }
  },

  // ==========================================
  // SMARTPHONES
  // ==========================================
  {
    id: 201,
    title: "Nothing Phone (2a) 5G (8GB, 128GB, Dimensity 7200 Pro)",
    brand: "Nothing",
    category: "phone",
    price: 23999,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 14.5,
      performance_score: 82,
      camera_score: 84,
      display_score: 88,
      build_quality: 86,
      gaming_score: 78
    }
  },
  {
    id: 202,
    title: "OnePlus Nord CE4 5G (8GB, 128GB, 100W SuperVOOC)",
    brand: "OnePlus",
    category: "phone",
    price: 24999,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 16.0,
      performance_score: 85,
      camera_score: 80,
      display_score: 86,
      build_quality: 82,
      gaming_score: 82
    }
  },
  {
    id: 203,
    title: "POCO X6 Pro 5G (Dimensity 8300-Ultra, 12GB, 512GB)",
    brand: "POCO",
    category: "phone",
    price: 26999,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 12.0,
      performance_score: 95,
      camera_score: 76,
      display_score: 92,
      build_quality: 80,
      gaming_score: 96
    }
  },

  // ==========================================
  // HEADPHONES & AUDIO
  // ==========================================
  {
    id: 301,
    title: "Sony WH-CH720N Wireless Over-Ear Active Noise Cancelling",
    brand: "Sony",
    category: "headphones",
    price: 8990,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 35.0,
      anc_score: 88,
      sound_quality: 86,
      comfort_score: 92,
      portability_score: 80
    }
  },
  {
    id: 302,
    title: "Soundcore by Anker Space One (Hi-Res Audio, Hybrid ANC)",
    brand: "Anker",
    category: "headphones",
    price: 7999,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 40.0,
      anc_score: 86,
      sound_quality: 84,
      comfort_score: 85,
      portability_score: 88
    }
  },

  // ==========================================
  // FASHION, T-SHIRTS & PANTS (NEW!)
  // ==========================================
  {
    id: 401,
    title: "Levis Men 100% Supima Pure Heavyweight Cotton Crew T-Shirt",
    brand: "Levis",
    category: "clothing",
    price: 999,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop&q=80",
    attributes: {
      fabric_quality: 95,
      comfort_score: 94,
      durability_score: 90,
      breathability_score: 92,
      fit_score: 88
    }
  },
  {
    id: 402,
    title: "Souled Store Supima Minimal Oversized Drop-Shoulder Tee",
    brand: "The Souled Store",
    category: "clothing",
    price: 849,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=80",
    attributes: {
      fabric_quality: 92,
      comfort_score: 96,
      durability_score: 86,
      breathability_score: 90,
      fit_score: 95
    }
  },
  {
    id: 403,
    title: "Allen Solly Premium Regular Fit Solid Polo T-Shirt",
    brand: "Allen Solly",
    category: "clothing",
    price: 1199,
    rating: 4.3,
    thumbnail: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&auto=format&fit=crop&q=80",
    attributes: {
      fabric_quality: 86,
      comfort_score: 84,
      durability_score: 92,
      breathability_score: 82,
      fit_score: 85
    }
  },
  {
    id: 404,
    title: "Zara Men Minimalist Relaxed Fit Linen Blend Chinos",
    brand: "Zara",
    category: "clothing",
    price: 2790,
    rating: 4.4,
    thumbnail: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    attributes: {
      fabric_quality: 90,
      comfort_score: 95,
      durability_score: 82,
      breathability_score: 98,
      fit_score: 92
    }
  },
  {
    id: 405,
    title: "Roadster Men Solid Cotton Cargo Jogger Pants",
    brand: "Roadster",
    category: "clothing",
    price: 1299,
    rating: 4.2,
    thumbnail: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop&q=80",
    attributes: {
      fabric_quality: 80,
      comfort_score: 88,
      durability_score: 88,
      breathability_score: 84,
      fit_score: 86
    }
  }
];
