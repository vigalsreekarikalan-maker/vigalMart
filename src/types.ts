export type UserRole = 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  sellerBusinessName?: string;
}

export type OrderStatus = 
  | 'PLACED' 
  | 'CONFIRMED' 
  | 'PROCESSING' 
  | 'SHIPPED' 
  | 'OUT_FOR_DELIVERY' 
  | 'DELIVERED' 
  | 'CANCELLED';

export interface Address {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase?: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  inStock: boolean;
  deliveryInfo: string;
  image: string;
  additionalImages?: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  sellerId?: string;
  sellerName?: string;
  isTrending?: boolean;
  isDealOfDay?: boolean;
  isBestSeller?: boolean;
  isNewRelease?: boolean;
  sku: string;
  approved?: boolean;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  itemCount: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface SavedForLaterItem {
  product: Product;
  addedAt: string;
}

export interface OrderStatusHistory {
  status: OrderStatus;
  timestamp: string;
  description: string;
  location?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string; // VGM-2026-XXXXXX
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  shippingAddress: Address;
  paymentMethod: 'COD' | 'UPI_DEMO' | 'CARD_DEMO';
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  itemsTotal: number;
  discountTotal: number;
  deliveryFee: number;
  tax: number;
  grandTotal: number;
  status: OrderStatus;
  orderDate: string;
  estimatedDelivery: string;
  statusHistory: OrderStatusHistory[];
}

export interface FilterOptions {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  minRating?: number;
  inStockOnly?: boolean;
  discountOnly?: boolean;
  sortBy?: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest' | 'best-selling';
}

export interface SellerStats {
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  revenue: number;
  pendingOrders: number;
  lowStockItems: number;
}

export interface AdminStats {
  totalUsers: number;
  totalSellers: number;
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
  pendingApprovals: number;
}
