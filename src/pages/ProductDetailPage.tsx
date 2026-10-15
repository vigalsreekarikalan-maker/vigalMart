import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ApiService } from '../services/api';
import { Star, Heart, ShoppingCart, ShieldCheck, Truck, Check, RefreshCw, MessageSquare, Plus, ArrowRight } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, quantity: number, e?: React.MouseEvent) => void;
  onBuyNow: (product: Product, quantity: number, e?: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e?: React.MouseEvent) => void;
  isInWishlist: boolean;
  onSelectProduct: (product: Product) => void;
  onNavigate: (view: string, params?: any) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isInWishlist,
  onSelectProduct,
  onNavigate
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Reviews state
  const reviews = ApiService.getReviewsForProduct(product.id);
  const [newRating, setNewRating] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>('');
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);

  // Images list
  const images = [product.image, ...(product.additionalImages || [])];

  // Related products
  const relatedProducts = allProducts
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  // Bundle offer item
  const bundleItem = allProducts.find(p => p.id !== product.id && p.price < 3000) || allProducts[1];
  const bundleTotalPrice = product.price + (bundleItem ? bundleItem.price : 0);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    ApiService.addReview(product.id, newRating, newComment);
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-slate-500 flex items-center gap-2 flex-wrap">
        <button onClick={() => onNavigate('home')} className="hover:text-amber-700 font-medium">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('search', { category: product.category })} className="hover:text-amber-700 font-medium">{product.category}</button>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm">
        
        {/* LEFT: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Image View */}
          <div className="relative aspect-square w-full rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-lg shadow-md">
                {product.discountPercentage}% OFF
              </span>
            )}
            <button
              onClick={(e) => onToggleWishlist(product.id, e)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md ${
                isInWishlist ? 'bg-rose-50 text-rose-600' : 'bg-white text-slate-600 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-rose-600 text-rose-600' : ''}`} />
            </button>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === img ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CENTER: Details & Buying Info (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            {/* Brand & Category */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400 font-medium">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating Bar */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md font-bold text-xs gap-1">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-slate-950" />
              </div>
              <span className="text-xs text-slate-500 font-semibold">
                {product.reviewCount.toLocaleString()} Verified Customer Ratings & Reviews
              </span>
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-slate-400 line-through">
                      M.R.P: ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      You Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercentage}%)
                    </span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Inclusive of all taxes. Free doorstep delivery.</p>
            </div>

            {/* Delivery & Seller Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <Truck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{product.deliveryInfo}</h4>
                  <p className="text-[11px] text-slate-500">Ships directly from VIGALSHREE Fulfillment Center</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Sold by {product.sellerName || 'VigalTech Solutions'}</h4>
                  <p className="text-[11px] text-slate-500">7-Day Replacement Policy Guarantee</p>
                </div>
              </div>
            </div>

            {/* Key Features List */}
            <div className="space-y-2 mb-6">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Key Highlights</h3>
              <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BUYING ACTION CONTROLS */}
          <div className="pt-4 border-t border-slate-200 space-y-4">
            
            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center bg-slate-100 rounded-xl border border-slate-300 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black text-slate-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-700 font-bold">In Stock ({product.stock} units left)</span>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={(e) => onAddToCart(product, quantity, e)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 text-sm"
              >
                <ShoppingCart className="w-4 h-4 text-amber-400" />
                Add to Shopping Cart
              </button>

              <button
                onClick={(e) => onBuyNow(product, quantity, e)}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 px-6 rounded-xl transition-all shadow-md cursor-pointer active:scale-95 text-sm"
              >
                Buy Now (Proceed)
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Frequently Bought Together Bundle Section */}
      {bundleItem && (
        <section className="bg-amber-50/60 p-6 rounded-2xl border border-amber-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-amber-950">Frequently Bought Together</h2>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-sm">
                <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{product.name}</p>
                  <p className="text-xs font-black text-slate-900">₹{product.price}</p>
                </div>
              </div>

              <span className="text-xl font-bold text-amber-600">+</span>

              <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-amber-200 shadow-sm">
                <img src={bundleItem.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1">{bundleItem.name}</p>
                  <p className="text-xs font-black text-slate-900">₹{bundleItem.price}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs text-slate-500">Total Bundle Price:</p>
                <p className="text-xl font-black text-slate-900">₹{bundleTotalPrice.toLocaleString('en-IN')}</p>
              </div>

              <button
                onClick={() => {
                  onAddToCart(product, 1);
                  onAddToCart(bundleItem, 1);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-5 py-3 rounded-xl shadow-md cursor-pointer"
              >
                Add Both to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Tabs: Description / Specifications / Reviews */}
      <section className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-4 text-xs font-extrabold transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Product Overview & Description
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-xs font-extrabold transition-colors border-b-2 ${
              activeTab === 'specs'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-extrabold transition-colors border-b-2 ${
              activeTab === 'reviews'
                ? 'border-amber-500 text-amber-900 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Verified Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed max-w-4xl">
              <h3 className="font-bold text-slate-900 text-base">Detailed Description</h3>
              <p>{product.description}</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="p-3 font-bold text-slate-800 border-r border-slate-200 w-1/3">{key}</td>
                      <td className="p-3 text-slate-600">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Write Review Form */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 max-w-2xl">
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-amber-600" /> Write a Customer Review
                </h4>

                {reviewSubmitted && (
                  <div className="p-3 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl">
                    Thank you! Your review has been posted on vigalMart.
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Comment</label>
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your experience with this product..."
                      className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">{rev.userName}</span>
                        {rev.verifiedPurchase && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center text-amber-400 gap-0.5 my-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>

            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-extrabold text-slate-900">Related Products in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
                onAddToCart={(p, e) => onAddToCart(p, 1, e)}
                onBuyNow={(p, e) => onBuyNow(p, 1, e)}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
