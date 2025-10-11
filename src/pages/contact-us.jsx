// website/src/pages/contact-us.jsx
import Head from 'next/head';
import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import Button from '@/components/ui/Button';

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
      alert('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.');
      setFormData({
        name: '', email: '', phone: '', company: '', subject: '', message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
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
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      details: ['+62 812-3456-7890', 'Mon - Fri: 9:00 - 17:00'],
      action: 'Call Now',
      link: 'tel:+6281234567890'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      details: ['+62 812-3456-7890', 'Fast response'],
      action: 'Chat Now',
      link: 'https://wa.me/6281234567890'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us - B13 Factory</title>
        <meta name="description" content="Hubungi B13 Factory untuk konsultasi garment dan advertising. Fast response!" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Siap membantu kebutuhan garment dan advertising Anda. Hubungi kami untuk konsultasi gratis.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-bold mb-8 text-neutral-900">Get In Touch</h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-neutral-900 mb-2">{method.title}</h3>
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-neutral-600 text-sm mb-1">{detail}</p>
                      ))}
                      <a 
                        href={method.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block mt-2 text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {method.action} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="mt-8 p-6 bg-primary-50 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <h3 className="font-semibold text-neutral-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-neutral-700">
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
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-3xl font-bold mb-2 text-neutral-900">Send Message</h2>
                <p className="text-neutral-600 mb-8">
                  Isi form berikut dan kami akan menghubungi Anda dalam waktu 24 jam
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nomor Telepon *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                        placeholder="Nama perusahaan (opsional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Pilih subject</option>
                      <option value="kaos-sablon">Kaos Sablon</option>
                      <option value="bordir">Bordir</option>
                      <option value="banner">Banner & Spanduk</option>
                      <option value="merchandise">Merchandise</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Pesan *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                      placeholder="Jelaskan kebutuhan project Anda..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="w-full justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Send Message
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
      <section className="bg-neutral-50">
        <div className="container-custom">
          <div className="py-12">
            <h2 className="text-3xl font-bold text-center mb-8 text-neutral-900">Our Location</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-primary-600 mx-auto mb-4" />
                  <p className="text-xl font-semibold text-neutral-700">Google Maps</p>
                  <p className="text-neutral-600 mt-2">JL. Arowana, Perum Kebon Agung Indah, Jember</p>
                  <Button 
                    href="https://maps.google.com" 
                    variant="outline" 
                    className="mt-4"
                  >
                    Open in Google Maps
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}