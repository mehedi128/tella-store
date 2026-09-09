import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductGallery } from '../components/product/ProductGallery';
import { SizeSelector } from '../components/product/SizeSelector';
import { ComboOptionSelector, ComboOption } from '../components/product/ComboOptionSelector';
import { ProductCard } from '../components/product/ProductCard';
import { useCart } from '../context/CartContext';
import { useRouter } from '../context/RouterContext';
import { ProductSize, Product } from '../types';
import {
  ShoppingBag,
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
  Heart,
  Droplet,
  Feather
} from 'lucide-react';

interface ProductDetailPageProps {
  onOpenSizeGuide: () => void;
  onOpenCheckout?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  onOpenSizeGuide,
  onOpenCheckout
}) => {
  const { path, navigate } = useRouter();
  const slug = path.split('/product/')[1]?.split('?')[0] || '';

  const product = useMemo(() => {
    return PRODUCTS.find(p => p.slug === slug) || PRODUCTS[0];
  }, [slug]);

  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.includes('S') ? 'S' : product.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || 'default');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const is5PackProduct = product.id === 'prod-m-und-05' || product.id === 'prod-m-und-06' || product.name.includes('5 pic') || product.slug.includes('5-pic');
  const [selectedCombo, setSelectedCombo] = useState<string>(is5PackProduct ? '1box_5pcs' : '1box_1');

  // Sync size and combo if product changes
  React.useEffect(() => {
    if (product.sizes.includes('S')) {
      setSelectedSize('S');
    } else if (product.sizes[0]) {
      setSelectedSize(product.sizes[0]);
    }

    if (is5PackProduct) {
      setSelectedCombo('1box_5pcs');
    } else {
      setSelectedCombo('1box_1');
    }
  }, [is5PackProduct, product.id, product.sizes]);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<'desc' | 'specs' | 'care' | 'shipping' | null>('desc');

  const { addItem, openCart } = useCart();

  const comboOptionsData: Record<string, { label: string; pieces: string; colorText?: string; boxCount: number; price: number; originalPrice: number; badge?: string }> = useMemo(() => {
    const effectiveMrp = product.mrp || Math.round(product.price * 1.27);
    if (is5PackProduct) {
      return {
        '1box_5pcs': {
          label: '১ বক্স - ৫ পিস (কমপ্লিট সেট)',
          colorText: 'কালো , সাদা, নীল, ধূসর, লাল',
          pieces: '৫ পিস',
          boxCount: 1,
          price: product.price,
          originalPrice: effectiveMrp,
          badge: product.price === 750 ? undefined : 'ডেলিভারি চার্জ ফ্রি'
        }
      };
    }
    return {
      '1box_1': {
        label: '১ বক্স - ৩ পিস',
        colorText: 'কালো , সাদা , লাল',
        pieces: '৩ পিস',
        boxCount: 1,
        price: product.price,
        originalPrice: effectiveMrp,
        badge: 'স্ট্যান্ডার্ড প্যাক'
      },
      '1box_2': {
        label: '১ বক্স - ৩ পিস',
        colorText: 'নীল , ধূসর, লাল',
        pieces: '৩ পিস',
        boxCount: 1,
        price: product.price,
        originalPrice: effectiveMrp,
        badge: 'স্ট্যান্ডার্ড প্যাক'
      },
      '1box_5pcs': {
        label: '১ বক্স - ৫ পিস',
        colorText: 'কালো , সাদা, নীল, ধূসর, লাল',
        pieces: '৫ পিস',
        boxCount: 1,
        price: 899,
        originalPrice: 1150,
        badge: 'ডেলিভারি চার্জ ফ্রি'
      }
    };
  }, [product, is5PackProduct]);

  const currentCombo = comboOptionsData[selectedCombo] || comboOptionsData['1box_1'] || {
    label: '১ বক্স - ৩ পিস',
    pieces: '৩ পিস',
    colorText: 'কালো , সাদা , লাল',
    boxCount: 1,
    price: product.price,
    originalPrice: product.mrp || 700
  };

  const discountPercent = currentCombo.originalPrice > currentCombo.price
    ? Math.round(((currentCombo.originalPrice - currentCombo.price) / currentCombo.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    const bundleTitle = currentCombo.colorText
      ? `${currentCombo.label} (${currentCombo.colorText})`
      : currentCombo.label;

    addItem(
      product,
      selectedSize,
      selectedColor,
      quantity,
      {
        name: bundleTitle,
        price: currentCombo.price,
        boxCount: currentCombo.boxCount
      }
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyWithCOD = () => {
    const bundleTitle = currentCombo.colorText
      ? `${currentCombo.label} (${currentCombo.colorText})`
      : currentCombo.label;

    addItem(
      product,
      selectedSize,
      selectedColor,
      quantity,
      {
        name: bundleTitle,
        price: currentCombo.price,
        boxCount: currentCombo.boxCount
      }
    );
    if (onOpenCheckout) {
      onOpenCheckout();
    } else {
      openCart();
    }
  };

  // Related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
  }, [product]);

  const toggleAccordion = (key: 'desc' | 'specs' | 'care' | 'shipping') => {
    setOpenAccordion(prev => (prev === key ? null : key));
  };

  return (
    <div id="product-detail-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12 animate-in fade-in duration-300">
      {/* Top breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-black text-zinc-600 uppercase tracking-wide">
        <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
        <span>/</span>
        <button onClick={() => navigate(`/${product.category}`)} className="hover:text-black uppercase">
          {product.category}
        </button>
        <span>/</span>
        <button onClick={() => navigate(`/${product.category}/${product.subcategory}`)} className="hover:text-black uppercase">
          {product.subcategory}
        </button>
        <span>/</span>
        <span className="text-[#FF5A1F] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
        {/* Left: Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right: Purchasing Info & Options */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            {/* Title */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] uppercase tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>

          {/* 3-Box & 5-Box Combo Package Selector */}
          <ComboOptionSelector
            basePrice={product.price}
            baseMrp={product.mrp}
            selectedComboId={selectedCombo}
            onSelectCombo={(combo) => setSelectedCombo(combo.id)}
            is5PackProduct={is5PackProduct}
          />

          {/* Size Selector */}
          <div className="pt-2">
            <SizeSelector
              availableSizes={product.sizes}
              selectedSize={selectedSize}
              onSelectSize={setSelectedSize}
              onOpenSizeGuide={onOpenSizeGuide}
            />
          </div>

          {/* Quantity Stepper + Purchase CTAs */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border-2 border-black rounded-2xl overflow-hidden bg-white h-13 px-2 ">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-black hover:bg-[#FFDE6B] rounded-lg transition-colors font-black"
                >
                  -
                </button>
                <span className="px-3 text-sm font-black text-black min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-black hover:bg-[#FFDE6B] rounded-lg transition-colors font-black"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                id="pdp-add-to-cart-btn"
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 h-13 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 border-2 border-black transition-all ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-zinc-100 text-black'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>Added To Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Buy with Cash on Delivery Button */}
            <button
              id="pdp-buy-cod-btn"
              type="button"
              onClick={handleBuyWithCOD}
              className="w-full h-14 rounded-2xl font-black text-sm sm:text-base tracking-wider flex items-center justify-center gap-2.5 border-2 border-black bg-[#16a34a] text-white hover:bg-[#15803d] active:scale-[0.99] transition-all cursor-pointer"
            >
              <Truck className="w-5 h-5 stroke-[2.5]" />
              <span>অর্ডার করুন (CASH ON DELIVERY)</span>
            </button>
          </div>

          {/* Expandable Accordions */}
          <div className="pt-4 border-t-2 border-black space-y-3">
            {/* 1. Description & Features */}
            <div className="border-2 border-black rounded-2xl overflow-hidden ">
              <button
                type="button"
                onClick={() => toggleAccordion('desc')}
                className="w-full p-4 bg-[#FFFBF2] flex items-center justify-between font-black text-xs uppercase text-black tracking-wider"
              >
                <span>Description & Features</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'desc' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'desc' && (
                <div className="p-4 bg-white border-t-2 border-black text-xs sm:text-sm text-zinc-800 space-y-3 leading-relaxed font-bold">
                  <p>{product.description}</p>
                  {product.features && (
                    <ul className="space-y-1.5 pt-1">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 font-black text-black">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* 2. Fabric & Material Tech */}
            <div className="border-2 border-black rounded-2xl overflow-hidden ">
              <button
                type="button"
                onClick={() => toggleAccordion('specs')}
                className="w-full p-4 bg-[#FFFBF2] flex items-center justify-between font-black text-xs uppercase text-black tracking-wider"
              >
                <span>Fabric & Sustainability</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
              </button>
              {openAccordion === 'specs' && (
                <div className="p-4 bg-white border-t-2 border-black text-xs sm:text-sm text-zinc-800 space-y-2 leading-relaxed font-bold">
                  <p>
                    <strong className="text-black font-black">Composition:</strong> {product.fabricDetails || '95% Cotton আর 5% Elastane — সফট আর ফ্লেক্সিবল ফেব্রিক'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Carousel */}
      <div className="pt-12 border-t-2 border-black space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase text-[#FF5A1F] tracking-wider block">
              Complete Your Haul
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black text-[#111111] uppercase">
              You Might Also Like
            </h3>
          </div>
          <button
            onClick={() => navigate(`/${product.category}`)}
            className="text-xs font-black text-black hover:text-[#FF5A1F] uppercase underline"
          >
            View More {product.category === 'man' ? 'Men' : 'Women'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-4xl">
          {relatedProducts.slice(0, 2).map(rel => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </div>
    </div>
  );
};
