import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-48 h-48 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center relative">
            {product.stockType && (
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  product.stockType === 'ready' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.stockType === 'ready' ? 'Ready Stock' : 'By Order'}
                </span>
              </div>
            )}
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
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
              <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm capitalize">
                {product.category}
              </span>
              <span className="text-sm text-neutral-600">
                Min. Order: {product.minOrder} pcs
              </span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button href={`/produk/${product.slug}`} variant="primary">
              Detail
            </Button>
            <Button href="/contact-us" variant="outline">
              Konsultasi
            </Button>
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
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover">
      <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-xl flex items-center justify-center relative">
        {product.stockType && (
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              product.stockType === 'ready' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {product.stockType === 'ready' ? 'Ready Stock' : 'By Order'}
            </span>
          </div>
        )}
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
          <div>
            <span className="text-2xl font-bold text-primary-600 block">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm capitalize">
            {product.category}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button 
            href={`/produk/${product.slug}`} 
            variant="primary" 
            className="flex-1"
          >
            Detail
          </Button>
          {product.katalog && (
            <Button 
              href={product.katalog}
              variant="outline"
              className="px-3"
              aria-label={`Download katalog ${product.name}`}
            >
              <Download size={18} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;