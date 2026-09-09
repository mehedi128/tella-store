import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const { navigate } = useRouter();
  const { addItem, openCart } = useCart();

  const discountPercent = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.slug}`);
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0] || 'default';
    addItem(product, defaultSize, defaultColor, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
    openCart();
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => {
        if (product.images.length > 1) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setCurrentImageIndex(0);
      }}
      className="group relative bg-white rounded-2xl p-3 sm:p-3.5 border-2 border-black hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#FFFBF2] border-2 border-black mb-3">
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start z-10">
          {product.isNew && (
            <span className="bg-[#FF5A1F] text-white text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded border border-black ">
              New Drop
            </span>
          )}
          {product.badge && !product.isNew && (
            <span className="bg-[#111111] text-white text-[10px] sm:text-[11px] font-black uppercase px-2 sm:px-2.5 py-0.5 rounded border border-black ">
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="bg-[#FFDE6B] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded border border-black ">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Floating Quick View button on desktop */}
        {onQuickView && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute top-2 right-2 p-2 bg-white rounded-xl border border-black text-black hover:text-[#FF5A1F] opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:block"
            aria-label="Quick preview"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Product info */}
      <div className="space-y-3 flex-1 flex flex-col justify-between px-1">
        <div className="py-2 sm:py-2.5">
          {/* Title - Full title always visible */}
          <h3 className="font-display font-black text-base sm:text-lg lg:text-xl text-[#111111] leading-snug group-hover:text-[#FF5A1F] transition-colors break-words">
            {product.name}
          </h3>
        </div>

        {/* Price & Fabric Info */}
        <div className="pt-2 border-t-2 border-black/10 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display font-black text-lg sm:text-xl lg:text-2xl text-[#111111]">
                ৳{product.price}
              </span>
              {product.mrp > product.price && (
                <span className="text-xs sm:text-sm text-zinc-400 line-through font-bold">
                  ৳{product.mrp}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-700 font-black uppercase">
              MicroModal Fabric
            </span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <div className="pt-2">
          <button
            type="button"
            id={`add-to-bag-btn-${product.id}`}
            onClick={handleAddToBag}
            className={`w-full py-2.5 px-3 rounded-xl border-2 border-black font-display font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              isAdded
                ? 'bg-[#00C06A] text-white shadow-none'
                : 'bg-[#FFDE6B] hover:bg-[#FF5A1F] hover:text-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
