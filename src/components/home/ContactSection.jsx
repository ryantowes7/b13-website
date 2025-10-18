// website/src/components/home/ContactSection.jsx
'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load contact data from CMS
  useEffect(() => {
    const loadContactData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch both site config and contact data for maps
        const [siteRes, contactRes] = await Promise.all([
          fetch('/api/content/site-config'),
          fetch('/api/content/contact')
        ]);
        
        let siteData = {};
        let mapsEmbed = null;
        
        if (siteRes.ok) {
          siteData = await siteRes.json();
        }
        
        // Get maps embed from contact data if available
        if (contactRes.ok) {
          const contactResult = await contactRes.json();
          if (contactResult.success && contactResult.contact?.contact_info?.address?.google_maps_embed) {
            mapsEmbed = contactResult.contact.contact_info.address.google_maps_embed;
          }
        }
        
        setContactData({
          ...siteData,
          google_maps_embed: mapsEmbed
        });
        
      } catch (error) {
        console.error('Error loading contact data:', error);
        // Fallback to default data
        setContactData({
          address: 'JL. Arowana, Perum Kebon Agung Indah, Kab. Jember, Jawa Timur, Indonesia',
          contact_email: 'b13factory@gmail.com',
          contact_phone: '+62 812-3456-7890',
          business_hours: {
            hours: 'Setiap Hari: 09.00 - 17.00 WIB'
          },
          google_maps_embed: null
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadContactData();
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 to-neutral-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading contact information...</p>
        </div>
      </section>
    );
  }

  // Format WhatsApp number (remove spaces and special chars)
  const whatsappNumber = contactData?.contact_phone?.replace(/\D/g, '') || '6281234567890';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-br from-neutral-900 to-neutral-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Contact Information - Mobile Optimized */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Contact Us
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-300 mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
              Siap membantu kebutuhan garment dan advertising Anda. 
              Hubungi kami untuk konsultasi gratis dan penawaran terbaik.
            </p>

            {/* Contact Details - Mobile Optimized */}
            <div className="space-y-5 sm:space-y-6 lg:space-y-8">
              {/* Address */}
              {contactData?.address && (
                <div className="flex items-start space-x-3 sm:space-x-4 lg:space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                      <MapPin size={24} className="text-primary-400 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-1 sm:mb-2">Our Location</h3>
                    <p className="text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                      {contactData.address}
                    </p>
                  </div>
                </div>
              )}

              {/* Email */}
              {contactData?.contact_email && (
                <div className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-secondary-500/20 rounded-2xl flex items-center justify-center group-hover:bg-secondary-500/30 transition-colors">
                      <Mail size={32} className="text-secondary-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Email Us</h3>
                    <p className="text-neutral-300 text-lg">{contactData.contact_email}</p>
                  </div>
                </div>
              )}

              {/* Business Hours */}
              {contactData?.business_hours && (
                <div className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center group-hover:bg-accent-500/30 transition-colors">
                      <Clock size={32} className="text-accent-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Business Hours</h3>
                    <p className="text-neutral-300 text-lg">
                      {contactData.business_hours.hours || contactData.business_hours}
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Contact */}
              {contactData?.contact_phone && (
                <div className="flex items-start space-x-6 group">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center group-hover:bg-primary-500/30 transition-colors">
                      <MessageCircle size={32} className="text-primary-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Quick Response</h3>
                    <p className="text-neutral-300 text-lg">
                      WhatsApp: {contactData.contact_phone}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-8 sm:mt-10 lg:mt-12">
              <Button 
                href="/contact-us" 
                variant="primary"
                className="bg-primary-500 hover:bg-primary-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                Get In Touch
              </Button>
              <Button 
                href={whatsappLink}
                variant="secondary"
                className="bg-secondary-500 hover:bg-secondary-600 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
              >
                WhatsApp Now
              </Button>
            </div>
          </div>

          {/* Map & Contact Form - Mobile Optimized */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Google Maps Embed - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl">
              {contactData?.google_maps_embed ? (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: contactData.google_maps_embed.replace(
                      /width="[^\"]*"/g, 
                      'width="100%"'
                    ).replace(
                      /height="[^\"]*"/g,
                      'height="300"'
                    )
                  }}
                  className="w-full maps-container"
                />
              ) : (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.1352122348118!2d113.67513863764486!3d-8.15694555937482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd695aacafb6b9f%3A0x5c31177bd50779d8!2sB13%20Sablon%20%26%20Advertising!5e1!3m2!1sid!2sid!4v1760713233502!5m2!1sid!2sid"
                  width="100%"
                  height="300"
                  className="sm:h-[350px] lg:h-[450px]"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
            <style jsx>{`
              .maps-container iframe {
                width: 100% !important;
                height: 300px !important;
                display: block;
                border: 0;
              }
              @media (min-width: 640px) {
                .maps-container iframe {
                  height: 350px !important;
                }
              }
              @media (min-width: 1024px) {
                .maps-container iframe {
                  height: 450px !important;
                }
              }
            `}</style>

            {/* Quick Contact Card - Mobile Optimized */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-900 mb-4 sm:mb-5 lg:mb-6">Quick Consultation</h3>
              <div className="space-y-4">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                >
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
                </a>

                <a
                  href={`mailto:${contactData?.contact_email || 'b13factory@gmail.com'}`}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors cursor-pointer group"
                >
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
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}