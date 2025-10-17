// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products dari API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/content/products');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.products) {
            setProducts(data.products);
          }
        }
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  const featuredProduct = products.length > 0 ? products[0] : null;
  const gridProducts = products.slice(1); // Remaining products for grid

  const getStockTypeBadge = (stockType) => {
    if (stockType === 'ready') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Ready Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
        By Order
      </span>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600 text-sm">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                Product Updates
              </h2>
              <p className="text-neutral-600 text-base">
                Stay informed with our latest product releases and updates
              </p>
            </div>
            <Link 
              href="/produk" 
              className="hidden md:inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors group"
            >
              View all
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-base">No products available yet</p>
          </div>
        ) : (
          <>
            {/* Featured Product - Large Card */}
            {featuredProduct && (
              <Link href={`/produk/${featuredProduct.slug}`} className="block mb-8 group">
                <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-2/5 relative bg-neutral-100 overflow-hidden">
                      <div className="aspect-[4/3] md:aspect-auto md:h-full">
                        {featuredProduct.image ? (
                          <img 
                            src={featuredProduct.image} 
                            alt={featuredProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                            <span className="text-neutral-400 text-sm">No image</span>
                          </div>
                        )}
                      </div>
                      {/* Featured Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-semibold bg-primary-600 text-white shadow-sm">
                          Featured
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          {featuredProduct.category && (
                            <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-neutral-100 text-neutral-700 capitalize">
                              {featuredProduct.category}
                            </span>
                          )}
                          {getStockTypeBadge(featuredProduct.stockType)}
                        </div>
                        
                        <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                          {featuredProduct.name || featuredProduct.title}
                        </h3>
                        
                        {featuredProduct.description && (
                          <p className="text-neutral-600 text-sm md:text-base line-clamp-2 mb-6">
                            {featuredProduct.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          Read more
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid Products - 5-6 per row */}
            {gridProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {gridProducts.map((product, index) => (
                  <Link 
                    href={`/produk/${product.slug}`}
                    key={product.slug || index}
                    className="group"
                  >
                    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all duration-300">
                      {/* Image */}
                      <div className="relative bg-neutral-100 overflow-hidden">
                        <div className="aspect-[3/2]">
                          {product.image ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
                              <span className="text-neutral-400 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-3 flex-wrap">
                          {product.category && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-neutral-100 text-neutral-700 capitalize">
                              {product.category}
                            </span>
                          )}
                          {getStockTypeBadge(product.stockType)}
                        </div>

                        {/* Product Name */}
                        <h4 className="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[2.5rem]">
                          {product.name || product.title}
                        </h4>

                        {/* Read more link */}
                        <div className="flex items-center gap-1 text-primary-600 text-xs font-medium group-hover:gap-2 transition-all">
                          Read more
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile View All Button */}
            <div className="mt-8 text-center md:hidden">
              <Link 
                href="/produk" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-sm rounded-lg transition-colors"
              >
                View all products
                <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}