import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ShoppingCart, Star, Package, Truck, Shield, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
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

          const transformedProduct = {
            slug: foundProduct.slug,
            name: foundProduct.name || 'Untitled Product',
            category: foundProduct.category || 'kaos',
            price: parsePrice(foundProduct.price),
            originalPrice: parsePrice(foundProduct.originalPrice),
            image: foundProduct.image || '/uploads/placeholder.jpg',
            images: parseImages(foundProduct.images),
            description: foundProduct.description || '',
            features: parseArray(foundProduct.features),
            katalog: foundProduct.katalog || '',
            tags: parseArray(foundProduct.tags),
            inStock: foundProduct.inStock !== false,
            minOrder: foundProduct.minOrder || 1,
            rating: parseFloat(foundProduct.rating) || 0,
            reviewCount: parseInt(foundProduct.reviewCount) || 0,
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

      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm">
            <ol className="flex items-center space-x-2 text-neutral-600">
              <li><Link href="/" className="hover:text-primary-600">Home</Link></li>
              <li>/</li>
              <li><Link href="/produk" className="hover:text-primary-600">Produk</Link></li>
              <li>/</li>
              <li className="text-primary-600 font-medium">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="bg-neutral-50 rounded-2xl overflow-hidden mb-4 aspect-square flex items-center justify-center relative group">
                {currentImage ? (
                  <img 
                    src={currentImage} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-neutral-400 text-center">
                    <p>Product Image</p>
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
                
                {/* Stock Badge */}
                <div className="absolute top-4 right-4">
                  {product.inStock ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      -{discountPercentage}%
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-primary-500 scale-95'
                          : 'border-transparent hover:border-neutral-300'
                      }`}
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
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-neutral-300'}
                      />
                    ))}
                  </div>
                  <span className="text-neutral-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              )}

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