import React, { useState } from 'react';
import { User, Product, Order, Category } from '../types';
import { ApiService } from '../services/api';
import {
  Shield,
  Search,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  categories: Category[];
  users: User[];
  onRefreshData: () => void;
  onNavigate: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  categories,
  users,
  onRefreshData,
  onNavigate
}) => {
  const adminStats = ApiService.getAdminStats();

  const [activeTab, setActiveTab] = useState<
    'users' | 'products' | 'orders' | 'reports'
  >('users');

  const [searchQuery, setSearchQuery] = useState('');

  const handleUserAction = (
    userId: string,
    action: 'activate' | 'deactivate' | 'suspend'
  ) => {
    ApiService.updateUserStatus(userId, action);
    onRefreshData();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ADMIN HEADER */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-indigo-900/50">
        <div className="flex items-center gap-4">

          <div className="p-3 bg-indigo-500 text-slate-950 rounded-2xl font-black">
            <Shield className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] bg-indigo-500 text-slate-950 font-black px-2.5 py-0.5 rounded-full uppercase">
              PLATFORM GOVERNANCE PORTAL
            </span>

            <h1 className="text-2xl font-black text-white tracking-tight mt-1">
              vigalMart Master Admin Panel
            </h1>

            <p className="text-xs text-slate-400">
              System user controls, merchant approvals, product catalog audit,
              and sales analytics
            </p>
          </div>

        </div>
      </div>

      {/* ADMIN STATS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">Total Users</p>
          <p className="text-2xl font-black text-slate-900">
            {adminStats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">
            Verified Sellers
          </p>
          <p className="text-2xl font-black text-slate-900">
            {adminStats.totalSellers}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">
            Active Products
          </p>
          <p className="text-2xl font-black text-slate-900">
            {adminStats.totalProducts}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">
            Total Orders
          </p>
          <p className="text-2xl font-black text-slate-900">
            {adminStats.totalOrders}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-500">
            Gross Platform Revenue
          </p>

          <p className="text-2xl font-black text-emerald-700">
            ₹{adminStats.revenue.toLocaleString('en-IN')}
          </p>
        </div>

      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 gap-2">

        <button
          onClick={() => setActiveTab('users')}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'users'
              ? 'border-indigo-500 text-indigo-900 bg-white'
              : 'border-transparent text-slate-500'
          }`}
        >
          Manage Users ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'products'
              ? 'border-indigo-500 text-indigo-900 bg-white'
              : 'border-transparent text-slate-500'
          }`}
        >
          Product Catalog & Approvals ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-6 py-3 text-xs font-extrabold transition-colors border-b-2 ${
            activeTab === 'orders'
              ? 'border-indigo-500 text-indigo-900 bg-white'
              : 'border-transparent text-slate-500'
          }`}
        >
          All System Orders ({orders.length})
        </button>

      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">

          <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">

            <div className="relative max-w-sm w-full">

              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />

            </div>

          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full text-xs text-left">

                <thead className="bg-slate-50 text-slate-700 font-extrabold uppercase border-b border-slate-200">

                  <tr>
                    <th className="p-4">User Details</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredUsers.map((u) => (

                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      <td className="p-4">
                        <div className="font-bold text-slate-900">
                          {u.name}
                        </div>

                        <div className="text-[11px] text-slate-500">
                          {u.email}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="font-extrabold text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md uppercase">
                          {u.role}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-slate-600">
                        {u.phone || 'N/A'}
                      </td>

                      <td className="p-4">
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md">
                          ACTIVE
                        </span>
                      </td>

                      <td className="p-4 text-right">

                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              handleUserAction(u.id, 'deactivate')
                            }
                            className="px-2.5 py-1 text-[10px] font-extrabold bg-amber-100 text-amber-900 rounded-lg hover:bg-amber-200"
                          >
                            Deactivate
                          </button>

                          <button
                            onClick={() =>
                              handleUserAction(u.id, 'suspend')
                            }
                            className="px-2.5 py-1 text-[10px] font-extrabold bg-rose-100 text-rose-900 rounded-lg hover:bg-rose-200"
                          >
                            Suspend
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

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">

          <h3 className="text-base font-black text-slate-900">
            Platform Product Catalog
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

            {products.slice(0, 12).map((p) => (

              <div
                key={p.id}
                className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3"
              >

                <img
                  src={p.image}
                  alt=""
                  className="w-12 h-12 rounded-xl object-cover"
                />

                <div className="flex-1 min-w-0">

                  <p className="font-bold text-xs text-slate-900 truncate">
                    {p.name}
                  </p>

                  <p className="text-[10px] text-slate-500">
                    {p.category} • ₹{p.price}
                  </p>

                  <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded">
                    APPROVED
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

      {/* ORDERS TAB */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">

          <h3 className="text-base font-black text-slate-900">
            System Order Audit Log
          </h3>

          <div className="space-y-2">

            {orders.map((o) => (

              <div
                key={o.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
              >

                <div>

                  <span className="font-mono font-bold text-slate-900">
                    {o.id}
                  </span>

                  <span className="text-slate-500 ml-2">
                    by {o.userName}
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="font-black text-slate-900">
                    ₹{o.grandTotal}
                  </span>

                  <select
                    value={String(o.status).toUpperCase()}
                    onChange={async (e) => {

                      const newStatus = e.target.value;

                      try {

                        const response = await fetch(
                          `/api/orders/${o.id}/status`,
                          {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              status: newStatus,
                            }),
                          }
                        );

                        if (response.ok) {
                          onRefreshData();
                        } else {
                          alert('Failed to update order status');
                        }

                      } catch (error) {

                        console.error(
                          'Order status update failed:',
                          error
                        );

                        alert(
                          'Could not connect to the server'
                        );

                      }

                    }}
                    className="bg-slate-900 text-amber-400 font-bold px-2 py-1 rounded text-[10px]"
                  >

                    <option value="PENDING">
                      PENDING
                    </option>

                    <option value="PROCESSING">
                      PROCESSING
                    </option>

                    <option value="SHIPPED">
                      SHIPPED
                    </option>

                    <option value="DELIVERED">
                      DELIVERED
                    </option>

                    <option value="CANCELLED">
                      CANCELLED
                    </option>

                  </select>

                </div>

              </div>

            ))}

          </div>

        </div>
      )}

    </div>
  );
};