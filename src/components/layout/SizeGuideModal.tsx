import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'man' | 'woman';
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'man'
}) => {
  const [activeTab, setActiveTab] = useState<'man' | 'woman'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div
      id="size-guide-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-100 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-[#FFF3EA]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-200 text-[#FF4800] flex items-center justify-center font-bold">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-extrabold text-zinc-900">Tella Size & Fit Guide</h3>
              <p className="text-xs text-zinc-600 font-medium">100% Guaranteed Fit with 14-Day Free Exchange</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 p-1.5 rounded-full hover:bg-orange-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-4 border-b border-zinc-100 flex gap-2">
          <button
            onClick={() => setActiveTab('man')}
            className={`flex-1 py-2 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === 'man'
                ? 'bg-zinc-950 text-white shadow-md'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Men's Sizing (Inches)
          </button>
          <button
            onClick={() => setActiveTab('woman')}
            className={`flex-1 py-2 rounded-xl text-sm font-extrabold transition-all ${
              activeTab === 'woman'
                ? 'bg-[#FF4800] text-white shadow-md'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            Women's Sizing (Inches)
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'man' ? (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Underwear & Boxers</h4>
              <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold">
                      <th className="p-3">Size</th>
                      <th className="p-3">Waist (Inches)</th>
                      <th className="p-3">Waist (CM)</th>
                      <th className="p-3">Fit Advice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-800">
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">S</td>
                      <td className="p-3">27 - 28"</td>
                      <td className="p-3">68 - 71 cm</td>
                      <td className="p-3 text-zinc-500">Slim / Snug</td>
                    </tr>
                    <tr className="bg-orange-50/40">
                      <td className="p-3 font-extrabold text-[#FF5A1F]">M (Most Popular)</td>
                      <td className="p-3">29 - 30"</td>
                      <td className="p-3">73 - 76 cm</td>
                      <td className="p-3 text-zinc-500">Standard Daily</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">L</td>
                      <td className="p-3">31 - 32"</td>
                      <td className="p-3">78 - 81 cm</td>
                      <td className="p-3 text-zinc-500">Comfort Fit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">XL</td>
                      <td className="p-3">33 - 34"</td>
                      <td className="p-3">83 - 86 cm</td>
                      <td className="p-3 text-zinc-500">Relaxed</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">XXL</td>
                      <td className="p-3">35 - 36"</td>
                      <td className="p-3">89 - 91 cm</td>
                      <td className="p-3 text-zinc-500">Roomy</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">3XL</td>
                      <td className="p-3">37 - 39"</td>
                      <td className="p-3">94 - 99 cm</td>
                      <td className="p-3 text-zinc-500">Extra Roomy</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF5A1F]">4XL</td>
                      <td className="p-3">40 - 43"</td>
                      <td className="p-3">101 - 109 cm</td>
                      <td className="p-3 text-zinc-500">Plus Fit</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-500">Bikini, Boy Shorts & Hipsters</h4>
              <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold">
                      <th className="p-3">Size</th>
                      <th className="p-3">Waist (Inches)</th>
                      <th className="p-3">Hip (Inches)</th>
                      <th className="p-3">Jean Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-800">
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">S</td>
                      <td className="p-3">25 - 27"</td>
                      <td className="p-3">34 - 36"</td>
                      <td className="p-3 text-zinc-500">26 - 28</td>
                    </tr>
                    <tr className="bg-orange-50/40">
                      <td className="p-3 font-extrabold text-[#FF4800]">M (Most Popular)</td>
                      <td className="p-3">28 - 30"</td>
                      <td className="p-3">37 - 39"</td>
                      <td className="p-3 text-zinc-500">29 - 31</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">L</td>
                      <td className="p-3">31 - 33"</td>
                      <td className="p-3">40 - 42"</td>
                      <td className="p-3 text-zinc-500">32 - 34</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">XL</td>
                      <td className="p-3">34 - 36"</td>
                      <td className="p-3">43 - 45"</td>
                      <td className="p-3 text-zinc-500">35 - 37</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">XXL</td>
                      <td className="p-3">37 - 39"</td>
                      <td className="p-3">46 - 48"</td>
                      <td className="p-3 text-zinc-500">38+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">3XL</td>
                      <td className="p-3">40 - 42"</td>
                      <td className="p-3">49 - 51"</td>
                      <td className="p-3 text-zinc-500">40+</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-extrabold text-[#FF4800]">4XL</td>
                      <td className="p-3">43 - 45"</td>
                      <td className="p-3">52 - 54"</td>
                      <td className="p-3 text-zinc-500">42+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-amber-50 rounded-2xl p-4 flex items-start gap-3 border border-amber-200/60">
            <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-1">
              <span className="font-bold block">In between sizes?</span>
              <p>
                Our 4-way MicroModal stretch naturally expands up to 40% without losing shape. If you prefer a snug athletic hold, size down. For effortless lounging, go one size up!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
