'use client';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const defaultHeroData = {
    slides: [
      {
        title: "GARMENT AND ADVERTISING",
        description: "Specialist dalam garment dan advertising dengan kualitas terbaik untuk kebutuhan bisnis Anda.",
        image: "",
        button_text: "View Products",
        button_link: "/produk"
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
        
        const [heroRes, contactRes] = await Promise.allSettled([
          fetch('/content/home/hero.json'),
          fetch('/content/settings/contact.json')
        ]);

        const heroData = heroRes.status === 'fulfilled' && heroRes.value.ok 
          ? await heroRes.value.json() 
          : defaultHeroData;
        
        const contactData = contactRes.status === 'fulfilled' && contactRes.value.ok 
          ? await contactRes.value.json() 
          : defaultContactData;

        setHeroData(heroData);
        setContactData(contactData);
      } catch (error) {
        console.log('Using default data');
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

      <div className="relative z-30 h-full flex items-center justify-center text-center text-white pt-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {currentSlideData.title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed">
            {currentSlideData.description}
          </p>
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

      {slides.length > 1 && (
        <div className="absolute bottom-20 right-8 z-40 flex space-x-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all hover:scale-110 border border-white/30"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all hover:scale-110 border border-white/30"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-primary-600/90 backdrop-blur-sm py-3 overflow-hidden z-30">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-white font-semibold text-lg mx-4">
            - {business_hours} --
          </span>
          <span className="text-white font-semibold text-lg mx-4">
            - {business_hours} --
          </span>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === safeCurrentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}