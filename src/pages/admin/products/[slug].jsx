import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Save, Plus, Trash2, ArrowLeft, Package } from 'lucide-react';

export default function AdminProductEdit() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [variants, setVariants] = useState([]);
  const [newVariant, setNewVariant] = useState({
    size: 'S',
    sleeveType: 'pendek',
    stock: 0
  });

  useEffect(() => {
    if (!slug) return;
    fetchProduct();
  }, [slug]);

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

        setProduct(foundProduct);
        setVariants(foundProduct.variants || []);
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

  const handleAddVariant = () => {
    if (newVariant.size && newVariant.sleeveType) {
      // Check if variant already exists
      const exists = variants.find(
        v => v.size === newVariant.size && v.sleeveType === newVariant.sleeveType
      );
      
      if (exists) {
        alert('Varian dengan ukuran dan tipe lengan ini sudah ada!');
        return;
      }

      setVariants([...variants, { ...newVariant }]);
      setNewVariant({ size: 'S', sleeveType: 'pendek', stock: 0 });
    }
  };

  const handleUpdateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: field === 'stock' ? parseInt(value) || 0 : value };
    setVariants(updated);
  };

  const handleDeleteVariant = (index) => {
    if (confirm('Apakah Anda yakin ingin menghapus varian ini?')) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const response = await fetch(`/api/admin/update-product-stock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: product.slug,
          variants: variants
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Stok berhasil diperbarui!');
        fetchProduct();
      } else {
        throw new Error(result.message || 'Gagal menyimpan perubahan');
      }
    } catch (err) {
      console.error('Error saving:', err);
      alert('Gagal menyimpan perubahan: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading... - Admin</title>
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

  if (error || !product) {
    return (
      <>
        <Head>
          <title>Error - Admin</title>
        </Head>
        <div className="min-h-screen bg-neutral-50 py-12">
          <div className="container-custom">
            <div className="flex flex-col justify-center items-center py-20">
              <p className="text-red-600 text-lg mb-4">{error || 'Produk tidak ditemukan'}</p>
              <Link 
                href="/admin/products"
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Kembali ke Daftar Produk
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Edit Stok: {product.name} - Admin</title>
      </Head>
      
      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container-custom max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/admin/products"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
            >
              <ArrowLeft size={20} />
              Kembali ke Daftar Produk
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Kelola Stok Produk</h1>
                <p className="text-neutral-600">{product.name}</p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  product.stockType === 'ready' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.stockType === 'ready' ? 'Ready Stock' : 'By Order'}
                </span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={32} className="text-primary-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">{product.name}</h2>
                <p className="text-neutral-600 mb-3">{product.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-neutral-600">Kategori: </span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div>
                    <span className="text-neutral-600">Min. Order: </span>
                    <span className="font-medium">{product.minOrder} pcs</span>
                  </div>
                  <div>
                    <span className="text-neutral-600">Harga: </span>
                    <span className="font-medium">{product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Management */}
          {product.stockType === 'ready' ? (
            <>
              {/* Existing Variants */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Varian Stok Tersedia</h3>
                
                {variants.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <p>Belum ada varian stok. Tambahkan varian baru di bawah.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-neutral-50 border-b border-neutral-200">
                        <tr>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Ukuran</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Tipe Lengan</th>
                          <th className="text-left px-4 py-3 text-sm font-semibold text-neutral-700">Stok</th>
                          <th className="text-right px-4 py-3 text-sm font-semibold text-neutral-700">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {variants.map((variant, index) => (
                          <tr key={index} className="hover:bg-neutral-50">
                            <td className="px-4 py-3">
                              <select
                                value={variant.size}
                                onChange={(e) => handleUpdateVariant(index, 'size', e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <select
                                value={variant.sleeveType}
                                onChange={(e) => handleUpdateVariant(index, 'sleeveType', e.target.value)}
                                className="px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              >
                                <option value="pendek">Pendek</option>
                                <option value="panjang">Panjang</option>
                              </select>
                            </td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => handleUpdateVariant(index, 'stock', e.target.value)}
                                min="0"
                                className="w-24 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <button
                                onClick={() => handleDeleteVariant(index)}
                                className="inline-flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={16} />
                                Hapus
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Add New Variant */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-neutral-900 mb-4">Tambah Varian Baru</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Ukuran
                    </label>
                    <select
                      value={newVariant.size}
                      onChange={(e) => setNewVariant({ ...newVariant, size: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Tipe Lengan
                    </label>
                    <select
                      value={newVariant.sleeveType}
                      onChange={(e) => setNewVariant({ ...newVariant, sleeveType: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="pendek">Pendek</option>
                      <option value="panjang">Panjang</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Stok
                    </label>
                    <input
                      type="number"
                      value={newVariant.stock}
                      onChange={(e) => setNewVariant({ ...newVariant, stock: parseInt(e.target.value) || 0 })}
                      min="0"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={handleAddVariant}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <Plus size={20} />
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Link
                  href="/admin/products"
                  className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
                >
                  Batal
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="max-w-md mx-auto">
                <Package size={48} className="text-neutral-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Produk By Order</h3>
                <p className="text-neutral-600">
                  Produk ini adalah "Made to Order". Tidak perlu manajemen stok varian karena dibuat sesuai pesanan.
                </p>
                <Link
                  href="/admin/products"
                  className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Kembali ke Daftar Produk
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}