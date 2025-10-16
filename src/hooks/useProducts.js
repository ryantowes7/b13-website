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

// Helper function to parse variants array
const parseVariants = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data;
  }
  return [];
};

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State untuk filter dan sort
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');

  // Products per page - maksimal 6 produk per halaman
  const productsPerPage = 6;

  // Fetch products and categories from CMS API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/content/products'),
          fetch('/api/content/product-categories')
        ]);
        
        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        
        if (productsData.success && productsData.products) {
          // Transform CMS data to match expected format
          const transformedProducts = productsData.products.map((product, index) => ({
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
            stockType: product.stockType || 'order',
            variants: parseVariants(product.variants),
            body: product.body || ''
          }));
          
          setAllProducts(transformedProducts);
        } else {
          throw new Error('Invalid products data format');
        }

        if (categoriesData.success && categoriesData.categories) {
          // Calculate product counts for each category
          const categoryCounts = {};
          productsData.products.forEach(product => {
            const cat = product.category || 'kaos';
            categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
          });

          // Transform categories with counts
          const transformedCategories = categoriesData.categories.map(cat => ({
            id: cat.slug,
            slug: cat.slug,
            name: cat.name,
            description: cat.description,
            banners: cat.banners || [],
            color: cat.color || 'blue',
            icon: cat.icon || 'Package',
            is_default: cat.is_default || false,
            count: cat.slug === 'all' ? productsData.products.length : (categoryCounts[cat.slug] || 0)
          }));

          setCategories(transformedCategories);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Gagal memuat data. Silakan coba lagi.');
        setAllProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Get current category data
  const currentCategory = useMemo(() => {
    return categories.find(cat => cat.slug === selectedCategory) || null;
  }, [categories, selectedCategory]);

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
    currentCategory,
    
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