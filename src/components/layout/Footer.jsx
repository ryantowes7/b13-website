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
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              {siteConfig.logo ? (
                <div className="relative w-10 h-10">
                  <Image 
                    src={siteConfig.logo} 
                    alt={siteConfig.title || 'B13 Factory'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B13</span>
              </div>
              )}
              <span className="text-xl font-bold">{siteConfig.title || 'B13 Factory'}</span>
            </Link>
            <p className="text-neutral-300 mb-4 max-w-md">
              {siteConfig.description || 'Specialist dalam garment dan advertising. Menyediakan jasa sablon, bordir, dan berbagai kebutuhan promosi bisnis Anda.'}
            </p>
            <div className="flex items-center space-x-2 text-neutral-300 mb-2">
              <Clock size={16} />
              <span>Buka Setiap Hari Pukul 09.00 - 17.00 WIB</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {['Produk', 'Artikel', 'Portofolio', 'About Us', 'Contact Us'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase().replace(' ', '-')}`}
                  className="block text-neutral-300 hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span className="text-neutral-300 text-sm">
                  {siteConfig.address || 'Jember, Jawa Timur'}
                </span>
              </div>
              {siteConfig.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone size={16} />
                  <a href={`tel:${siteConfig.contact_phone}`} className="text-neutral-300 hover:text-white">
                    {siteConfig.contact_phone}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <a href={`mailto:${siteConfig.contact_email}`} className="text-neutral-300 hover:text-white">
                  {siteConfig.contact_email || 'info@b13factory.com'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; {new Date().getFullYear()} {siteConfig.title || 'B13 Factory'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}