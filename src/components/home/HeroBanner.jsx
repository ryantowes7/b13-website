// website/src/components/home/HeroBanner.jsx
'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [contactData, setContactData] = useState(null);

  // Load hero data from CMS
  useEffect(() => {
    fetch('/content/home/hero.json')
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => {
        console.log('Using default hero data');
        setHeroData({
          slides: [
            {
              title: "GARMENT AND ADVERTISING",
              description: "Specialist dalam garment dan advertising dengan kualitas terbaik untuk kebutuhan bisnis Anda.",
              image: "/uploads/hero-default.jpg",
              button_text: "View Products",
              button_link: "/produk"
            }
          ]
        });
      });

    // Load contact data for running text
    fetch('/content/settings/contact.json')
      .then(res => res.json())
      .then(data => setContactData(data))
      .catch(err => {
        console.log('Using default contact data');
        setContactData({
          business_hours: "Buka Setiap Hari Pukul 09.00 - 17.00 WIB"
        });
      });
  }, []);

  if (!heroData || !contactData) {
    return (
      <section className="relative h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center" style={{ marginTop: '-64px' }}>
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading Banner...</p>
        </div>
      </section>
    );
  }

  const { slides } = heroData;
  const { business_hours } = contactData;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isHovering && slides.length > 1) {
      const interval = setInterval(nextSlide, 6000);
      return () => clearInterval(interval);
    }
  }, [isHovering, slides.length]);

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
              index === currentSlide ? 'opacity-100' : 'opacity-0'
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
                  <p className="text-2xl mb-4">Slide {index + 1}</p>
                  <p className="text-lg">{slide.title}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Shadow Gradation */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Content Center */}
      <div className="relative z-30 h-full flex items-center justify-center text-center text-white pt-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed animate-fade-in animation-delay-200">
            {slides[currentSlide].description}
          </p>
          {slides[currentSlide].button_text && (
            <Button 
              href={slides[currentSlide].button_link}
              variant="primary"
              className="animate-fade-in animation-delay-400"
            >
              {slides[currentSlide].button_text}
            </Button>
          )}
        </div>
      </div>

      {/* Slider Controls */}
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

      {/* Running Text Footer */}
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

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}