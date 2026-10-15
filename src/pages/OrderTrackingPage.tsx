import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';
import { Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, Search, FileText } from 'lucide-react';

interface OrderTrackingPageProps {
  orders: Order[];
  onNavigate: (view: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orders, onNavigate }) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orders.filter(o =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.some(i => i.product.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const selectedOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const statusSteps: { status: OrderStatus; label: string }[] = [
    { status: 'PLACED', label: 'Order Placed' },
    { status: 'CONFIRMED', label: 'Confirmed' },
    { status: 'PROCESSING', label: 'Processing' },
    { status: 'SHIPPED', label: 'Shipped' },
    { status: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { status: 'DELIVERED', label: 'Delivered' }
  ];

  const getStepIndex = (status: OrderStatus) => {
    return statusSteps.findIndex(s => s.status === status);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Returns & Orders</h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Track packages, view order history, and download invoices on vigalMart          </p>
        </div>

        {/* Search Orders */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID or item..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">No Orders Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You haven't placed any orders on vigalMart yet.
          </p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs transition-colors"
          >
            Explore Deals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ORDERS LIST (4 cols) */}
          <div className="lg:col-span-4 space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedOrder?.id === order.id
                    ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-xs text-amber-900">{order.id}</span>
                  <span className="text-[10px] bg-slate-900 text-amber-400 font-extrabold px-2 py-0.5 rounded-md">
                    {order.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 line-clamp-1">
                  {order.items.map(i => i.product.name).join(', ')}
                </div>

                <div className="flex justify-between items-baseline pt-1 text-xs">
                  <span className="text-slate-400">{order.orderDate}</span>
                  <strong className="text-slate-900 font-black">₹{order.grandTotal}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* ORDER TRACKING DETAILED VIEW (8 cols) */}
          {selectedOrder && (
            <div className="lg:col-span-8 space-y-6">
              
              {/* Active Order Overview Card */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-sm">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-amber-700 tracking-wider">
                      Official Order Record
                    </span>
                    <h2 className="text-xl font-black text-slate-900 font-mono">{selectedOrder.id}</h2>
                    <p className="text-xs text-slate-500">Placed on {selectedOrder.orderDate}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Estimated Delivery:</p>
                    <p className="text-sm font-black text-emerald-700">{selectedOrder.estimatedDelivery}</p>
                  </div>
                </div>

                {/* VISUAL TIMELINE TRACKER */}
                <div className="space-y-4 py-2">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Shipment Progress Tracker</h3>

                  <div className="relative flex items-center justify-between py-4">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2" />
                    
                    {statusSteps.map(({ status, label }, index) => {
                      const activeIndex = getStepIndex(selectedOrder.status);
                      const isCompleted = index <= activeIndex;

                      return (
                        <div key={status} className="flex flex-col items-center gap-2 bg-white px-1">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                              isCompleted ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-200 text-slate-400'
                            }`}
                          >
                            {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                          </div>
                          <span className={`text-[10px] font-bold text-center hidden md:inline max-w-[70px] ${
                            isCompleted ? 'text-slate-900 font-extrabold' : 'text-slate-400'
                          }`}>
                            {label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Status History Logs */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-xs">
                  <h4 className="font-extrabold text-slate-900">Tracking Updates</h4>
                  <div className="space-y-1 text-slate-600">
                    {selectedOrder.statusHistory.map((h, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 border-b border-slate-200/50 pb-1 last:border-0">
                        <span>{h.description}</span>
                        <span className="text-[10px] text-slate-400 shrink-0 font-mono">{h.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">Ordered Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map(({ product, quantity, price }) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3">
                          <img src={product.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                          <div>
                            <p className="text-xs font-bold text-slate-900">{product.name}</p>
                            <p className="text-[11px] text-slate-500">Qty: {quantity} x ₹{price}</p>
                          </div>
                        </div>
                        <span className="font-extrabold text-xs text-slate-900">₹{price * quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping & Payment summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="font-bold text-slate-900">Delivery Address:</p>
                    <p className="text-slate-600">{selectedOrder.shippingAddress.fullName}</p>
                    <p className="text-slate-600">{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}</p>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <p className="font-bold text-slate-900">Payment Summary:</p>
                    <p className="text-slate-600">Method: {selectedOrder.paymentMethod}</p>
                    <p className="text-slate-900 font-black">Grand Total: ₹{selectedOrder.grandTotal}</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
