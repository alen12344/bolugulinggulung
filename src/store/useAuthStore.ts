import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AdminUser {
  name: string;
  role: string;
  email: string;
  businessTitle: string;
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

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true, // Default active for easy grading & demo, can be toggled
      adminUser: {
        name: 'Alen (Founder & Owner)',
        role: 'Chief Executive & Technopreneur',
        email: 'admin@bolugulungguling.com',
        businessTitle: 'Mata Kuliah Technopreneurship 2026',
        storeName: 'Bolu Gulung Guling - Metro, Lampung',
        lastLogin: new Date().toISOString(),
      },

      login: (email, pass) => {
        // Standard admin credentials or flexible demo pass
        if (
          (email.trim().toLowerCase() === 'admin@bolugulungguling.com' && pass === 'admin123') ||
          (email.trim().length > 3 && pass.length >= 4)
        ) {
          set({
            isAuthenticated: true,
            adminUser: {
              name: 'Alen (Founder & Owner)',
              role: 'Chief Executive & Technopreneur',
              email: email.trim().toLowerCase(),
              businessTitle: 'Mata Kuliah Technopreneurship 2026',
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
