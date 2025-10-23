import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShoppingCart, Package, Truck, Shield, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedSleeveType, setSelectedSleeveType] = useState('');

  // Fetch product data
  useEffect(() => {
    if (!slug) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/content/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        
        if (data.success && data.products) {
          const foundProduct = data.products.find(p => p.slug === slug);
          
          if (!foundProduct) {
            setError('Produk tidak ditemukan');
            return;
          }

          // Parse product data
          const parsePrice = (priceString) => {
            if (typeof priceString === 'number') return priceString;
            if (!priceString) return 0;
            return parseInt(priceString.replace(/[Rp\s.]/g, ''), 10) || 0;
          };

          const parseArray = (data) => {
            if (!data) return [];
            if (Array.isArray(data)) {
              return data.map(item => {
                if (typeof item === 'object' && item.item) return item.item;
                if (typeof item === 'string') return item;
                return String(item);
              });
            }
            return [];
          };

          const parseImages = (data) => {
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

          const parseVariants = (data) => {
            if (!data) return [];
            if (Array.isArray(data)) {
              return data;
            }
            return [];
          };

          const transformedProduct = {
            slug: foundProduct.slug,
            name: foundProduct.name || 'Untitled Product',
            category: foundProduct.category || 'kaos',
            price: parsePrice(foundProduct.price),
            originalPrice: parsePrice(foundProduct.originalPrice),
            // Support for new separated image fields
            home_image: foundProduct.images_section?.home_image || foundProduct.home_image || foundProduct.image || '/uploads/placeholder.jpg',
            card_image: foundProduct.images_section?.card_image || foundProduct.card_image || foundProduct.image || '/uploads/placeholder.jpg',
            detail_image: foundProduct.images_section?.detail_image || foundProduct.detail_image || foundProduct.image || '/uploads/placeholder.jpg',
            // Use detail_image as main image for detail page
            image: foundProduct.images_section?.detail_image || foundProduct.detail_image || foundProduct.image || '/uploads/placeholder.jpg',
            images: parseImages(foundProduct.images),
            description: foundProduct.description || '',
            features: parseArray(foundProduct.features),
            katalog: foundProduct.katalog || '',
            tags: parseArray(foundProduct.tags),
            inStock: foundProduct.inStock !== false,
            minOrder: foundProduct.minOrder || 1,
            stockType: foundProduct.stockType || 'order',
            variants: parseVariants(foundProduct.variants),
            body: foundProduct.body || ''
          };

          setProduct(transformedProduct);
          setQuantity(transformedProduct.minOrder);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Gagal memuat produk');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
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
                <p className="text-neutral-600">Memuat produk...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <>
        <Head>
          <title>Product Not Found - B13 Factory</title>
        </Head>
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-lg mb-4">{error || 'Produk tidak ditemukan'}</p>
                <Button href="/produk" variant="primary">
                  Kembali ke Daftar Produk
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // All product images (main + gallery)
  const allImages = [product.image, ...product.images].filter(Boolean);
  const currentImage = allImages[selectedImage] || product.image;

  // Format price to Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Head>
        <title>{product.name} - B13 Factory</title>
        <meta name="description" content={product.description} />
      </Head>

      <section className="section-padding bg-white pt-20 sm:pt-24">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8 text-xs sm:text-sm">
            <ol className="flex items-center space-x-2 text-neutral-600">
              <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/produk" className="hover:text-primary-600">Produk</Link></li>
              <li>/</li>
              <li className="text-primary-600 font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-12 sm:mb-16">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-neutral-50 rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 relative group" style={{ aspectRatio: '4/3', minHeight: '280px' }}>
                {currentImage ? (
                  <img 
                    src={currentImage} 
                    alt={product.name}
                    className="w-full h-full object-contain p-2 sm:p-4"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 text-center">
                    <p className="text-sm sm:text-base">Product Image</p>
                  </div>
                )}
                
                {/* Image Navigation */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)}
                      className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev + 1) % allImages.length)}
                      className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}
                
                {/* Stock Badge */}
                <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                  {product.inStock ? (
                    <span className="bg-green-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                    <span className="bg-red-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-md sm:rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-primary-500 scale-95'
                          : 'border-transparent hover:border-neutral-300'
                      }`}
                      style={{ aspectRatio: '1/1' }}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 mb-3 sm:mb-4">
                {product.name}
              </h1>

              {/* Stock Type Badge */}
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                  product.stockType === 'ready' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.stockType === 'ready' ? '✓ Ready Stock' : '📦 Made to Order'}
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-neutral-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-neutral-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Fitur Produk:</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Minimum Order */}
              <div className="mb-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Minimum Order:</strong> {product.minOrder} pcs
                </p>
              </div>

              {/* Variant Selector for Ready Stock */}
              {product.stockType === 'ready' && product.variants && product.variants.length > 0 && (
                <div className="mb-6 bg-neutral-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Pilih Varian:</h3>
                  
                  {/* Size Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Ukuran:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(product.variants.map(v => v.size))].map(size => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            setSelectedSleeveType('');
                          }}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : 'border-neutral-300 hover:border-neutral-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sleeve Type Selector */}
                  {selectedSize && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Tipe Lengan:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[...new Set(product.variants
                          .filter(v => v.size === selectedSize)
                          .map(v => v.sleeveType)
                        )].map(sleeveType => {
                          const variant = product.variants.find(
                            v => v.size === selectedSize && v.sleeveType === sleeveType
                          );
                          return (
                            <button
                              key={sleeveType}
                              onClick={() => setSelectedSleeveType(sleeveType)}
                              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                                selectedSleeveType === sleeveType
                                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                                  : 'border-neutral-300 hover:border-neutral-400'
                              }`}
                            >
                              {sleeveType.charAt(0).toUpperCase() + sleeveType.slice(1)}
                              <span className="text-xs ml-2 text-neutral-600">
                                (Stok: {variant?.stock || 0})
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Stock Info */}
                  {selectedSize && selectedSleeveType && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-neutral-200">
                      <p className="text-sm">
                        <strong>Stok tersedia:</strong>{' '}
                        <span className="text-green-600 font-semibold">
                          {product.variants.find(
                            v => v.size === selectedSize && v.sleeveType === selectedSleeveType
                          )?.stock || 0} pcs
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Jumlah:
                </label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-neutral-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(product.minOrder, quantity - 1))}
                      className="px-4 py-2 hover:bg-neutral-50 transition-colors"
                      disabled={quantity <= product.minOrder}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(product.minOrder, parseInt(e.target.value) || product.minOrder))}
                      className="w-20 text-center border-x border-neutral-300 py-2 focus:outline-none"
                      min={product.minOrder}
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-neutral-50 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-neutral-600">
                    Total: {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button
                  href="/contact-us"
                  variant="primary"
                  className="flex-1 justify-center"
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Order Sekarang
                </Button>
                <Button
                  href={product.katalog || '/contact-us'}
                  variant="outline"
                  className="flex-1 justify-center"
                >
                  Download Katalog
                </Button>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-neutral-200">
                <div className="flex items-center gap-3">
                  <Package size={24} className="text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Kualitas Terjamin</p>
                    <p className="text-xs text-neutral-600">Bahan Premium</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck size={24} className="text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Pengiriman Cepat</p>
                    <p className="text-xs text-neutral-600">Seluruh Indonesia</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-primary-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Garansi Produk</p>
                    <p className="text-xs text-neutral-600">100% Original</p>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="pt-6 border-t border-neutral-200">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Back to Products */}
          <div className="text-center">
            <Button href="/produk" variant="outline">
              <ChevronLeft size={20} className="mr-2" />
              Kembali ke Daftar Produk
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}