import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../types';
import { Sparkles, SlidersHorizontal, AlertCircle } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onQuickView?: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  title,
  subtitle
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border-2 border-black space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFDE6B] border-2 border-black text-black mx-auto flex items-center justify-center ">
          <AlertCircle className="w-8 h-8 stroke-[2.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-xl font-black text-[#111111] uppercase">No matching funky styles found</h3>
          <p className="text-sm text-zinc-700 font-bold max-w-md mx-auto">
            Try adjusting your size filters or price range to explore more MicroModal underwear and lounge tees.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {(title || subtitle) && (
        <div className="space-y-1">
          {title && (
            <h2 className="font-display text-2xl sm:text-3xl font-black text-[#111111] uppercase">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-700 font-bold">{subtitle}</p>
          )}
        </div>
      )}

      {/* Grid: 33.33% (3 columns) on desktop/laptop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
        ))}
      </div>
    </div>
  );
};
