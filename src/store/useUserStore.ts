import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  createdAt: string;
  lastLogin?: string;
  totalOrders?: number;
  totalSpent?: number;
  isBlocked?: boolean;
}

interface UserState {
  users: User[];
  currentUser: User | null;
  isLoggedIn: boolean;
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; message: string };
  loginUser: (email: string, password: string) => { success: boolean; message: string };
  loginWithGoogle: (name: string, email: string, photoUrl?: string) => void;
  logoutUser: () => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
  deleteUser: (id: string) => void;
  updateUserStats: (userId: string, orderAmount: number) => void;
}

// Store passwords separately (in real app this would be server-side)
const USER_PASSWORDS_KEY = 'bolu-user-passwords';

const getStoredPasswords = (): Record<string, string> => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(USER_PASSWORDS_KEY) || '{}');
  } catch {
    return {};
  }
};

const savePassword = (email: string, password: string) => {
  if (typeof window === 'undefined') return;
  const passwords = getStoredPasswords();
  passwords[email] = password;
  localStorage.setItem(USER_PASSWORDS_KEY, JSON.stringify(passwords));
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoggedIn: false,

      register: (name, email, phone, password) => {
        const { users } = get();
        const emailLower = email.trim().toLowerCase();

        if (users.find((u) => u.email === emailLower)) {
          return { success: false, message: 'Email sudah terdaftar. Silakan login.' };
        }

        if (password.length < 6) {
          return { success: false, message: 'Kata sandi minimal 6 karakter.' };
        }

        if (!phone.match(/^[0-9]{10,13}$/)) {
          return { success: false, message: 'Nomor HP tidak valid (10-13 digit angka).' };
        }

        const newUser: User = {
          id: `user-${Date.now()}`,
          name: name.trim(),
          email: emailLower,
          phone: phone.trim(),
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          totalOrders: 0,
          totalSpent: 0,
          isBlocked: false,
        };

        savePassword(emailLower, password);

        set((state) => ({
          users: [newUser, ...state.users],
          currentUser: newUser,
          isLoggedIn: true,
        }));

        return { success: true, message: 'Akun berhasil dibuat! Selamat datang.' };
      },

      loginUser: (email, password) => {
        const { users } = get();
        const emailLower = email.trim().toLowerCase();
        const user = users.find((u) => u.email === emailLower);

        if (!user) {
          return { success: false, message: 'Email tidak terdaftar. Silakan daftar terlebih dahulu.' };
        }

        if (user.isBlocked) {
          return { success: false, message: 'Akun Anda telah diblokir. Hubungi admin.' };
        }

        const storedPasswords = getStoredPasswords();
        if (storedPasswords[emailLower] !== password) {
          return { success: false, message: 'Kata sandi salah. Coba lagi.' };
        }

        const updatedUser = { ...user, lastLogin: new Date().toISOString() };
        set((state) => ({
          users: state.users.map((u) => (u.id === user.id ? updatedUser : u)),
          currentUser: updatedUser,
          isLoggedIn: true,
        }));

        return { success: true, message: 'Login berhasil!' };
      },

      loginWithGoogle: (name, email, photoUrl) => {
        const { users } = get();
        const emailLower = email.trim().toLowerCase();
        let user = users.find((u) => u.email === emailLower);

        if (!user) {
          user = {
            id: `user-${Date.now()}`,
            name,
            email: emailLower,
            phone: '',
            photoUrl,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
            totalOrders: 0,
            totalSpent: 0,
            isBlocked: false,
          };
          set((state) => ({
            users: [user!, ...state.users],
            currentUser: user!,
            isLoggedIn: true,
          }));
        } else {
          const updated = { ...user, lastLogin: new Date().toISOString(), photoUrl };
          set((state) => ({
            users: state.users.map((u) => (u.id === user!.id ? updated : u)),
            currentUser: updated,
            isLoggedIn: true,
          }));
        }
      },

      logoutUser: () => {
        set({ currentUser: null, isLoggedIn: false });
      },

      blockUser: (id) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, isBlocked: true } : u)),
        }));
      },

      unblockUser: (id) => {
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, isBlocked: false } : u)),
        }));
      },

      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        }));
      },

      updateUserStats: (userId, orderAmount) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId
              ? {
                  ...u,
                  totalOrders: (u.totalOrders || 0) + 1,
                  totalSpent: (u.totalSpent || 0) + orderAmount,
                }
              : u
          ),
        }));
      },
    }),
    {
      name: 'bolu-users-storage',
    }
  )
);
