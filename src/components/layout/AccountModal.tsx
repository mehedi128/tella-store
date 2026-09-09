import React, { useState } from 'react';
import { X, User, Package, Gift, ShieldCheck, Check } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { navigate } = useRouter();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setIsSubmitted(true);
    }
  };

  return (
    <div
      id="account-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-3xl overflow-hidden border-2 border-black flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b-2 border-black flex items-center justify-between bg-[#111111] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFDE6B] text-black border-2 border-black flex items-center justify-center font-black ">
              <User className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-display text-base font-black uppercase">Tella VIP Lounge</h3>
              <p className="text-xs text-zinc-400 font-bold">Track orders & earn Funky Coins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        <div className="p-6 space-y-6 bg-[#FFFBF2]">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase text-black">
                  Mobile Number / Email
                </label>
                <div className="flex rounded-2xl border-2 border-black overflow-hidden bg-white">
                  <span className="bg-[#FFDE6B] px-3.5 py-3 text-xs font-black text-black flex items-center border-r-2 border-black">
                    +880
                  </span>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-3 text-sm font-bold text-black focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full btn-bold-primary py-3.5 rounded-2xl text-sm uppercase tracking-wider"
              >
                Send OTP & Login
              </button>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                <div className="p-2.5 rounded-xl bg-white border-2 border-black ">
                  <Package className="w-4 h-4 mx-auto text-black mb-1 stroke-[2.5]" />
                  <span className="text-[11px] font-black text-black uppercase block">Live Tracking</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border-2 border-black ">
                  <Gift className="w-4 h-4 mx-auto text-[#FF5A1F] mb-1 stroke-[2.5]" />
                  <span className="text-[11px] font-black text-black uppercase block">৳200 Points</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border-2 border-black ">
                  <ShieldCheck className="w-4 h-4 mx-auto text-emerald-700 mb-1 stroke-[2.5]" />
                  <span className="text-[11px] font-black text-black uppercase block">1-Tap Exchange</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFDE6B] border-2 border-black text-black mx-auto flex items-center justify-center ">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-lg text-black uppercase">Welcome to Tella Squad!</h4>
                <p className="text-xs text-zinc-700 font-bold">
                  Signed in as +880 {phone}. Your cart and special discounts are synced!
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                  navigate('/new-arrival');
                }}
                className="w-full btn-bold-secondary font-black py-3 rounded-2xl text-xs uppercase tracking-wider"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
