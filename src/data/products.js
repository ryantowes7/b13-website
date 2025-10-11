// website/src/data/products.js
export const categories = [
  { id: 'all', name: 'Semua Produk', count: 24 },
  { id: 'kaos', name: 'Kaos Sablon', count: 8 },
  { id: 'bordir', name: 'Bordir', count: 6 },
  { id: 'banner', name: 'Banner & Spanduk', count: 5 },
  { id: 'merchandise', name: 'Merchandise', count: 5 },
];

export const products = [
  {
    id: 1,
    name: 'Kaos Polo Sablon',
    category: 'kaos',
    price: 85000,
    originalPrice: 95000,
    image: '/images/products/kaos-polo.jpg',
    images: ['/images/products/kaos-polo-1.jpg', '/images/products/kaos-polo-2.jpg'],
    description: 'Kaos polo bahan cotton pique dengan sablon rubber berkualitas tinggi yang tahan lama',
    features: ['Bahan Cotton Pique', 'Sablon Rubber', 'Tahan Lama', 'Berbagai Warna'],
    katalog: '/katalog/kaos-polo.pdf',
    tags: ['cotton', 'rubber', 'premium', 'kaos'],
    inStock: true,
    minOrder: 12,
    rating: 4.5,
    reviewCount: 24
  },
  {
    id: 2,
    name: 'Jaket Bordir Logo',
    category: 'bordir',
    price: 250000,
    originalPrice: 299000,
    image: '/images/products/jaket-bordir.jpg',
    images: ['/images/products/jaket-bordir-1.jpg', '/images/products/jaket-bordir-2.jpg'],
    description: 'Jaket parasut dengan bordir logo komputer presisi tinggi untuk kualitas terbaik',
    features: ['Bahan Parasut', 'Bordir Komputer', 'Water Resistant', 'Custom Logo'],
    katalog: '/katalog/jaket-bordir.pdf',
    tags: ['jaket', 'bordir', 'parasut', 'custom'],
    inStock: true,
    minOrder: 6,
    rating: 4.8,
    reviewCount: 18
  },
  // ... tambahkan produk lainnya
];

export const sortOptions = [
  { value: 'name', label: 'Nama A-Z' },
  { value: 'name-desc', label: 'Nama Z-A' },
  { value: 'price-low', label: 'Harga Terendah' },
  { value: 'price-high', label: 'Harga Tertinggi' },
  { value: 'rating', label: 'Rating Tertinggi' },
];