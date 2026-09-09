import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Product, ProductSize } from '../../types';
import { ProductGallery } from './ProductGallery';
import { SizeSelector } from './SizeSelector';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onOpenSizeGuide
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.includes('S') ? 'S' : product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const { addItem } = useCart();
  const { navigate } = useRouter();

  const discountPercent = product.mrp > product.price
    ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
    : 0;

  const handleAdd = () => {
    addItem(product, selectedSize, product.colors?.[0] || 'default', quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleViewFullDetails = () => {
    onClose();
    navigate(`/product/${product.slug}`);
  };

  return (
    <div
      id="quick-view-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-[#FF4800] bg-orange-100 px-2.5 py-0.5 rounded-full">
              Quick View
            </span>
            <span className="text-xs text-zinc-500 font-semibold">{product.productType || product.subcategory}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <ProductGallery images={product.images} productName={product.name} />
          </div>

          <div className="space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              {product.badge && (
                <span className="inline-block bg-zinc-950 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
                  {product.badge}
                </span>
              )}

              <h3 className="font-display text-xl sm:text-2xl font-black text-zinc-900 leading-tight">
                {product.name}
              </h3>

              {product.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-xs font-bold text-zinc-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">({product.reviewsCount} verified reviews)</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-display text-2xl font-extrabold text-zinc-950">
                  ৳{product.price}
                </span>
                {product.mrp > product.price && (
                  <span className="text-sm text-zinc-400 line-through font-semibold">
                    ৳{product.mrp}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="bg-amber-400 text-zinc-950 text-xs font-black px-2 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="pt-2">
                <SizeSelector
                  availableSizes={product.sizes}
                  selectedSize={selectedSize}
                  onSelectSize={setSelectedSize}
                  onOpenSizeGuide={onOpenSizeGuide}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-zinc-100">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#FF4800] hover:bg-[#ff3700] text-white shadow-orange-500/20'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag (Size {selectedSize})</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-bold text-zinc-700 hover:text-[#FF4800] py-1 flex items-center justify-center gap-1"
              >
                <span>View Full Product Details & Fabric Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
