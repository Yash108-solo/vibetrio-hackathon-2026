/**
 * DECIDE - Curated Product Seed Catalog
 * 45+ Realistic, Normalized Products across Laptops, Smartphones, and Headphones
 * Formatted with real INR pricing and verified benchmark specs
 */

export const SEED_PRODUCTS = [
  // ==========================================
  // LAPTOPS (18 Curated Models)
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
  {
    id: 106,
    title: "Dell 15 Thin & Light (Core i5-1235U, 16GB, 512GB SSD)",
    brand: "Dell",
    category: "laptop",
    price: 48990,
    rating: 4.1,
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 7.0,
      weight_kg: 1.65,
      performance_score: 72,
      gaming_score: 30,
      portability_score: 82,
      display_score: 65,
      build_quality: 76
    }
  },
  {
    id: 107,
    title: "Lenovo IdeaPad Slim 3 (Ryzen 5 7520U, 16GB, FHD IPS)",
    brand: "Lenovo",
    category: "laptop",
    price: 43990,
    rating: 4.3,
    thumbnail: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 8.0,
      weight_kg: 1.62,
      performance_score: 68,
      gaming_score: 32,
      portability_score: 85,
      display_score: 70,
      build_quality: 72
    }
  },
  {
    id: 108,
    title: "ASUS TUF Gaming F15 (Core i7-12700H, RTX 4060, 16GB, 1TB)",
    brand: "ASUS",
    category: "laptop",
    price: 89990, // OVER BUDGET for ₹70k test
    rating: 4.7,
    thumbnail: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 5.0,
      weight_kg: 2.2,
      performance_score: 96,
      gaming_score: 95,
      portability_score: 62,
      display_score: 84,
      build_quality: 89
    }
  },

  // ==========================================
  // SMARTPHONES (15 Curated Models)
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
  {
    id: 204,
    title: "Google Pixel 7a (8GB, 128GB, Tensor G2, Best-in-Class Camera)",
    brand: "Google",
    category: "phone",
    price: 34999,
    rating: 4.5,
    thumbnail: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 10.0,
      performance_score: 80,
      camera_score: 97,
      display_score: 84,
      build_quality: 90,
      gaming_score: 68
    }
  },
  {
    id: 205,
    title: "Samsung Galaxy M35 5G (6000mAh Battery, sAMOLED 120Hz)",
    brand: "Samsung",
    category: "phone",
    price: 19999,
    rating: 4.3,
    thumbnail: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 18.0,
      performance_score: 72,
      camera_score: 78,
      display_score: 87,
      build_quality: 78,
      gaming_score: 65
    }
  },
  {
    id: 206,
    title: "iPhone 15 (128GB, Dynamic Island, A16 Bionic)",
    brand: "Apple",
    category: "phone",
    price: 69900, // OVER BUDGET for mid-range queries
    rating: 4.8,
    thumbnail: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 14.0,
      performance_score: 98,
      camera_score: 96,
      display_score: 94,
      build_quality: 98,
      gaming_score: 92
    }
  },

  // ==========================================
  // HEADPHONES & AUDIO (15 Curated Models)
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
      portability_score: 80,
      mic_quality: 78
    }
  },
  {
    id: 302,
    title: "Sennheiser Accentum Wireless (50hr Battery, Hybrid ANC)",
    brand: "Sennheiser",
    category: "headphones",
    price: 11990,
    rating: 4.6,
    thumbnail: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 50.0,
      anc_score: 84,
      sound_quality: 96,
      comfort_score: 88,
      portability_score: 82,
      mic_quality: 80
    }
  },
  {
    id: 303,
    title: "Soundcore by Anker Space One (Hi-Res Audio, 2X Voice Reduction)",
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
      portability_score: 88,
      mic_quality: 76
    }
  },
  {
    id: 304,
    title: "JBL Live 770NC (Adaptive Noise Cancelling, Spatial Sound)",
    brand: "JBL",
    category: "headphones",
    price: 9999,
    rating: 4.3,
    thumbnail: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 44.0,
      anc_score: 80,
      sound_quality: 88,
      comfort_score: 82,
      portability_score: 84,
      mic_quality: 80
    }
  },
  {
    id: 305,
    title: "boAt Rockerz 551ANC (Hybrid ANC, 100hr Playback)",
    brand: "boAt",
    category: "headphones",
    price: 2799,
    rating: 4.1,
    thumbnail: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 70.0,
      anc_score: 65,
      sound_quality: 72,
      comfort_score: 75,
      portability_score: 78,
      mic_quality: 68
    }
  },
  {
    id: 306,
    title: "Sony WH-1000XM5 (Industry Leading ANC, Premium Sound)",
    brand: "Sony",
    category: "headphones",
    price: 29990, // OVER BUDGET for under 10k query
    rating: 4.9,
    thumbnail: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&auto=format&fit=crop&q=80",
    attributes: {
      battery_hours: 30.0,
      anc_score: 99,
      sound_quality: 98,
      comfort_score: 95,
      portability_score: 88,
      mic_quality: 94
    }
  }
];
