// website/src/pages/produk/index.jsx
import Head from 'next/head';
import { useState } from 'react';
import { Filter, Grid, List, Download } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Produk() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Produk', count: 24 },
    { id: 'kaos', name: 'Kaos Sablon', count: 8 },
    { id: 'bordir', name: 'Bordir', count: 6 },
    { id: 'banner', name: 'Banner & Spanduk', count: 5 },
    { id: 'merchandise', name: 'Merchandise', count: 5 },
  ];

  const products = [
    {
      id: 1,
      name: 'Kaos Polo Sablon',
      category: 'kaos',
      price: 'Rp 85.000',
      image: '/uploads/product-1.jpg',
      description: 'Kaos polo bahan cotton pique dengan sablon rubber berkualitas',
      katalog: '/katalog/kaos-polo.pdf'
    },
    {
      id: 2,
      name: 'Jaket Bordir Logo',
      category: 'bordir', 
      price: 'Rp 250.000',
      image: '/uploads/product-2.jpg',
      description: 'Jaket parasut dengan bordir logo komputer presisi tinggi',
      katalog: '/katalog/jaket-bordir.pdf'
    },
    // Tambahkan 22 produk lainnya...
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
              <div className="flex justify-between items-center mb-8">
                <p className="text-neutral-600">
                  Menampilkan {filteredProducts.length} produk
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex bg-neutral-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                    >
                      <Grid size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
                      <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-xl flex items-center justify-center">
                        <div className="text-center text-neutral-600">
                          <p>Product Image</p>
                          <p className="text-sm">{product.name}</p>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-neutral-900">
                          {product.name}
                        </h3>
                        <p className="text-neutral-600 mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-bold text-primary-600">
                            {product.price}
                          </span>
                          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm">
                            {product.category}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button href={`/produk/${product.id}`} variant="primary" className="flex-1">
                            Detail
                          </Button>
                          {product.katalog && (
                            <Button 
                              href={product.katalog}
                              variant="outline"
                              className="px-3"
                            >
                              <Download size={18} />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48 h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                          <div className="text-center text-neutral-600">
                            <p>Product Image</p>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-2xl font-semibold mb-2 text-neutral-900">
                            {product.name}
                          </h3>
                          <p className="text-neutral-600 mb-4">
                            {product.description}
                          </p>
                          <div className="flex flex-wrap gap-4 items-center">
                            <span className="text-2xl font-bold text-primary-600">
                              {product.price}
                            </span>
                            <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full">
                              {product.category}
                            </span>
                            {product.katalog && (
                              <Button 
                                href={product.katalog}
                                variant="outline"
                                size="sm"
                              >
                                <Download size={16} className="mr-2" />
                                Katalog
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button href={`/produk/${product.id}`} variant="primary">
                            Detail
                          </Button>
                          <Button href="/contact-us" variant="outline">
                            Konsultasi
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}