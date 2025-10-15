export default function AboutBanner({ banner }) {
  // Fallback jika tidak ada banner data
  if (!banner) {
    return (
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About B13 Factory</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${banner.banner_image || '/uploads/placeholder.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative h-full container-custom flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {banner.banner_title || 'About B13 Factory'}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            {banner.banner_subtitle || 'Specialist dalam garment dan advertising dengan pengalaman lebih dari 5 tahun'}
          </p>
        </div>
      </div>
    </section>
  );
}