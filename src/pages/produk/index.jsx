import Head from 'next/head';
import { useState, useRef, useEffect } from 'react';
import { Filter, Grid, List, Download, Search, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import ProductBanner from '@/components/products/ProductBanner';
import Pagination from '@/components/ui/Pagination';
import { useProducts } from '@/hooks/useProducts';
import { sortOptions } from '@/data/products';

export default function Produk() {
  const {
    products,
    allProducts,
    loading,
    error,
    categories,
    currentCategory,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    viewMode,
    setViewMode,
    totalProducts,
    showingProducts
  } = useProducts();

  // State untuk kategori dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse enter - cancel any pending close and open dropdown
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoryOpen(true);
  };

  // Handle mouse leave - delay closing the dropdown
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 400); // 400ms delay sebelum menutup
  };

  // Handle loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Produk - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          </div>
        </section>
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-sm sm:text-base text-slate-600">Memuat produk...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Handle error state
  if (error) {
    return (
      <>
        <Head>
          <title>Produk - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          </div>
        </section>
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="text-center">
                <p className="text-red-600 text-sm sm:text-base md:text-lg mb-4">{error}</p>
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

  return (
    <>
      <Head>
        <title>Produk - B13 Factory</title>
        <meta name="description" content="Lihat berbagai produk garment dan advertising berkualitas dari B13 Factory" />
      </Head>

      {/* Dynamic Banner based on Category */}
      <ProductBanner category={currentCategory} />

      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Filter - Hidden on Mobile, Shown on Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
                {/* Search Box */}
                <div className="mb-6">
                  <label htmlFor="search-desktop" className="sr-only">Cari produk</label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      id="search-desktop"
                      type="text"
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Category Filter - Desktop */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-900">
                    <Filter size={20} className="mr-2 text-blue-600" />
                    Kategori
                  </h3>
                  
                  <div 
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between bg-white border-2 border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition-all">
                      <span className="font-medium text-slate-700">
                        {categories.find(c => c.id === selectedCategory)?.name || 'Semua Kategori'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-slate-600 transition-transform duration-200 ${
                          isCategoryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div 
                      className={`absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-[100] transition-all duration-200 ${
                        isCategoryOpen 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                        {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current);
                          }
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-slate-700 hover:bg-blue-50 border border-transparent hover:border-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{category.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                    </div>
                  </div>
                </div>
              </div>

                {/* Download Katalog */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Katalog</h3>
                  <Button 
                    href="/katalog/katalog-lengkap.pdf"
                    variant="outline"
                    className="w-full justify-center text-sm"
                  >
                    <Download size={18} className="mr-2" />
                    Download Katalog Lengkap
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              {/* Mobile Filter Bar */}
              <div className="lg:hidden mb-6 space-y-3">
                {/* Kategori Label */}
                <h3 className="text-base font-semibold text-slate-900 flex items-center">
                  <Filter size={18} className="mr-2 text-blue-600" />
                  Kategori
                </h3>
                
                {/* Search + Category Dropdown Row */}
                <div className="flex gap-2">
                  {/* Search Box */}
                  <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Category Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-slate-300 rounded-lg bg-white hover:border-blue-500 transition-all whitespace-nowrap text-sm"
                    >
                      <Filter size={16} />
                      <ChevronDown size={16} className={`transition-transform ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isCategoryOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50">
                        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                          {categories.map(category => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.id);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                                selectedCategory === category.id
                                  ? 'bg-blue-500 text-white'
                                  : 'hover:bg-blue-50 text-slate-700'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{category.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  selectedCategory === category.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {category.count}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Menampilkan {showingProducts} dari {totalProducts} produk
                    {searchTerm && (
                      <span className="block sm:inline"> untuk "<strong>{searchTerm}</strong>"</span>
                    )}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">
                      Urutkan:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-neutral-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-neutral-100 rounded-lg p-0.5 sm:p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan grid"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid size={16} className="sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan list"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List size={16} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Download Katalog - Mobile */}
                  <Button 
                    href="/katalog/katalog-lengkap.pdf"
                    variant="outline"
                    className="lg:hidden px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <Download size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-600 text-sm sm:text-base md:text-lg mb-4">Tidak ada produk yang ditemukan</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                      setSortBy('name');
                    }}
                    variant="primary"
                    className="text-sm"
                  >
                    Reset Filter
                  </Button>
                </div>
              )}

              {/* Product Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="grid" 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="list" 
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}