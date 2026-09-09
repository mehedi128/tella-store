import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { PRODUCTS } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = ['Boxer Briefs', 'Flamingo', 'Modal Tees', 'Avocado', 'Boy Shorts', 'Trunks', 'MicroModal'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { navigate } = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.printName?.toLowerCase().includes(q) ||
        p.productType?.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isOpen) return null;

  const handleSelectProduct = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  const handleSearchTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div
      id="search-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className="p-4 sm:p-6 border-b border-zinc-100 flex items-center gap-3 bg-zinc-50/50">
          <Search className="w-6 h-6 text-zinc-400" />
          <input
            type="text"
            placeholder="Search prints, boxers, briefs, modal tees..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-lg sm:text-xl font-bold text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-zinc-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-extrabold uppercase bg-zinc-200 text-zinc-700 px-3 py-1.5 rounded-xl hover:bg-zinc-300 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!query ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-3">
                  <TrendingUp className="w-4 h-4 text-[#FF4800]" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map(item => (
                    <button
                      key={item}
                      onClick={() => handleSearchTag(item)}
                      className="text-sm font-semibold bg-zinc-100 hover:bg-orange-50 hover:text-[#FF4800] text-zinc-700 px-3.5 py-1.5 rounded-full transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Trending Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => { navigate('/man/underwear'); onClose(); }}
                    className="p-3 bg-[#FFF3EA] rounded-2xl text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-xs text-orange-600 font-bold uppercase block">Men</span>
                    <span className="font-extrabold text-sm text-zinc-900">Modal Boxers</span>
                  </button>
                  <button
                    onClick={() => { navigate('/woman/underwear'); onClose(); }}
                    className="p-3 bg-[#FCE7F3] rounded-2xl text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-xs text-rose-600 font-bold uppercase block">Women</span>
                    <span className="font-extrabold text-sm text-zinc-900">Bikini Briefs</span>
                  </button>
                  <button
                    onClick={() => { navigate('/man/t-shirt'); onClose(); }}
                    className="p-3 bg-[#EFF6FF] rounded-2xl text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-xs text-blue-600 font-bold uppercase block">Tees</span>
                    <span className="font-extrabold text-sm text-zinc-900">Lounge Tops</span>
                  </button>
                  <button
                    onClick={() => { navigate('/new-arrival'); onClose(); }}
                    className="p-3 bg-[#FEF9C3] rounded-2xl text-left hover:scale-[1.02] transition-transform"
                  >
                    <span className="text-xs text-amber-700 font-bold uppercase block">Fresh</span>
                    <span className="font-extrabold text-sm text-zinc-900">New Drops</span>
                  </button>
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="text-xs font-extrabold uppercase tracking-wider text-zinc-400 mb-3">
                Found {results.length} Products
              </div>
              <div className="divide-y divide-zinc-100">
                {results.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="w-full py-3 flex items-center gap-4 hover:bg-zinc-50 px-2 rounded-2xl transition-colors text-left group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 rounded-xl object-cover bg-zinc-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase font-extrabold text-[#FF4800] bg-orange-50 px-2 py-0.5 rounded-full">
                          {product.category}
                        </span>
                        {product.printName && (
                          <span className="text-xs text-zinc-500 font-semibold truncate">
                            Print: {product.printName}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-sm text-zinc-900 group-hover:text-[#FF4800] leading-snug">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-sm font-extrabold text-zinc-900">৳{product.price}</span>
                        <span className="text-xs text-zinc-400 line-through">৳{product.mrp}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-[#FF4800] group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-zinc-600 font-semibold">No funky prints found matching "{query}"</p>
              <button
                onClick={() => { navigate('/new-arrival'); onClose(); }}
                className="text-xs font-extrabold uppercase bg-zinc-900 text-white px-4 py-2 rounded-xl hover:bg-[#FF4800]"
              >
                Browse All New Drops
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
