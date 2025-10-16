// website/src/components/layout/Header.jsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [siteConfig, setSiteConfig] = useState(null);
  const router = useRouter();
  const isHomePage = router.pathname === '/';

  // Load site config dari CMS
  useEffect(() => {
    const loadSiteConfig = async () => {
      try {
        const response = await fetch('/api/content/site-config');
        if (response.ok) {
          const data = await response.json();
          setSiteConfig(data);
        }
      } catch (error) {
        console.error('Error loading site config:', error);
      }
    };
    loadSiteConfig();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Default navigation jika CMS belum load
  const defaultNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Produk', href: '/produk' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
  ];
  
  // Gunakan navigation dari CMS atau fallback ke default
  const navigation = siteConfig?.header_navigation 
    ? [...siteConfig.header_navigation].sort((a, b) => a.order - b.order)
    : defaultNavigation;

  // Background style berdasarkan kondisi - transparent untuk semua halaman saat di top
  const getHeaderBackground = () => {
    return isScrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-sm' 
      : 'bg-transparent';
  };

  // Text color berdasarkan kondisi
  const getTextColor = () => {
    if (!isScrolled) {
      return 'text-white';
    } else {
      return 'text-neutral-900';
    }
  };

  const getLinkColor = () => {
    if (!isScrolled) {
      return 'text-white/90 hover:text-white';
    } else {
      return 'text-neutral-700 hover:text-primary-500';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBackground()} ${getTextColor()}`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {siteConfig?.logo ? (
              <div className="relative w-9 h-9">
                <Image 
                  src={siteConfig.logo} 
                  alt={siteConfig.title || 'B13 Factory'}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              !isScrolled ? 'bg-white/20' : 'bg-primary-500'
            }`}>
              <span className="text-white font-bold text-base">B13</span>
            </div>
            )}
            <span className="text-lg font-bold">
              {siteConfig?.title || 'B13 Factory'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${getLinkColor()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors ${getTextColor()}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-colors ${
            !isScrolled ? 'border-white/20' : 'border-neutral-200'
          }`}>
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium py-2 transition-colors ${getLinkColor()}`}
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