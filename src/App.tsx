/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ToastContainer, ToastMessage } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { AccountPage } from './pages/AccountPage';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';

import { Product, Category, Order, User, Address, CartItem, SavedForLaterItem, FilterOptions } from './types';
import { ApiService } from './services/api';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});

  // Core App Data States
  const [currentUser, setCurrentUser] = useState<User>(ApiService.getCurrentUser());
  const [products, setProducts] = useState<Product[]>(ApiService.getProducts());
  const [categories] = useState<Category[]>(ApiService.getCategories());
  const [cart, setCart] = useState<CartItem[]>(ApiService.getCart());
  const [savedForLater, setSavedForLater] = useState<SavedForLaterItem[]>(ApiService.getSavedForLater());
  const [wishlist, setWishlist] = useState<string[]>(ApiService.getWishlist());
  const [orders, setOrders] = useState<Order[]>(ApiService.getOrders(currentUser.id));
  const [addresses, setAddresses] = useState<Address[]>(ApiService.getAddresses());
  const [users, setUsers] = useState<User[]>(ApiService.getAllUsers());

  // Search & Filters Header State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Active selected product for ProductDetailPage
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Toasts
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Sync state listeners
  useEffect(() => {
    const syncCart = () => setCart(ApiService.getCart());
    const syncWishlist = () => setWishlist(ApiService.getWishlist());
    const syncOrders = () => setOrders(ApiService.getOrders(currentUser.id));
    const syncProducts = () => setProducts(ApiService.getProducts());
    const syncAuth = () => {
      const user = ApiService.getCurrentUser();
      setCurrentUser(user);
      setOrders(ApiService.getOrders(user.id));
    };

    window.addEventListener('vgm_cart_changed', syncCart);
    window.addEventListener('vgm_wishlist_changed', syncWishlist);
    window.addEventListener('vgm_orders_changed', syncOrders);
    window.addEventListener('vgm_products_changed', syncProducts);
    window.addEventListener('vgm_auth_changed', syncAuth);

    return () => {
      window.removeEventListener('vgm_cart_changed', syncCart);
      window.removeEventListener('vgm_wishlist_changed', syncWishlist);
      window.removeEventListener('vgm_orders_changed', syncOrders);
      window.removeEventListener('vgm_products_changed', syncProducts);
      window.removeEventListener('vgm_auth_changed', syncAuth);
    };
  }, [currentUser.id]);

  // Handle Navigation
  const handleNavigate = (view: string, params: any = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search Submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNavigate('search', { query: searchQuery, category: selectedCategory });
  };

  // Select Product
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    handleNavigate('product-detail');
  };

  // Cart actions
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    ApiService.addToCart(product, quantity);
    addToast(`Added "${product.name}" to cart!`);
  };

  const handleBuyNow = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    ApiService.addToCart(product, quantity);
    handleNavigate('checkout');
  };

  const handleToggleWishlist = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const added = ApiService.toggleWishlist(productId);
    if (added) {
      addToast('Added to Wishlist!', 'info');
    } else {
      addToast('Removed from Wishlist', 'info');
    }
  };

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Feedback */}
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* Header */}
      <Header
        currentUser={currentUser}
        cartCount={cart.reduce((sum, ci) => sum + ci.quantity, 0)}
        wishlistCount={wishlist.length}
        ordersCount={orders.length}
        categories={categories}
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchQuery}
        onCategorySelect={setSelectedCategory}
        onSearchSubmit={handleSearchSubmit}
        onNavigate={handleNavigate}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={() => {
          const defaultUser: User = {
            id: 'user-buyer-1',
            name: 'Aarav Sharma',
            email: 'buyer@vigalMart.com',
            role: 'BUYER'
          };
          ApiService.setCurrentUser(defaultUser);
          addToast('Signed out. Reset to Guest Buyer.');
        }}
      />

      {/* Main Dynamic View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomePage
            products={products}
            categories={categories}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
            onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'search' && (
          <SearchPage
            products={products}
            categories={categories}
            initialFilters={viewParams}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
            onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {currentView === 'product-detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            allProducts={products}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={wishlist.includes(selectedProduct.id)}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            savedForLater={savedForLater}
            onUpdateQuantity={(pid, q) => ApiService.updateCartQuantity(pid, q)}
            onRemoveFromCart={(pid) => ApiService.removeFromCart(pid)}
            onSaveForLater={(p) => ApiService.saveForLater(p)}
            onMoveToCartFromSaved={(p) => ApiService.moveToCartFromSaved(p)}
            onProceedToCheckout={() => handleNavigate('checkout')}
            onSelectProduct={handleSelectProduct}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutPage
            cart={cart}
            addresses={addresses}
            onOrderPlaced={(order) => {
              addToast(`Order ${order.id} placed successfully!`);
            }}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'orders' && (
          <OrderTrackingPage
            orders={orders}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'account' && (
          <AccountPage
            currentUser={currentUser}
            orders={orders}
            wishlistProducts={wishlistProducts}
            addresses={addresses}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
            onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onLogout={() => {
              ApiService.setCurrentUser({
                id: 'user-buyer-1',
                name: 'Aarav Sharma',
                email: 'buyer@vigalMart.com',
                role: 'BUYER'
              });
            }}
            initialTab={viewParams.tab || 'dashboard'}
          />
        )}

        {currentView === 'wishlist' && (
          <AccountPage
            currentUser={currentUser}
            orders={orders}
            wishlistProducts={wishlistProducts}
            addresses={addresses}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
            onBuyNow={(p, e) => handleBuyNow(p, 1, e)}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onLogout={() => {}}
            initialTab="wishlist"
          />
        )}

        {currentView === 'seller' && (
          <SellerDashboard
            products={products}
            orders={orders}
            categories={categories}
            onRefreshProducts={() => setProducts(ApiService.getProducts())}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard
            products={products}
            orders={orders}
            categories={categories}
            users={users}
            onRefreshData={() => {
              setProducts(ApiService.getProducts());
              setUsers(ApiService.getAllUsers());
            }}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          addToast(`Logged in as ${user.name} (${user.role})`);
          if (user.role === 'SELLER') handleNavigate('seller');
          else if (user.role === 'ADMIN') handleNavigate('admin');
        }}
      />
    </div>
  );
}
