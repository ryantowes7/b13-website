import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Calendar, MapPin, User, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function PortfolioDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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
            image: foundPortfolio.image || '/uploads/placeholder.jpg',
            gallery: parseGallery(foundPortfolio.gallery),
            description: foundPortfolio.description || '',
            details: foundPortfolio.details || '',
            testimonial: foundPortfolio.testimonial || '',
            client_name: foundPortfolio.client_name || foundPortfolio.client || ''
          };

          setPortfolio(transformedPortfolio);
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-accent-500 to-accent-600 text-white py-20">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <ol className="flex items-center space-x-2 text-white/80">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li>/</li>
              <li><Link href="/portofolio" className="hover:text-white">Portfolio</Link></li>
              <li>/</li>
              <li className="text-white font-medium">{portfolio.name}</li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {portfolio.name}
          </h1>
          
          <div className="flex flex-wrap gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <User size={20} />
              <span>{portfolio.client}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{formatDate(portfolio.date)}</span>
            </div>
            <div>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {portfolio.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Main Image Gallery */}
              <div className="mb-8">
                {/* Featured Image */}
                <div className="bg-neutral-50 rounded-2xl overflow-hidden mb-4 aspect-video flex items-center justify-center relative group">
                  {currentImage ? (
                    <img 
                      src={currentImage} 
                      alt={portfolio.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-neutral-400 text-center">
                      <p>Portfolio Image</p>
                    </div>
                  )}
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev + 1) % allImages.length)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {allImages.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      {selectedImage + 1} / {allImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {allImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index
                            ? 'border-primary-500 scale-95'
                            : 'border-transparent hover:border-neutral-300'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${portfolio.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Project Overview */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">Project Overview</h2>
                <p className="text-neutral-700 leading-relaxed text-lg">
                  {portfolio.description}
                </p>
              </div>

              {/* Project Details (Markdown Content) */}
              {portfolio.details && (
                <div className="mb-8 prose prose-lg max-w-none">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-4">Project Details</h2>
                  <div className="text-neutral-700 leading-relaxed">
                    {/* Simple markdown rendering - split by newlines */}
                    {portfolio.details.split('').map((line, index) => {
                      // Handle headers
                      if (line.startsWith('## ')) {
                        return <h3 key={index} className="text-xl font-bold mt-6 mb-3">{line.replace('## ', '')}</h3>;
                      }
                      // Handle bold text
                      if (line.includes('**')) {
                        const parts = line.split('**');
                        return (
                          <p key={index} className="mb-2">
                            {parts.map((part, i) => i % 2 === 0 ? part : <strong key={i}>{part}</strong>)}
                          </p>
                        );
                      }
                      // Handle list items
                      if (line.trim().startsWith('- ')) {
                        return (
                          <li key={index} className="ml-6 mb-1">
                            {line.replace('- ', '')}
                          </li>
                        );
                      }
                      // Regular paragraph
                      if (line.trim()) {
                        return <p key={index} className="mb-3">{line}</p>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* Testimonial */}
              {portfolio.testimonial && (
                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 mb-8">
                  <h3 className="text-xl font-bold text-neutral-900 mb-4">Client Testimonial</h3>
                  <blockquote className="text-lg italic text-neutral-700 mb-4">
                    "{portfolio.testimonial}"
                  </blockquote>
                  {portfolio.client_name && (
                    <p className="text-neutral-600 font-medium">
                      — {portfolio.client_name}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-neutral-50 rounded-2xl p-6 sticky top-24">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Project Info</h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Client</p>
                    <p className="font-semibold text-neutral-900">{portfolio.client}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Category</p>
                    <p className="font-semibold text-neutral-900 capitalize">{portfolio.category}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Date</p>
                    <p className="font-semibold text-neutral-900">{formatDate(portfolio.date)}</p>
                  </div>
                </div>

                <div className="border-t border-neutral-200 pt-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Interested in Similar Project?</h4>
                  <Button href="/contact-us" variant="primary" className="w-full justify-center mb-3">
                    Start Your Project
                  </Button>
                  <Button href="/portofolio" variant="outline" className="w-full justify-center">
                    View More Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Portfolio */}
          <div className="text-center mt-12">
            <Button href="/portofolio" variant="outline">
              <ChevronLeft size={20} className="mr-2" />
              Kembali ke Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}