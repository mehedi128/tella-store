import React, { useState } from 'react';
import { useRouter } from '../../context/RouterContext';
import { ArrowRight } from 'lucide-react';
import umbro3PackComboImg from '../../assets/images/umbro_3pack_combo_1787243931364.jpg';
import mensBlackTshirtImg from '../../assets/images/mens_black_tshirt_1787245074819.jpg';
import womensRibbedBoxerBriefsImg from '../../assets/images/womens_ribbed_boxer_briefs_1787245544494.jpg';

interface SubcategoryItem {
  id: string;
  name: string;
  image: string;
  path: string;
  bgAccent: string;
}

const CATEGORIES_BY_GENDER: Record<'men' | 'women', SubcategoryItem[]> = {
  men: [
    {
      id: 'm-underwear',
      name: 'Underwear',
      image: umbro3PackComboImg,
      path: '/man/underwear',
      bgAccent: '#FFF3EA',
    },
    {
      id: 'm-tshirt',
      name: 'T-Shirts',
      image: mensBlackTshirtImg,
      path: '/man/t-shirt',
      bgAccent: '#EFF6FF',
    },
  ],
  women: [
    {
      id: 'w-underwear',
      name: 'Underwear',
      image: womensRibbedBoxerBriefsImg,
      path: '/woman/underwear',
      bgAccent: '#FCE7F3',
    },
    {
      id: 'w-tshirt',
      name: 'T-Shirts',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
      path: '/woman/t-shirt',
      bgAccent: '#FEF9C3',
    },
  ],
};

export const CategoryGrid: React.FC = () => {
  const { navigate } = useRouter();
  const [activeGender, setActiveGender] = useState<'men' | 'women'>('men');

  const currentItems = CATEGORIES_BY_GENDER[activeGender];

  return (
    <section id="category-grid" className="py-10 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* MEN / WOMEN TOGGLE */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 mb-8 sm:mb-12">
        <button
          type="button"
          onClick={() => setActiveGender('men')}
          className={`font-display text-2xl sm:text-3xl font-black transition-all cursor-pointer ${
            activeGender === 'men'
              ? 'bg-white text-black px-7 sm:px-9 py-2 rounded-xl border-2 border-black '
              : 'text-zinc-400 hover:text-black'
          }`}
        >
          Men
        </button>

        <button
          type="button"
          onClick={() => setActiveGender('women')}
          className={`font-display text-2xl sm:text-3xl font-black transition-all cursor-pointer ${
            activeGender === 'women'
              ? 'bg-white text-black px-7 sm:px-9 py-2 rounded-xl border-2 border-black '
              : 'text-zinc-400 hover:text-black'
          }`}
        >
          Women
        </button>
      </div>

      {/* 2 CATEGORIES: Underwear & T-Shirt side-by-side */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8">
        {currentItems.map(item => (
          <div
            key={item.id}
            onClick={() => navigate(item.path)}
            style={{ backgroundColor: item.bgAccent }}
            className="group cursor-pointer rounded-2xl sm:rounded-3xl p-4 sm:p-8 border-2 border-black hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden relative min-h-[260px] sm:min-h-[420px]"
          >
            {/* Top Details */}
            <div className="space-y-2 sm:space-y-3 z-10 max-w-[80%] sm:max-w-[60%]">
              <h3 className="font-display text-lg sm:text-3xl lg:text-4xl font-black text-black tracking-tight uppercase">
                {item.name}
              </h3>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 sm:pt-6 z-10">
              <button
                type="button"
                className="bg-white group-hover:bg-black group-hover:text-white text-black font-black text-[11px] sm:text-sm uppercase px-3.5 py-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-black flex items-center gap-1.5 sm:gap-2 transition-colors"
              >
                <span>Shop {item.name}</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Product Feature Image on Right */}
            <img
              src={item.image}
              alt={item.name}
              className="absolute -right-3 -bottom-3 sm:-right-6 sm:-bottom-6 w-28 sm:w-60 h-36 sm:h-80 object-cover rounded-xl sm:rounded-2xl border-2 border-black group-hover:scale-105 group-hover:rotate-1 transition-all duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* BOTTOM CTA: Shop All Men / Women */}
      <div className="text-center pt-10 sm:pt-14">
        <button
          type="button"
          onClick={() => navigate(activeGender === 'men' ? '/man' : '/woman')}
          className="bg-[#FFC700] hover:bg-[#e6b300] text-black font-black text-sm sm:text-base px-10 sm:px-14 py-3.5 rounded-lg border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
        >
          {activeGender === 'men' ? 'Shop All Men' : 'Shop All Women'}
        </button>
      </div>
    </section>
  );
};


