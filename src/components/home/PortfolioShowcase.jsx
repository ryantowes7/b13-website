// website/src/components/home/PortfolioShowcase.jsx
'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ChevronRight, Play, Plus } from 'lucide-react';

export default function PortfolioShowcase() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'garment', name: 'Garment' },
    { id: 'advertising', name: 'Advertising' },
    { id: 'bordir', name: 'Bordir' },
  
  { id: 'merchandise', name: 'Merchandise' },
  ];

  // Load portfolio dari API
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await fetch('/api/content/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.portfolio) {
            setPortfolioItems(data.portfolio);
          }
        }
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPortfolio();
  }, []);  

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20" />
      
      <div className="container-custom section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Header Section */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our Portfolio
            </h2>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Lihat project-project yang telah kami kerjakan untuk berbagai klien dari berbagai industri. 
              Setiap project dikerjakan dengan standar kualitas tertinggi.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button href="/portofolio" variant="primary" className="text-lg px-8 py-4 group">
                Explore Portfolio
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button href="/contact-us" variant="outline" className="text-lg px-8 py-4 border-2">
                Start Your Project
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">150+</div>
              <div className="text-neutral-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary-600 mb-2">98%</div>
              <div className="text-neutral-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-2">50+</div>
              <div className="text-neutral-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">5</div>
              <div className="text-neutral-600">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 shadow-sm'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">Belum ada portfolio yang tersedia</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.slice(0, 6).map((item, index) => (
            <div
              key={item.slug || index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-secondary-100 relative overflow-hidden">
                {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <Plus size={24} className="text-white" />
                    </div>
                    <p className="text-white font-medium">Portfolio Image</p>
                  </div>
                </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/90 transition-all duration-500 flex items-center justify-center">
                  <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center text-white p-6">
                    <Play size={48} className="mx-auto mb-4" />
                    <h4 className="text-xl font-bold mb-2">{item.name}</h4>
                    <p className="text-white/90 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between text-xs text-white/80">
                      <span>{item.client}</span>
                      <span>{item.date ? new Date(item.date).getFullYear() : '2024'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex justify-between items-center text-sm text-neutral-500">
                  <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span>{item.date ? new Date(item.date).getFullYear() : '2024'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* View All Button */}
        <div className="text-center">
          <Button 
            href="/portofolio" 
            variant="outline"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-lg px-8 py-4 group"
          >
            View All Projects
            <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}