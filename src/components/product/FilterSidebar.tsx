import React from 'react';
import { Filter, RotateCcw, X, Check } from 'lucide-react';
import { FilterState, ProductSize, Subcategory } from '../../types';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  availableTypes?: string[];
  totalResults: number;
}

const SIZES: ProductSize[] = ['S', 'M', 'L', 'XL', 'XXL'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableTypes = [],
  totalResults,
}) => {
  const toggleSize = (size: ProductSize) => {
    const nextSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: nextSizes });
  };

  const handlePriceChange = (maxPrice: number) => {
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxPrice] });
  };

  const handleTypeSelect = (type: string | undefined) => {
    onFilterChange({ ...filters, productType: type });
  };

  const handleSubcategorySelect = (sub: Subcategory | 'all') => {
    onFilterChange({ ...filters, subcategory: sub, productType: undefined });
  };

  const hasActiveFilters =
    filters.sizes.length > 0 ||
    filters.subcategory !== 'all' ||
    Boolean(filters.productType) ||
    filters.priceRange[1] < 2000;

  return (
    <div id="filter-sidebar" className="bg-white rounded-3xl p-5 border-2 border-black space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#FF5A1F] stroke-[2.5]" />
          <h4 className="font-display font-black text-sm text-[#111111] uppercase tracking-wider">Filters</h4>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-black text-black hover:text-[#FF5A1F]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Subcategory */}
      <div className="space-y-2.5">
        <label className="text-xs font-black uppercase text-black block">Category</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => handleSubcategorySelect('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-black ${
              filters.subcategory === 'all'
                ? 'bg-[#111111] text-white '
                : 'bg-white hover:bg-[#FFF3EA] text-black '
            }`}
          >
            All Styles
          </button>
          <button
            onClick={() => handleSubcategorySelect('underwear')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-black ${
              filters.subcategory === 'underwear'
                ? 'bg-[#FF5A1F] text-white '
                : 'bg-white hover:bg-[#FFF3EA] text-black '
            }`}
          >
            Underwear
          </button>
          <button
            onClick={() => handleSubcategorySelect('t-shirt')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all border-2 border-black ${
              filters.subcategory === 't-shirt'
                ? 'bg-blue-600 text-white '
                : 'bg-white hover:bg-[#FFF3EA] text-black '
            }`}
          >
            T-Shirts & Tops
          </button>
        </div>
      </div>

      {/* Specific Style / Silhouette */}
      {availableTypes.length > 0 && (
        <div className="space-y-2.5 pt-3 border-t-2 border-black/10">
          <label className="text-xs font-black uppercase text-black block">Style / Fit</label>
          <div className="space-y-1.5">
            <button
              onClick={() => handleTypeSelect(undefined)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black flex items-center justify-between border-2 border-black transition-all ${
                !filters.productType
                  ? 'bg-[#FFDE6B] text-black '
                  : 'bg-white text-black hover:bg-zinc-100 '
              }`}
            >
              <span>All Fits</span>
              {!filters.productType && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </button>
            {availableTypes.map(type => (
              <button
                key={type}
                onClick={() => handleTypeSelect(filters.productType === type ? undefined : type)}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-black flex items-center justify-between border-2 border-black transition-all ${
                  filters.productType === type
                    ? 'bg-[#FFDE6B] text-black '
                    : 'bg-white text-black hover:bg-zinc-100 '
                }`}
              >
                <span>{type}</span>
                {filters.productType === type && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      <div className="space-y-2.5 pt-3 border-t-2 border-black/10">
        <label className="text-xs font-black uppercase text-black block">Size</label>
        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map(size => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`py-2 rounded-xl text-xs font-black border-2 border-black transition-all ${
                  isSelected
                    ? 'bg-[#111111] text-white '
                    : 'bg-white hover:bg-[#FFDE6B] text-black '
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2.5 pt-3 border-t-2 border-black/10">
        <div className="flex items-center justify-between text-xs font-black text-black">
          <span className="uppercase">Max Price</span>
          <span className="bg-[#FFDE6B] px-2 py-0.5 rounded-lg border border-black ">
            Up to ৳{filters.priceRange[1]}
          </span>
        </div>
        <input
          type="range"
          min="500"
          max="2000"
          step="50"
          value={filters.priceRange[1]}
          onChange={e => handlePriceChange(Number(e.target.value))}
          className="w-full accent-[#FF5A1F] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-zinc-700 font-bold">
          <span>৳500</span>
          <span>৳1250</span>
          <span>৳2000</span>
        </div>
      </div>
    </div>
  );
};
