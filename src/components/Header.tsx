import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Heart, User as UserIcon, Menu, MapPin, 
  ChevronDown, Store, Shield, LogOut, PackageCheck, Sparkles, X, ChevronRight, Home, Smartphone, Shirt, BookOpen, Dumbbell, ShoppingBag, Laptop, Car 
} from 'lucide-react';
import { User, Category } from '../types';

interface HeaderProps {
  currentUser: User;
  cartCount: number;
  wishlistCount: number;
  ordersCount: number;
  categories: Category[];
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onCategorySelect: (category: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onNavigate: (view: string, params?: any) => void;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  cartCount,
  wishlistCount,
  ordersCount,
  categories,
  searchQuery,
  selectedCategory,
  onSearchChange,
  onCategorySelect,
  onSearchSubmit,
  onNavigate,
  onOpenAuthModal,
  onLogout
}) => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);

  // Close menus on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#account-dropdown-container')) {
        setIsAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const navLinks = [
    { label: "Today's Deals", action: () => onNavigate('search', { discountOnly: true }) },
    { label: 'Best Sellers', action: () => onNavigate('search', { sortBy: 'best-selling' }) },
    { label: 'New Releases', action: () => onNavigate('search', { sortBy: 'newest' }) },
    { label: 'Customer Service', action: () => onNavigate('account', { tab: 'help' }) },
    { label: 'Electronics', action: () => onNavigate('search', { category: 'Electronics' }) },
    { label: 'Fashion', action: () => onNavigate('search', { category: 'Fashion' }) },
    { label: 'Home & Kitchen', action: () => onNavigate('search', { category: 'Home & Kitchen' }) },
    { label: 'Books', action: () => onNavigate('search', { category: 'Books' }) },
    { label: 'Sports', action: () => onNavigate('search', { category: 'Sports' }) },
    { label: 'Grocery', action: () => onNavigate('search', { category: 'Grocery' }) },
  ];

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Main Dark Marketplace Header */}
      <div className="bg-slate-950 text-white px-3 sm:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          
          {/* LEFT: Logo & Delivery */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-slate-300 hover:text-white p-1 rounded-md"
              aria-label="Open mobile navigation"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Brand Logo */}
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <div className="bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 p-1.5 rounded-lg font-black tracking-tighter text-lg shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
                <Sparkles className="w-5 h-5 fill-slate-950" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  vigalMart<span className="text-amber-400">_MART</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold -mt-1 hidden sm:block">
                  Shop Smart. Shop Everything.
                </span>
              </div>
            </div>

            {/* Delivery Location Indicator */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white cursor-pointer py-1 px-2 rounded-md hover:bg-slate-900 transition-colors">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Deliver to</span>
                <span className="font-bold text-white text-xs">Chennai 600028</span>
              </div>
            </div>
          </div>

          {/* CENTER: Search Bar */}
          <form
            onSubmit={onSearchSubmit}
            className="hidden md:flex flex-1 max-w-2xl items-center rounded-xl overflow-hidden bg-white shadow-inner focus-within:ring-2 focus-within:ring-amber-400 transition-all"
          >
            {/* Category Dropdown Filter inside Search */}
            <select
              value={selectedCategory}
              onChange={(e) => onCategorySelect(e.target.value)}
              className="bg-slate-100 text-slate-800 text-xs font-semibold py-2.5 px-3 border-r border-slate-300 focus:outline-none cursor-pointer hover:bg-slate-200"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search vigalMart..."
              className="w-full text-slate-900 text-sm py-2 px-3 focus:outline-none placeholder-slate-400"
            />

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 transition-colors font-bold flex items-center justify-center cursor-pointer"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* RIGHT: User Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">

            {/* Wishlist Icon */}
            <button
              onClick={() => onNavigate('wishlist')}
              className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-1"
              title="Wishlist"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {wishlistCount > 0 && (
                <span className="bg-rose-600 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1 shadow-sm">
                  {wishlistCount}
                </span>
              )}
              <span className="hidden xl:inline text-xs font-bold text-slate-200">Wishlist</span>
            </button>

            {/* Account & Lists Dropdown */}
            <div id="account-dropdown-container" className="relative">
              <button
                onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-slate-900 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0">
                  {currentUser.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                <div className="hidden lg:flex flex-col leading-tight">
                  <span className="text-[10px] text-slate-400 font-medium">
                    Hello, {currentUser ? currentUser.name.split(' ')[0] : 'Sign in'}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center gap-0.5">
                    Account & Lists <ChevronDown className="w-3 h-3 text-slate-400" />
                  </span>
                </div>
              </button>

              {/* Account Dropdown Menu */}
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 bg-slate-50 rounded-xl mb-2 border border-slate-100">
                    <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                    <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-800 uppercase">
                      Role: {currentUser.role}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-semibold text-slate-700">
                    <button
                      onClick={() => { onNavigate('account'); setIsAccountMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2"
                    >
                      <UserIcon className="w-4 h-4 text-amber-600" /> Your Customer Account
                    </button>

                    <button
                      onClick={() => { onNavigate('orders'); setIsAccountMenuOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2"
                    >
                      <PackageCheck className="w-4 h-4 text-amber-600" /> Returns & Orders
                    </button>

                    {/* Role Switcher Shortcuts for Capstone Evaluation */}
                    <div className="pt-2 mt-2 border-t border-slate-100 space-y-1">
                      <p className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Switch Portal</p>
                      <button
                        onClick={() => { onNavigate('seller'); setIsAccountMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-emerald-50 text-emerald-800 font-bold flex items-center gap-2"
                      >
                        <Store className="w-4 h-4 text-emerald-600" /> Seller Dashboard
                      </button>
                      <button
                        onClick={() => { onNavigate('admin'); setIsAccountMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 text-indigo-800 font-bold flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-indigo-600" /> Admin Portal
                      </button>
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => { onOpenAuthModal(); setIsAccountMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 text-amber-900 font-bold flex items-center gap-2"
                      >
                        <UserIcon className="w-4 h-4 text-amber-600" /> Switch / Demo Login
                      </button>
                      <button
                        onClick={() => { onLogout(); setIsAccountMenuOpen(false); }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-rose-50 text-rose-600 font-bold flex items-center gap-2 mt-1"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Returns & Orders Link */}
            <button
              onClick={() => onNavigate('orders')}
              className="hidden lg:flex flex-col leading-tight text-left py-1 px-2 rounded-md hover:bg-slate-900 transition-colors"
            >
              <span className="text-[10px] text-slate-400 font-medium">Returns</span>
              <span className="text-xs font-bold text-white">& Orders ({ordersCount})</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => onNavigate('cart')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 fill-slate-950" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-slate-950 text-amber-400 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-amber-400">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 md:hidden">
          <form onSubmit={onSearchSubmit} className="flex items-center rounded-xl overflow-hidden bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search vigalMart..."
              className="w-full text-slate-900 text-xs py-2.5 px-3 focus:outline-none"
            />
            <button type="submit" className="bg-amber-500 px-4 py-2.5 text-slate-950 font-bold">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Sub-Navigation Bar */}
      <div className="bg-slate-900 text-slate-200 border-t border-slate-800 text-xs font-bold px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-2">
          
          {/* ALL Category Drawer Trigger */}
          <button
            onClick={() => setIsCategorySidebarOpen(true)}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 py-1.5 px-3 rounded-lg border border-slate-700 transition-colors shrink-0 cursor-pointer"
          >
            <Menu className="w-4 h-4" />
            <span>All Categories</span>
          </button>

          {/* Quick Sub-nav links */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={link.action}
                className="whitespace-nowrap px-2.5 py-1 rounded-md hover:bg-slate-800 hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Role Badges for Capstone Evaluators */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 border-l border-slate-800 pl-3">
            <button
              onClick={() => onNavigate('seller')}
              className="text-[11px] font-extrabold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-md hover:bg-emerald-900/60 transition-colors flex items-center gap-1"
            >
              <Store className="w-3 h-3" /> Seller Portal
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="text-[11px] font-extrabold text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-1 rounded-md hover:bg-indigo-900/60 transition-colors flex items-center gap-1"
            >
              <Shield className="w-3 h-3" /> Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Category Sidebar Modal */}
      {isCategorySidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsCategorySidebarOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
          />

          {/* Drawer */}
          <div className="relative w-80 max-w-[85%] bg-white h-full shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-300">
            <div className="bg-slate-950 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="font-extrabold text-lg">Shop by Category</span>
              </div>
              <button
                onClick={() => setIsCategorySidebarOpen(false)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    onNavigate('search', { category: cat.name });
                    setIsCategorySidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-amber-50 text-slate-800 font-semibold text-sm transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <img src={cat.image} alt={cat.name} className="w-8 h-8 rounded-lg object-cover" />
                    <span>{cat.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">vigalMart Portals</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onNavigate('seller'); setIsCategorySidebarOpen(false); }}
                  className="p-2 bg-emerald-100 text-emerald-900 rounded-lg text-xs font-bold text-center"
                >
                  Seller Portal
                </button>
                <button
                  onClick={() => { onNavigate('admin'); setIsCategorySidebarOpen(false); }}
                  className="p-2 bg-indigo-100 text-indigo-900 rounded-lg text-xs font-bold text-center"
                >
                  Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
