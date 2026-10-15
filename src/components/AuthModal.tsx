import React, { useState } from 'react';
import { X, UserCheck, Store, Shield, Sparkles, Mail, Lock, User as UserIcon } from 'lucide-react';
import { User, UserRole } from '../types';
import { ApiService } from '../services/api';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('BUYER');

  if (!isOpen) return null;

  const handleDemoLogin = (selectedRole: UserRole) => {
    let demoUser: User;
    if (selectedRole === 'ADMIN') {
      demoUser = {
        id: 'user-admin-1',
        name: 'System Admin',
        email: 'admin@vigalMart.com',
        role: 'ADMIN',
        phone: '+91 99000 00000',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      };
    } else if (selectedRole === 'SELLER') {
      demoUser = {
        id: 'user-seller-1',
        name: 'VigalTech Solutions',
        email: 'seller@vigalMart.com',
        role: 'SELLER',
        phone: '+91 98765 11223',
        sellerBusinessName: 'VigalTech Solutions Private Limited',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
      };
    } else {
      demoUser = {
        id: 'user-buyer-1',
        name: 'Aarav Sharma',
        email: 'buyer@vigalMart.com',
        role: 'BUYER',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };
    }

    ApiService.setCurrentUser(demoUser);
    onLoginSuccess(demoUser);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name || (role === 'ADMIN' ? 'Admin User' : role === 'SELLER' ? 'Partner Seller' : 'Valued Customer'),
      email: email || `${role.toLowerCase()}@vigalMart.com`,
      role
    };

    ApiService.setCurrentUser(newUser);
    onLoginSuccess(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm animate-in fade-in" />

      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-200 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded-lg font-black text-sm">
              <Sparkles className="w-4 h-4 fill-slate-950" />
            </div>
            <span className="font-extrabold text-lg text-white">vigalMart</span>
          </div>

          <h2 className="text-xl font-extrabold text-white">
            {isRegister ? 'Create vigalMart Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Access buyer orders, seller listings, and administrative tools.
          </p>
        </div>

        {/* Demo Quick Login Buttons */}
        <div className="p-6 bg-amber-50/60 border-b border-amber-100">
          <p className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" /> 1-Click Demo Login (For Evaluation)
          </p>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('BUYER')}
              className="p-2.5 bg-white hover:bg-amber-100/80 border border-amber-200 rounded-xl text-left transition-colors flex flex-col items-center justify-center gap-1 text-center cursor-pointer shadow-sm active:scale-95"
            >
              <UserCheck className="w-5 h-5 text-amber-600" />
              <span className="text-[11px] font-extrabold text-slate-900 leading-tight">Buyer Role</span>
            </button>

            <button
              onClick={() => handleDemoLogin('SELLER')}
              className="p-2.5 bg-white hover:bg-emerald-100/80 border border-emerald-200 rounded-xl text-left transition-colors flex flex-col items-center justify-center gap-1 text-center cursor-pointer shadow-sm active:scale-95"
            >
              <Store className="w-5 h-5 text-emerald-600" />
              <span className="text-[11px] font-extrabold text-slate-900 leading-tight">Seller Role</span>
            </button>

            <button
              onClick={() => handleDemoLogin('ADMIN')}
              className="p-2.5 bg-white hover:bg-indigo-100/80 border border-indigo-200 rounded-xl text-left transition-colors flex flex-col items-center justify-center gap-1 text-center cursor-pointer shadow-sm active:scale-95"
            >
              <Shield className="w-5 h-5 text-indigo-600" />
              <span className="text-[11px] font-extrabold text-slate-900 leading-tight">Admin Role</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required={isRegister}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@vigalMart.com"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full p-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-semibold"
              >
                <option value="BUYER">BUYER - Customer Shopping</option>
                <option value="SELLER">SELLER - Store & Product Manager</option>
                <option value="ADMIN">ADMIN - Platform Overseer</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl transition-colors shadow-md active:scale-95 text-sm"
          >
            {isRegister ? 'Register Account' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-bold text-amber-700 hover:underline"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register Now"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
