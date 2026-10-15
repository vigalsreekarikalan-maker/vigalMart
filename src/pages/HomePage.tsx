import React from 'react';
import { BannerHero } from '../components/BannerHero';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import { Sparkles, Zap, Flame, Trophy, TrendingUp, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  wishlist: string[];
  onNavigate: (view: string, params?: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlist,
  onNavigate
}) => {
  const dealsOfDay = products.filter(p => p.isDealOfDay || p.discountPercentage >= 35).slice(0, 8);
  const bestSellers = products.filter(p => p.isBestSeller || p.rating >= 4.7).slice(0, 8);
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 8);
  const newArrivals = products.filter(p => p.isNewRelease || p.discountPercentage < 25).slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 space-y-12">
      {/* Hero Banner Carousel */}
      <BannerHero
        onShopNow={() => onNavigate('search')}
        onExploreDeals={() => onNavigate('search', { discountOnly: true })}
      />

      {/* Top Categories Grid Bar */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Explore Categories</h2>
              <p className="text-xs text-slate-500">Shop top deals across popular categories</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-extrabold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.slice(0, 10).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('search', { category: cat.name })}
              className="group relative bg-slate-50 hover:bg-amber-50 rounded-2xl p-4 border border-slate-200/80 hover:border-amber-400/80 transition-all duration-300 cursor-pointer flex flex-col items-center text-center shadow-sm hover:shadow-md"
            >
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md mb-3 group-hover:scale-105 transition-transform overflow-hidden">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-amber-900 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                {cat.itemCount}+ Items
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Today's Deals Flash Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500 text-slate-950 rounded-xl font-black animate-bounce">
              <Zap className="w-6 h-6 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white tracking-tight">Today's Deals</h2>
                <span className="bg-rose-600 text-white text-xs font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  FLASH SALE
                </span>
              </div>
              <p className="text-xs text-slate-400">Limited time discounts on top rated electronics & gear</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl">
            <span className="text-xs text-slate-400 font-semibold">Ends in:</span>
            <span className="text-sm font-mono font-black text-amber-400 tracking-wider">08h : 24m : 12s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {dealsOfDay.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Best Sellers Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl font-bold border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Best Sellers on vigalMart</h2>
              <p className="text-xs text-slate-500">Most popular products chosen by thousands of shoppers</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search', { sortBy: 'best-selling' })}
            className="text-xs font-extrabold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
          >
            See All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured Banner Showcase */}
      <section className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-8 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-xl">
          <span className="bg-slate-950 text-amber-400 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            VERIFIED MARKTPLACE
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight">
            Original Products, Fast Delivery & 100% Buyer Protection
          </h2>
          <p className="text-slate-900 text-sm font-semibold">
            Every product on vigalMart undergoes rigorous quality assurance before dispatch.
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="mt-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 text-sm cursor-pointer"
          >
            Start Shopping Now
          </button>
        </div>
        <div className="relative z-10">
          <ShieldCheck className="w-44 h-44 text-slate-950/20 stroke-[1]" />
        </div>
      </section>

      {/* Trending & Recommended Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-rose-500/10 text-rose-600 rounded-xl font-bold border border-rose-500/20">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Trending Now</h2>
              <p className="text-xs text-slate-500">Products rapidly gaining popularity this week</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('search')}
            className="text-xs font-extrabold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
              onToggleWishlist={onToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
