import React from 'react';
import { Truck, ShieldCheck, CreditCard } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  return (
    <section id="trust-strip" className="bg-white py-10 sm:py-14 md:py-16 border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="grid grid-cols-3 gap-3 sm:gap-8 items-center justify-center">
          {/* Feature 1 */}
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFFBF2] border-2 border-black flex items-center justify-center text-black">
              <Truck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <span className="font-display text-xs sm:text-base lg:text-lg font-black text-[#111111] block tracking-tight">
              Free Home Delivery
            </span>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFFBF2] border-2 border-black flex items-center justify-center text-black">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <span className="font-display text-xs sm:text-base lg:text-lg font-black text-[#111111] block tracking-tight">
              Best Quality
            </span>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center justify-center space-y-1 sm:space-y-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FFFBF2] border-2 border-black flex items-center justify-center text-black">
              <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <span className="font-display text-xs sm:text-base lg:text-lg font-black text-[#111111] block tracking-tight">
              Secure Payments
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};



