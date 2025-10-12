// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const featuredProduct = {
    id: 1,
    title: 'Produk Unggulan',
    description: 'Deskripsi produk unggulan yang lebih detail dan menarik...',
    image: '/uploads/featured-product.jpg'
  };

  const products = [
    { id: 1, title: 'Produk 1', description: 'Deskripsi singkat...' },
    { id: 2, title: 'Produk 2', description: 'Deskripsi singkat...' },
    { id: 3, title: 'Produk 3', description: 'Deskripsi singkat...' },
    { id: 4, title: 'Produk 4', description: 'Deskripsi singkat...' },
    { id: 5, title: 'Produk 5', description: 'Deskripsi singkat...' },
    { id: 6, title: 'Produk 6', description: 'Deskripsi singkat...' },
  ];

  const visibleProducts = products.slice(currentIndex, currentIndex + 4);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (products.length - 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (products.length - 3)) % (products.length - 3));
  };

  return (
    <section className="min-h-screen flex items-center bg-white">
      <div className="container-custom section-padding">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-neutral-900">
          Product Updates
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Product - Besar */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-primary-600">
                    {featuredProduct.title}
                  </h3>
                  <p className="text-neutral-700 text-lg leading-relaxed mb-6">
                    {featuredProduct.description}
                  </p>
                  <button className="btn-primary">
                    Lihat Detail
                  </button>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                  <div className="w-full h-64 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <p className="text-neutral-500">Featured Product Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product List - Kecil */}
          <div className="space-y-6">
            {visibleProducts.slice(0, 2).map((product) => (
              <div key={product.id} className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold mb-2 text-primary-600">{product.title}</h4>
                <p className="text-neutral-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {visibleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-80">
                <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="text-xl font-bold mb-3 text-primary-600">{product.title}</h4>
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
      </div>
    </section>
  );
}