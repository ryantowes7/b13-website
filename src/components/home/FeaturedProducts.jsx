// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const featuredProduct = products.length > 0 ? products[0] : {
    id: 1,
    name: 'Produk Unggulan',
    description: 'Deskripsi produk unggulan yang lebih detail dan menarik...',
    image: '/uploads/featured-product.jpg'
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - 3)) % (products.length - 3));
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container-custom section-padding">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-900">
          Product Updates
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">Belum ada produk yang tersedia</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Featured Product - Besar */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 h-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-primary-600">
                        {featuredProduct.name || featuredProduct.title}
                      </h3>
                      <p className="text-neutral-700 text-lg leading-relaxed mb-6">
                        {featuredProduct.description}
                      </p>
                      <button className="btn-primary">
                        Lihat Detail
                      </button>
                    </div>
                    <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                      {featuredProduct.image ? (
                        <img 
                          src={featuredProduct.image} 
                          alt={featuredProduct.name}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                          <p className="text-neutral-500">Featured Product Image</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Product List - Kecil */}
              <div className="space-y-6">
                {visibleProducts.slice(0, 2).map((product, index) => (
                  <div key={product.slug || index} className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <h4 className="text-xl font-bold mb-2 text-primary-600">{product.name || product.title}</h4>
                    <p className="text-neutral-600">{product.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Slider */}
            {products.length > 4 && (
              <div className="relative">
                <div className="flex space-x-6 overflow-hidden">
                  {visibleProducts.map((product, index) => (
                    <div key={product.slug || index} className="flex-shrink-0 w-80">
                      <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                        <h4 className="text-xl font-bold mb-3 text-primary-600">{product.name || product.title}</h4>
                        <p className="text-neutral-600 mb-4">{product.description}</p>
                        <button className="text-primary-500 hover:text-primary-600 font-medium">
                          Selengkapnya →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white shadow-lg rounded-full p-3 hover:shadow-xl transition-all"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}