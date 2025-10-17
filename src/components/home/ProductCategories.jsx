// website/src/components/home/ProductCategories.jsx
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function ProductCategories() {
  const [servicesData, setServicesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load services data from CMS API
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/content/home');
        
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.home) {
            // Transform CMS data untuk services
            const servicesFromCMS = data.home.services || [];
            
            setServicesData({
              title: data.home.services_title || "Layanan Kami",
              description: "Layanan lengkap garment dan advertising untuk mendukung kesuksesan bisnis Anda",
              services: servicesFromCMS.map((service, index) => ({
                icon: service.icon,
                title: service.title,
                description: service.description,
                color: getColorByIndex(index)
              }))
            });
          } else {
            throw new Error('Invalid data format');
          }
        } else {
          throw new Error('Failed to fetch home content');
        }
      } catch (error) {
        console.error('Error loading services from CMS:', error);
        // Fallback to default data if CMS fails
        setServicesData({
          title: "Layanan Kami",
          description: "Layanan lengkap garment dan advertising untuk mendukung kesuksesan bisnis Anda",
          services: [
            {
              icon: 'shirt',
              title: 'Garment & Konveksi',
              description: 'Produksi kaos, jaket, dan seragam dengan bahan berkualitas dan sablon yang tahan lama',
              color: 'blue'
            },
            {
              icon: 'needle',
              title: 'Bordir Komputer',
              description: 'Bordir presisi tinggi untuk logo perusahaan dengan hasil yang rapi dan profesional',
              color: 'green'
            },
            {
              icon: 'printer',
              title: 'Printing & Banner',
              description: 'Cetak banner, spanduk, dan material advertising lainnya dengan kualitas terbaik',
              color: 'orange'
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadServices();
  }, []);
  
  // Helper function untuk assign warna berdasarkan index
  const getColorByIndex = (index) => {
    const colors = ['blue', 'green', 'orange', 'purple', 'red', 'teal'];
    return colors[index % colors.length];
  };

  if (isLoading || !servicesData) {
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
  
  if (!services || services.length === 0) {
    return (
      <section className="min-h-screen flex items-center bg-neutral-900">
        <div className="container-custom section-padding text-center">
          <p className="text-white text-xl">Belum ada layanan yang tersedia</p>
        </div>
      </section>
    );
  }

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