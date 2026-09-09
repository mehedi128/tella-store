import React, { useState, useEffect } from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { SizeGuideModal } from './components/layout/SizeGuideModal';
import { AccountModal } from './components/layout/AccountModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { CheckoutModal } from './pages/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { Product } from './types';

const MainAppContent: React.FC = () => {
  const { path } = useRouter();

  // Global modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [sizeGuideTab, setSizeGuideTab] = useState<'man' | 'woman'>('man');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSizeGuide = (tab: 'man' | 'woman' = 'man') => {
    setSizeGuideTab(tab);
    setIsSizeGuideOpen(true);
  };

  // Determine which page to render based on URL path
  const renderCurrentPage = () => {
    if (path === '/' || path === '') {
      return <HomePage onQuickView={setQuickViewProduct} />;
    }

    if (path.startsWith('/product/')) {
      return (
        <ProductDetailPage
          onOpenSizeGuide={() => handleOpenSizeGuide('man')}
          onOpenCheckout={() => setIsCheckoutOpen(true)}
        />
      );
    }

    if (path === '/cart') {
      return <CartPage onOpenCheckout={() => setIsCheckoutOpen(true)} />;
    }

    // Category and subcategory routes:
    // /man, /woman, /man/underwear, /man/t-shirt, /woman/underwear, /woman/t-shirt, /new-arrival
    if (
      path.startsWith('/man') ||
      path.startsWith('/woman') ||
      path.startsWith('/new-arrival')
    ) {
      return <CategoryPage onQuickView={setQuickViewProduct} />;
    }

    // Fallback to Home
    return <HomePage onQuickView={setQuickViewProduct} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-zinc-900 selection:bg-orange-200 selection:text-[#FF4800]">
      {/* 1. Global Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
      />

      {/* 3. Main View Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* 5. Drawers & Modals */}
      <CartDrawer onOpenCheckout={() => setIsCheckoutOpen(true)} />
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultTab={sizeGuideTab}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onOpenSizeGuide={() => handleOpenSizeGuide('man')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </RouterProvider>
  );
}
