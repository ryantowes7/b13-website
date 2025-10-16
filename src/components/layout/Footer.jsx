// website/src/components/layout/Footer.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

export default function Footer() {
  const [siteConfig, setSiteConfig] = useState(null);

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
        // Set default values
        setSiteConfig({
          title: 'B13 Factory',
          description: 'Specialist dalam garment dan advertising',
          contact_email: 'info@b13factory.com',
          contact_phone: '+62 812-3456-7890',
          address: 'Jl. Arowana Perum Kebon Agung Indah, Jember, Indonesia'
        });
      }
    };
    loadSiteConfig();
  }, []);

  if (!siteConfig) {
    return null; // Loading state
  }

  return (
    <footer className="bg-neutral-900 text-white relative z-10">
      <div className="container-custom py-8">
        {/* Quick Links - Horizontal di bagian atas */}
        <div className="text-center mb-6">
          <h3 className="font-semibold mb-3 text-base">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {['Produk', 'Artikel', 'Portofolio', 'About Us', 'Contact Us'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="text-neutral-300 hover:text-white transition-colors text-sm"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800 my-6"></div>

        {/* Company Info & Contact - Compact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-3">
              {siteConfig.logo ? (
                <div className="relative w-8 h-8">
                  <Image 
                    src={siteConfig.logo} 
                    alt={siteConfig.title || 'B13 Factory'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
              <div className="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B13</span>
              </div>
              )}
              <span className="text-lg font-bold">{siteConfig.title || 'B13 Factory - Garment & Advertising'}</span>
            </Link>
            <p className="text-neutral-300 text-sm mb-3 max-w-md">
              {siteConfig.description || 'Produsen garment dan advertising berkualitas tinggi untuk kebutuhan bisnis Anda'}
            </p>
            <div className="flex items-center space-x-2 text-neutral-300 text-sm">
              <Clock size={14} />
              <span>Buka Setiap Hari Pukul 09.00 - 17.00 WIB</span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-3 text-base">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                <span className="text-neutral-300 text-sm">
                  {siteConfig.address || 'Jl. Arowana Perum Kebon Agung Indah, Jember, Indonesia'}
                </span>
              </div>
              {siteConfig.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={14} />
                  <a href={`tel:${siteConfig.contact_phone}`} className="text-neutral-300 hover:text-white text-sm">
                    {siteConfig.contact_phone}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Mail size={14} />
                <a href={`mailto:${siteConfig.contact_email}`} className="text-neutral-300 hover:text-white text-sm">
                  {siteConfig.contact_email || 'info@b13factory.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Compact */}
        <div className="border-t border-neutral-800 pt-4 text-center">
          <p className="text-neutral-400 text-xs">&copy; {new Date().getFullYear()} {siteConfig.title || 'B13 Factory'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}