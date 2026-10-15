import React, { useState } from 'react';
import { Product, Order, OrderStatus, Category } from '../types';
import { ApiService } from '../services/api';
import { Store, Plus, Edit, Trash2, Package, DollarSign, ShoppingCart, AlertTriangle, Search, CheckCircle2, X } from 'lucide-react';

interface SellerDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  onRefreshProducts: () => void;
  onNavigate: (view: string) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  products,
  orders,
  categories,
  onRefreshProducts,
  onNavigate
}) => {
  const sellerStats = ApiService.getSellerStats('seller-1');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'add'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Add/Edit product form state
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('VigalTech');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState(1999);
  const [originalPrice, setOriginalPrice] = useState(2999);
  const [stock, setStock] = useState(25);
  const [sku, setSku] = useState('VGM-NEW-01');
  const [description, setDescription] = useState('High quality official product on vigalMart.');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80');

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const discountPercentage = Math.round(((originalPrice - price) / originalPrice) * 100);

    ApiService.saveProduct({
      id: editingProduct ? editingProduct.id : undefined,
      name,
      brand,
      category,
      price: Number(price),
      originalPrice: Number(originalPrice),
      discountPercentage: Math.max(0, discountPercentage),
      stock: Number(stock),
      inStock: Number(stock) > 0,
      sku,
      description,
      image,
      sellerId: 'seller-1',
      sellerName: 'VigalTech Solutions',
      approved: true
    });

    onRefreshProducts();
    setEditingProduct(null);
    setActiveTab('products');
    resetForm();
  };

  const handleEditClick = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setBrand(p.brand);
    setCategory(p.category);
    setPrice(p.price);
    setOriginalPrice(p.originalPrice);
    setStock(p.stock);
    setSku(p.sku);
    setDescription(p.description);
    setImage(p.image);
    setActiveTab('add');
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to delete this product listing from vigalMart?')) {
      ApiService.deleteProduct(id);
      onRefreshProducts();
    }
  };

  const resetForm = () => {
    setName('');
    setPrice(1999);
    setOriginalPrice(2999);
    setStock(25);
    setSku(`VGM-${Math.floor(Math.random() * 9000 + 1000)}`);
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      ApiService.updateOrderStatus(orderId, order, newStatus);
      onRefreshProducts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Seller Portal Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-emerald-900/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500 text-slate-950 rounded-2xl font-black">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase">
              SELLER PARTNER PORTAL
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight mt-1">VigalTech Solutions Dashboard</h1>
            <p className="text-xs text-slate-400">Manage products, pricing, stock inventory, and buyer order dispatches</p>
          </div>
        </div>

        <button
          onClick={() => { setEditingProduct(null); resetForm(); setActiveTab('add'); }}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 text-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" /> Add New Product
        </button>
      </div>

      {/* SELLER STATS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Total Products</p>
          <p className="text-2xl font-black text-slate-900">{sellerStats.totalProducts}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Total Orders</p>
          <p className="text-2xl font-black text-slate-900">{sellerStats.totalOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Total Revenue</p>
          <p className="text-2xl font-black text-emerald-700">₹{sellerStats.revenue.toLocaleString('en-IN')}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Pending Orders</p>
          <p className="text-2xl font-black text-amber-600">{sellerStats.pendingOrders}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Low Stock Alert</p>
          <p className="text-2xl font-black text-rose-600">{sellerStats.lowStockItems}</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'products' ? 'border-emerald-500 text-emerald-900 bg-white' : 'border-transparent text-slate-500'
          }`}
        >
          Product Catalog & Inventory ({filteredProducts.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'orders' ? 'border-emerald-500 text-emerald-900 bg-white' : 'border-transparent text-slate-500'
          }`}
        >
          Seller Dispatches & Orders ({orders.length})
        </button>

        <button
          onClick={() => { setEditingProduct(null); resetForm(); setActiveTab('add'); }}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'add' ? 'border-emerald-500 text-emerald-900 bg-white' : 'border-transparent text-slate-500'
          }`}
        >
          {editingProduct ? 'Edit Product Listing' : '+ Add Product'}
        </button>
      </div>

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title or SKU..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-4">Product Details</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Selling Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-slate-100" />
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{p.name}</p>
                            <p className="text-[10px] text-slate-400">{p.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-slate-600 font-semibold">{p.sku}</td>
                      <td className="p-4 font-semibold text-slate-700">{p.category}</td>
                      <td className="p-4 font-black text-slate-900">₹{p.price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          p.stock < 10 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(p)}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg"
                            title="Edit Listing"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(p.id)}
                            className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden p-6 space-y-4">
            <h3 className="text-base font-black text-slate-900">Incoming Buyer Orders</h3>
            <div className="space-y-3">
              {orders.map((order) => (
                <div key={order.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-xs text-emerald-900">{order.id}</span>
                      <span className="text-[10px] bg-slate-900 text-amber-400 font-extrabold px-2 py-0.5 rounded-md">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">Buyer: {order.userName} ({order.userEmail})</p>
                    <p className="text-xs font-bold text-slate-900 mt-0.5">Total: ₹{order.grandTotal}</p>
                  </div>

                  {/* Status Updater */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-500">Update Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                      className="bg-white text-xs font-bold p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="PLACED">PLACED</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="PROCESSING">PROCESSING</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT PRODUCT TAB */}
      {activeTab === 'add' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <h2 className="text-lg font-black text-slate-900">
            {editingProduct ? `Edit Product: ${editingProduct.name}` : 'Create New Product Listing'}
          </h2>

          <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1">Product Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VigalPro Wireless Headphones"
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">Brand Name</label>
                <input
                  required
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block mb-1">Selling Price (₹)</label>
                <input
                  required
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1">M.R.P Price (₹)</label>
                <input
                  required
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1">Stock Quantity</label>
                <input
                  required
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1">SKU Reference</label>
                <input
                  required
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block mb-1">Image URL</label>
                <input
                  required
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Product Description</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-xl transition-colors"
              >
                {editingProduct ? 'Update Product Listing' : 'Publish Product to vigalMart'}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
