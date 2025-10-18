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

  // --- PENTING: deklarasi derived variables harus di atas useEffect yang menggunakannya ---
  const featuredProduct = products.length > 0 ? products[0] : null;
  const secondProduct = products.length > 1 ? products[1] : null;
  // Di mobile, semua produk kecuali featured masuk carousel
  const carouselProducts = products.slice(1);

  // Auto-play carousel - infinite loop
  useEffect(() => {
    // guard: jika tidak ada item, jangan set interval
    if (!carouselProducts || carouselProducts.length <= 1) {
      // pastikan tidak ada interval tertinggal
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 3500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [carouselProducts.length]);

  // Infinite scroll navigation (guard terhadap length 0)
  const nextSlide = () => {
    if (!carouselProducts || carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevSlide = () => {
    if (!carouselProducts || carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
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
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-neutral-50 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-3 sm:mb-4">
            Product Updates
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Discover our latest collection of premium products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-xl">Belum ada produk yang tersedia</p>
          </div>
        ) : (
          <>
            {/* Featured Section - Mobile: Only Featured, Desktop: Featured + Second */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              {/* Featured Product - Full Width di Mobile, 2/3 di Desktop */}
              {featuredProduct && (
                <Link href={`/produk/${featuredProduct.slug}`} className="block lg:float-left lg:w-[66%] lg:pr-4 mb-4 lg:mb-0 group">
                  <div className="relative h-[350px] sm:h-[400px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
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

                    {/* Badges - Top Corners - Mobile Optimized */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 flex justify-between items-start gap-2">
                      {/* Category Badge */}
                      {featuredProduct.category && (
                        <span className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                          {featuredProduct.category}
                        </span>
                      )}
                      {/* Stock Type Badge */}
                      {getStockTypeBadge(featuredProduct.stockType)}
                    </div>

                    {/* Content - Bottom - Mobile Optimized */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-12">
                      {/* Product Name */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 group-hover:text-primary-300 transition-colors leading-tight">
                        {featuredProduct.name || featuredProduct.title}
                      </h3>

                      {/* Description */}
                      {featuredProduct.description && (
                        <p className="text-white/90 text-xs sm:text-sm lg:text-base xl:text-lg mb-3 sm:mb-4 lg:mb-6 line-clamp-2 leading-relaxed">
                          {featuredProduct.description}
                        </p>
                      )}

                      {/* Detail Button */}
                      <div className="flex justify-end">
                        <span className="inline-flex items-center gap-2 text-white font-semibold text-xs sm:text-sm group-hover:gap-3 transition-all">
                          Detail
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Second Product - Hanya tampil di Desktop */}
              {secondProduct && (
                <Link href={`/produk/${secondProduct.slug}`} className="hidden lg:block lg:float-left lg:w-[34%] lg:pl-4 group">
                  <div className="relative h-[500px] rounded-3xl overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
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
                    </div>

                    {/* Badges - Top Corners */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
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
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                      <div className="flex items-end justify-between gap-4">
                        {/* Product Name - Sejajar dengan button */}
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-300 transition-colors line-clamp-2 flex-1 overflow-hidden text-ellipsis">
                          {secondProduct.name || secondProduct.title}
                        </h3>

                        {/* Detail Button - Cutting Edge Style (Keluar dari Card) */}
                        <div className="flex-shrink-0 relative -mr-4 -mb-4">
                          <span className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm border-3 border-white shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" strokeWidth="2.5"/>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                            Detail
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
              <div className="clear-both"></div>
            </div>

            {/* Carousel Section - Infinite Loop */}
            {carouselProducts.length > 0 && (
              <div className="relative">
                <div className="overflow-hidden">
                  <div
                    className="flex gap-4 sm:gap-6 transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${currentIndex * (100 / Math.min(carouselProducts.length, 4))}%)`
                    }}
                  >
                    {/* Duplicate items for infinite effect */}
                    {[...carouselProducts, ...carouselProducts].map((product, index) => (
                      <Link
                        href={`/produk/${product.slug}`}
                        key={`${product.slug}-${index}`}
                        className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[23%] group"
                      >
                        <div className="relative h-[400px] rounded-2xl overflow-visible shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3">
                          <div className="absolute inset-0 rounded-2xl overflow-hidden">
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
                          </div>

                          {/* Badges - Top Corners */}
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
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
                          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                            <div className="flex items-end justify-between gap-3">
                              {/* Product Name - Sejajar dengan button */}
                              <h4 className="text-lg font-bold text-white group-hover:text-primary-300 transition-colors line-clamp-2 flex-1 overflow-hidden text-ellipsis">
                                {product.name || product.title}
                              </h4>

                              {/* Detail Button - Cutting Edge Style (Keluar dari Card) */}
                              <div className="flex-shrink-0 relative -mr-3 -mb-3">
                                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs border-3 border-white shadow-[0_6px_25px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.4)] transform hover:scale-110 hover:-translate-y-1 transition-all duration-300">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" strokeWidth="2.5"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                  </svg>
                                  Detail
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons - Always show for infinite scroll */}
                {carouselProducts.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white shadow-xl sm:shadow-2xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white shadow-xl sm:shadow-2xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Next"
                    >
                      <ChevronRight size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
                    </button>
                  </>
                )}

                {/* Dots Indicator - Show current position */}
                {carouselProducts.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                    {carouselProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex % carouselProducts.length === idx ? 'w-6 sm:w-8 bg-primary-500' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
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
