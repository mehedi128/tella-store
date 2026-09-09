import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/products';
import { useRouter } from '../../context/RouterContext';

export const Testimonials: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section id="testimonials" className="py-14 sm:py-20 bg-[#FFFBF2] border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-tight">
            Loved By 300,000+ Customers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-black transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Rating stars & quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-[#FFDE6B] px-2 py-1 rounded-lg border border-black ">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-[#FF5A1F]" />
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-zinc-900 font-bold leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="pt-6 mt-6 border-t-2 border-black/10">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-black "
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-black text-sm text-[#111111]">{t.name}</span>
                      {t.verified && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      )}
                    </div>
                    <span className="text-xs text-zinc-600 font-bold">{t.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
