import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order, OrderStatus } from '@/lib/types';

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'BGG-20260924-001',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Siti Rahmawati',
    customerPhone: '081234567890',
    customerEmail: 'siti.rahma@gmail.com',
    shippingAddress: {
      fullName: 'Siti Rahmawati',
      phone: '081234567890',
      email: 'siti.rahma@gmail.com',
      province: 'Lampung',
      city: 'Kota Metro',
      district: 'Metro Pusat',
      postalCode: '34111',
      fullAddress: 'Jl. Ahmad Yani No. 45, RT 02 / RW 01, Yosodadi, Metro Timur',
    },
    items: [
      {
        productId: 'prod-1',
        productName: 'Bolu Gulung Keju Super Lumer',
        productPrice: 65000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
      },
      {
        productId: 'prod-2',
        productName: 'Bolu Gulung Cokelat Belgian Nutella',
        productPrice: 70000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
      }
    ],
    courier: {
      code: 'jne_yes',
      name: 'JNE Express',
      service: 'YES (Yakin Esok Sampai)',
      etd: '1 Hari (Besok Sampai)',
      cost: 28000,
    },
    paymentMethod: 'qris',
    paymentStatus: 'Lunas',
    subtotal: 200000,
    shippingCost: 28000,
    totalAmount: 228000,
    status: 'Diproses',
    notes: 'Mohon cantumkan kartu ucapan Selamat Ulang Tahun ya!',
  },
  {
    id: 'ord-1002',
    orderNumber: 'BGG-20260924-002',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    customerName: 'Budi Santoso',
    customerPhone: '085711223344',
    customerEmail: 'budi.santoso@yahoo.com',
    shippingAddress: {
      fullName: 'Budi Santoso',
      phone: '085711223344',
      email: 'budi.santoso@yahoo.com',
      province: 'Lampung',
      city: 'Bandar Lampung',
      district: 'Kedaton',
      postalCode: '35141',
      fullAddress: 'Jl. Teuku Umar No. 112, Kedaton, Bandar Lampung',
    },
    items: [
      {
        productId: 'prod-4',
        productName: 'Bolu Gulung Red Velvet Cream Cheese',
        productPrice: 75000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800',
      }
    ],
    courier: {
      code: 'sicepat',
      name: 'SiCepat Ekspres',
      service: 'BEST',
      etd: '1 Hari',
      cost: 22000,
    },
    paymentMethod: 'bca_va',
    paymentStatus: 'Lunas',
    subtotal: 75000,
    shippingCost: 22000,
    totalAmount: 97000,
    status: 'Dikirim',
    trackingNumber: 'SCP-88902144',
  },
  {
    id: 'ord-1003',
    orderNumber: 'BGG-20260924-003',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    customerName: 'Dewi Lestari',
    customerPhone: '081988776655',
    customerEmail: 'dewi.lestari@gmail.com',
    shippingAddress: {
      fullName: 'Dewi Lestari',
      phone: '081988776655',
      email: 'dewi.lestari@gmail.com',
      province: 'Lampung',
      city: 'Kota Metro',
      district: 'Metro Barat',
      postalCode: '34121',
      fullAddress: 'Perumahan Ganjar Asri Blok C5, Metro Barat',
    },
    items: [
      {
        productId: 'prod-3',
        productName: 'Bolu Gulung Pandan Srikaya Wangi',
        productPrice: 60000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
      }
    ],
    courier: {
      code: 'gosend',
      name: 'GoSend Instant',
      service: 'Instant',
      etd: '2 - 3 Jam',
      cost: 20000,
    },
    paymentMethod: 'gopay',
    paymentStatus: 'Lunas',
    subtotal: 120000,
    shippingCost: 20000,
    totalAmount: 140000,
    status: 'Selesai',
    trackingNumber: 'GOSEND-99210',
  },
  {
    id: 'ord-1004',
    orderNumber: 'BGG-20260924-004',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    customerName: 'Rian Hidayat',
    customerPhone: '082199887711',
    customerEmail: 'rian.hidayat@outlook.com',
    shippingAddress: {
      fullName: 'Rian Hidayat',
      phone: '082199887711',
      email: 'rian.hidayat@outlook.com',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      district: 'Kebayoran Baru',
      postalCode: '12110',
      fullAddress: 'Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan',
    },
    items: [
      {
        productId: 'prod-6',
        productName: 'Bolu Gulung Durian Medan Royal',
        productPrice: 85000,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&q=80&w=800',
      }
    ],
    courier: {
      code: 'jne',
      name: 'JNE Express',
      service: 'REG',
      etd: '1 - 2 Hari',
      cost: 25000,
    },
    paymentMethod: 'bri_va',
    paymentStatus: 'Belum Bayar',
    subtotal: 170000,
    shippingCost: 25000,
    totalAmount: 195000,
    status: 'Menunggu Pembayaran',
  }
];

interface OrderState {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  updatePaymentStatus: (orderId: string, paymentStatus: 'Lunas' | 'Belum Bayar' | 'Gagal') => void;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: OrderStatus) => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      createOrder: (orderData) => {
        const timestamp = Date.now();
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const randomNum = Math.floor(100 + Math.random() * 900);
        
        const newOrder: Order = {
          ...orderData,
          id: `ord-${timestamp}`,
          orderNumber: `BGG-${dateStr}-${randomNum}`,
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));

        return newOrder;
      },

      updateOrderStatus: (orderId, status, trackingNumber) => {
        set((state) => ({
          orders: state.orders.map((ord) => {
            if (ord.id === orderId) {
              return {
                ...ord,
                status,
                ...(trackingNumber ? { trackingNumber } : {}),
              };
            }
            return ord;
          }),
        }));
      },

      updatePaymentStatus: (orderId, paymentStatus) => {
        set((state) => ({
          orders: state.orders.map((ord) => {
            if (ord.id === orderId) {
              return {
                ...ord,
                paymentStatus,
                status: paymentStatus === 'Lunas' ? 'Diproses' : ord.status,
              };
            }
            return ord;
          }),
        }));
      },

      getOrderById: (id) => {
        return get().orders.find((ord) => ord.id === id || ord.orderNumber === id);
      },

      getOrdersByStatus: (status) => {
        return get().orders.filter((ord) => ord.status === status);
      },
    }),
    {
      name: 'bolu-orders-storage',
    }
  )
);
