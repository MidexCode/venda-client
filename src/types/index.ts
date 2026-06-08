export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  role: "BUYER" | "SELLER" | "ADMIN";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  category: { name: string; slug: string };
  seller: { storeName: string; storeSlug: string; rating: number };
  variants?: ProductVariant[];
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock: number;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  quantity: number;
  product: Pick<
    Product,
    | "id"
    | "name"
    | "slug"
    | "price"
    | "comparePrice"
    | "images"
    | "stock"
    | "seller"
  >;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface Order {
  id: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
  address: Address;
  payment?: Payment;
  trackingEvents?: TrackingEvent[];
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: Pick<Product, "name" | "images" | "slug">;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export interface TrackingEvent {
  id: string;
  status: OrderStatus;
  message: string;
  location?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  isDefault: boolean;
}

export interface Payment {
  id: string;
  paystackRef: string;
  amount: number;
  status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
  channel?: string;
  paidAt?: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  body: string;
  images: string[];
  sellerReply?: string;
  isVerified: boolean;
  createdAt: string;
  user: { name: string; avatarUrl?: string };
}

export interface Seller {
  id: string;
  storeName: string;
  storeSlug: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
  rating: number;
  totalSales: number;
  isVerified: boolean;
}
