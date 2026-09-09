import React from 'react';
import { Truck, Zap } from 'lucide-react';

export interface ComboOption {
  id: string;
  label: string;
  pieces: string;
  boxCount: number;
  badge?: string;
  price: number;
  originalPrice: number;
  savePercent: number;
  colorText?: string;
  colorDots?: string[];
}

interface ComboOptionSelectorProps {
  basePrice: number;
  baseMrp?: number;
  selectedComboId: string;
  onSelectCombo: (combo: ComboOption) => void;
  is5PackProduct?: boolean;
}

export const ComboOptionSelector: React.FC<ComboOptionSelectorProps> = ({
  basePrice,
  baseMrp,
  selectedComboId,
  onSelectCombo,
  is5PackProduct = false,
}) => {
  const effectiveMrp = baseMrp || Math.round(basePrice * 1.27);
  const oneBoxSave = effectiveMrp > basePrice ? Math.round(((effectiveMrp - basePrice) / effectiveMrp) * 100) : 0;
  const fivePcsPrice = is5PackProduct ? basePrice : 899;
  const fivePcsMrp = is5PackProduct ? effectiveMrp : 1150;
  const fivePcsSave = Math.round(((fivePcsMrp - fivePcsPrice) / fivePcsMrp) * 100);

  const options: ComboOption[] = is5PackProduct
    ? [
        {
          id: '1box_5pcs',
          label: '১ বক্স - ৫ পিস (কমপ্লিট সেট)',
          colorText: 'কালো , সাদা, নীল, ধূসর, লাল',
          colorDots: ['#111111', '#FFFFFF', '#2563EB', '#6B7280', '#DC2626'],
          pieces: '৫ পিস',
          boxCount: 1,
          badge: fivePcsPrice === 750 ? undefined : 'ডেলিভারি চার্জ ফ্রি',
          price: fivePcsPrice,
          originalPrice: fivePcsMrp,
          savePercent: fivePcsSave,
        }
      ]
    : [
        {
          id: '1box_1',
          label: '১ বক্স - ৩ পিস',
          colorText: 'কালো , সাদা , লাল',
          colorDots: ['#111111', '#FFFFFF', '#DC2626'],
          pieces: '৩ পিস',
          boxCount: 1,
          price: basePrice,
          originalPrice: effectiveMrp,
          savePercent: oneBoxSave,
        },
        {
          id: '1box_2',
          label: '১ বক্স - ৩ পিস',
          colorText: 'নীল , ধূসর, লাল',
          colorDots: ['#2563EB', '#6B7280', '#DC2626'],
          pieces: '৩ পিস',
          boxCount: 1,
          price: basePrice,
          originalPrice: effectiveMrp,
          savePercent: oneBoxSave,
        },
        {
          id: '1box_5pcs',
          label: '১ বক্স - ৫ পিস',
          colorText: 'কালো , সাদা, নীল, ধূসর, লাল',
          colorDots: ['#111111', '#FFFFFF', '#2563EB', '#6B7280', '#DC2626'],
          pieces: '৫ পিস',
          boxCount: 1,
          badge: 'ডেলিভারি চার্জ ফ্রি',
          price: fivePcsPrice,
          originalPrice: fivePcsMrp,
          savePercent: fivePcsSave,
        },
      ];

  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
          <span>প্যাকেজ / বক্স কম্বো নির্বাচন করুন</span>
        </label>
      </div>

      <div className="space-y-4 sm:space-y-4.5">
        {options.map((opt) => {
          const isSelected = selectedComboId === opt.id;
          return (
            <div
              key={opt.id}
              id={`combo-option-${opt.id}`}
              onClick={() => onSelectCombo(opt)}
              className={`relative rounded-2xl border-2 p-3.5 sm:p-4 transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'border-[#16a34a] bg-gradient-to-r from-[#ebf8f0] via-[#e2f6eb] to-[#d8f3e5] shadow-[0_2px_8px_rgba(22,163,74,0.15)]'
                  : 'border-emerald-300/80 hover:border-emerald-500 bg-white hover:bg-emerald-50/30'
              }`}
            >
              {/* Offer Badge Header */}
              {opt.badge && (
                <div className="absolute -top-3 right-3 sm:right-4 z-10">
                  <span className="bg-[#FFE600] text-black text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full border-[2px] border-black inline-flex items-center gap-1.5">
                    <span>{opt.badge}</span>
                    <span className="inline-flex items-center justify-center bg-black text-[#FFE600] rounded-full p-0.5 px-1.5 gap-0.5 border border-black">
                      <Truck className="w-3 h-3 stroke-[2.5]" />
                      <Zap className="w-2.5 h-2.5 fill-[#FFE600] text-[#FFE600]" />
                    </span>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                {/* Radio + Label */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all bg-white shrink-0 ${
                      isSelected ? 'border-[#16a34a]' : 'border-emerald-400'
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-sm sm:text-base text-zinc-900 tracking-tight">
                      {opt.label}
                    </span>
                    {opt.colorText && (
                      <span className="text-xs font-bold text-zinc-700 mt-0.5 flex items-center gap-1.5 flex-wrap">
                        {opt.colorDots && opt.colorDots.length > 0 && (
                          <span className="inline-flex items-center gap-1">
                            {opt.colorDots.map((dot, dIdx) => (
                              <span
                                key={dIdx}
                                className="w-2.5 h-2.5 rounded-full border border-black/30 inline-block"
                                style={{ backgroundColor: dot }}
                              />
                            ))}
                          </span>
                        )}
                        <span>{opt.colorText}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  <div className="flex items-baseline gap-1.5 justify-end">
                    <span className="font-black text-sm sm:text-base text-zinc-950 font-display">
                      Tk {opt.price.toFixed(2)}
                    </span>
                  </div>
                  {opt.originalPrice > opt.price && (
                    <span className="text-[11px] font-bold text-zinc-400 line-through block">
                      Tk {opt.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
