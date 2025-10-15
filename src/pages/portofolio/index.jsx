import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Filter, ZoomIn, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import PortfolioBanner from '@/components/portfolio/PortfolioBanner';
import Pagination from '@/components/ui/Pagination';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioStats, setPortfolioStats] = useState(null);
  
  const ITEMS_PER_PAGE = 9; // 3x3 grid

  // Fetch portfolio categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/content/portfolio-categories');
        if (!response.ok) throw new Error('Failed to fetch categories');
        
        const data = await response.json();
        if (data.success && data.categories) {
          setCategories(data.categories);
          // Set default category
          const defaultCat = data.categories.find(cat => cat.is_default || cat.slug === 'all');
          setCurrentCategory(defaultCat || data.categories[0]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  // Fetch portfolio stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/content/home');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.home?.portfolio_stats) {
            setPortfolioStats(data.home.portfolio_stats);
          }
        }
      } catch (err) {
        console.error('Error fetching portfolio stats:', err);
        // Set default stats if fetch fails
        setPortfolioStats({
          projects_completed: '150+',
          happy_clients: '50+',
          years_experience: '5+'
        });
      }
    };

    fetchStats();
  }, []);


  // Fetch portfolio from CMS API
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/portfolio');
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        
        const data = await response.json();
        
        if (data.success && data.portfolio) {
          // Transform portfolio data
          const transformedPortfolio = data.portfolio.map((item, index) => {
            // Parse gallery images
            const gallery = item.gallery ? 
              (Array.isArray(item.gallery) ? 
                item.gallery.map(img => typeof img === 'object' ? img.url : img) : 
                []) : 
              [];
            
            // Extract year from date
            const year = item.date ? new Date(item.date).getFullYear().toString() : '2024';
            
            return {
              id: index + 1,
              slug: item.slug,
              title: item.name || 'Untitled Project',
              name: item.name || 'Untitled Project',
              category: item.category || 'kaos',
              client: item.client || 'Client',
              location: 'Jember, Jawa Timur',
              year: year,
              description: item.description || '',
              image: item.image || '/uploads/placeholder.jpg',
              images: gallery,
              deliverables: [],
              details: item.details || '',
              testimonial: item.testimonial || '',
              client_name: item.client_name || item.client || ''
            };
          });
          
          setPortfolioProjects(transformedPortfolio);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError('Gagal memuat portfolio. Silakan coba lagi.');
        setPortfolioProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  // Update current category when filter changes
  useEffect(() => {
    const category = categories.find(cat => cat.slug === activeFilter);
    setCurrentCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [activeFilter, categories]);

  // Show loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Portfolio - B13 Factory</title>
        </Head>
        <PortfolioBanner category={currentCategory} />
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-neutral-600">Memuat portfolio...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Head>
          <title>Portfolio - B13 Factory</title>
        </Head>
        <PortfolioBanner category={currentCategory} />
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-lg mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="primary"
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Filter projects
  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  // Pagination calculations
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <>
      <Head>
        <title>Portfolio - B13 Factory</title>
        <meta name="description" content="Lihat portfolio karya terbaik B13 Factory dalam bidang garment dan advertising" />
      </Head>

      {/* Dynamic Banner based on Category */}
      <PortfolioBanner category={currentCategory} />

      <section className="pt-12 pb-20 bg-white">
        <div className="container-custom">
          {/* Filter Section */}
          <div className="text-center mb-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => setActiveFilter(category.slug)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === category.slug
                      ? 'bg-primary-500 text-white shadow-lg transform -translate-y-1'
                      : 'bg-white text-neutral-700 shadow-md hover:shadow-lg hover:bg-neutral-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Stats Section */}
          {portfolioStats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {portfolioStats.projects_completed}
                </div>
                <div className="text-neutral-700 font-semibold">Projects Completed</div>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-secondary-600 mb-2">
                  {portfolioStats.happy_clients}
                </div>
                <div className="text-neutral-700 font-semibold">Happy Clients</div>
              </div>
              <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-accent-600 mb-2">
                  {portfolioStats.years_experience}
                </div>
                <div className="text-neutral-700 font-semibold">Years Experience</div>
              </div>
            </div>
          )}

          {/* Portfolio Grid - 3x3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  {project.image && project.image !== '/uploads/placeholder.jpg' ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <div className="text-center text-neutral-600">
                        <p>Portfolio Image</p>
                        <p className="text-sm mt-2">{project.title}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center text-white p-6">
                      <ZoomIn size={48} className="mx-auto mb-4" />
                      <p className="font-semibold">Click to View Details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-neutral-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-neutral-500 mb-3">
                    <Calendar size={16} className="mr-1" />
                    <span className="mr-4">{project.year}</span>
                    <MapPin size={16} className="mr-1" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-neutral-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary-600">
                      {project.client}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-900">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Mari wujudkan ide Anda menjadi kenyataan. Konsultasi gratis dengan tim profesional kami.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/contact-us" variant="primary" size="lg">
                Start Project
              </Button>
              <Button href="/produk" variant="outline" size="lg">
                View Our Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {selectedProject.year}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {selectedProject.location}
                      </div>
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full capitalize">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Main Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden">
                  {selectedProject.image && selectedProject.image !== '/uploads/placeholder.jpg' ? (
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-neutral-600">
                      <p>Project Main Image</p>
                      <p className="text-sm">{selectedProject.title}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Deliverables */}
                {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-3">Deliverables</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.deliverables.map((item, index) => (
                        <li key={index} className="flex items-center text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Client Info */}
                <div className="bg-neutral-50 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold mb-2">Client</h4>
                  <p className="text-neutral-700">{selectedProject.client}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button href="/contact-us" variant="primary" className="flex-1">
                    Start Similar Project
                  </Button>
                  <Button 
                    href={`/portofolio/${selectedProject.slug}`} 
                    variant="outline"
                    className="flex items-center"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    View Full Case Study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}