import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';

interface FeaturedCarouselProps {
  onQuickView?: (product: Product) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ onQuickView }) => {
  const { navigate } = useRouter();

  return (
    <section id="bestsellers" className="py-14 sm:py-20 bg-white border-y-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Title */}
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] tracking-tight uppercase">
              Featured Products
            </h2>
          </div>
        </div>

        {/* Direct Responsive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PRODUCTS.map(product => (
            <div key={product.id} className="w-full">
              <ProductCard product={product} onQuickView={onQuickView} />
            </div>
          ))}
        </div>

        {/* Bottom browse all link */}
        <div className="text-center pt-10">
          <button
            type="button"
            onClick={() => navigate('/new-arrival')}
            className="btn-bold-secondary text-xs sm:text-sm px-6 py-3.5 rounded-2xl inline-flex items-center gap-2"
          >
            <span>View All {PRODUCTS.length} Funky Styles</span>
            <ChevronRight className="w-4 h-4 text-[#FF5A1F]" />
          </button>
        </div>
      </div>
    </section>
  );
};
