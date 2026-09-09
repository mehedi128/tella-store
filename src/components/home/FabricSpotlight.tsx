import React from 'react';
import { Feather, Wind, ShieldCheck, Droplet, Sparkles, Trees } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const FabricSpotlight: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="fabric-spotlight" className="py-14 sm:py-20 bg-[#FFFBF2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-12 lg:p-16 relative overflow-hidden border-2 border-black ">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#FFDE6B] text-black border-2 border-black px-3.5 py-1.5 rounded-full text-xs font-black uppercase ">
                <Sparkles className="w-4 h-4 text-black" />
                <span>The Tella Difference</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight uppercase text-white">
                Made from Austrian Beechwood Trees. <br className="hidden sm:inline" />
                <span className="text-[#FF5A1F]">3x Softer</span> Than Regular Cotton.
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-bold">
                Conventional underwear is scratchy, rides up, and traps moisture. We engineered ultra-fine MicroModal yarn with 4-way stretch, anti-roll micro-waistbands, and vibrant colorfast botanical dyes.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 space-y-1">
                  <div className="text-[#FF5A1F] mb-2">
                    <Feather className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-black text-sm uppercase text-white">Feather-Light</h4>
                  <p className="text-xs text-zinc-400 font-bold">Weightless second-skin feel that never restricts.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 space-y-1">
                  <div className="text-[#FFDE6B] mb-2">
                    <Wind className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-black text-sm uppercase text-white">50% Cooler</h4>
                  <p className="text-xs text-zinc-400 font-bold">Thermoregulating fibers keep you fresh all day.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 space-y-1">
                  <div className="text-emerald-400 mb-2">
                    <Trees className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-black text-sm uppercase text-white">100% Eco-Modal</h4>
                  <p className="text-xs text-zinc-400 font-bold">Sustainably harvested closed-loop production.</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-zinc-700 space-y-1">
                  <div className="text-[#FF5A1F] mb-2">
                    <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <h4 className="font-black text-sm uppercase text-white">Zero Ride-Up</h4>
                  <p className="text-xs text-zinc-400 font-bold">Engineered contoured pouches & smooth seams.</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/new-arrival')}
                  className="btn-bold-primary text-xs sm:text-sm px-7 py-4 rounded-2xl"
                >
                  Experience The Softness
                </button>
              </div>
            </div>

            {/* Right visual card */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] border-2 border-black ">
                <img
                  src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
                  alt="MicroModal Fabric Close Up"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-1 text-white">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FFDE6B]">
                    Proprietary Fabric Blend
                  </span>
                  <h3 className="font-display text-xl font-black uppercase">92% MicroModal + 8% Elastane</h3>
                  <p className="text-xs text-zinc-300 font-bold">
                    Woven exclusively for Tella with anti-microbial silver-ion finish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
