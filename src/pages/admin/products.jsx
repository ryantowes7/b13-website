import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, Edit, Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content/products');
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      
      if (data.success && data.products) {
        setProducts(data.products);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Gagal memuat produk');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Manage Products - Admin</title>
        </Head>
        <div className="min-h-screen bg-neutral-50 py-12">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-neutral-600">Memuat produk...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Manage Products - Admin</title>
        </Head>
        <div className="min-h-screen bg-neutral-50 py-12">
          <div className="container-custom">
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <p className="text-red-600 text-lg mb-4">{error}</p>
                <button 
                  onClick={fetchProducts}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Manage Products - Admin</title>
      </Head>
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Manage Products</h1>
                <p className="text-neutral-600">Kelola stok dan varian produk Anda</p>
              </div>
              <Link 
                href="/admin"
                className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
              >
                Kembali ke Admin
              </Link>
            </div>
          </div>

          {/* Products List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 border-b border-neutral-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700">Produk</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700">Kategori</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700">Tipe Stok</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700">Min. Order</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-700">Varian</th>
                    <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {products.map((product) => (
                    <tr key={product.slug} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package size={20} className="text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-neutral-900">{product.name}</p>
                            <p className="text-sm text-neutral-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize">
                          {product.category || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          product.stockType === 'ready' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {product.stockType === 'ready' ? 'Ready Stock' : 'By Order'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {product.minOrder || 1} pcs
                      </td>
                      <td className="px-6 py-4 text-neutral-700">
                        {product.stockType === 'ready' && product.variants ? (
                          <span className="text-sm">
                            {product.variants.length} varian
                          </span>
                        ) : (
                          <span className="text-sm text-neutral-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/products/${product.slug}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          <Edit size={16} />
                          Kelola Stok
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-1">Total Produk</p>
              <p className="text-3xl font-bold text-neutral-900">{products.length}</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-1">Ready Stock</p>
              <p className="text-3xl font-bold text-green-600">
                {products.filter(p => p.stockType === 'ready').length}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <p className="text-sm text-neutral-600 mb-1">By Order</p>
              <p className="text-3xl font-bold text-blue-600">
                {products.filter(p => p.stockType === 'order').length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}