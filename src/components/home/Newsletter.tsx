import React, { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles, Gift } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter-signup" className="py-14 sm:py-20 bg-[#FFF3EA] border-b-2 border-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-[#FFDE6B] text-black mx-auto flex items-center justify-center border-2 border-black ">
          <Gift className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white border-2 border-black px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-black ">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
            <span>Join The Tella Club</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-tight">
            Get ৳200 Off Your First Haul
          </h2>

          <p className="text-sm sm:text-base text-zinc-800 max-w-lg mx-auto font-bold">
            Be the first to hear about quirky new print drops, secret warehouse sales, and member-only mystery gifts.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-black text-sm font-black text-black placeholder:text-zinc-500 focus:outline-none "
              />
            </div>
            <button
              type="submit"
              className="btn-bold-primary px-7 py-4 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 "
            >
              <span>Claim ৳200</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="bg-[#FFDE6B] border-2 border-black rounded-2xl p-4 max-w-md mx-auto text-black text-sm font-black flex items-center justify-center gap-2 ">
            <Check className="w-5 h-5 stroke-[3]" />
            <span>You're in! Use coupon code <strong>TELLA10</strong> for instant savings!</span>
          </div>
        )}

        <p className="text-xs text-zinc-700 font-bold">
          Zero spam. Unsubscribe anytime with 1-click.
        </p>
      </div>
    </section>
  );
};
