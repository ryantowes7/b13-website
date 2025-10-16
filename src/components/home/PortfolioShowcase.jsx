// website/src/components/home/PortfolioShowcase.jsx
'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ChevronRight, Plus } from 'lucide-react';

export default function PortfolioShowcase() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load portfolio stats dari API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/content/home');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.home?.portfolio_stats) {
            setPortfolioStats(data.home.portfolio_stats);
          }
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        // Set default stats if fetch fails
        setPortfolioStats({
          projects_completed: '150+',
          happy_clients: '50+',
          years_experience: '5+'
        });
      }
    };
    
    loadStats();
  }, []);

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
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

          {/* Stats - Centered vertically with left content */}
          {portfolioStats && (
            <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{portfolioStats.projects_completed}</div>
              <div className="text-neutral-600 text-sm">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-2">{portfolioStats.happy_clients}</div>
              <div className="text-neutral-600 text-sm">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">{portfolioStats.years_experience}</div>
              <div className="text-neutral-600 text-sm">Years Experience</div>
            </div>
          </div>
          )}
        </div>

        {/* Portfolio Grid - Redesigned */}
        {portfolioItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-lg">Belum ada portfolio yang tersedia</p>
          </div>
        ) : (
        <div className="mb-12">
          {/* Grid Layout - 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.slice(0, 6).map((item, index) => (
              <a
              key={item.slug || index}
              href={`/portofolio/${item.slug}`}
                className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container - Aspect ratio 16:10 */}
              <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Plus size={24} className="text-neutral-500" />
                        </div>
                        <p className="text-neutral-500 font-medium">Portfolio Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                
                {/* Content - Clean & Minimalist */}
                <div className="p-6">
                  {/* Date & Category Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-sm text-neutral-500">
                      {item.date ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '2024'}
                    </span>
                    {item.category && (
                      <>
                        <span className="text-neutral-300">•</span>
                        <span className="text-xs uppercase tracking-wider text-primary-600 font-semibold">
                          {item.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Client Info */}
                  {item.client && (
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <span className="font-medium">Client:</span>
                      <span>{item.client}</span>
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="mt-4 pt-4 border-t border-neutral-100">
                    <span className="text-primary-600 text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Read more
                      <ChevronRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
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