'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';


// Utility functions for dynamic positioning and styling
const getVerticalAlignment = (vertical) => {
  switch (vertical) {
    case 'top': return 'items-start';
    case 'bottom': return 'items-end';
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
    case 'large': return 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl';
    case 'extra-large': return 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl';
    default: return 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl';
  }
};

const getSubtitleSize = (size) => {
  switch (size) {
    case 'small': return 'text-sm sm:text-base md:text-lg';
    case 'medium': return 'text-base sm:text-lg md:text-xl';
    case 'large': return 'text-lg sm:text-xl md:text-2xl lg:text-3xl';
    default: return 'text-base sm:text-lg md:text-xl lg:text-2xl';
  }
};

const formatMarkdown = (text) => {
  if (!text) return '';
  
  // Split by lines
  const lines = text.split('');
  let result = [];
  let inList = false;
  let currentParagraph = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Check if it's a list item
    if (trimmedLine.match(/^[-*]\s/)) {
      // Close paragraph if exists
      if (currentParagraph.length > 0) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
      
      // Start list if not already in one
      if (!inList) {
        result.push('<ul class=\"list-disc list-inside ml-4\">');
        inList = true;
      }
      
      const content = trimmedLine.replace(/^[-*]\s/, '');
      result.push('<li>' + content + '</li>');
    } else if (trimmedLine === '') {
      // Empty line - close paragraph or list
      if (inList) {
        result.push('</ul>');
        inList = false;
      } else if (currentParagraph.length > 0) {
        result.push('<p>' + currentParagraph.join(' ') + '</p>');
        currentParagraph = [];
      }
    } else {
      // Regular text line
      if (inList) {
        result.push('</ul>');
        inList = false;
      }
      currentParagraph.push(trimmedLine);
    }
  });
  
  // Close any remaining paragraph or list
  if (inList) {
    result.push('</ul>');
  }
  if (currentParagraph.length > 0) {
    result.push('<p>' + currentParagraph.join(' ') + '</p>');
  }
  
  let html = result.join('');
  
  // Apply text formatting
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  return html;
};


export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultHeroData = {
    slides: [
      {
        id: 1,
        image: '/uploads/hero-1.jpg',
        title: 'GARMENT AND ADVERTISING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      },
      {
        id: 2, 
        image: '/uploads/hero-2.jpg',
        title: 'QUALITY & PROFESSIONAL',
        description: 'Professional garment and advertising solutions for your business needs with the highest quality standards.'
      },
      {
        id: 3,
        image: '/uploads/hero-3.jpg', 
        title: 'CREATIVE SOLUTIONS',
        description: 'Innovative and creative solutions for all your garment and advertising requirements.'
      }
    ]
  };

  const defaultContactData = {
    business_hours: "Buka Setiap Hari Pukul 09.00 - 17.00 WIB"
  };

  // Use useCallback untuk stable function references
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (!heroData?.slides) return 0;
      return (prev + 1) % heroData.slides.length;
    });
  }, [heroData]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (!heroData?.slides) return 0;
      return (prev - 1 + heroData.slides.length) % heroData.slides.length;
    });
  }, [heroData]);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);

        // Fetch home content dan site config
        const [homeRes, configRes] = await Promise.all([
          fetch('/api/content/home'),
          fetch('/api/content/site-config')
        ]);
        
        if (homeRes.ok) {
          const homeData = await homeRes.json();
          
          if (homeData.success && homeData.home) {
            // Transform data dari CMS format ke format slides
            const heroBanners = homeData.home.hero_banners || [];
            
            const slides = heroBanners.map((banner, index) => ({
              id: index + 1,
              image: banner.image || '/uploads/hero-1.jpg',
              title: banner.title || 'GARMENT AND ADVERTISING',
              description: banner.subtitle || 'Professional garment and advertising solutions',
              button_text: banner.button_text,
              button_link: banner.button_link
            }));
            
            // Fallback jika tidak ada banners
            if (slides.length === 0) {
              slides.push({
                id: 1,
                image: '/uploads/hero-1.jpg',
                title: 'GARMENT AND ADVERTISING',
                description: 'Professional garment and advertising solutions',
                button_text: 'Lihat Produk',
                button_link: '/produk'
              });
            }
            
            setHeroData({ slides });
            
            // Get business hours from site config
            if (configRes.ok) {
              const configData = await configRes.json();
              setContactData({ 
                business_hours: configData.business_hours?.hours || "Buka Setiap Hari Pukul 09.00 - 17.00 WIB" 
              });
            } else {
              setContactData({ business_hours: "Buka Setiap Hari Pukul 09.00 - 17.00 WIB" });
            }
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch home content');
        }
      } catch (error) {
        console.log('Using default data:', error.message);
        setHeroData(defaultHeroData);
        setContactData(defaultContactData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []); // Empty dependency array

  // Auto slide effect - dipisah dari effect utama
  useEffect(() => {
    if (isLoading || !heroData?.slides || heroData.slides.length <= 1 || isHovering) {
      return;
    }

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isLoading, heroData, isHovering, nextSlide]);

  // Jangan render sampai data ready dan loading selesai
  if (isLoading || !heroData || !contactData) {
    return (
      <section 
        className="relative h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center" 
        style={{ marginTop: '-64px' }}
      >
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  const { slides } = heroData;
  const { business_hours } = contactData;

  // Pastikan currentSlide valid
  const safeCurrentSlide = Math.min(currentSlide, slides.length - 1);
  const currentSlideData = slides[safeCurrentSlide] || slides[0];

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ marginTop: '-64px' }}
    >
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === safeCurrentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image ? (
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-2xl mb-4">B13 Factory</p>
                  <p className="text-lg">{slide.title}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Hero Content - Mobile Optimized with Dynamic Positioning */}
      <div className={`relative z-30 h-full flex px-4 pt-16 ${getVerticalAlignment(currentSlideData.text_position?.vertical)} ${getHorizontalAlignment(currentSlideData.text_position?.horizontal)}`}>
        <div className={`max-w-4xl ${getTextAlignment(currentSlideData.text_position?.text_align)}`}>
          <h1 className={`font-bold mb-4 sm:mb-6 leading-tight text-white ${getTitleSize(currentSlideData.text_position?.title_size)}`}>
            {currentSlideData.title}
          </h1>
          <div 
            className={`mb-6 sm:mb-8 leading-relaxed max-w-3xl text-white ${getSubtitleSize(currentSlideData.text_position?.subtitle_size)}`}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(currentSlideData.description) }}
          />
          {currentSlideData.button_text && (
            <Button 
              href={currentSlideData.button_link}
              variant="primary"
            >
              {currentSlideData.button_text}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-40 flex space-x-2 sm:space-x-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all hover:scale-110 border border-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all hover:scale-110 border border-white/30"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Marquee Banner - Improved Animation */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary-600/90 backdrop-blur-sm py-3 sm:py-4 overflow-hidden z-30">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-white font-semibold text-base sm:text-lg px-8">
            ✦ {business_hours}
          </span>
          <span className="text-white font-semibold text-base sm:text-lg px-8">
            ✦ {business_hours}
          </span>
          <span className="text-white font-semibold text-base sm:text-lg px-8">
            ✦ {business_hours}
          </span>
          <span className="text-white font-semibold text-base sm:text-lg px-8">
            ✦ {business_hours}
          </span>
        </div>
      </div>

      {/* Slide Indicators - Mobile Optimized */}
      {slides.length > 1 && (
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === safeCurrentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}