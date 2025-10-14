import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PortfolioBanner({ category }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const banners = category?.banners || [];
  const hasMultipleBanners = banners.length > 1;
  const isDefaultCategory = category?.is_default || category?.slug === 'all';

  // Auto-play carousel for default category with multiple banners
  useEffect(() => {
    if (!hasMultipleBanners || !isDefaultCategory || !isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, [hasMultipleBanners, isDefaultCategory, banners.length, isAutoPlaying]);

  // Reset banner index when category changes
  useEffect(() => {
    setCurrentBannerIndex(0);
    setIsAutoPlaying(true);
  }, [category?.slug]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentBannerIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentBannerIndex(index);
  };

  if (!category || banners.length === 0) {
    // Fallback banner if no category or banners
    return (
      <section className="relative bg-gradient-to-r from-accent-500 to-accent-600 text-white py-20 overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category?.name || 'Our Portfolio'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {category?.description || 'Lihat berbagai karya terbaik yang telah kami hasilkan'}
          </p>
        </div>
      </section>
    );
  }

  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="relative h-[400px] overflow-hidden group">
      {/* Banner Images */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentBannerIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${banner.image || '/uploads/placeholder.jpg'})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          </div>

          {/* Content */}
          <div className="relative h-full container-custom flex items-center">
            <div className="max-w-3xl text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {banner.title || category.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                {banner.subtitle || category.description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Only show if multiple banners */}
      {hasMultipleBanners && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Previous banner"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
            aria-label="Next banner"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator - Only show if multiple banners */}
      {hasMultipleBanners && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentBannerIndex
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}