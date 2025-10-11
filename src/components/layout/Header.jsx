'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteData, setSiteData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Load site data dari CMS
    const loadSiteData = async () => {
      try {
        const response = await fetch('/content/settings/site.json');
        if (response.ok) {
          const data = await response.json();
          setSiteData(data);
        } else {
          // Fallback data jika file tidak ditemukan
          setSiteData({
            title: 'B13 Factory',
            logo: ''
          });
        }
      } catch (error) {
        setSiteData({
          title: 'B13 Factory',
          logo: ''
        });
      }
    };

    // Handle scroll untuk transparent header effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    loadSiteData();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Produk', href: '/produk' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <header className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md' : ''}`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo - Dynamic dari CMS */}
          <Link href="/" className="flex items-center space-x-3 group">
            {siteData?.logo && !logoError ? (
              <img 
                src={siteData.logo} 
                alt={siteData?.title || 'B13 Factory'}
                className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
                onError={() => setLogoError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
                <span className="text-white font-bold text-lg">B13</span>
              </div>
            )}
            <span className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
              {siteData?.title || 'B13 Factory'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-500 font-medium transition-all duration-200 hover:scale-105"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200 bg-white/95 backdrop-blur-md">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-neutral-700 hover:text-primary-500 font-medium py-2 px-4 rounded-lg hover:bg-neutral-50 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}