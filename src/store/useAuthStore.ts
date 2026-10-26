import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  name: string;
  role: string;
  email: string;
  storeName: string;
  lastLogin?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  adminUser: AdminUser;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  updateAdminProfile: (data: Partial<AdminUser>) => void;
}

// Admin password — hanya pemilik yang tahu
const ADMIN_EMAIL = 'admin@bolugulungguling.com';
const ADMIN_PASSWORD = 'BoluAlen@2026!';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminUser: {
        name: 'Alen',
        role: 'Owner & Founder',
        email: ADMIN_EMAIL,
        storeName: 'Bolu Gulung Guling - Metro, Lampung',
        lastLogin: undefined,
      },

      login: (email, pass) => {
        if (
          email.trim().toLowerCase() === ADMIN_EMAIL &&
          pass === ADMIN_PASSWORD
        ) {
          set({
            isAuthenticated: true,
            adminUser: {
              name: 'Alen',
              role: 'Owner & Founder',
              email: ADMIN_EMAIL,
              storeName: 'Bolu Gulung Guling - Metro, Lampung',
              lastLogin: new Date().toISOString(),
            },
          });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      updateAdminProfile: (data) => {
        set((state) => ({
          adminUser: { ...state.adminUser, ...data },
        }));
      },
    }),
    {
      name: 'bolu-admin-auth-storage',
    }
  )
);
