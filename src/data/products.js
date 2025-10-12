// website/src/data/products.js
// Default categories structure
export const defaultCategories = [
  { id: 'all', name: 'Semua Produk' },
  { id: 'kaos', name: 'Kaos Sablon' },
  { id: 'bordir', name: 'Bordir' },
  { id: 'banner', name: 'Banner & Spanduk' },
  { id: 'merchandise', name: 'Merchandise' },
];

// Helper to calculate categories with counts from products
export const calculateCategories = (products) => {
  const categoryCounts = {};
  
  products.forEach(product => {
    const cat = product.category || 'kaos';
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
  });

  return defaultCategories.map(cat => ({
    ...cat,
    count: cat.id === 'all' ? products.length : (categoryCounts[cat.id] || 0)
  }));
};

export const sortOptions = [
  { value: 'name', label: 'Nama A-Z' },
  { value: 'name-desc', label: 'Nama Z-A' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
];