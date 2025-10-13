import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Filter, X } from 'lucide-react';
import { getAllBlogPosts, getAllArticleCategories } from '@/lib/markdown';

export async function getStaticProps() {
  const posts = getAllBlogPosts();
  const categories = getAllArticleCategories();

  return {
    props: {
      posts,
      categories,
    },
  };
}

const categoryColors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
};

export default function ArticlesPage({ posts, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Filter articles
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + articlesPerPage);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Get category info
  const getCategoryInfo = (categorySlug) => {
    return categories.find(cat => cat.slug === categorySlug) || { name: categorySlug, color: 'blue' };
  };

  return (
    <>
      <Head>
        <title>Articles & Insights | B13 Factory Garment & Advertising</title>
        <meta 
          name="description" 
          content="Explore expert insights, industry news, and practical guides on garment manufacturing, printing, and corporate branding from B13 Factory." 
        />
      </Head>

      {/* Hero Section - Professional Corporate Style */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Articles & <span className="text-blue-400">Insights</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Expert knowledge on garment manufacturing, printing technology, and corporate branding solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-6">
          {/* Search & Filter Bar */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-slate-600">Active filters:</span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      Search: "{searchQuery}"
                      <X size={14} />
                    </button>
                  )}
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {getCategoryInfo(selectedCategory).name}
                      <X size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Info */}
          <div className="max-w-6xl mx-auto mb-8">
            <p className="text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Articles Grid */}
          {currentPosts.length > 0 ? (
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentPosts.map(post => {
                const categoryInfo = getCategoryInfo(post.category);
                const colorClass = categoryColors[categoryInfo.color] || categoryColors.blue;

                return (
                  <Link 
                    href={`/artikel/${post.slug}`} 
                    key={post.slug}
                    className="group"
                  >
                    <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {post.image && post.image !== '/uploads/default-article.jpg' ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          <p className="text-sm">Article Image</p>
                        </div>
                      </div>
                    )}
                        
                {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold border ${colorClass} backdrop-blur-sm`}>
                      {categoryInfo.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                          <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                    <span className="text-xs">{calculateReadTime(post.content)}</span>
                  </div>

                  {/* Read More Link */}
                    <div className="mt-4">
                      <div className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Read More
                      <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
                );
              })}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto text-center py-16">
              <div className="text-slate-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-6xl mx-auto flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors font-medium text-slate-700"
            >
              Next
            </button>
          </div>
          )}
        </div>
      </section>
    </>
  );
}