import React, { useState } from 'react';
import { User, Order, Address, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { User as UserIcon, Package, Heart, MapPin, Shield, Star, Settings, LogOut, ArrowRight, Store, Sparkles } from 'lucide-react';

interface AccountPageProps {
  currentUser: User;
  orders: Order[];
  wishlistProducts: Product[];
  addresses: Address[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  onNavigate: (view: string, params?: any) => void;
  onLogout: () => void;
  initialTab?: string;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  currentUser,
  orders,
  wishlistProducts,
  addresses,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onNavigate,
  onLogout,
  initialTab = 'dashboard'
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const pendingOrdersCount = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'DELIVERED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center border-2 border-amber-400 shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-2xl font-black text-white">{currentUser.name}</h1>
              <span className="text-[10px] bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-md uppercase">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentUser.email} • {currentUser.phone}</p>
          </div>
        </div>

        {/* Portal Shortcuts */}
        <div className="flex items-center gap-2">
          {currentUser.role === 'SELLER' && (
            <button
              onClick={() => onNavigate('seller')}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Store className="w-4 h-4" /> Go to Seller Dashboard
            </button>
          )}
          {currentUser.role === 'ADMIN' && (
            <button
              onClick={() => onNavigate('admin')}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" /> Go to Admin Portal
            </button>
          )}
          <button
            onClick={onLogout}
            className="bg-slate-800 hover:bg-rose-900/60 text-slate-300 hover:text-rose-300 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors border border-slate-700 flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* DASHBOARD STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigate('orders')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-1"
        >
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl w-fit">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{orders.length}</p>
          <p className="text-xs font-bold text-slate-500">Total Orders</p>
        </div>

        <div
          onClick={() => onNavigate('orders')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-1"
        >
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl w-fit">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{pendingOrdersCount}</p>
          <p className="text-xs font-bold text-slate-500">Pending Deliveries</p>
        </div>

        <div
          onClick={() => setActiveTab('wishlist')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-1"
        >
          <div className="p-2 bg-rose-100 text-rose-700 rounded-xl w-fit">
            <Heart className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{wishlistProducts.length}</p>
          <p className="text-xs font-bold text-slate-500">Wishlist Saved</p>
        </div>

        <div
          onClick={() => setActiveTab('addresses')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition-all space-y-1"
        >
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl w-fit">
            <MapPin className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{addresses.length}</p>
          <p className="text-xs font-bold text-slate-500">Saved Addresses</p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        {[
          { id: 'dashboard', label: 'Dashboard Overview' },
          { id: 'wishlist', label: `Saved Wishlist (${wishlistProducts.length})` },
          { id: 'addresses', label: 'Saved Addresses' },
          { id: 'settings', label: 'Account Settings' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-xs font-extrabold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      <div>
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Recent Order Activity</h2>
              <button
                onClick={() => onNavigate('orders')}
                className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
              >
                View All Orders <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                No active orders found.
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-mono font-black text-xs text-amber-900">{order.id}</p>
                      <p className="text-xs text-slate-500">{order.items.length} items • ₹{order.grandTotal}</p>
                    </div>
                    <button
                      onClick={() => onNavigate('orders')}
                      className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      Track Status ({order.status})
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-slate-900">Your Saved Wishlist ({wishlistProducts.length})</h2>
            {wishlistProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                <Heart className="w-10 h-10 text-rose-400 mx-auto" />
                <p className="text-xs font-bold text-slate-800">Your Wishlist is Empty</p>
                <button
                  onClick={() => onNavigate('search')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {wishlistProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                    onBuyNow={onBuyNow}
                    onToggleWishlist={onToggleWishlist}
                    isInWishlist={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="space-y-6">
            <h2 className="text-lg font-black text-slate-900">Saved Addresses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div key={addr.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs text-slate-900">{addr.fullName}</strong>
                    {addr.isDefault && <span className="text-[10px] bg-slate-900 text-amber-400 px-2 py-0.5 rounded-md font-bold">Default</span>}
                  </div>
                  <p className="text-xs text-slate-600">{addr.street}, {addr.city}, {addr.state} - {addr.zipCode}</p>
                  <p className="text-xs text-slate-500 font-semibold">Phone: {addr.phone}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 max-w-md space-y-4">
            <h2 className="text-lg font-black text-slate-900">Profile Settings</h2>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Name</label>
              <input type="text" readOnly value={currentUser.name} className="w-full text-xs p-2.5 bg-slate-100 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
              <input type="email" readOnly value={currentUser.email} className="w-full text-xs p-2.5 bg-slate-100 rounded-xl border border-slate-200 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Role</label>
              <input type="text" readOnly value={currentUser.role} className="w-full text-xs p-2.5 bg-slate-100 rounded-xl border border-slate-200 font-bold uppercase text-amber-800" />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
