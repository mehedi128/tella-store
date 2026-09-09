import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, Sparkles, Check, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useRouter } from '../../context/RouterContext';

interface CartDrawerProps {
  onOpenCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onOpenCheckout }) => {
  const {
    items,
    itemCount,
    subtotal,
    originalSubtotal,
    totalSavings,
    discountCode,
    discountAmount,
    finalTotal,
    isFreeShipping,
    freeShippingProgress,
    amountNeededForFreeShipping,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { navigate } = useRouter();
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const shippingFee = isFreeShipping ? 0 : deliveryZone === 'inside_dhaka' ? 60 : 120;
  const currentTotal = finalTotal + shippingFee;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleCheckout = () => {
    closeCart();
    if (onOpenCheckout) {
      onOpenCheckout();
    } else {
      navigate('/cart');
    }
  };

  const handleViewCartPage = () => {
    closeCart();
    navigate('/cart');
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300"
      onClick={closeCart}
    >
      <div
        id="cart-drawer"
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b-2 border-black flex items-center justify-between bg-[#FFFBF2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h3 className="font-display text-base font-black text-[#111111] uppercase tracking-wide">
              Your Bag ({itemCount})
            </h3>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={closeCart}
            className="text-black hover:bg-[#FFDE6B] p-2 rounded-xl border border-black transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#FFF3EA] px-5 py-3 border-b-2 border-black">
          <div className="flex items-center gap-2 text-xs font-black text-black mb-1.5 uppercase">
            <Truck className="w-4 h-4 text-[#FF5A1F]" />
            {isFreeShipping ? (
              <span className="text-emerald-700 font-black flex items-center gap-1">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> অভিনন্দন! আপনি ফ্রি হোম ডেলিভারি পাচ্ছেন।
              </span>
            ) : (
              <span>
                Add <strong className="text-[#FF5A1F]">৳{amountNeededForFreeShipping}</strong> more for{' '}
                <strong>FREE Shipping</strong>
              </span>
            )}
          </div>
          <div className="w-full h-2.5 bg-white border border-black rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShipping ? 'bg-emerald-500' : 'bg-[#FF5A1F]'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-[#FFDE6B] text-black border-2 border-black flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display text-lg font-black text-[#111111] uppercase">Your bag is empty!</h4>
                <p className="text-xs text-zinc-700 font-bold max-w-xs">
                  Treat yourself to the world's softest modal underwear and funky prints.
                </p>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  navigate('/new-arrival');
                }}
                className="btn-bold-primary text-xs px-6 py-3 rounded-2xl"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            <div className="space-y-4 divide-y-2 divide-black/10">
              {items.map(item => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3.5 group">
                  <div
                    className="w-20 h-24 rounded-2xl bg-zinc-100 border-2 border-black overflow-hidden shrink-0 cursor-pointer"
                    onClick={() => {
                      closeCart();
                      navigate(`/product/${item.product.slug}`);
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4
                          onClick={() => {
                            closeCart();
                            navigate(`/product/${item.product.slug}`);
                          }}
                          className="font-display font-black text-sm text-[#111111] leading-snug hover:text-[#FF5A1F] cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-500 hover:text-rose-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap text-xs font-bold text-zinc-700">
                        <span className="bg-[#FFDE6B] px-2 py-0.5 rounded border border-black text-black font-black text-[11px]">
                          Size: {item.size}
                        </span>
                        {item.bundleName && (
                          <span className="bg-emerald-100 text-emerald-900 border border-emerald-700 px-2 py-0.5 rounded font-black text-[11px]">
                            {item.bundleName}
                          </span>
                        )}
                        {item.product.printName && !item.bundleName && (
                          <span className="truncate text-xs font-bold">Print: {item.product.printName}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border-2 border-black rounded-xl overflow-hidden bg-white ">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-black hover:bg-[#FFDE6B] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="px-2 text-xs font-black text-black min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-black hover:bg-[#FFDE6B] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-display font-black text-sm text-[#111111] block">
                          ৳{item.price * item.quantity}
                        </span>
                        {item.product.mrp && item.product.mrp > item.price && (
                          <span className="text-[11px] text-zinc-400 line-through font-bold">
                            ৳{item.product.mrp * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Summary Actions */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t-2 border-black bg-[#FFFBF2] space-y-4">
            {/* Delivery Zone Selection */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-black text-zinc-900">
                <span>ডেলিভারী জোন নির্বাচন করুন:</span>
                {isFreeShipping && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-black px-2 py-0.5 rounded-full border border-emerald-300">
                    ফ্রি ডেলিভারি অফার
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      deliveryZone === 'inside_dhaka' ? 'border-black bg-black' : 'border-zinc-400'
                    }`}>
                      {deliveryZone === 'inside_dhaka' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[11px] font-bold text-zinc-900">ঢাকার ভিতরে</span>
                  </div>
                  <span className={`text-xs font-black mt-1 ml-5 ${isFreeShipping ? 'text-emerald-600' : 'text-zinc-900'}`}>
                    {isFreeShipping ? '৳০ (ফ্রি)' : '৳৬০'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
                      deliveryZone === 'outside_dhaka' ? 'border-black bg-black' : 'border-zinc-400'
                    }`}>
                      {deliveryZone === 'outside_dhaka' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-[11px] font-bold text-zinc-900">ঢাকার বাহিরে</span>
                  </div>
                  <span className={`text-xs font-black mt-1 ml-5 ${isFreeShipping ? 'text-emerald-600' : 'text-zinc-900'}`}>
                    {isFreeShipping ? '৳০ (ফ্রি)' : '৳১২০'}
                  </span>
                </button>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-zinc-700 font-bold pt-1">
              <div className="flex justify-between">
                <span>Original Price</span>
                <span className="line-through text-zinc-400">৳{originalSubtotal}</span>
              </div>
              <div className="flex justify-between font-black text-black">
                <span>Bag Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between font-black text-emerald-700">
                  <span>Coupon Discount</span>
                  <span>-৳{discountAmount}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Shipping ({deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাহিরে'})</span>
                <span className={isFreeShipping ? 'text-emerald-600 font-black' : 'text-zinc-900 font-black'}>
                  {isFreeShipping ? '৳০ (ফ্রি ডেলিভারি)' : `৳${shippingFee}`}
                </span>
              </div>
              {totalSavings > 0 && (
                <div className="bg-[#FFDE6B] text-black px-2.5 py-1 rounded-lg text-[11px] font-black border border-black flex items-center gap-1 justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
                  <span>You are saving ৳{totalSavings} on this order!</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-[#111111] pt-2 border-t-2 border-black">
                <span>Total Amount</span>
                <span>৳{currentTotal}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-1">
              <button
                id="drawer-checkout-btn"
                onClick={handleCheckout}
                className="w-full btn-bold-primary py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm"
              >
                <span>অর্ডার করুন (CASH ON DELIVERY)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
