import React from 'react';
import { ArrowRight, Sparkles, Flame, Tag } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { Category } from '../../types';

interface MegaMenuProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ category, isOpen, onClose }) => {
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const isMan = category === 'man';

  const handleNav = (url: string) => {
    navigate(url);
    onClose();
  };

  return (
    <div
      id={`mega-menu-${category}`}
      className="absolute top-full left-0 w-full bg-[#FFFBF2] border-b-2 border-black transition-all duration-200 z-40"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-12 gap-8">
        {/* Subcategory 1: Underwear */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] border border-black"></span>
            <button
              onClick={() => handleNav(`/${category}/underwear`)}
              className="font-display text-base font-black text-[#111111] hover:text-[#FF5A1F] uppercase tracking-wider text-left"
            >
              {isMan ? "Men's Underwear" : "Women's Underwear"}
            </button>
          </div>
          <ul className="space-y-2.5">
            {isMan ? (
              <>
                <li>
                  <button
                    onClick={() => handleNav('/man/underwear?type=Boxers')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Boxers & Boxer Briefs</span>
                    <span className="text-[10px] uppercase font-black bg-[#FFDE6B] text-black px-2 py-0.5 rounded border border-black ">Top Fit</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/underwear?type=Trunks')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Comfort Trunks</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/underwear?type=Briefs')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Classic Briefs</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/underwear')}
                    className="flex items-center gap-1.5 text-xs font-black text-[#FF5A1F] pt-2 hover:underline uppercase"
                  >
                    <span>View All Underwear ({isMan ? '12' : '10'} styles)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => handleNav('/woman/underwear?type=Bikini')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Bikini Briefs</span>
                    <span className="text-[10px] uppercase font-black bg-rose-200 text-black px-2 py-0.5 rounded border border-black ">No VPL</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/underwear?type=Hipster')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Hipster Full Coverage</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/underwear?type=Boy Shorts')}
                    className="group flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-[#FF5A1F] py-1 transition-colors"
                  >
                    <span>Modal Boy Shorts</span>
                    <span className="text-[10px] uppercase font-black bg-[#FFDE6B] text-black px-2 py-0.5 rounded border border-black ">Viral</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/underwear')}
                    className="flex items-center gap-1.5 text-xs font-black text-[#FF5A1F] pt-2 hover:underline uppercase"
                  >
                    <span>View All Underwear</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Subcategory 2: T-Shirts / Loungewear */}
        <div className="col-span-3 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b-2 border-black">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 border border-black"></span>
            <button
              onClick={() => handleNav(`/${category}/t-shirt`)}
              className="font-display text-base font-black text-[#111111] hover:text-blue-600 uppercase tracking-wider text-left"
            >
              {isMan ? "Men's T-Shirts & Tops" : "Women's T-Shirts & Sleep"}
            </button>
          </div>
          <ul className="space-y-2.5">
            {isMan ? (
              <>
                <li>
                  <button
                    onClick={() => handleNav('/man/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Classic Modal Crew Tees</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Oversized Drop-Shoulder</span>
                    <span className="text-[10px] uppercase font-black bg-blue-200 text-black px-2 py-0.5 rounded border border-black ">Street</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Solid Everyday Basics</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/man/t-shirt')}
                    className="flex items-center gap-1.5 text-xs font-black text-blue-600 pt-2 hover:underline uppercase"
                  >
                    <span>View All T-Shirts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => handleNav('/woman/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Relaxed Modal Tees</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Boxy Crop Tees</span>
                    <span className="text-[10px] uppercase font-black bg-pink-200 text-black px-2 py-0.5 rounded border border-black ">Cute</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/t-shirt')}
                    className="flex items-center justify-between w-full text-sm font-bold text-zinc-800 hover:text-blue-600 py-1 transition-colors"
                  >
                    <span>Boyfriend Sleep Tees</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNav('/woman/t-shirt')}
                    className="flex items-center gap-1.5 text-xs font-black text-blue-600 pt-2 hover:underline uppercase"
                  >
                    <span>View All Loungewear</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Highlight Quick Links */}
        <div className="col-span-2 space-y-4 border-l-2 border-black pl-6">
          <h4 className="text-xs uppercase font-black tracking-wider text-zinc-500">Featured</h4>
          <ul className="space-y-3 text-sm font-black text-[#111111]">
            <li>
              <button
                onClick={() => handleNav('/new-arrival')}
                className="flex items-center gap-2 hover:text-[#FF5A1F] transition-colors uppercase"
              >
                <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
                <span>New Drops</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav(`/${category}`)}
                className="flex items-center gap-2 hover:text-[#FF5A1F] transition-colors uppercase"
              >
                <Flame className="w-4 h-4 text-[#FF5A1F]" />
                <span>Bestsellers</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav(`/${category}?badge=Shark Tank Deal`)}
                className="flex items-center gap-2 hover:text-[#FF5A1F] transition-colors uppercase"
              >
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Multipacks</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Promo Tile */}
        <div className="col-span-4 bg-[#FFDE6B] rounded-2xl p-5 relative overflow-hidden border-2 border-black flex flex-col justify-between group">
          <div className="relative z-10 space-y-2">
            <span className="inline-block bg-[#FF5A1F] text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded border border-black ">
              Limited Edition
            </span>
            <h4 className="font-display text-lg font-black text-[#111111] leading-tight">
              {isMan ? 'Buy 3 Get 1 Free on Quirky Prints' : 'Cloud Comfort 3-Pack Modal Bundle'}
            </h4>
            <p className="text-xs text-zinc-900 font-bold">
              Mix and match any prints. Discount automatically applies at checkout!
            </p>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between relative z-10 border-t border-black/20">
            <button
              onClick={() => handleNav(`/${category}`)}
              className="btn-bold-primary text-xs px-4 py-2 rounded-xl flex items-center gap-2"
            >
              <span>Shop Bundle</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-black text-black bg-white px-2 py-1 rounded border border-black">Code: BUNDLE4</span>
          </div>

          <img
            src={isMan 
              ? "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80"
              : "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80"
            }
            alt="Promo product"
            className="absolute -right-6 -bottom-6 w-36 h-36 object-cover rounded-2xl opacity-20 group-hover:scale-105 transition-transform duration-300 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};
