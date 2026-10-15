import React from 'react';
import { Star, Heart, ShoppingCart, Zap, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  isInWishlist: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isInWishlist
}) => {
  return (
    <div
      onClick={() => onSelect(product)}
      className="group bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.discountPercentage > 0 && (
            <span className="bg-rose-600 text-white font-bold text-xs px-2 py-0.5 rounded-md shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isDealOfDay && (
            <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" /> DEAL
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => onToggleWishlist(product.id, e)}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all duration-200 shadow-sm z-10 ${
            isInWishlist
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              : 'bg-white/80 backdrop-blur-md text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand */}
          <div className="text-xs font-semibold text-amber-700 tracking-wide uppercase mb-1">
            {product.brand}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 group-hover:text-amber-600 transition-colors mb-2 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-900 ml-1">{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-2 flex-wrap">
            <span className="text-lg font-extrabold text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                M.R.P: ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Delivery & Stock Tag */}
          <div className="text-[11px] text-slate-600 space-y-0.5 mb-3">
            <p className="font-medium text-emerald-700 flex items-center gap-1">
              <Check className="w-3 h-3 stroke-[3]" /> {product.deliveryInfo}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold py-2 px-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 active:scale-95"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </button>
          <button
            onClick={(e) => onBuyNow(product, e)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold py-2 px-2 rounded-lg transition-colors shadow-sm active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
