import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { markdownToHtml } from '../../lib/clientMarkdown';

// Utility functions for dynamic positioning and styling
const getVerticalAlignment = (vertical) => {
  switch (vertical) {
    case 'top': return 'items-start pt-20';
    case 'bottom': return 'items-end pb-20';
    case 'center':
    default: return 'items-center';
  }
};

const getHorizontalAlignment = (horizontal) => {
  switch (horizontal) {
    case 'left': return 'justify-start';
    case 'right': return 'justify-end';
    case 'center':
    default: return 'justify-center';
  }
};

const getTextAlignment = (textAlign) => {
  switch (textAlign) {
    case 'left': return 'text-left';
    case 'right': return 'text-right';
    case 'center':
    default: return 'text-center mx-auto';
  }
};

const getTitleSize = (size) => {
  switch (size) {
    case 'small': return 'text-2xl sm:text-3xl md:text-4xl';
    case 'medium': return 'text-3xl sm:text-4xl md:text-5xl';
    case 'large': return 'text-4xl sm:text-5xl md:text-6xl';
    case 'extra-large': return 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl';
    default: return 'text-4xl md:text-5xl lg:text-6xl';
  }
};

const getSubtitleSize = (size) => {
  switch (size) {
    case 'small': return 'text-sm sm:text-base md:text-lg';
    case 'medium': return 'text-base sm:text-lg md:text-xl';
    case 'large': return 'text-lg sm:text-xl md:text-2xl';
    default: return 'text-xl md:text-2xl';
  }
};

export default function ProductBanner({ category }) {
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
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {category?.name || 'Our Products'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {category?.description || 'Temukan berbagai produk berkualitas untuk kebutuhan Anda'}
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

          {/* Content with Dynamic Positioning */}
          <div className={`relative h-full container mx-auto px-6 flex ${getVerticalAlignment(banner.text_position?.vertical)} ${getHorizontalAlignment(banner.text_position?.horizontal)}`}>
            <div className={`max-w-3xl text-white ${getTextAlignment(banner.text_position?.text_align)}`}>
              <h1 className={`font-bold mb-4 leading-tight ${getTitleSize(banner.text_position?.title_size)}`}>
                {banner.title || category.name}
              </h1>
              <div 
                className={`text-white/90 leading-relaxed prose prose-invert ${getSubtitleSize(banner.text_position?.subtitle_size)}`}
                dangerouslySetInnerHTML={{ __html: markdownToHtml(banner.subtitle || category.description) }}
              />
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