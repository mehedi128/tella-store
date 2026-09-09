import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';
import { useCart } from '../../context/CartContext';
import { Category } from '../../types';

interface HeaderProps {
  onOpenSearch?: () => void;
  onOpenAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenAccount }) => {
  const { path, navigate } = useRouter();
  const { itemCount, toggleCart } = useCart();
  const [activeDropdown, setActiveDropdown] = useState<Category | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileManAccordion, setMobileManAccordion] = useState(true);
  const [mobileWomanAccordion, setMobileWomanAccordion] = useState(true);

  const isManActive = path.startsWith('/man');
  const isWomanActive = path.startsWith('/woman');
  const isNewArrivalActive = path === '/new-arrival';

  const handleNavClick = (url: string) => {
    navigate(url);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-[#FFFBF2]/95 backdrop-blur-md border-b-2 border-black transition-all"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile hamburger button with clear text */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white text-zinc-900 hover:text-[#FF5A1F] rounded-xl border-2 border-black active:translate-x-[1px] active:translate-y-[1px] transition-all font-display text-xs font-black uppercase tracking-wider"
              aria-label="Open mobile menu"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <button
              id="header-logo-btn"
              onClick={() => handleNavClick('/')}
              className="group flex items-center gap-1.5 focus:outline-none"
            >
              <span className="font-display text-2xl sm:text-3xl font-black tracking-tighter text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                TELLA
              </span>
              <span className="w-3 h-3 rounded-full bg-[#FF5A1F] inline-block border-2 border-black group-hover:scale-125 transition-transform" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3">
            {/* Man with Dropdown Sub-menu on Hover */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('man')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-man-btn"
                onClick={() => handleNavClick('/man')}
                className={`px-4 py-2 rounded-xl font-display text-sm font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  isManActive
                    ? 'bg-[#111111] text-white border-2 border-black '
                    : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-white border-2 border-transparent hover:border-black'
                }`}
              >
                <span>Man</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'man' ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === 'man' && (
                <div className="absolute top-full left-0 pt-2 w-48 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-[#FFFBF2] rounded-2xl border-2 border-black p-2 space-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <button
                      id="nav-man-tshirt-btn"
                      onClick={() => handleNavClick('/man/t-shirt')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-[#111111] hover:bg-[#FFDE6B] hover:text-black border border-transparent hover:border-black transition-all flex items-center justify-between group"
                    >
                      <span>T-Shirt</span>
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-black">→</span>
                    </button>
                    <button
                      id="nav-man-underwear-btn"
                      onClick={() => handleNavClick('/man/underwear')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-[#111111] hover:bg-[#FFDE6B] hover:text-black border border-transparent hover:border-black transition-all flex items-center justify-between group"
                    >
                      <span>Underwear</span>
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-black">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Woman with Dropdown Sub-menu on Hover */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('woman')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                id="nav-woman-btn"
                onClick={() => handleNavClick('/woman')}
                className={`px-4 py-2 rounded-xl font-display text-sm font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  isWomanActive
                    ? 'bg-[#FF5A1F] text-white border-2 border-black '
                    : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-white border-2 border-transparent hover:border-black'
                }`}
              >
                <span>Woman</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'woman' ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === 'woman' && (
                <div className="absolute top-full left-0 pt-2 w-48 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-[#FFFBF2] rounded-2xl border-2 border-black p-2 space-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <button
                      id="nav-woman-tshirt-btn"
                      onClick={() => handleNavClick('/woman/t-shirt')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-[#111111] hover:bg-[#FFDE6B] hover:text-black border border-transparent hover:border-black transition-all flex items-center justify-between group"
                    >
                      <span>T-Shirt</span>
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-black">→</span>
                    </button>
                    <button
                      id="nav-woman-underwear-btn"
                      onClick={() => handleNavClick('/woman/underwear')}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-[#111111] hover:bg-[#FFDE6B] hover:text-black border border-transparent hover:border-black transition-all flex items-center justify-between group"
                    >
                      <span>Underwear</span>
                      <span className="text-[10px] font-black text-zinc-500 group-hover:text-black">→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* New Arrival */}
            <button
              id="nav-new-arrival-btn"
              onClick={() => handleNavClick('/new-arrival')}
              className={`px-4 py-2 rounded-xl font-display text-sm font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                isNewArrivalActive
                  ? 'bg-[#FFDE6B] text-[#111111] border-2 border-black '
                  : 'text-[#111111] hover:text-[#FF5A1F] hover:bg-white border-2 border-transparent hover:border-black'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span>New Arrival</span>
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            {/* Account Icon */}
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              className="p-2.5 text-[#111111] hover:text-[#FF5A1F] rounded-xl bg-white border-2 border-black hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              aria-label="Account and orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Icon with reactive badge */}
            <button
              id="header-cart-btn"
              onClick={toggleCart}
              className="relative p-2.5 bg-[#111111] hover:bg-[#FF5A1F] text-white rounded-xl border-2 border-black hover:translate-x-[1.5px] hover:translate-y-[1.5px] transition-all flex items-center justify-center"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-2 -right-2 bg-[#FFDE6B] text-[#111111] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black animate-in zoom-in"
                >
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Slide-in) */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-backdrop"
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm lg:hidden flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            id="mobile-drawer"
            className="bg-[#FFFBF2] w-[88%] max-w-sm h-[100dvh] shadow-2xl flex flex-col justify-between overflow-y-auto border-r-2 border-black animate-in slide-in-from-left duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="p-5 border-b-2 border-black flex items-center justify-between bg-white">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-2xl font-black text-black">TELLA</span>
                <span className="w-3 h-3 rounded-full bg-[#FF5A1F] border border-black" />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-zinc-900 hover:text-black rounded-xl hover:bg-zinc-100 border border-transparent hover:border-black"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links / Accordions */}
            <div className="p-5 space-y-4 flex-1">
              {/* Man Section */}
              <div className="border-2 border-black rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setMobileManAccordion(!mobileManAccordion)}
                  className="w-full p-4 bg-[#FFDE6B] flex items-center justify-between font-display text-base font-black text-black uppercase border-b-2 border-black"
                >
                  <span>Men's Collection</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileManAccordion ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileManAccordion && (
                  <div className="p-3 space-y-1.5 text-xs font-black uppercase tracking-wider">
                    <button
                      onClick={() => handleNavClick('/man/t-shirt')}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-50 hover:bg-[#FFDE6B] text-black border border-black flex items-center justify-between transition-colors"
                    >
                      <span>T-Shirt</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/man/underwear')}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-50 hover:bg-[#FFDE6B] text-black border border-black flex items-center justify-between transition-colors"
                    >
                      <span>Underwear</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/man')}
                      className="w-full text-center py-2 text-zinc-600 hover:text-black text-[11px] underline uppercase"
                    >
                      View All Men
                    </button>
                  </div>
                )}
              </div>

              {/* Woman Section */}
              <div className="border-2 border-black rounded-2xl overflow-hidden bg-white">
                <button
                  onClick={() => setMobileWomanAccordion(!mobileWomanAccordion)}
                  className="w-full p-4 bg-[#FF5A1F] text-white flex items-center justify-between font-display text-base font-black uppercase border-b-2 border-black"
                >
                  <span>Women's Collection</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${mobileWomanAccordion ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileWomanAccordion && (
                  <div className="p-3 space-y-1.5 text-xs font-black uppercase tracking-wider">
                    <button
                      onClick={() => handleNavClick('/woman/t-shirt')}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-50 hover:bg-[#FFDE6B] text-black border border-black flex items-center justify-between transition-colors"
                    >
                      <span>T-Shirt</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/woman/underwear')}
                      className="w-full text-left p-2.5 rounded-xl bg-zinc-50 hover:bg-[#FFDE6B] text-black border border-black flex items-center justify-between transition-colors"
                    >
                      <span>Underwear</span>
                      <span>→</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/woman')}
                      className="w-full text-center py-2 text-zinc-600 hover:text-black text-[11px] underline uppercase"
                    >
                      View All Women
                    </button>
                  </div>
                )}
              </div>

              {/* Flat New Arrival link */}
              <button
                onClick={() => handleNavClick('/new-arrival')}
                className="w-full p-4 bg-[#FFDE6B] text-black rounded-2xl flex items-center justify-between font-display text-sm font-black uppercase border-2 border-black"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FF5A1F]" />
                  <span>New Arrivals</span>
                </div>
                <span className="text-[10px] font-black bg-white px-2 py-0.5 rounded-full border border-black">Fresh</span>
              </button>
            </div>

            {/* Bottom info */}
            <div className="p-5 border-t-2 border-black bg-white space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-black text-white rounded-2xl text-xs font-black uppercase border-2 border-black"
              >
                <User className="w-4 h-4" />
                <span>My Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
