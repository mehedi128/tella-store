import React from 'react';
import { ProductSize } from '../../types';
import { Ruler } from 'lucide-react';

interface SizeSelectorProps {
  availableSizes: ProductSize[];
  selectedSize: ProductSize;
  onSelectSize: (size: ProductSize) => void;
  onOpenSizeGuide?: () => void;
}

export const ALL_SIZES: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

export const SIZE_LABELS: Record<ProductSize, { code: ProductSize; inches: string; full: string }> = {
  S: { code: 'S', inches: '27-28', full: 'S(27-28)' },
  M: { code: 'M', inches: '29-30', full: 'M(29-30)' },
  L: { code: 'L', inches: '31-32', full: 'L(31-32)' },
  XL: { code: 'XL', inches: '33-34', full: 'XL(33-34)' },
  XXL: { code: 'XXL', inches: '35-36', full: 'XXL(35-36)' },
  '3XL': { code: '3XL', inches: '37-39', full: '3XL(37-39)' },
  '4XL': { code: '4XL', inches: '40-43', full: '4XL(40-43)' },
};

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  availableSizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide
}) => {
  const currentSizeInfo = SIZE_LABELS[selectedSize] || { code: selectedSize, inches: '', full: selectedSize };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase text-black">Select Size:</span>
          <span className="text-xs font-black text-black bg-[#FFDE6B] px-3 py-0.5 rounded-full border border-black ">
            {currentSizeInfo.full}
          </span>
        </div>
        {onOpenSizeGuide && (
          <button
            type="button"
            onClick={onOpenSizeGuide}
            className="flex items-center gap-1 text-xs font-black text-black hover:text-[#FF5A1F] uppercase underline"
          >
            <Ruler className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Size & Fit Guide</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2.5">
        {ALL_SIZES.map(size => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;
          const sizeInfo = SIZE_LABELS[size];

          return (
            <button
              key={size}
              id={`size-btn-${size}`}
              type="button"
              disabled={!isAvailable}
              onClick={() => onSelectSize(size)}
              className={`py-2.5 px-3 rounded-2xl font-black transition-all border-2 border-black relative text-center flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-[#111111] text-white scale-[1.03] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : isAvailable
                  ? 'bg-white hover:bg-[#FFDE6B] text-black hover:scale-[1.01]'
                  : 'bg-zinc-200 text-zinc-400 border-zinc-400 cursor-not-allowed line-through shadow-none'
              }`}
            >
              <span className="text-sm font-black tracking-tight">{sizeInfo.full}</span>
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-[#FF5A1F] rounded-full border-2 border-black" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

