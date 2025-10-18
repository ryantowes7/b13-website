// website/src/pages/contact-us.jsx
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import ContactBanner from '@/components/contact/ContactBanner';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState(null);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contact data and product categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch contact data
        const contactResponse = await fetch('/api/content/contact');
        if (contactResponse.ok) {
          const contactResult = await contactResponse.json();
          if (contactResult.success && contactResult.contact) {
            setContactData(contactResult.contact);
          }
        }

        // Fetch product categories for subject dropdown
        const categoriesResponse = await fetch('/api/content/product-categories');
        if (categoriesResponse.ok) {
          const categoriesResult = await categoriesResponse.json();
          if (categoriesResult.success && categoriesResult.categories) {
            // Filter out 'all' category if exists
            const filteredCategories = categoriesResult.categories.filter(
              cat => cat.slug !== 'all' && !cat.is_default
            );
            setProductCategories(filteredCategories);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      const successMessage = contactData?.form_settings?.success_message || 
        'Pesan berhasil dikirim! Kami akan menghubungi Anda segera.';
      alert(successMessage);
      setFormData({
        name: '', email: '', phone: '', company: '', subject: '', message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  // Contact methods - Removed "Call Us", only kept: Office, Email, WhatsApp
  const getContactMethods = () => {
    if (!contactData) {
      // Default fallback data without "Call Us"
      return [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Our Office',
      details: ['JL. Arowana, Perum Kebon Agung Indah', 'Kab. Jember, Jawa Timur', 'Indonesia'],
      action: 'Get Directions',
      link: 'https://maps.google.com'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      details: ['b13factory@gmail.com', 'Response within 24 hours'],
      action: 'Send Email',
      link: 'mailto:b13factory@gmail.com'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      details: ['+62 812-3456-7890', 'Fast response'],
      action: 'Chat Now',
      link: 'https://wa.me/6281234567890'
    }
  ];

}
  // Build from CMS data - without \"Call Us\"
    const methods = [];

    if (contactData.contact_info?.address) {
      const addr = contactData.contact_info.address;
      methods.push({
        icon: <MapPin className="w-6 h-6" />,
        title: addr.title || 'Visit Our Office',
        details: [addr.line1, addr.line2, addr.line3].filter(Boolean),
        action: 'Get Directions',
        link: addr.map_link || 'https://maps.google.com'
      });
    }

    if (contactData.contact_info?.email) {
      const email = contactData.contact_info.email;
      methods.push({
        icon: <Mail className="w-6 h-6" />,
        title: email.title || 'Email Us',
        details: [email.address, email.response_time].filter(Boolean),
        action: 'Send Email',
        link: `mailto:${email.address}`
      });
    }

    if (contactData.contact_info?.whatsapp) {
      const wa = contactData.contact_info.whatsapp;
      methods.push({
        icon: <MessageCircle className="w-6 h-6" />,
        title: wa.title || 'WhatsApp',
        details: [wa.display_number, wa.message].filter(Boolean),
        action: 'Chat Now',
        link: wa.link || `https://wa.me/${wa.number?.replace(/\D/g, '')}`
      });
    }

    return methods;
  };

  const contactMethods = getContactMethods();

  // Show loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Contact Us - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-20">
          <div className="container-custom text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/90">Memuat halaman...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us - B13 Factory</title>
        <meta name="description" content="Hubungi B13 Factory untuk konsultasi garment dan advertising. Fast response!" />
      </Head>

      {/* Hero Banner with Background Image */}
      <ContactBanner banner={contactData} />

      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-neutral-900">Get In Touch</h2>
              
              <div className="space-y-4 sm:space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-neutral-50 rounded-lg sm:rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg sm:rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-1 sm:mb-2 text-sm sm:text-base">{method.title}</h3>
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-neutral-600 text-xs sm:text-sm mb-1">{detail}</p>
                      ))}
                      <a 
                        href={method.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-1 sm:mt-2 text-primary-600 hover:text-primary-700 font-medium text-xs sm:text-sm"
                      >
                        {method.action} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-primary-50 rounded-lg sm:rounded-xl">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                  <h3 className="font-semibold text-neutral-900 text-sm sm:text-base">
                    {contactData?.business_hours?.title || 'Business Hours'}
                  </h3>
                </div>
                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-neutral-700">
                  {contactData?.business_hours?.schedule ? (
                    contactData.business_hours.schedule.map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span>{item.day}</span>
                        <span className="font-semibold">{item.hours}</span>
                      </div>
                    ))
                  ) : (
                    <>
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">09:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">09:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                  </>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-neutral-900">Send Message</h2>
                <p className="text-neutral-600 mb-6 sm:mb-8 text-sm sm:text-base">
                  Isi form berikut dan kami akan menghubungi Anda dalam waktu 24 jam
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                        placeholder="Nama perusahaan (opsional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                    >
                      <option value="">Pilih subject</option>
                      {productCategories.length > 0 ? (
                        productCategories.map((category) => (
                          <option key={category.slug} value={category.slug}>
                            {category.name}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="kaos">Kaos</option>
                          <option value="bordir">Bordir</option>
                          <option value="banner">Banner & Spanduk</option>
                          <option value="merchandise">Merchandise</option>
                          <option value="lainnya">Lainnya</option>
                      </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                      Pesan *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                      placeholder="Jelaskan kebutuhan project Anda..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full justify-center text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="sm:w-5 sm:h-5 mr-2" />
                        {contactData?.form_settings?.button_text || 'Send Message'}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-50 py-8 sm:py-12 md:py-16">
        <div className="container-custom">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-neutral-900">Our Location</h2>
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            {contactData?.contact_info?.address?.google_maps_embed ? (
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: contactData.contact_info.address.google_maps_embed.replace(
                    /width="[^\"]*"/g, 
                    'width="100%"'
                  ).replace(
                    /height="[^\"]*"/g,
                    'height="400"'
                  )
                }}
                className="w-full maps-container"
              />
            ) : (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d515.1352122348118!2d113.67513863764486!3d-8.15694555937482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd695aacafb6b9f%3A0x5c31177bd50779d8!2sB13%20Sablon%20%26%20Advertising!5e1!3m2!1sid!2sid!4v1760713233502!5m2!1sid!2sid"
                width="100%"
                height="400"
                style={{ border: 0, display: 'block' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
        <style jsx>{`
          .maps-container iframe {
            width: 100% !important;
            height: 400px !important;
            display: block;
            border: 0;
          }
          @media (min-width: 640px) {
            .maps-container iframe {
              height: 450px !important;
            }
          }
          @media (min-width: 768px) {
            .maps-container iframe {
              height: 500px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}