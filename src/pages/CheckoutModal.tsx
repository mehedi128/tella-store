import React, { useState, useMemo } from 'react';
import { X, Check, User, Phone, MapPin, Lock, MessageCircle, ShoppingBag, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { SIZE_LABELS } from '../components/product/SizeSelector';
import { submitOrderToGoogleSheet } from '../services/orderService';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, clearCart } = useCart();
  const { navigate } = useRouter();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });

  // Delivery zone state
  const [deliveryZone, setDeliveryZone] = useState<'inside_dhaka' | 'outside_dhaka'>('outside_dhaka');

  // Phone input handler (only digits and max 11 chars)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 11);
    setFormData(prev => ({ ...prev, phone: digitsOnly }));
    if (errorMessage) setErrorMessage(null);
  };

  // Form validation function
  const validateForm = (): boolean => {
    const trimmedName = formData.name.trim();
    const cleanPhone = formData.phone.replace(/\D/g, '').trim();
    const trimmedAddress = formData.address.trim();

    if (!trimmedName) {
      setErrorMessage('অনুগ্রহ করে আপনার পুরো নাম লিখুন।');
      return false;
    }

    if (!cleanPhone) {
      setErrorMessage('অনুগ্রহ করে আপনার ১১ ডিজিটের মোবাইল নম্বর দিন।');
      return false;
    }

    if (cleanPhone.length !== 11) {
      setErrorMessage(`মোবাইল নম্বরটি অবশ্যই ১১ ডিজিটের হতে হবে (আপনি দিয়েছেন ${cleanPhone.length} ডিজিট)।`);
      return false;
    }

    if (!cleanPhone.startsWith('01')) {
      setErrorMessage('সঠিক বাংলাদেশি মোবাইল নম্বর দিন যা 01 দিয়ে শুরু হবে (যেমন: 01XXXXXXXXX)।');
      return false;
    }

    if (!trimmedAddress) {
      setErrorMessage('অনুগ্রহ করে সম্পূর্ণ ডেলিভারি ঠিকানা (থানা ও জেলাসহ) লিখুন।');
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  // Display items list (all cart items, or fallback default product)
  const displayItems = useMemo(() => {
    if (items.length > 0) {
      return items;
    }
    const defaultProduct = PRODUCTS[0];
    return [
      {
        id: 'default-item',
        productId: defaultProduct.id,
        product: defaultProduct,
        size: defaultProduct.sizes[1] || 'M',
        color: defaultProduct.colors?.[0] || 'default',
        quantity: 1,
        price: defaultProduct.price,
        bundleName: defaultProduct.name,
      },
    ];
  }, [items]);

  // Calculate subtotal
  const itemSubtotal = displayItems.reduce((acc, it) => acc + it.price * it.quantity, 0);
  const totalItemCount = displayItems.reduce((acc, it) => acc + it.quantity, 0);

  // Free shipping check for 1 Box (5 Pcs - 899 Tk) combo OR order price >= 1000 Tk
  const isFreeDelivery = useMemo(() => {
    const hasSpecialBundle = displayItems.some(
      (it) =>
        it.price === 899 ||
        ((it.bundleName?.includes('৫ পিস') ||
          it.bundleName?.includes('5 পিস') ||
          it.bundleName?.includes('5 Pcs') ||
          it.bundleName?.includes('5 pcs')) &&
          it.price !== 750 &&
          it.product?.price !== 750 &&
          it.product?.id !== 'prod-m-und-06')
    );
    return hasSpecialBundle || itemSubtotal >= 1000;
  }, [displayItems, itemSubtotal]);

  if (!isOpen) return null;

  const shippingFee = isFreeDelivery ? 0 : deliveryZone === 'inside_dhaka' ? 60 : 120;
  const totalAmount = itemSubtotal + shippingFee;

  const handleConfirmOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const generatedId = `TEL-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setIsSubmitting(true);

    try {
      await submitOrderToGoogleSheet({
        orderId: generatedId,
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        deliveryZone: deliveryZone,
        items: displayItems.map((item) => ({
          name: item.bundleName || item.product.name,
          size: SIZE_LABELS[item.size]?.full || item.size,
          color: item.color,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal: itemSubtotal,
        shippingFee: shippingFee,
        totalAmount: totalAmount,
        notes: 'Cash on Delivery (COD)',
      });
    } catch (err) {
      console.error('Error submitting order to sheet:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      clearCart();
    }
  };

  const handleWhatsAppOrder = () => {
    if (!validateForm()) {
      return;
    }

    const itemsSummary = displayItems
      .map((it, idx) => {
        const pName = it.bundleName || it.product.name;
        const sText = SIZE_LABELS[it.size]?.full || it.size;
        return `${idx + 1}. ${pName} [সাইজ: ${sText}] (পরিমাণ: ${it.quantity}) - Tk ${it.price * it.quantity}`;
      })
      .join('\n');

    const zoneText = isFreeDelivery
      ? `${deliveryZone === 'inside_dhaka' ? 'ঢাকার ভিতরে' : 'ঢাকার বাহিরে'} (${itemSubtotal >= 1000 ? '৳১০০০+ ফ্রি ডেলিভারি' : 'ফ্রি ডেলিভারি'})`
      : deliveryZone === 'inside_dhaka'
      ? 'ঢাকার ভিতরে (Tk 60)'
      : 'ঢাকার বাহিরে (Tk 120)';

    const message = `*নতুন ক্যাশ অন ডেলিভারি অর্ডার:*
--------------------------
*অর্ডার আইটেমসমূহ:*
${itemsSummary}
--------------------------
*পণ্যের মোট মূল্য:* Tk ${itemSubtotal}
*ডেলিভারি চার্জ:* ${isFreeDelivery ? 'ফ্রি (Tk 0)' : deliveryZone === 'inside_dhaka' ? 'Tk 60' : 'Tk 120'}
*ডেলিভারি জোন:* ${zoneText}
*সর্বমোট বিল:* Tk ${totalAmount}
--------------------------
*গ্রাহকের তথ্য:*
*নাম:* ${formData.name.trim()}
*ফোন:* ${formData.phone.trim()}
*ঠিকানা:* ${formData.address.trim()}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/8801850560179?text=${encodedMessage}`, '_blank');
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
    navigate('/');
  };

  return (
    <div
      id="checkout-modal"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 flex flex-col my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 flex items-center justify-between bg-white">
          <h3 className="text-base sm:text-lg font-black text-zinc-900">
            ক্যাশ অন ডেলিভারিতে অর্ডার করুন
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-500 hover:text-zinc-900 p-1.5 rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto max-h-[82vh]">
          {isSuccess ? (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-600">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1.5">
                <span className="inline-block bg-emerald-700 text-white text-xs font-black px-3 py-0.5 rounded-full">
                  অর্ডার নং #{orderId} সফল হয়েছে
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-zinc-900">
                  ধন্যবাদ, আপনার অর্ডারটি গ্রহণ করা হয়েছে!
                </h3>
                <p className="text-xs text-zinc-600 font-bold max-w-xs mx-auto">
                  আমাদের কাস্টমার কেয়ার প্রতিনিধি শীঘ্রই আপনার সাথে <strong>{formData.phone}</strong> নম্বরে যোগাযোগ করে ডেলিভারি নিশ্চিত করবেন।
                </p>
              </div>

              <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-xs text-zinc-800 font-bold text-left space-y-1.5">
                <div className="flex justify-between">
                  <span>ডেলিভারি প্রাপক:</span>
                  <span className="text-black font-black">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>ঠিকানা:</span>
                  <span className="text-black font-bold">{formData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span>পেমেন্ট মেথড:</span>
                  <span className="text-emerald-700 font-black">ক্যাশ অন ডেলিভারি (COD)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-zinc-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="text-black font-black text-sm">Tk {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="w-full bg-zinc-900 hover:bg-black text-white font-black text-xs sm:text-sm uppercase tracking-wider py-3.5 rounded-xl cursor-pointer transition-all"
              >
                আরো কেনাকাটা করুন
              </button>
            </div>
          ) : (
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              {/* Error Message Banner */}
              {errorMessage && (
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 flex items-start gap-2.5 text-red-800 text-xs sm:text-sm font-bold animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </div>
              )}

              {/* Customer Info Inputs */}
              <div className="space-y-3">
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                    <span>আপনার নাম <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-zinc-500 font-semibold">(আবশ্যক)</span>
                  </label>
                  <div className="flex rounded-xl border border-zinc-300 overflow-hidden focus-within:border-zinc-800 transition-colors bg-white">
                    <div className="w-12 bg-zinc-100/90 border-r border-zinc-300 flex items-center justify-center text-zinc-700 shrink-0">
                      <User className="w-4 h-4 text-emerald-800" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: মোঃ সাকিব হোসেন"
                      value={formData.name}
                      onChange={e => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                    <span>মোবাইল নম্বর (১১ ডিজিট) <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-zinc-500 font-semibold">{formData.phone.length}/11 ডিজিট</span>
                  </label>
                  <div className={`flex rounded-xl border overflow-hidden transition-colors bg-white ${
                    formData.phone && formData.phone.length !== 11 ? 'border-amber-400 focus-within:border-amber-600' : 'border-zinc-300 focus-within:border-zinc-800'
                  }`}>
                    <div className="w-12 bg-zinc-100/90 border-r border-zinc-300 flex items-center justify-center text-zinc-700 shrink-0">
                      <Phone className="w-4 h-4 text-emerald-800" />
                    </div>
                    <input
                      type="tel"
                      required
                      inputMode="numeric"
                      maxLength={11}
                      pattern="01[0-9]{9}"
                      placeholder="যেমন: 01850560179"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none tracking-wide"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-1">
                  <label className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-zinc-900 flex items-center justify-between">
                    <span>সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-red-500">*</span></span>
                    <span className="text-[10px] text-zinc-500 font-semibold">(আবশ্যক)</span>
                  </label>
                  <div className="flex rounded-xl border border-zinc-300 overflow-hidden focus-within:border-zinc-800 transition-colors bg-white">
                    <div className="w-12 bg-zinc-100/90 border-r border-zinc-300 flex items-center justify-center text-zinc-700 shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-800" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="বাসা/রোড নং, থানা ও জেলার নাম লিখুন"
                      value={formData.address}
                      onChange={e => {
                        setFormData({ ...formData, address: e.target.value });
                        if (errorMessage) setErrorMessage(null);
                      }}
                      className="w-full px-3.5 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Product Item Cards */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-0.5">
                {displayItems.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="bg-[#f8f9fa] border border-zinc-200/90 rounded-xl p-3 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-lg object-cover border border-zinc-200 shrink-0 bg-white"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-black text-zinc-900 leading-snug">
                          {item.bundleName || item.product.name}
                        </h4>
                        <p className="text-[11px] text-zinc-600 font-bold">
                          {SIZE_LABELS[item.size]?.full || item.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 flex flex-col items-end gap-1">
                      <span className="text-xs sm:text-sm font-black text-zinc-900">
                        Tk {item.price * item.quantity}
                      </span>
                      <div className="border border-zinc-300 bg-white rounded px-2.5 py-0.5 text-xs font-bold text-zinc-900 min-w-[28px] text-center">
                        {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Zone Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-black text-zinc-900">
                    ডেলিভারী জোন সিলেক্ট করুন
                  </h4>
                  {isFreeDelivery ? (
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Truck className="w-3 h-3 stroke-[2.5]" />
                      {itemSubtotal >= 1000 ? '৳১০০০+ ফ্রি ডেলিভারি' : 'ফ্রি ডেলিভারি অফার'}
                    </span>
                  ) : (
                    <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      ৳১০০০+ অর্ডারে ফ্রি ডেলিভারি
                    </span>
                  )}
                </div>

                <div className="border border-zinc-200 rounded-xl overflow-hidden divide-y divide-zinc-200 bg-white">
                  <label
                    onClick={() => setDeliveryZone('inside_dhaka')}
                    className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                      deliveryZone === 'inside_dhaka' ? 'bg-zinc-50/80' : 'hover:bg-zinc-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="delivery_zone"
                        checked={deliveryZone === 'inside_dhaka'}
                        onChange={() => setDeliveryZone('inside_dhaka')}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                      />
                      <span className="text-xs sm:text-sm font-bold text-zinc-900">
                        ঢাকার ভিতরে:
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-black ${isFreeDelivery ? 'text-emerald-600 font-black' : 'text-zinc-900'}`}>
                      {isFreeDelivery ? 'Tk 0.00 (ফ্রি)' : 'Tk 60.00'}
                    </span>
                  </label>

                  <label
                    onClick={() => setDeliveryZone('outside_dhaka')}
                    className={`flex items-center justify-between p-3.5 cursor-pointer transition-colors ${
                      deliveryZone === 'outside_dhaka' ? 'bg-zinc-50/80' : 'hover:bg-zinc-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="delivery_zone"
                        checked={deliveryZone === 'outside_dhaka'}
                        onChange={() => setDeliveryZone('outside_dhaka')}
                        className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
                      />
                      <span className="text-xs sm:text-sm font-bold text-zinc-900">
                        ঢাকার বাহিরে:
                      </span>
                    </div>
                    <span className={`text-xs sm:text-sm font-black ${isFreeDelivery ? 'text-emerald-600 font-black' : 'text-zinc-900'}`}>
                      {isFreeDelivery ? 'Tk 0.00 (ফ্রি)' : 'Tk 120.00'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 pt-1 text-xs sm:text-sm">
                <div className="flex justify-between text-zinc-700 font-bold">
                  <span>Sub total</span>
                  <span>Tk {itemSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-700 font-bold">
                  <span>Shipping</span>
                  <span className={isFreeDelivery ? 'text-emerald-600 font-black' : 'text-zinc-900'}>
                    {isFreeDelivery ? 'Tk 0.00 (ফ্রি ডেলিভারি)' : `Tk ${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-black text-zinc-950 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span>Tk {totalAmount.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {/* Confirm Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#3f7a14] hover:bg-[#356711] active:scale-[0.99] text-white font-black text-sm sm:text-base py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <Lock className="w-4 h-4 stroke-[2.5]" />
                  <span>{isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার কনফার্ম করুন'}</span>
                </button>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.99] text-white font-black text-sm sm:text-base py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                  <span>সরাসরি WhatsApp এ অর্ডার করুন</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
