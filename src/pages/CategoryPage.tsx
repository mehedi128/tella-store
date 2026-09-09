import React, { useState, useMemo, useEffect } from 'react';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { ProductGrid } from '../components/product/ProductGrid';
import { PRODUCTS } from '../data/products';
import { Category, Subcategory, FilterState, Product, ProductSize } from '../types';
import { useRouter } from '../context/RouterContext';
import { Sparkles, SlidersHorizontal, ArrowUpDown, ChevronRight, X } from 'lucide-react';

interface CategoryPageProps {
  onQuickView?: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ onQuickView }) => {
  const { path, navigate } = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Parse path and determine default category and subcategory
  const pathParts = path.split('?')[0].replace(/^\//, '').split('/');
  const primarySegment = pathParts[0] || 'man'; // 'man', 'woman', 'new-arrival'
  const secondarySegment = pathParts[1] as Subcategory | undefined; // 'underwear', 't-shirt'

  // Extract query params if any
  const queryParams = useMemo(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    const search = path.includes('?') ? path.split('?')[1] : window.location.search;
    return new URLSearchParams(search);
  }, [path]);

  const typeParam = queryParams.get('type') || undefined;

  const isNewArrival = primarySegment === 'new-arrival';
  const category: Category | 'all' = isNewArrival ? 'all' : (primarySegment as Category);
  const subcategory: Subcategory | 'all' = secondarySegment || 'all';

  const [filters, setFilters] = useState<FilterState>({
    category: category,
    subcategory: subcategory,
    sizes: [],
    priceRange: [500, 2000],
    sortBy: isNewArrival ? 'newest' : 'featured',
    searchQuery: '',
    productType: typeParam,
  });

  // Sync state whenever URL path changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: isNewArrival ? 'all' : (primarySegment as Category),
      subcategory: secondarySegment || 'all',
      productType: typeParam,
      sortBy: isNewArrival ? 'newest' : prev.sortBy,
    }));
  }, [path, isNewArrival, primarySegment, secondarySegment, typeParam]);

  // Extract available product types for current category
  const availableTypes = useMemo(() => {
    const relevant = PRODUCTS.filter(p => {
      if (category !== 'all' && p.category !== category) return false;
      if (filters.subcategory !== 'all' && p.subcategory !== filters.subcategory) return false;
      return true;
    });
    const set = new Set<string>();
    relevant.forEach(p => {
      if (p.productType) set.add(p.productType);
    });
    return Array.from(set);
  }, [category, filters.subcategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter(p => {
      if (filters.category !== 'all' && p.category !== filters.category) return false;
      if (filters.subcategory !== 'all' && p.subcategory !== filters.subcategory) return false;
      if (filters.productType && p.productType !== filters.productType) return false;
      if (filters.sizes.length > 0) {
        const hasMatchingSize = p.sizes.some(s => filters.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }
      if (p.price > filters.priceRange[1]) return false;
      return true;
    });

    if (filters.sortBy === 'newest') {
      list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (filters.sortBy === 'price-low') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      list = [...list].sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [filters]);

  const handleSubcategoryChip = (sub: Subcategory | 'all') => {
    if (sub === 'all') {
      navigate(isNewArrival ? '/new-arrival' : `/${category}`);
    } else {
      navigate(`/${category === 'all' ? 'man' : category}/${sub}`);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: isNewArrival ? 'all' : (primarySegment as Category),
      subcategory: secondarySegment || 'all',
      sizes: [],
      priceRange: [500, 2000],
      sortBy: 'featured',
      searchQuery: '',
      productType: undefined,
    });
  };

  // Dynamic banner copy
  const getBannerDetails = () => {
    if (isNewArrival) {
      return {
        title: 'New Print Drops & Arrivals',
        subtitle: 'The freshest batch of quirky prints, bold colors & ultra-soft modal essentials.',
        badge: 'FRESH OFF THE LOOM',
        bgGradient: 'from-amber-500/10 via-orange-500/10 to-amber-50',
        borderColor: 'border-amber-200'
      };
    }
    if (category === 'man') {
      if (subcategory === 'underwear') {
        return {
          title: "Men's MicroModal Underwear",
          subtitle: 'Boxer briefs, comfort trunks, and classic briefs engineered with anti-roll waistbands and cloud softness.',
          badge: '3X SOFTER THAN COTTON',
          bgGradient: 'from-orange-500/10 via-amber-500/10 to-orange-50',
          borderColor: 'border-orange-200'
        };
      }
      if (subcategory === 't-shirt') {
        return {
          title: "Men's Modal T-Shirts & Loungewear",
          subtitle: 'Heavyweight drape with featherlight comfort. Crewnecks and oversized drop-shoulder essentials.',
          badge: 'EVERYDAY LUXURY',
          bgGradient: 'from-blue-500/10 via-indigo-500/10 to-blue-50',
          borderColor: 'border-blue-200'
        };
      }
      return {
        title: "Men's Collection",
        subtitle: 'Ditch the boring basics. Ultra-breathable MicroModal boxers, trunks, and lounge tees.',
        badge: 'SHARK TANK SENSATION',
        bgGradient: 'from-orange-500/10 via-amber-500/10 to-orange-50',
        borderColor: 'border-orange-200'
      };
    }
    if (category === 'woman') {
      if (subcategory === 'underwear') {
        return {
          title: "Women's MicroModal Underwear",
          subtitle: 'Zero panty lines, zero digging. Buttery bikini briefs, full-coverage hipsters & boy shorts.',
          badge: 'ZERO PANTY LINES',
          bgGradient: 'from-pink-500/10 via-rose-500/10 to-pink-50',
          borderColor: 'border-pink-200'
        };
      }
      if (subcategory === 't-shirt') {
        return {
          title: "Women's Loungewear & Sleep Tees",
          subtitle: 'Effortlessly oversized boyfriend sleep shirts and modal crop tees made for deep sleep.',
          badge: 'COZY ESSENTIALS',
          bgGradient: 'from-purple-500/10 via-pink-500/10 to-purple-50',
          borderColor: 'border-purple-200'
        };
      }
      return {
        title: "Women's Collection",
        subtitle: 'Cloud-soft underwear, boy shorts, and lounge tees designed to move like a second skin.',
        badge: 'FEATHERLIGHT FREEDOM',
        bgGradient: 'from-pink-500/10 via-rose-500/10 to-pink-50',
        borderColor: 'border-pink-200'
      };
    }
    return {
      title: 'Shop All Tella Styles',
      subtitle: 'Premium Austrian beechwood modal innerwear and apparel.',
      badge: 'TELLA STORE',
      bgGradient: 'from-orange-50 to-amber-50',
      borderColor: 'border-zinc-200'
    };
  };

  const banner = getBannerDetails();

  return (
    <div id="category-page-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-300">
      {/* Breadcrumb navigation */}
      <nav className="flex items-center gap-2 text-xs font-black text-zinc-600 uppercase tracking-wide">
        <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
        <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
        <button
          onClick={() => navigate(isNewArrival ? '/new-arrival' : `/${category}`)}
          className="hover:text-black uppercase"
        >
          {isNewArrival ? 'New Arrivals' : category}
        </button>
        {subcategory !== 'all' && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-black stroke-[3]" />
            <span className="text-[#FF5A1F] uppercase font-black">{subcategory}</span>
          </>
        )}
      </nav>

      {/* Hero Category Banner */}
      <div className="rounded-3xl p-6 sm:p-10 bg-[#FFDE6B] border-2 border-black relative overflow-hidden">
        <div className="max-w-2xl space-y-3 relative z-10">
          <span className="inline-block bg-white text-black text-[10px] sm:text-xs font-black uppercase tracking-wider px-3.5 py-1 rounded-full border-2 border-black ">
            {banner.badge}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-tight">
            {banner.title}
          </h1>
          <p className="text-sm sm:text-base text-zinc-900 font-bold leading-relaxed">
            {banner.subtitle}
          </p>
        </div>
      </div>

      {/* Subcategory Filter Chips */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => handleSubcategoryChip('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-black ${
              subcategory === 'all'
                ? 'bg-[#111111] text-white '
                : 'bg-white text-black hover:bg-[#FFF3EA] '
            }`}
          >
            All {isNewArrival ? 'Drops' : category === 'man' ? 'Men' : 'Women'} ({filteredProducts.length})
          </button>
          <button
            type="button"
            onClick={() => handleSubcategoryChip('underwear')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-black ${
              subcategory === 'underwear'
                ? 'bg-[#FF5A1F] text-white '
                : 'bg-white text-black hover:bg-[#FFF3EA] '
            }`}
          >
            Underwear
          </button>
          <button
            type="button"
            onClick={() => handleSubcategoryChip('t-shirt')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all border-2 border-black ${
              subcategory === 't-shirt'
                ? 'bg-blue-600 text-white '
                : 'bg-white text-black hover:bg-[#FFF3EA] '
            }`}
          >
            T-Shirts & Loungewear
          </button>
        </div>

        {/* Sort & Mobile filter trigger */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 bg-white border-2 border-black rounded-xl text-xs font-black text-black "
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF5A1F] stroke-[2.5]" />
            <span>Filter ({filters.sizes.length > 0 ? filters.sizes.length : 'All'})</span>
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-1.5 bg-white border-2 border-black rounded-xl px-3 py-2 ">
            <ArrowUpDown className="w-3.5 h-3.5 text-black stroke-[2.5]" />
            <select
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-xs font-black uppercase text-black focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="newest">Sort: Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
            availableTypes={availableTypes}
            totalResults={filteredProducts.length}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-9">
          <ProductGrid
            products={filteredProducts}
            onQuickView={onQuickView}
          />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto p-5 animate-in slide-in-from-right duration-300"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="font-display font-black text-lg">Filter Products</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-full text-zinc-500 hover:text-zinc-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 flex-1">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={handleResetFilters}
                availableTypes={availableTypes}
                totalResults={filteredProducts.length}
              />
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#FF4800] text-white font-extrabold py-3.5 rounded-2xl text-xs uppercase tracking-wider"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
