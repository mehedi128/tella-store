import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { CartItem, Product, ProductSize } from '../types';

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; size: ProductSize; color?: string; quantity?: number; bundleName?: string; customPrice?: number; boxCount?: number }
  | { type: 'REMOVE_ITEM'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'APPLY_COUPON'; code: string; percent: number }
  | { type: 'REMOVE_COUPON' }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; state: CartState };

const CART_STORAGE_KEY = 'tella_cart_v1';
const FREE_SHIPPING_THRESHOLD = 1000;

const initialState: CartState = {
  items: [],
  discountCode: null,
  discountPercent: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return action.state;

    case 'ADD_ITEM': {
      const { product, size, color, quantity = 1, bundleName, customPrice, boxCount } = action;
      const effectivePrice = customPrice !== undefined ? customPrice : product.price;
      const itemId = `${product.id}-${size}-${color || 'default'}${bundleName ? `-${bundleName}` : ''}`;
      const existingIndex = state.items.findIndex(item => item.id === itemId);

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
        return { ...state, items: updatedItems };
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          product,
          size,
          color,
          quantity,
          price: effectivePrice,
          bundleName,
          boxCount
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
      };

    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };
    }

    case 'APPLY_COUPON':
      return {
        ...state,
        discountCode: action.code,
        discountPercent: action.percent,
      };

    case 'REMOVE_COUPON':
      return {
        ...state,
        discountCode: null,
        discountPercent: 0,
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        discountCode: null,
        discountPercent: 0,
      };

    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  originalSubtotal: number;
  totalSavings: number;
  discountCode: string | null;
  discountPercent: number;
  discountAmount: number;
  finalTotal: number;
  isFreeShipping: boolean;
  freeShippingProgress: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (
    product: Product,
    size: ProductSize,
    color?: string,
    quantity?: number,
    bundle?: { name: string; price: number; boxCount: number }
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  clearCart: () => void;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.items)) {
          dispatch({ type: 'LOAD_CART', state: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const originalSubtotal = state.items.reduce(
    (total, item) => total + (item.product.mrp || item.price) * item.quantity,
    0
  );
  
  const couponDiscountAmount = Math.round((subtotal * state.discountPercent) / 100);
  const totalSavings = originalSubtotal - subtotal + couponDiscountAmount;
  const finalTotal = Math.max(0, subtotal - couponDiscountAmount);
  
  const hasSpecialFreeShippingBundle = state.items.some(
    it =>
      it.price === 899 ||
      ((it.bundleName?.includes('৫ পিস') ||
        it.bundleName?.includes('5 পিস') ||
        it.bundleName?.includes('5 Pcs') ||
        it.bundleName?.includes('5 pcs')) &&
        it.price !== 750 &&
        it.product?.price !== 750 &&
        it.product?.id !== 'prod-m-und-06')
  );
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || hasSpecialFreeShippingBundle;
  const freeShippingProgress = hasSpecialFreeShippingBundle || isFreeShipping ? 100 : Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addItem = (
    product: Product,
    size: ProductSize,
    color?: string,
    quantity: number = 1,
    bundle?: { name: string; price: number; boxCount: number }
  ) => {
    dispatch({
      type: 'ADD_ITEM',
      product,
      size,
      color,
      quantity,
      bundleName: bundle?.name,
      customPrice: bundle?.price,
      boxCount: bundle?.boxCount
    });
    const effectivePrice = bundle?.price !== undefined ? bundle.price : product.price;
    const itemId = `${product.id}-${size}-${color || 'default'}${bundle?.name ? `-${bundle.name}` : ''}`;
    setLastAddedItem({
      id: itemId,
      productId: product.id,
      product,
      size,
      color,
      quantity,
      price: effectivePrice,
      bundleName: bundle?.name,
      boxCount: bundle?.boxCount
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  };

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'TELLA10' || cleanCode === 'BUMMER10' || cleanCode === 'FIRST10') {
      dispatch({ type: 'APPLY_COUPON', code: 'TELLA10', percent: 10 });
      return { success: true, message: '🎉 10% discount applied successfully!' };
    }
    if (cleanCode === 'TELLA20' || cleanCode === 'BUMMER20' || cleanCode === 'FUNKY20') {
      dispatch({ type: 'APPLY_COUPON', code: 'TELLA20', percent: 20 });
      return { success: true, message: '🔥 20% Super Saver discount applied!' };
    }
    if (cleanCode === 'SHARKTANK') {
      dispatch({ type: 'APPLY_COUPON', code: cleanCode, percent: 15 });
      return { success: true, message: '🦈 Shark Tank 15% VIP deal activated!' };
    }
    return { success: false, message: 'Invalid coupon code. Try TELLA10 or SHARKTANK' };
  };

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        originalSubtotal,
        totalSavings,
        discountCode: state.discountCode,
        discountPercent: state.discountPercent,
        discountAmount: couponDiscountAmount,
        finalTotal,
        isFreeShipping,
        freeShippingProgress,
        amountNeededForFreeShipping,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
