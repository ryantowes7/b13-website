// website/src/components/home/ContactSection.jsx
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
            </h2>
            <p className="text-xl text-neutral-300 mb-12 leading-relaxed">
              Siap membantu kebutuhan garment dan advertising Anda. 
              Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
            </p>

            {/* Contact Details */}
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                    <MapPin size={32} className="text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Our Location</h3>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    JL. Arowana, Perum Kebon Agung Indah<br />
                    Kab. Jember, Jawa Timur<br />
                    Indonesia
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-secondary-500/20 rounded-2xl flex items-center justify-center group-hover:bg-secondary-500/30 transition-colors">
                    <Mail size={32} className="text-secondary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                  <p className="text-neutral-300 text-lg">b13factory@gmail.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                    <Clock size={32} className="text-accent-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                  <p className="text-neutral-300 text-lg">
                    Setiap Hari: 09.00 - 17.00 WIB
                  </p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="flex items-start space-x-6 group">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                    <MessageCircle size={32} className="text-primary-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Quick Response</h3>
                  <p className="text-neutral-300 text-lg">
                    WhatsApp: +62 812-3456-7890
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-12">
              <Button 
                href="/contact-us" 
                variant="primary"
                className="bg-primary-500 hover:bg-primary-600 text-lg px-8 py-4"
              >
                Get In Touch
              </Button>
              <Button 
                href="https://wa.me/6281234567890" 
                variant="secondary"
                className="bg-secondary-500 hover:bg-secondary-600 text-lg px-8 py-4"
              >
                WhatsApp Now
              </Button>
            </div>
          </div>

          {/* Map & Contact Form */}
          <div className="space-y-8">
            {/* Google Maps Placeholder */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary-500 mx-auto mb-4" />
                  <p className="text-neutral-700 font-medium">Google Maps Embed</p>
                  <p className="text-neutral-500 text-sm mt-2">JL. Arowana, Perum Kebon Agung Indah, Jember</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Card */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">Quick Consultation</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">WhatsApp</div>
                      <div className="text-neutral-600 text-sm">Fast Response</div>
                    </div>
                  </div>
                  <div className="text-primary-500 font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Mail size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-neutral-900">Email</div>
                      <div className="text-neutral-600 text-sm">Detailed Inquiry</div>
                    </div>
                  </div>
                  <div className="text-primary-500 font-semibold group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}