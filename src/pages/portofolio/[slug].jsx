import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar, MapPin, User, ChevronLeft, ChevronRight, ExternalLink, Award, Target, CheckCircle2, Quote, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PortfolioDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [portfolio, setPortfolio] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Fetch portfolio data
  useEffect(() => {
    if (!slug) return;

    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/portfolio');
        
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio');
        }
        
        const data = await response.json();
        
        if (data.success && data.portfolio) {
          const foundPortfolio = data.portfolio.find(p => p.slug === slug);
          
          if (!foundPortfolio) {
            setError('Portfolio tidak ditemukan');
            return;
          }

          // Parse gallery images
          const parseGallery = (data) => {
            if (!data) return [];
            if (Array.isArray(data)) {
              return data.map(item => {
                if (typeof item === 'object' && item.url) return item.url;
                if (typeof item === 'string') return item;
                return String(item);
              });
            }
            return [];
          };

          const transformedPortfolio = {
            slug: foundPortfolio.slug,
            name: foundPortfolio.name || 'Untitled Project',
            client: foundPortfolio.client || 'Client',
            category: foundPortfolio.category || 'garment',
            date: foundPortfolio.date || new Date().toISOString(),
            location: foundPortfolio.location || 'Jember, Jawa Timur',
            image: foundPortfolio.image || '/uploads/placeholder.jpg',
            gallery: parseGallery(foundPortfolio.gallery),
            description: foundPortfolio.description || '',
            details: foundPortfolio.details || '',
            testimonial: foundPortfolio.testimonial || '',
            client_name: foundPortfolio.client_name || foundPortfolio.client || ''
          };

          setPortfolio(transformedPortfolio);

          // Find related projects (same category, excluding current)
          const related = data.portfolio
            .filter(p => p.category === transformedPortfolio.category && p.slug !== slug)
            .slice(0, 3)
            .map(p => ({
              slug: p.slug,
              name: p.name,
              image: p.image,
              category: p.category,
              client: p.client
            }));
          
          setRelatedProjects(related);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
        setError(err.message || 'Gagal memuat portfolio');
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - B13 Factory</title>
        </Head>
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

  // Error state
  if (error || !portfolio) {
    return (
      <>
        <Head>
          <title>Portfolio Not Found - B13 Factory</title>
        </Head>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-lg mb-4">{error || 'Portfolio tidak ditemukan'}</p>
                <Button href="/portofolio" variant="primary">
                  Kembali ke Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // All images (main + gallery)
  const allImages = [portfolio.image, ...portfolio.gallery].filter(Boolean);
  const currentImage = allImages[selectedImage] || portfolio.image;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{portfolio.name} - B13 Factory Portfolio</title>
        <meta name="description" content={portfolio.description} />
      </Head>

      {/* Hero Section - Elegant with Image Background */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {portfolio.image && portfolio.image !== '/uploads/placeholder.jpg' ? (
            <img 
              src={portfolio.image} 
              alt={portfolio.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full container-custom flex items-end pb-16">
          <div className="max-w-4xl text-white">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm">
              <ol className="flex items-center space-x-2 text-white/80">
                <li><Link href="/" className="hover:text-white transition">Home</Link></li>
                <li>/</li>
                <li><Link href="/portofolio" className="hover:text-white transition">Portfolio</Link></li>
                <li>/</li>
                <li className="text-white font-medium">{portfolio.name}</li>
              </ol>
            </nav>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-primary-500 px-4 py-2 rounded-full text-sm font-semibold capitalize">
                {portfolio.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {portfolio.name}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-lg">
              <div className="flex items-center gap-2">
                <User size={22} />
                <span>{portfolio.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={22} />
                <span>{formatDate(portfolio.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={22} />
                <span>{portfolio.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Overview Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Overview */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Target size={24} className="text-primary-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-neutral-900">Project Overview</h2>
                </div>
                <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                  {portfolio.description}
                </p>

                {/* Project Details - Moved Here */}
                {portfolio.details && (
                  <div className="mt-8 pt-8 border-t border-neutral-200">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-accent-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-neutral-900">Project Details</h3>
                    </div>
                    
                    <div 
                      className="prose prose-lg max-w-none text-neutral-700"
                      dangerouslySetInnerHTML={{ 
                        __html: portfolio.details
                          .split('\n')
                          .map(line => {
                            // Heading level 2
                            if (line.startsWith('## ')) {
                              return `<h4 class="text-xl font-bold text-neutral-900 mt-6 mb-3">${line.replace('## ', '')}</h4>`;
                            }
                            // Bullet list
                            if (line.trim().startsWith('- ')) {
                              return `<li class="ml-6 mb-2 list-disc">${line.replace(/^- /, '')}</li>`;
                            }
                            // Bold text
                            let processedLine = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                            // Italic text
                            processedLine = processedLine.replace(/\*(.+?)\*/g, '<em>$1</em>');
                            // Regular paragraph
                            if (line.trim()) {
                              return `<p class="mb-3 leading-relaxed">${processedLine}</p>`;
                            }
                            return '';
                          })
                          .join('')
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Quick Info Card */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 shadow-lg sticky top-24">
                  <h3 className="text-xl font-bold text-neutral-900 mb-6">Project Info</h3>
                  
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm text-neutral-600 mb-2 flex items-center gap-2">
                        <User size={16} /> Client
                      </p>
                      <p className="font-semibold text-neutral-900 text-lg">{portfolio.client}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-neutral-600 mb-2 flex items-center gap-2">
                        <Award size={16} /> Category
                      </p>
                      <p className="font-semibold text-neutral-900 text-lg capitalize">{portfolio.category}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-neutral-600 mb-2 flex items-center gap-2">
                        <Calendar size={16} /> Date
                      </p>
                      <p className="font-semibold text-neutral-900 text-lg">{formatDate(portfolio.date)}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <Button href="/contact-us" variant="primary" className="w-full justify-center mb-3">
                      Mulai Proyek Serupa
                    </Button>
                    <Button href="/portofolio" variant="outline" className="w-full justify-center">
                      Lihat Portfolio Lainnya
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          {allImages.length > 0 && (
            <div className="max-w-6xl mx-auto mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <ExternalLink size={24} className="text-secondary-600" />
                </div>
                <h2 className="text-3xl font-bold text-neutral-900">Project Gallery</h2>
              </div>

              {/* Main Image */}
              <div className="mb-6">
                <div 
                  className="relative aspect-video bg-neutral-100 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl"
                  onClick={() => setLightboxOpen(true)}
                >
                  {currentImage && currentImage !== '/uploads/placeholder.jpg' ? (
                    <img 
                      src={currentImage} 
                      alt={`${portfolio.name} - Image ${selectedImage + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-100 to-secondary-100">
                      <p className="text-neutral-500">Portfolio Image</p>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <div className="transform scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                        <ExternalLink size={32} className="text-primary-600" />
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
                        }}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all z-10"
                      >
                        <ChevronLeft size={28} className="text-neutral-900" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage((prev) => (prev + 1) % allImages.length);
                        }}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 shadow-xl opacity-0 group-hover:opacity-100 transition-all z-10"
                      >
                        <ChevronRight size={28} className="text-neutral-900" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {selectedImage + 1} / {allImages.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Grid */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-3 transition-all ${
                        selectedImage === index
                          ? 'border-primary-500 ring-2 ring-primary-200 scale-95'
                          : 'border-transparent hover:border-neutral-300'
                      }`}
                    >
                      {img && img !== '/uploads/placeholder.jpg' ? (
                        <img 
                          src={img} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Testimonial Section */}
          {portfolio.testimonial && (
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-12 shadow-2xl text-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-24 -mb-24"></div>
                
                <div className="relative">
                  <Quote size={48} className="text-white/30 mb-6" />
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    "{portfolio.testimonial}"
                  </blockquote>
                  {portfolio.client_name && (
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <User size={32} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{portfolio.client_name}</p>
                        <p className="text-white/80">{portfolio.client}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-neutral-900 mb-4">Portfolio Terkait</h2>
                <p className="text-lg text-neutral-600">
                  Lihat proyek lainnya dalam kategori yang sama
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/portofolio/${project.slug}`}>
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {project.image && project.image !== '/uploads/placeholder.jpg' ? (
                          <img 
                            src={project.image} 
                            alt={project.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100"></div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {project.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-3">{project.client}</p>
                        <div className="flex items-center text-primary-600 font-semibold group-hover:translate-x-2 transition-transform">
                          <span className="mr-2">Lihat Detail</span>
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto mt-20">
            <div className="text-center bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-12 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
                Tertarik dengan Proyek Serupa?
              </h2>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Mari diskusikan proyek Anda dengan tim profesional kami
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button href="/contact-us" variant="primary" size="lg">
                  Hubungi Kami
                </Button>
                <Button href="/portofolio" variant="outline" size="lg">
                  <ChevronLeft size={20} className="mr-2" />
                  Kembali ke Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-neutral-300 transition"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </button>
          
          <div className="relative max-w-7xl w-full">
            <img 
              src={currentImage} 
              alt={portfolio.name}
              className="w-full h-auto max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length);
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev + 1) % allImages.length);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}