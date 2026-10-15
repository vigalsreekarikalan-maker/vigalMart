import React from 'react';
import { CartItem, SavedForLaterItem, Product } from '../types';
import { Trash2, Bookmark, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  savedForLater: SavedForLaterItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onSaveForLater: (product: Product) => void;
  onMoveToCartFromSaved: (product: Product) => void;
  onProceedToCheckout: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  cart,
  savedForLater,
  onUpdateQuantity,
  onRemoveFromCart,
  onSaveForLater,
  onMoveToCartFromSaved,
  onProceedToCheckout,
  onSelectProduct,
  onNavigate
}) => {
  const itemsTotal = cart.reduce((sum, ci) => sum + ci.product.price * ci.quantity, 0);
  const originalTotal = cart.reduce((sum, ci) => sum + ci.product.originalPrice * ci.quantity, 0);
  const discountTotal = Math.max(0, originalTotal - itemsTotal);
  const deliveryFee = itemsTotal > 499 || itemsTotal === 0 ? 0 : 49;
  const tax = Math.round(itemsTotal * 0.05);
  const grandTotal = itemsTotal + deliveryFee + tax;

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your Shopping Cart is Empty</h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          Explore thousands of products with unbeatable deals on vigalMart and add items to your cart.
        </p>
        <button
          onClick={() => onNavigate('search')}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-8 py-3 rounded-xl transition-all shadow-md text-sm cursor-pointer"
        >
          Start Shopping Deals
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-6">Shopping Cart ({cart.length} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CART ITEMS LIST (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => onSelectProduct(product)}
                    className="w-20 h-20 rounded-2xl object-cover bg-slate-100 border border-slate-200 shrink-0 cursor-pointer"
                  />
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-bold text-sm text-slate-800 hover:text-amber-600 cursor-pointer line-clamp-2"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold mt-1">{product.deliveryInfo}</p>
                    <p className="text-xs font-black text-slate-900 mt-1">
                      ₹{product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Quantity & Action Controls */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Quantity Modifier */}
                  <div className="flex items-center bg-slate-100 rounded-xl border border-slate-300 overflow-hidden">
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                      className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-black text-slate-900">{quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                      className="px-2.5 py-1 text-slate-700 font-bold hover:bg-slate-200"
                    >
                      +
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSaveForLater(product)}
                      className="p-2 text-slate-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
                      title="Save for Later"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onRemoveFromCart(product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* SAVED FOR LATER SECTION */}
          {savedForLater.length > 0 && (
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">Saved for Later ({savedForLater.length})</h3>
              <div className="space-y-3">
                {savedForLater.map(({ product }) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</p>
                        <p className="text-xs font-black text-slate-900">₹{product.price}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onMoveToCartFromSaved(product)}
                      className="text-xs font-bold text-amber-700 hover:underline px-3 py-1 bg-amber-50 rounded-lg border border-amber-200"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ORDER SUMMARY SIDEBAR (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4 sticky top-28">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-100 pb-3">Order Summary</h2>

            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-slate-900 font-bold">₹{itemsTotal.toLocaleString('en-IN')}</span>
              </div>

              {discountTotal > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Product Discount Savings</span>
                  <span>- ₹{discountTotal.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Estimated Delivery Fee</span>
                <span>{deliveryFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between">
                <span>GST / Taxes (5%)</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-extrabold text-slate-900">Grand Total</span>
              <span className="text-2xl font-black text-slate-900">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={onProceedToCheckout}
              disabled={cart.length === 0}
              className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm cursor-pointer active:scale-95"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
              <p className="flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-emerald-600" /> FREE Delivery on orders above ₹499
              </p>
              <p className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Safe SSL Encrypted Purchase
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
