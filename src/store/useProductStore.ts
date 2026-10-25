import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/lib/types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Bolu Gulung Keju Super Lumer',
    slug: 'bolu-gulung-keju-super-lumer',
    price: 65000,
    originalPrice: 75000,
    rating: 4.9,
    reviewsCount: 142,
    category: 'Best Seller',
    description: 'Bolu lembut dengan isian butter cream gurih melimpah dan taburan keju cheddar parut super banyak di setiap gigitan. Favorit keluarga!',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    stock: 25,
    weightGrams: 500,
  },
  {
    id: 'prod-2',
    name: 'Bolu Gulung Cokelat Belgian Nutella',
    slug: 'bolu-gulung-cokelat-belgian-nutella',
    price: 70000,
    originalPrice: 85000,
    rating: 5.0,
    reviewsCount: 189,
    category: 'Best Seller',
    description: 'Adonan bolu cokelat pekat premium dengan isian selai Nutella asli dan lelehan cokelat Belgian truffle mewah yang lumer di mulut.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    stock: 20,
    weightGrams: 550,
  },
  {
    id: 'prod-3',
    name: 'Bolu Gulung Pandan Srikaya Wangi',
    slug: 'bolu-gulung-pandan-srikaya-wangi',
    price: 60000,
    originalPrice: 70000,
    rating: 4.8,
    reviewsCount: 96,
    category: 'Spesial',
    description: 'Aroma ekstrak daun pandan suji alami dipadu dengan isian srikaya home-made yang legit manis pas, dilengkapi taburan parutan kelapa muda.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    stock: 18,
    weightGrams: 500,
  },
  {
    id: 'prod-4',
    name: 'Bolu Gulung Red Velvet Cream Cheese',
    slug: 'bolu-gulung-red-velvet-cream-cheese',
    price: 75000,
    originalPrice: 90000,
    rating: 4.9,
    reviewsCount: 115,
    category: 'Premium',
    description: 'Tekstur cake red velvet nan lembut dipadukan dengan isian cream cheese segar impor dan crumble gurih di atasnya.',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    stock: 15,
    weightGrams: 520,
  },
  {
    id: 'prod-5',
    name: 'Bolu Gulung Mocha Meisjes Klasik',
    slug: 'bolu-gulung-mocha-meisjes-klasik',
    price: 58000,
    originalPrice: 65000,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Klasik',
    description: 'Resep legendaris dengan keharuman rum sintetik halal, buttercream moka aroma mantap, dan balutan ceres meisjes cokelat melimpah.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    stock: 30,
    weightGrams: 480,
  },
  {
    id: 'prod-6',
    name: 'Bolu Gulung Durian Medan Royal',
    slug: 'bolu-gulung-durian-medan-royal',
    price: 85000,
    originalPrice: 95000,
    rating: 5.0,
    reviewsCount: 210,
    category: 'Premium',
    description: 'Menggunakan 100% daging durian Ucok Medan asli tanpa pemanis buatan. Rasa lumer manis pahit khas durian premium!',
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&q=80&w=800',
    isBestSeller: false,
    stock: 12,
    weightGrams: 600,
  }
];

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  resetToDefault: () => void;
  updateStock: (id: string, delta: number) => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: `prod-${Date.now()}`,
        };
        set((state) => ({
          products: [newProduct, ...state.products],
        }));
        return newProduct;
      },

      updateProduct: (id, updated) => {
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      updateStock: (id, delta) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p
          ),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      resetToDefault: () => {
        set({ products: INITIAL_PRODUCTS });
      },
    }),
    {
      name: 'bolu-products-storage',
    }
  )
);
