import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Product, Category, FilterOptions } from '../types';
import { SlidersHorizontal, Filter, Star, Check, RotateCcw, X } from 'lucide-react';

interface SearchPageProps {
  products: Product[];
  categories: Category[];
  initialFilters?: FilterOptions;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onBuyNow: (product: Product, e: React.MouseEvent) => void;
  onToggleWishlist: (productId: string, e: React.MouseEvent) => void;
  wishlist: string[];
}

export const SearchPage: React.FC<SearchPageProps> = ({
  products,
  categories,
  initialFilters = {},
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlist
}) => {
  const init = initialFilters as FilterOptions;
  const [filters, setFilters] = useState<FilterOptions>({
    query: init.query || '',
    category: init.category || 'All',
    brand: init.brand || '',
    minPrice: init.minPrice ?? 0,
    maxPrice: init.maxPrice ?? 100000,
    minRating: init.minRating ?? 0,
    inStockOnly: init.inStockOnly ?? false,
    discountOnly: init.discountOnly ?? false,
    sortBy: init.sortBy || 'featured'
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach(p => { if (p.brand) brands.add(p.brand); });
    return Array.from(brands).sort();
  }, [products]);

  // Apply filtering
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.brand) {
      result = result.filter(p => p.brand.toLowerCase() === filters.brand!.toLowerCase());
    }

    if (filters.minPrice !== undefined) {
      result = result.filter(p => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(p => p.price <= filters.maxPrice!);
    }

    if (filters.minRating && filters.minRating > 0) {
      result = result.filter(p => p.rating >= filters.minRating!);
    }

    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock && p.stock > 0);
    }

    if (filters.discountOnly) {
      result = result.filter(p => p.discountPercentage > 0);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0));
        break;
      case 'best-selling':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [products, filters]);

  const resetFilters = () => {
    setFilters({
      query: '',
      category: 'All',
      brand: '',
      minPrice: 0,
      maxPrice: 100000,
      minRating: 0,
      inStockOnly: false,
      discountOnly: false,
      sortBy: 'featured'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            {filters.query
              ? `Search Results for "${filters.query}"`
              : filters.category && filters.category !== 'All'
              ? `Category: ${filters.category}`
              : 'All Products on vigalMart'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> matching products
          </p>
        </div>

        {/* Top Controls Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white text-slate-800 border border-slate-300 font-bold text-xs py-2 px-3 rounded-xl shadow-sm"
          >
            <Filter className="w-4 h-4 text-amber-600" /> Filters
          </button>

          {/* Sorting Selector */}
          <div className="flex items-center gap-2 bg-white border border-slate-300 px-3 py-1.5 rounded-xl shadow-sm">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="best-selling">Best Selling</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block space-y-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm h-fit sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-black text-sm text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Filters</span>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-slate-400 hover:text-amber-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Category</h3>
            <div className="space-y-1 max-h-48 overflow-y-auto text-xs font-semibold text-slate-700 pr-1">
              <button
                onClick={() => setFilters({ ...filters, category: 'All' })}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  filters.category === 'All' ? 'bg-amber-100 text-amber-900 font-extrabold' : 'hover:bg-slate-100'
                }`}
              >
                <span>All Categories</span>
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilters({ ...filters, category: cat.name })}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                    filters.category === cat.name ? 'bg-amber-100 text-amber-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Price Range (₹)</h3>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <span className="text-slate-400 text-xs font-bold">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice === 100000 ? '' : filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) || 100000 })}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          {/* Brand Filter */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Brand</h3>
            <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs text-slate-700">
              <button
                onClick={() => setFilters({ ...filters, brand: '' })}
                className={`w-full text-left px-2 py-1 rounded-md text-xs font-semibold ${
                  !filters.brand ? 'text-amber-700 font-extrabold' : 'text-slate-600'
                }`}
              >
                All Brands
              </button>
              {availableBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setFilters({ ...filters, brand: filters.brand === b ? '' : b })}
                  className={`w-full text-left px-2 py-1 rounded-md text-xs flex items-center justify-between ${
                    filters.brand === b ? 'bg-amber-100 text-amber-900 font-extrabold' : 'hover:bg-slate-100'
                  }`}
                >
                  <span>{b}</span>
                  {filters.brand === b && <Check className="w-3 h-3 text-amber-800" />}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Rating</h3>
            <div className="space-y-1.5">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  onClick={() => setFilters({ ...filters, minRating: filters.minRating === stars ? 0 : stars })}
                  className={`w-full text-left p-1.5 rounded-lg flex items-center gap-1 text-xs font-medium transition-colors ${
                    filters.minRating === stars ? 'bg-amber-100 text-amber-900 font-bold' : 'hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: stars }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-700 ml-1">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Switches */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={filters.discountOnly}
                onChange={(e) => setFilters({ ...filters, discountOnly: e.target.checked })}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>Discounted Items Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => setFilters({ ...filters, inStockOnly: e.target.checked })}
                className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4 my-6">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto text-xl font-black">
                ?
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">No matching products found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find any products matching your active filter criteria on vigalMart.
              </p>
              <button
                onClick={resetFilters}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl transition-colors text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
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
          )}
        </main>
      </div>

    </div>
  );
};
