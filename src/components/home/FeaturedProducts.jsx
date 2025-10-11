// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredData, setFeaturedData] = useState(null);
  
  // Load featured products from CMS
  useEffect(() => {
    fetch('/content/home/featured-products.json')
      .then(res => res.json())
      .then(data => setFeaturedData(data))
      .catch(err => {
        console.log('Using default featured products data');
        setFeaturedData({
          title: "Product Updates",
          featured: {
            title: "Kaos Polo Sablon Premium",
            description: "Kaos polo bahan cotton pique dengan sablon rubber berkualitas tinggi. Cocok untuk seragam perusahaan dan event.",
            image: "/uploads/featured-product.jpg",
            button_text: "Lihat Detail",
            button_link: "/produk/kaos-polo"
          },
          products: [
            {
              title: "Jaket Bordir Logo",
              description: "Jaket parasut dengan bordir komputer presisi tinggi untuk logo perusahaan."
            },
            {
              title: "Banner Vinyl",
              description: "Banner material vinyl frontlit dengan ketahanan cuaca yang baik."
            },
            {
              title: "Kaos Sablon Digital",
              description: "Kaos dengan sablon digital full color untuk design yang kompleks."
            },
            {
              title: "Topi Merchandise",
              description: "Topi custom untuk merchandise perusahaan dengan berbagai pilihan model."
            },
            {
              title: "Tote Bag Sablon",
              description: "Tote bag bahan kanvas dengan sablon rubber yang tahan lama."
            },
            {
              title: "ID Card Custom",
              description: "ID card karyawan dengan design custom dan berbagai aksesoris."
            }
          ]
        });
      });
  }, []);

  if (!featuredData) {
    return (
      <section className="min-h-screen flex items-center bg-white">
        <div className="container-custom section-padding text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p>Loading Featured Products...</p>
        </div>
      </section>
    );
  }

  const { title, featured, products } = featuredData;
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
          {title}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Featured Product - Besar */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-3xl font-bold mb-4 text-primary-600">
                    {featured.title}
                  </h3>
                  <p className="text-neutral-700 text-lg leading-relaxed mb-6">
                    {featured.description}
                  </p>
                  <Button href={featured.button_link} variant="primary">
                    {featured.button_text}
                  </Button>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center justify-center">
                  {featured.image ? (
                    <img 
                      src={featured.image} 
                      alt={featured.title}
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
              <div key={index} className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-bold mb-2 text-primary-600">{product.title}</h4>
                <p className="text-neutral-600">{product.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Product Slider */}
        <div className="relative">
          <div className="flex space-x-6 overflow-hidden">
            {visibleProducts.map((product, index) => (
              <div key={index} className="flex-shrink-0 w-80">
                <div className="bg-neutral-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <h4 className="text-xl font-bold mb-3 text-primary-600">{product.title}</h4>
                  <p className="text-neutral-600 mb-4">{product.description}</p>
                  <Button href="/produk" variant="outline" className="text-primary-500 hover:text-primary-600">
                    Selengkapnya →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          {products.length > 4 && (
            <>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}