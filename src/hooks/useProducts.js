import { useState, useMemo, useEffect } from 'react';
import { calculateCategories } from '@/data/products';

// Helper function to parse price from CMS format
const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (!priceString) return 0;
  // Remove \"Rp\", \".\", and spaces, then convert to number
  return parseInt(priceString.replace(/[Rp\s.]/g, ''), 10) || 0;
};

// Helper function to parse features/tags array
const parseArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    // Handle both [{item: \"value\"}] and [\"value\"] formats
    return data.map(item => {
      if (typeof item === 'object' && item.item) return item.item;
      if (typeof item === 'string') return item;
      return String(item);
    });
  }
  return [];
};

// Helper function to parse images array
const parseImages = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'object' && item.url) return item.url;
      if (typeof item === 'string') return item;
      return String(item);
    });
  }
  return [];
};

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk filter dan sort
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  // Products per page
  const productsPerPage = 9;

  // Fetch products from CMS API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch from CMS API
        const response = await fetch('/api/content/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (data.success && data.products) {
          // Transform CMS data to match expected format
          const transformedProducts = data.products.map((product, index) => ({
            id: index + 1,
            slug: product.slug,
            name: product.name || 'Untitled Product',
            category: product.category || 'kaos',
            price: parsePrice(product.price),
            originalPrice: parsePrice(product.originalPrice),
            image: product.image || '/uploads/placeholder.jpg',
            images: parseImages(product.images),
            description: product.description || '',
            features: parseArray(product.features),
            katalog: product.katalog || '',
            tags: parseArray(product.tags),
            inStock: product.inStock !== false,
            minOrder: product.minOrder || 1,
            rating: parseFloat(product.rating) || 0,
            reviewCount: parseInt(product.reviewCount) || 0,
            body: product.body || ''
          }));
          
          setAllProducts(transformedProducts);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk. Silakan coba lagi.');
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products berdasarkan kategori dan pencarian
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [allProducts, selectedCategory, searchTerm]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Calculate categories with counts
  const categories = useMemo(() => {
    return calculateCategories(allProducts);
  }, [allProducts]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  return {
    // State
    products: paginatedProducts,
    allProducts: sortedProducts,
    loading,
    error,
    categories,
    
    // Filter state
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    
    // Pagination state
    currentPage,
    setCurrentPage,
    totalPages,
    productsPerPage,
    
    // View state
    viewMode,
    setViewMode,
    
    // Stats
    totalProducts: sortedProducts.length,
    showingProducts: paginatedProducts.length,
  };
};