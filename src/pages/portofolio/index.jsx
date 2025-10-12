// website/src/pages/portofolio/index.jsx
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Filter, Grid, ZoomIn, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'garment', name: 'Garment' },
    { id: 'bordir', name: 'Bordir' },
    { id: 'advertising', name: 'Advertising' },
    { id: 'merchandise', name: 'Merchandise' },
  ];

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
              category: item.category || 'garment',
              client: item.client || 'Client',
              location: 'Jember, Jawa Timur', // Default location
              year: year,
              description: item.description || '',
              image: item.image || '/uploads/placeholder.jpg',
              images: gallery,
              deliverables: [], // Will be extracted from details if needed
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

  // Show loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Portfolio - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          </div>
        </section>
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
        <section className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          </div>
        </section>
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

  const filteredProjects = activeFilter === 'all' 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === activeFilter);

  return (
    <>
      <Head>
        <title>Portfolio - B13 Factory</title>
        <meta name="description" content="Lihat portfolio karya terbaik B13 Factory dalam bidang garment dan advertising" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Karya terbaik yang telah kami hasilkan untuk berbagai klien dari berbagai industri
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filter Section */}
          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-primary-500 text-white shadow-lg transform -translate-y-1'
                      : 'bg-white text-neutral-700 shadow-md hover:shadow-lg hover:bg-neutral-50'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 mb-1">{portfolioProjects.length}+</div>
                <div className="text-neutral-600">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600 mb-1">50+</div>
                <div className="text-neutral-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent-500 mb-1">98%</div>
                <div className="text-neutral-600">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-500 mb-1">5</div>
                <div className="text-neutral-600">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Portfolio Grid - Masonry Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover group cursor-pointer ${
                  index % 4 === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <div className="text-center text-neutral-600">
                      <p>Portfolio Image</p>
                      <p className="text-sm mt-2">{project.title}</p>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center text-white p-6">
                      <ZoomIn size={48} className="mx-auto mb-4" />
                      <p className="font-semibold">Click to View Details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-neutral-700 px-3 py-1 rounded-full text-sm font-medium">
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
              <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 rounded-t-2xl">
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
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full">
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
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-xl mb-6 flex items-center justify-center">
                  <div className="text-center text-neutral-600">
                    <p>Project Main Image</p>
                    <p className="text-sm">{selectedProject.title}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-3">Project Overview</h3>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Deliverables */}
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

                {/* Client Info */}
                <div className="bg-neutral-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Client</h4>
                  <p className="text-neutral-700">{selectedProject.client}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <Button href="/contact-us" variant="primary" className="flex-1">
                    Start Similar Project
                  </Button>
                  <Button 
                    href={`/portofolio/${selectedProject.id}`} 
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