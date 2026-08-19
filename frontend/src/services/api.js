const API_BASE_URL = 'http://127.0.0.1:8000/api';

const MOCK_CATEGORIES = [
  { id: 1, name: 'Choker Sets', slug: 'choker-sets', description: 'Royal antique gold finish chokers with pearls', image_url: '/images/prayoga_ruby_choker.jpg', icon_name: 'Crown', product_count: 2 },
  { id: 2, name: 'Pendant Necklaces', slug: 'pendant-necklaces', description: 'Temple gold pendants with pearl chains', image_url: '/images/prayoga_temple_pendant.jpg', icon_name: 'Gem', product_count: 1 },
  { id: 3, name: 'Long Pearl Malas', slug: 'long-pearl-malas', description: 'Multi-layer pearl strand mala necklaces', image_url: '/images/prayoga_pearl_mala.jpg', icon_name: 'Sparkles', product_count: 1 },
  { id: 4, name: 'Meenakari Collections', slug: 'meenakari-collections', description: 'Handcrafted pink lotus enamel meenakari', image_url: '/images/prayoga_pink_lotus.jpg', icon_name: 'Flower', product_count: 1 }
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Prayoga Choker Set",
    slug: "prayoga-choker-set",
    category_slug: "choker-sets",
    category_name: "Choker Sets",
    price: 199,
    discount_price: 169,
    metal_type: "Yellow Gold",
    karat: "22K",
    purity: "Gold Finish Micro Plated",
    weight_grams: 18.50,
    gemstone: "Ruby Red Square Stone & Pearl Drops",
    description: "Exquisite royal choker featuring a bold ruby red center stone framed by intricate peacocks and cascading pearl drops. Includes matching ear studs.",
    image_url: "/images/prayoga_ruby_choker.jpg",
    additional_images: ["/images/prayoga_ruby_choker.jpg"],
    stock: 25,
    is_featured: true,
    is_bestseller: true,
    rating: 4.95,
    review_count: 86
  },
  {
    id: 2,
    name: "Prayoga Temple Pendant Set",
    slug: "prayoga-temple-pendant-set",
    category_slug: "pendant-necklaces",
    category_name: "Pendant Necklaces",
    price: 179,
    discount_price: 149,
    metal_type: "Yellow Gold",
    karat: "22K",
    purity: "Antique Temple Gold Finish",
    weight_grams: 14.20,
    gemstone: "Pearl Beads & Green Ruby Accents",
    description: "Traditional temple design featuring a fan-shaped motif pendant on a single pearl strand. Comes with matching fan earrings.",
    image_url: "/images/prayoga_temple_pendant.jpg",
    additional_images: ["/images/prayoga_temple_pendant.jpg"],
    stock: 30,
    is_featured: true,
    is_bestseller: true,
    rating: 4.90,
    review_count: 64
  },
  {
    id: 3,
    name: "Prayoga Long Pearl Mala",
    slug: "prayoga-long-pearl-mala",
    category_slug: "long-pearl-malas",
    category_name: "Long Pearl Malas",
    price: 189,
    discount_price: 159,
    metal_type: "Yellow Gold",
    karat: "22K",
    purity: "Gold Finish Plated",
    weight_grams: 16.00,
    gemstone: "Natural Luster Pearls & Ruby Emerald Pendant",
    description: "A graceful long pearl necklace mala paired with a circular royal motif pendant embellished with ruby red and green accent stones.",
    image_url: "/images/prayoga_pearl_mala.jpg",
    additional_images: ["/images/prayoga_pearl_mala.jpg"],
    stock: 20,
    is_featured: true,
    is_bestseller: false,
    rating: 4.88,
    review_count: 42
  },
  {
    id: 4,
    name: "Prayoga Ruby Floral Choker",
    slug: "prayoga-ruby-floral-choker",
    category_slug: "choker-sets",
    category_name: "Choker Sets",
    price: 159,
    discount_price: 129,
    metal_type: "Yellow Gold",
    karat: "22K",
    purity: "Micro Gold Plated",
    weight_grams: 12.80,
    gemstone: "Ruby Floral Centerpiece & Pearl String",
    description: "Delicate pearl choker necklace featuring an asymmetrical ruby floral motif with gold ghungroo drops and matching floral stud earrings.",
    image_url: "/images/prayoga_ruby_floral.jpg",
    additional_images: ["/images/prayoga_ruby_floral.jpg"],
    stock: 18,
    is_featured: false,
    is_bestseller: true,
    rating: 4.92,
    review_count: 53
  },
  {
    id: 5,
    name: "Prayoga Pink Lotus Pendant Set",
    slug: "prayoga-pink-lotus-pendant-set",
    category_slug: "meenakari-collections",
    category_name: "Meenakari Collections",
    price: 169,
    discount_price: 139,
    metal_type: "Yellow Gold",
    karat: "22K",
    purity: "Enamel & Gold Plated",
    weight_grams: 11.50,
    gemstone: "Pink Enamel Meenakari Lotus",
    description: "Vibrant and poetic Lotus motif necklace with hand-painted pink Meenakari enamel lotus petals spaced along a gold chain, complete with matching lotus ear studs.",
    image_url: "/images/prayoga_pink_lotus.jpg",
    additional_images: ["/images/prayoga_pink_lotus.jpg"],
    stock: 35,
    is_featured: true,
    is_bestseller: true,
    rating: 5.0,
    review_count: 91
  }
];

export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories/`);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    return MOCK_CATEGORIES;
  }
};

export const fetchProducts = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/products/?${query}`);
    if (!res.ok) throw new Error('API failed');
    const data = await res.json();
    return data.results || data;
  } catch (err) {
    let items = [...MOCK_PRODUCTS];
    if (params.category && params.category !== 'all') {
      items = items.filter(p => p.category_slug === params.category);
    }
    if (params.featured === 'true') {
      items = items.filter(p => p.is_featured);
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return items;
  }
};

export const fetchProductBySlug = async (slug) => {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}/`);
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (err) {
    const found = MOCK_PRODUCTS.find(p => p.slug === slug);
    return found || MOCK_PRODUCTS[0];
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    if (!res.ok) throw new Error('API order failed');
    return await res.json();
  } catch (err) {
    return {
      order_number: 'PRYG-' + Math.floor(100000 + Math.random() * 900000),
      status: 'CONFIRMED',
      created_at: new Date().toISOString(),
      ...orderData
    };
  }
};

export const createInquiry = async (inquiryData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/inquiries/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData)
    });
    return await res.json();
  } catch (err) {
    return { success: true, message: 'Inquiry received successfully!' };
  }
};
