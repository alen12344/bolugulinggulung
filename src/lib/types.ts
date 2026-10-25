export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'Best Seller' | 'Spesial' | 'Klasik' | 'Premium' | string;
  description: string;
  image: string;
  isBestSeller?: boolean;
  stock: number;
  weightGrams: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CourierOption {
  code: string;
  name: string;
  service: string;
  etd: string;
  cost: number;
  logoUrl?: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  fullAddress: string;
  notes?: string;
}

export type PaymentMethod = 
  | 'qris' 
  | 'bca_va' 
  | 'bri_va' 
  | 'bni_va' 
  | 'mandiri_va'
  | 'seabank_va' 
  | 'gopay' 
  | 'ovo' 
  | 'dana'
  | 'shopeepay'
  | 'transfer_manual'
  | 'cod';

export type OrderStatus = 
  | 'Menunggu Pembayaran' 
  | 'Diproses' 
  | 'Dikirim' 
  | 'Selesai' 
  | 'Batal';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  items: {
    productId: string;
    productName: string;
    productPrice: number;
    quantity: number;
    image: string;
  }[];
  courier: CourierOption;
  paymentMethod: PaymentMethod;
  paymentStatus: 'Lunas' | 'Belum Bayar' | 'Gagal';
  subtotal: number;
  shippingCost: number;
  totalAmount: number;
  status: OrderStatus;
  trackingNumber?: string;
  notes?: string;
}
