// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

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

  // Auto-play carousel
  useEffect(() => {
    if (products.length > 3) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = carouselProducts.length - 4;
          if (maxIndex <= 0) return 0;
          return (prev + 1) % (maxIndex + 1);
        });
      }, 3000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [products.length]);

  const featuredProduct = products.length > 0 ? products[0] : null;
  const secondProduct = products.length > 1 ? products[1] : null;
  const carouselProducts = products.slice(2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (carouselProducts.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (carouselProducts.length - 2)) % (carouselProducts.length - 2));
  };

  const getStockTypeBadge = (stockType) => {
    if (stockType === 'ready') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500/90 text-white backdrop-blur-md shadow-lg">
          Ready Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/90 text-white backdrop-blur-md shadow-lg">
        By Order
      </span>
    );
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 text-lg font-medium">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-neutral-50 py-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
            Product Updates
          </h2>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Discover our latest collection of premium products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-xl">Belum ada produk yang tersedia</p>
          </div>
        ) : (
          <>
            {/* Featured Section - Featured Product + 1 Product */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              {/* Featured Product - Besar */}
              {featuredProduct && (
                <Link href={`/produk/${featuredProduct.slug}`} className="lg:col-span-2 group">
                  <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      {featuredProduct.image ? (
                        <img 
                          src={featuredProduct.image} 
                          alt={featuredProduct.name}
                          className="w-full h-full object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100"></div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>
                    
                    {/* Badges - Top Corners */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      {/* Category Badge - Kiri Atas */}
                      {featuredProduct.category && (
                        <span className="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                          {featuredProduct.category}
                        </span>
                      )}
                      {/* Stock Type Badge - Kanan Atas */}
                      {getStockTypeBadge(featuredProduct.stockType)}
                    </div>
                    
                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                      {/* Product Name */}
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
                        {featuredProduct.name || featuredProduct.title}
                      </h3>
                      
                      {/* Description */}
                      {featuredProduct.description && (
                        <p className="text-white/90 text-base md:text-lg mb-4 line-clamp-2">
                          {featuredProduct.description}
                        </p>
                      )}
                      
                      {/* Read More Link - Kanan Bawah */}
                      <div className="flex justify-end">
                        <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                          Detail
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Second Product */}
              {secondProduct && (
                <Link href={`/produk/${secondProduct.slug}`} className="group">
                  <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      {secondProduct.image ? (
                        <img 
                          src={secondProduct.image} 
                          alt={secondProduct.name}
                          className="w-full h-full object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-secondary-100 to-primary-100"></div>
                      )}
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Badges - Top Corners */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                      {/* Category Badge - Kiri Atas */}
                      {secondProduct.category && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                          {secondProduct.category}
                        </span>
                      )}
                      {/* Stock Type Badge - Kanan Atas */}
                      {getStockTypeBadge(secondProduct.stockType)}
                    </div>

                    {/* Content - Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      {/* Product Name */}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 group-hover:text-primary-300 transition-colors">
                        {secondProduct.name || secondProduct.title}
                      </h3>
                      
                      {/* Read More Link - Kanan Bawah */}
                      <div className="flex justify-end">
                        <span className="inline-flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-3 transition-all">
                          Detail
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {/* Carousel Section */}
            {carouselProducts.length > 0 && (
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex gap-6 transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
                  >
                    {carouselProducts.map((product, index) => (
                      <Link 
                        href={`/produk/${product.slug}`}
                        key={product.slug || index} 
                        className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 group"
                        style={{ minWidth: 'calc(25% - 18px)' }}
                      >
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                          {/* Image */}
                          <div className="absolute inset-0">
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
                            )}
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                          </div>
                          
                          {/* Badges - Top Corners */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            {/* Category Badge - Kiri Atas */}
                            {product.category && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                                {product.category}
                              </span>
                            )}
                            {/* Stock Type Badge - Kanan Atas */}
                            {getStockTypeBadge(product.stockType)}
                          </div>
                          
                          {/* Content - Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            {/* Product Name */}
                            <h4 className="text-xl font-bold text-white mb-6 group-hover:text-primary-300 transition-colors line-clamp-2">
                              {product.name || product.title}
                            </h4>
                            
                            {/* Read More Link - Kanan Bawah */}
                            <div className="flex justify-end">
                              <span className="inline-flex items-center gap-1.5 text-white font-semibold text-sm group-hover:gap-2.5 transition-all">
                                Read more
                                <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {carouselProducts.length > 4 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white shadow-2xl rounded-full p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={28} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white shadow-2xl rounded-full p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Next"
                    >
                      <ChevronRight size={28} strokeWidth={2.5} />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {carouselProducts.length > 4 && (
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: Math.ceil(carouselProducts.length / 4) }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex === idx ? 'w-8 bg-primary-500' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}