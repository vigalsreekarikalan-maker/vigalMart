import React from 'react';
import { ArrowUp, Sparkles, ShieldCheck, Truck, CreditCard, Headphones } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, params?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 mt-16 border-t border-slate-800">
      {/* Back to top banner */}
      <button
        onClick={scrollToTop}
        className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-bold py-3 transition-colors flex items-center justify-center gap-2 cursor-pointer border-b border-slate-800"
      >
        <span>Back to top</span>
        <ArrowUp className="w-4 h-4 text-amber-400" />
      </button>

      {/* Trust Badges Bar */}
      <div className="bg-slate-900/60 py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Free Express Shipping</h4>
              <p className="text-[11px] text-slate-400">On all orders over ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">100% Original Guarantee</h4>
              <p className="text-[11px] text-slate-400">Verified vigalMart sellers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Safe & Secure Checkout</h4>
              <p className="text-[11px] text-slate-400">COD, UPI, & Demo Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">24/7 Customer Help</h4>
              <p className="text-[11px] text-slate-400">Instant support resolution</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg font-extrabold text-sm">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="font-extrabold text-lg text-white tracking-tight">
              vigalMart<span className="text-amber-400">_MART</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            A complete e-commerce online marketplace built for capstone excellence. Shop everything from next-gen electronics to daily essentials.
          </p>
          <div className="text-xs text-slate-400 space-y-1">
            <p><strong className="text-slate-200">Customer Helpline:</strong> 1800-VIGAL-MART</p>
            <p><strong className="text-slate-200">Email:</strong> support@vigalMart.com</p>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">About vigalMart</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => onNavigate('home')} className="hover:text-amber-400 transition-colors">About Us</button></li>
            <li><button onClick={() => onNavigate('seller')} className="hover:text-amber-400 transition-colors">Sell on vigalMart</button></li>
            <li><button onClick={() => onNavigate('admin')} className="hover:text-amber-400 transition-colors">Admin Governance</button></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Careers & Innovations</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">vigalMart Cares Foundation</span></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Customer Service</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => onNavigate('account')} className="hover:text-amber-400 transition-colors">Your Account</button></li>
            <li><button onClick={() => onNavigate('orders')} className="hover:text-amber-400 transition-colors">Your Orders & Returns</button></li>
            <li><button onClick={() => onNavigate('cart')} className="hover:text-amber-400 transition-colors">Shipping Rates & Policies</button></li>
            <li><button onClick={() => onNavigate('wishlist')} className="hover:text-amber-400 transition-colors">Your Saved Wishlist</button></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Help & FAQs</span></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Policies & Terms</h3>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Terms & Conditions</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Return & Refund Policy</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">Security Standards</span></li>
            <li><span className="hover:text-amber-400 transition-colors cursor-pointer">IP & Trademark Notice</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-slate-900 py-6 border-t border-slate-800 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">
          © 2026 vigalMart. All rights reserved. | Official College Capstone E-Commerce Application.
        </p>
      </div>
    </footer>
  );
};
