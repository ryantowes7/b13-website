// website/src/pages/artikel/index.jsx
import Head from 'next/head';
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Artikel() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9; // 3x3 grid

  const articles = [
    {
      id: 1,
      title: 'Tips Memilih Bahan Kaos untuk Sablon',
      excerpt: 'Panduan lengkap memilih bahan kaos yang tepat untuk kebutuhan sablon dengan hasil maksimal...',
      category: 'Tips & Trik',
      author: 'Admin B13',
      date: '15 Des 2024',
      readTime: '5 min read',
      image: '/uploads/article-1.jpg'
    },
    {
      id: 2,
      title: 'Perbedaan Sablon Digital dan Rubber',
      excerpt: 'Mengenal perbedaan teknik sablon digital dan rubber serta keunggulan masing-masing metode...',
      category: 'Teknik',
      author: 'Tim Produksi',
      date: '10 Des 2024', 
      readTime: '4 min read',
      image: '/uploads/article-2.jpg'
    },
    // Tambahkan 10+ artikel lainnya...
  ];

  // Pagination calculation
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const currentArticles = articles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  return (
    <>
      <Head>
        <title>Artikel - B13 Factory</title>
        <meta name="description" content="Baca artikel terbaru seputar garment, advertising, dan tips bisnis dari B13 Factory" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artikel & Berita</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Update terbaru seputar garment, advertising, tips bisnis, dan insight industri
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-4 py-4 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Article Grid - 3x3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentArticles.map(article => (
              <article key={article.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover group">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-2xl flex items-center justify-center">
                  <div className="text-center text-neutral-600">
                    <p>Article Image</p>
                    <p className="text-sm">{article.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category */}
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {article.category}
                  </span>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-neutral-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {article.date}
                      </div>
                    </div>
                    <span>{article.readTime}</span>
                  </div>

                  {/* Read More */}
                  <Button 
                    href={`/artikel/${article.id}`}
                    variant="outline"
                    className="w-full group-hover:bg-primary-500 group-hover:text-white transition-all"
                  >
                    Baca Selengkapnya
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg transition-all ${
                  currentPage === index + 1
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'border border-neutral-300 hover:bg-neutral-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
}