// website/src/components/layout/Footer.jsx
import Link from 'next/link';
import { MapPin, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">B13</span>
              </div>
              <span className="text-xl font-bold">B13 Factory</span>
            </Link>
            <p className="text-neutral-300 mb-4 max-w-md">
              Specialist dalam garment dan advertising. Menyediakan jasa sablon, bordir, dan berbagai kebutuhan promosi bisnis Anda.
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
                  JL. Arowana, Perum Kebon Agung Indah, Kab. Jember, Jawa Timur
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span className="text-neutral-300">b13factory@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
          <p>&copy; 2024 B13 Factory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}