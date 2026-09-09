import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';

interface CartPageProps {
  onOpenCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onOpenCheckout }) => {
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
    removeItem,
    updateQuantity,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { navigate } = useRouter();
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const shippingFee = isFreeShipping ? 0 : deliveryZone === 'inside_dhaka' ? 60 : 120;
  const currentTotal = finalTotal + shippingFee;

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
    if (res.success) setCouponInput('');
  };

  const trendingProducts = PRODUCTS.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6 animate-in fade-in">
        <div className="w-24 h-24 rounded-3xl bg-[#FFDE6B] border-2 border-black text-black mx-auto flex items-center justify-center ">
          <ShoppingBag className="w-12 h-12 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-[#111111] uppercase">Your Bag is Empty</h2>
          <p className="text-zinc-700 font-bold text-sm sm:text-base max-w-md mx-auto">
            Looks like you haven't added any MicroModal goodies yet. Check out our freshest drops!
          </p>
        </div>
        <div>
          <button
            onClick={() => navigate('/new-arrival')}
            className="btn-bold-primary text-xs sm:text-sm uppercase tracking-wider px-8 py-4 rounded-2xl"
          >
            Explore Bestsellers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="full-cart-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 animate-in fade-in">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#111111] uppercase tracking-tight">
          Shopping Bag ({itemCount} {itemCount === 1 ? 'item' : 'items'})
        </h1>
        <p className="text-xs sm:text-sm text-zinc-700 font-bold">
          Review your items and proceed to secure checkout.
        </p>
      </div>

      {/* Free Shipping Alert Strip */}
      <div className="bg-[#FFDE6B] p-4 sm:p-5 rounded-3xl border-2 border-black space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-black text-black">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-black stroke-[2.5]" />
            {isFreeShipping ? (
              <span className="text-black font-black">
                🎉 অভিনন্দন! আপনি ফ্রি হোম ডেলিভারি পাচ্ছেন (৳১০০০+ অর্ডারে সম্পূর্ণ ফ্রি)।
              </span>
            ) : (
              <span>
                আর মাত্র <strong className="text-[#FF5A1F]">৳{amountNeededForFreeShipping}</strong> টাকার কেনাকাটায় পাবেন <strong>ফ্রি হোম ডেলিভারি</strong>!
              </span>
            )}
          </div>
          <span className="text-xs font-black text-black bg-white px-2 py-0.5 rounded-full border border-black">{freeShippingProgress}%</span>
        </div>
        <div className="w-full h-3 bg-white border-2 border-black rounded-full overflow-hidden p-0.5">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isFreeShipping ? 'bg-emerald-500' : 'bg-[#FF5A1F]'
            }`}
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Layout Grid: Items vs Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Line items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-black divide-y-2 divide-zinc-200">
            {items.map(item => (
              <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-2xl object-cover bg-zinc-100 shrink-0 cursor-pointer border-2 border-black "
                    onClick={() => navigate(`/product/${item.product.slug}`)}
                  />
                  <div className="space-y-1 min-w-0">
                    <span className="text-[10px] font-black uppercase text-black bg-[#FFDE6B] px-2 py-0.5 rounded-md border border-black ">
                      {item.product.category} • {item.product.subcategory}
                    </span>
                    <h3
                      onClick={() => navigate(`/product/${item.product.slug}`)}
                      className="font-black text-sm sm:text-base text-black hover:text-[#FF5A1F] cursor-pointer uppercase"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap text-xs text-zinc-700 font-bold">
                      <span>Size: <strong className="text-black bg-zinc-100 px-2 py-0.5 rounded border border-black">{item.size}</strong></span>
                      {item.bundleName && (
                        <span className="bg-emerald-100 text-emerald-900 border border-emerald-700 px-2 py-0.5 rounded font-black text-[11px]">
                          {item.bundleName}
                        </span>
                      )}
                      {item.product.printName && !item.bundleName && <span>Print: {item.product.printName}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-center">
                  {/* Qty Stepper */}
                  <div className="flex items-center border-2 border-black rounded-xl overflow-hidden bg-white ">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1.5 text-black hover:bg-[#FFDE6B] font-black transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <span className="px-3 text-xs font-black text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1.5 text-black hover:bg-[#FFDE6B] font-black transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-black text-base text-black block">
                      ৳{item.price * item.quantity}
                    </span>
                    {item.product.mrp > item.price && (
                      <span className="text-xs text-zinc-500 line-through font-bold">
                        ৳{item.product.mrp * item.quantity}
                      </span>
                    )}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-zinc-600 hover:text-black p-2 rounded-xl hover:bg-rose-100 border border-transparent hover:border-black transition-all"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigate('/new-arrival')}
              className="text-xs font-black uppercase text-black hover:text-[#FF5A1F] underline"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border-2 border-black space-y-5">
            <h3 className="font-display text-lg font-black text-[#111111] uppercase pb-3 border-b-2 border-black">
              Order Summary
            </h3>

            {/* Delivery Zone Selection */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs font-black text-zinc-900">
                <span>ডেলিভারী জোন নির্বাচন করুন:</span>
                {isFreeShipping && (
                  <span className="text-[10px] text-emerald-700 bg-emerald-100 font-black px-2 py-0.5 rounded-full border border-emerald-300">
                    ফ্রি ডেলিভারি অফার
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryZone('inside_dhaka')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    deliveryZone === 'inside_dhaka'
                      ? 'border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      deliveryZone === 'inside_dhaka' ? 'border-black bg-black' : 'border-zinc-400'
                    }`}>
                      {deliveryZone === 'inside_dhaka' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-bold text-zinc-900">ঢাকার ভিতরে</span>
                  </div>
                  <span className={`text-xs sm:text-sm font-black mt-1.5 ml-6 ${isFreeShipping ? 'text-emerald-600' : 'text-zinc-900'}`}>
                    {isFreeShipping ? '৳০ (ফ্রি)' : '৳৬০'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryZone('outside_dhaka')}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    deliveryZone === 'outside_dhaka'
                      ? 'border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      deliveryZone === 'outside_dhaka' ? 'border-black bg-black' : 'border-zinc-400'
                    }`}>
                      {deliveryZone === 'outside_dhaka' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-xs font-bold text-zinc-900">ঢাকার বাহিরে</span>
                  </div>
                  <span className={`text-xs sm:text-sm font-black mt-1.5 ml-6 ${isFreeShipping ? 'text-emerald-600' : 'text-zinc-900'}`}>
                    {isFreeShipping ? '৳০ (ফ্রি)' : '৳১২০'}
                  </span>
                </button>
              </div>
            </div>

            {/* Price list */}
            <div className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-bold">
              <div className="flex justify-between">
                <span>Original MRP Total</span>
                <span className="line-through text-zinc-500">৳{originalSubtotal}</span>
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
                <span>Shipping Fee ({deliveryZone === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাহিরে'})</span>
                <span className={isFreeShipping ? 'text-emerald-600 font-black' : 'text-zinc-900 font-black'}>
                  {isFreeShipping ? '৳০ (ফ্রি ডেলিভারি)' : `৳${shippingFee}`}
                </span>
              </div>

              {totalSavings > 0 && (
                <div className="bg-[#FFDE6B] text-black p-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 border-2 border-black ">
                  <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Total Savings: ৳{totalSavings}</span>
                </div>
              )}

              <div className="flex justify-between text-base sm:text-lg font-black text-black pt-3 border-t-2 border-black">
                <span>Grand Total</span>
                <span className="text-[#FF5A1F] font-display">৳{currentTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="full-cart-checkout-btn"
              onClick={onOpenCheckout}
              className="w-full btn-bold-primary py-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantee badges */}
            <div className="pt-2 flex items-center justify-center gap-3 text-[11px] font-black text-zinc-700">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                256-Bit SSL
              </span>
              <span>•</span>
              <span>14-Day Free Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="pt-12 border-t-2 border-black space-y-6">
        <h3 className="font-display text-2xl font-black text-[#111111] uppercase">
          Frequently Added Together
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trendingProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
