// website/src/components/home/ProductCategories.jsx
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function ProductCategories() {
  const [servicesData, setServicesData] = useState(null);

  // Load services data from CMS
  useEffect(() => {
    fetch('/content/home/services.json')
      .then(res => res.json())
      .then(data => setServicesData(data))
      .catch(err => {
        console.log('Using default services data');
        setServicesData({
          title: "Our Services",
          description: "Layanan lengkap garment dan advertising untuk mendukung kesuksesan bisnis Anda",
          services: [
            {
              title: 'Kaos Sablon',
              description: 'Jasa sablon kaos berkualitas dengan berbagai teknik printing modern untuk kebutuhan bisnis dan personal.',
              color: 'blue',
              features: ['Sablon Digital', 'Sablon Rubber', 'Sablon Plastisol']
            },
            {
              title: 'Bordir',
              description: 'Layanan bordir komputer presisi tinggi untuk seragam perusahaan, jaket, dan berbagai kebutuhan fashion.',
              color: 'green', 
              features: ['Bordir Komputer', 'Logo Perusahaan', 'Custom Design']
            },
            {
              title: 'Advertising',
              description: 'Produk advertising lengkap mulai dari banner, spanduk, neon box, hingga merchandise promosi.',
              color: 'orange',
              features: ['Banner & Spanduk', 'Neon Box', 'Merchandise']
            }
          ]
        });
      });
  }, []);

  if (!servicesData) {
    return (
      <section className="min-h-screen flex items-center bg-neutral-900">
        <div className="container-custom section-padding text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading Services...</p>
        </div>
      </section>
    );
  }

  const { title, description, services } = servicesData;

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-cyan-500';
      case 'green': return 'from-green-500 to-emerald-500';
      case 'orange': return 'from-orange-500 to-red-500';
      default: return 'from-primary-500 to-secondary-500';
    }
  };

  return (
    <section className="min-h-screen flex items-center bg-neutral-900">
      <div className="container-custom section-padding">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              {/* Gradient Accent */}
              <div className={`absolute top-0 left-8 w-16 h-1 bg-gradient-to-r ${getColorClasses(service.color)} rounded-full`} />
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <ul className="space-y-2 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-neutral-400">
                    <div className={`w-2 h-2 bg-gradient-to-r ${getColorClasses(service.color)} rounded-full mr-3`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                href="/produk" 
                variant="outline"
                className="w-full border-neutral-600 text-white hover:bg-white hover:text-neutral-900"
              >
                Explore {service.title}
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button href="/produk" variant="primary" className="text-lg px-8 py-4">
            Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  );
}