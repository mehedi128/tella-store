import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../../data/products';
import { useRouter } from '../../context/RouterContext';

export const Hero: React.FC = () => {
  const { navigate } = useRouter();
  const slide = HERO_SLIDES[0];

  return (
    <section
      id="hero-banner"
      className="relative overflow-hidden border-b-2 border-black"
      style={{ backgroundColor: slide.bgColor }}
    >
      <div className="w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left z-10">
              {/* Tag / Badge */}
              {slide.badge && (
                <span className="inline-block px-3.5 py-1.5 rounded-full bg-black text-white text-xs font-black uppercase tracking-wider">
                  {slide.badge}
                </span>
              )}

              {/* Main Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-[#111111] tracking-tight leading-[1.04]">
                {slide.heading}
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-800 font-bold max-w-xl leading-relaxed">
                {slide.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  id={`hero-primary-cta-${slide.id}`}
                  onClick={() => navigate(slide.ctaLink)}
                  className="btn-bold-primary px-7 py-4 rounded-2xl text-sm sm:text-base flex items-center gap-2.5"
                  style={{
                    backgroundColor: slide.accentColor,
                  }}
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => navigate(slide.secondaryCtaLink)}
                  className="btn-bold-secondary px-6 py-4 rounded-2xl text-sm sm:text-base"
                >
                  {slide.secondaryCtaText}
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden border-4 border-black group bg-white">
                <img
                  src={slide.image}
                  alt={slide.heading}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Floating highlight pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-3.5 border-2 border-black flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-black text-[#FF5A1F] block tracking-wider">MicroModal Tech</span>
                    <span className="text-xs font-black text-black">Breathable & Anti-Chafe</span>
                  </div>
                  <button
                    onClick={() => navigate(slide.ctaLink)}
                    className="btn-bold-primary text-xs px-3.5 py-1.5 rounded-xl"
                  >
                    Explore
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

