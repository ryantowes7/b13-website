import Head from 'next/head';
import { Filter, Grid, List, Download, Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
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

  // Handle loading state
  if (loading) {
    return (
      <>
        <Head>
          <title>Produk - B13 Factory</title>
        </Head>
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          </div>
        </section>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-neutral-600">Memuat produk...</p>
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
        <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
          <div className="container-custom text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
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

  return (
    <>
      <Head>
        <title>Produk - B13 Factory</title>
        <meta name="description" content="Lihat berbagai produk garment dan advertising berkualitas dari B13 Factory" />
      </Head>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Temukan berbagai produk garment dan advertising berkualitas untuk kebutuhan bisnis Anda
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filter */}
            <div className="lg:w-1/4">
              <div className="bg-neutral-50 rounded-xl p-6 sticky top-24">
                {/* Search Box */}
                <div className="mb-6">
                  <label htmlFor="search" className="sr-only">Cari produk</label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                    <input
                      id="search"
                      type="text"
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Filter size={20} className="mr-2" />
                    Kategori
                  </h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-primary-500 text-white shadow-md'
                            : 'bg-white text-neutral-700 hover:bg-neutral-100'
                        }`}
                        aria-pressed={selectedCategory === category.id}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Download Katalog */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Katalog</h3>
                  <Button 
                    href="/katalog/katalog-lengkap.pdf"
                    variant="outline"
                    className="w-full justify-center"
                  >
                    <Download size={20} className="mr-2" />
                    Download Katalog Lengkap
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:w-3/4">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="flex-1">
                  <p className="text-neutral-600">
                    Menampilkan {showingProducts} dari {totalProducts} produk
                    {searchTerm && (
                      <span> untuk "<strong>{searchTerm}</strong>"</span>
                    )}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-sm text-neutral-600 whitespace-nowrap">
                      Urutkan:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan grid"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan list"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Empty State */}
              {products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-600 text-lg mb-4">Tidak ada produk yang ditemukan</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                      setSortBy('name');
                    }}
                    variant="primary"
                  >
                    Reset Filter
                  </Button>
                </div>
              )}

              {/* Product Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="grid" 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
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