// website/src/pages/portofolio/index.jsx
import Head from 'next/head';
import { useState } from 'react';
import { Filter, Grid, ZoomIn, ExternalLink, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'garment', name: 'Garment' },
    { id: 'bordir', name: 'Bordir' },
    { id: 'advertising', name: 'Advertising' },
    { id: 'merchandise', name: 'Merchandise' },
  ];

  const portfolioProjects = [
    {
      id: 1,
      title: 'Seragam Perusahaan PT. ABC Manufacturing',
      category: 'garment',
      client: 'PT. ABC Manufacturing',
      location: 'Jember, Jawa Timur',
      year: '2024',
      description: 'Pembuatan seragam kantor untuk 500 karyawan dengan bahan cotton pique premium dan custom logo bordir. Dilengkapi dengan variasi warna sesuai divisi perusahaan.',
      image: '/uploads/portfolio-1.jpg',
      images: ['/uploads/portfolio-1-1.jpg', '/uploads/portfolio-1-2.jpg'],
      deliverables: ['500 Set Seragam Kantor', 'Custom Logo Bordir', 'Variasi Warna Divisi']
    },
    {
      id: 2,
      title: 'Banner Event Launching Produk XYZ',
      category: 'advertising',
      client: 'XYZ Brand',
      location: 'Surabaya, Jawa Timur',
      year: '2024',
      description: 'Banner ukuran besar 3x6 meter untuk event launching produk baru. Menggunakan material vinyl frontlit dengan finishing ring besi dan eyelet.',
      image: '/uploads/portfolio-2.jpg',
      images: ['/uploads/portfolio-2-1.jpg'],
      deliverables: ['Banner 3x6 Meter', 'Material Vinyl Frontlit', 'Finishing Ring Besi']
    },
    {
      id: 3,
      title: 'Kaos Komunitas Jember Runner Club',
      category: 'garment',
      client: 'Jember Runner Club',
      location: 'Jember, Jawa Timur',
      year: '2023',
      description: 'Custom kaos running untuk komunitas dengan design eksklusif dan bahan dryfit yang nyaman untuk aktivitas lari.',
      image: '/uploads/portfolio-3.jpg',
      images: ['/uploads/portfolio-3-1.jpg', '/uploads/portfolio-3-2.jpg'],
      deliverables: ['Kaos Bahan Dryfit', 'Design Eksklusif', 'Sablon Rubber']
    },
    {
      id: 4,
      title: 'Jaket Bordir Logo Perusahaan CV. Sukses Makmur',
      category: 'bordir',
      client: 'CV. Sukses Makmur',
      location: 'Banyuwangi, Jawa Timur',
      year: '2023',
      description: 'Jaket custom dengan bordir logo perusahaan yang detail menggunakan teknik komputer bordir untuk hasil yang presisi.',
      image: '/uploads/portfolio-4.jpg',
      images: ['/uploads/portfolio-4-1.jpg'],
      deliverables: ['Jaket Parasut', 'Bordir Komputer', 'Logo Perusahaan']
    },
    {
      id: 5,
      title: 'Spanduk Promosi Retail Store Chain',
      category: 'advertising',
      client: 'Retail Store Chain',
      location: 'Malang, Jawa Timur',
      year: '2024',
      description: 'Spanduk promosi untuk toko retail dengan design menarik dan warna vibrant untuk menarik perhatian customer.',
      image: '/uploads/portfolio-5.jpg',
      images: ['/uploads/portfolio-5-1.jpg'],
      deliverables: ['Spanduk 2x1 Meter', 'Design Menarik', 'Material Tebal']
    },
    {
      id: 6,
      title: 'Merchandise Event Music Festival 2024',
      category: 'merchandise',
      client: 'Music Festival 2024',
      location: 'Bali',
      year: '2024',
      description: 'Merchandise kaos untuk festival musik tahunan dengan design artistik dan limited edition.',
      image: '/uploads/portfolio-6.jpg',
      images: ['/uploads/portfolio-6-1.jpg', '/uploads/portfolio-6-2.jpg'],
      deliverables: ['Kaos Limited Edition', 'Design Artistik', 'Sablon Digital']
    },
    // Tambahkan 6+ project lainnya...
  ];

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