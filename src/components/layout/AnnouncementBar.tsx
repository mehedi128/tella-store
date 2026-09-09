import React, { useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

export const AnnouncementBar: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { navigate } = useRouter();

  if (isDismissed) return null;

  return (
    <aside
      id="announcement-bar"
      aria-label="Promotional announcements"
      className="bg-[#111111] text-white text-xs sm:text-[13px] font-bold tracking-wide transition-all duration-300 relative z-50 border-b-2 border-black"
    >
      <div className="max-w-7xl mx-auto px-4 py-2 sm:py-2.5 flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/man')}
          className="flex-1 text-center font-bold tracking-wide hover:text-[#FFDE6B] cursor-pointer flex items-center justify-center gap-1.5 transition-colors duration-200"
        >
          <span>🚛 সম্পুর্ণ ক্যাশ-অন ডেলিভারীতে অর্ডার করুন - 🛍️ প্রোডাক্ট হাতে পেয়ে টাকা পরিশোধ করুন।</span>
          <ChevronRight className="w-3.5 h-3.5 inline text-[#FFDE6B]" />
        </button>

        <button
          id="dismiss-announcement-btn"
          type="button"
          onClick={() => setIsDismissed(true)}
          className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors ml-2"
          aria-label="Dismiss announcement bar"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
