'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LogOut,
  Cake,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
  Store
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useOrderStore } from '@/store/useOrderStore';
import { useProductStore } from '@/store/useProductStore';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { adminUser, logout } = useAuthStore();
  const orders = useOrderStore((state) => state.orders);
  const products = useProductStore((state) => state.products);

  const pendingOrdersCount = orders.filter(
    (o) => o.status === 'Menunggu Pembayaran' || o.status === 'Diproses'
  ).length;

  const menuItems = [
    {
      name: 'Dashboard Keuangan',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Omset & Penjualan',
    },
    {
      name: 'Manajemen Produk (HP)',
      path: '/admin/produk',
      icon: Package,
      badge: `${products.length} Item`,
      desc: 'Foto, Harga & Stok',
    },
    {
      name: 'Pesanan & Resi Kurir',
      path: '/admin/pesanan',
      icon: ShoppingBag,
      badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} Baru` : null,
      desc: 'Status & Pengiriman',
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <>
      {/* =========================================================================
          1. MOBILE TOP NAVIGATION BAR (Visible only on mobile/tablet)
          ========================================================================= */}
      <header className="lg:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex items-center justify-between text-white w-full">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-pink-glow">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm text-white">Admin Panel</span>
              <span className="bg-pink-500/20 text-pink-300 text-[10px] font-bold px-1.5 py-0.2 rounded border border-pink-500/30">
                HP Ready
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">Bolu Gulung Guling</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href="/"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1"
            title="Lihat Web Publik"
          >
            <Store className="w-4 h-4 text-pink-400" />
            <span className="text-[11px] hidden sm:inline">Web Toko</span>
          </Link>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="p-2 rounded-xl bg-pink-600 text-white shadow-pink-glow focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          2. MOBILE SLIDE-OUT DRAWER
          ========================================================================= */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between text-slate-100 z-10 shadow-2xl overflow-y-auto">
            <div className="space-y-6">
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-pink-glow">
                    <Cake className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-sm text-white">Menu Admin HP</h2>
                    <p className="text-[10px] text-pink-400 font-medium">Bolu Gulung Guling</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Admin Profile Box */}
              <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-xs font-black text-white">
                    A
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-none">{adminUser.name}</p>
                    <p className="text-[10px] text-pink-400 font-medium">{adminUser.role}</p>
                  </div>
                </div>
                <div className="pt-1 flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Sesi Aktif - Technopreneur 2026</span>
                </div>
              </div>

              {/* Menu items list */}
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-xs transition ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-glow'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <div>
                          <span className="block leading-none">{item.name}</span>
                          <span className="text-[10px] opacity-75 font-normal">{item.desc}</span>
                        </div>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            isActive
                              ? 'bg-white text-pink-600'
                              : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-6 border-t border-slate-800">
              <Link
                href="/"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-pink-400" />
                <span>Buka Website Publik</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 text-xs font-bold border border-rose-800/40"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Keluar Akun Admin</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. DESKTOP PERMANENT SIDEBAR (Visible only on lg: screens and up)
          ========================================================================= */}
      <aside className="hidden lg:flex w-72 bg-slate-900 text-slate-100 min-h-screen p-6 flex-col justify-between border-r border-slate-800 shrink-0">
        <div className="space-y-8">
          {/* Admin Brand Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 flex items-center justify-center text-white shadow-pink-glow border-2 border-white/20">
                <Cake className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-extrabold text-base text-white tracking-tight flex items-center gap-1.5">
                  <span>Admin Panel</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </h2>
                <p className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                  Bolu Gulung Guling
                </p>
              </div>
            </div>

            {/* Admin identity badge */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-850 p-3.5 rounded-2xl border border-slate-700/80 shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-sm font-black text-white shadow-pink-glow shrink-0">
                  A
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{adminUser.name}</h4>
                  <p className="text-[10px] text-pink-300 truncate font-medium">{adminUser.role}</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-medium">Technopreneur 2026</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Terverifikasi
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3">
              Modul Manajemen
            </span>
            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-pink-glow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-pink-400'}`} />
                      <div>
                        <span className="block leading-tight">{item.name}</span>
                        <span className={`text-[10px] font-normal ${isActive ? 'text-pink-100' : 'text-slate-500'}`}>
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                          isActive
                            ? 'bg-white text-pink-600 shadow-sm'
                            : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile phone tip box */}
          <div className="bg-pink-950/40 border border-pink-500/30 p-3 rounded-2xl text-[11px] space-y-1">
            <div className="flex items-center gap-1.5 text-pink-300 font-bold">
              <Smartphone className="w-3.5 h-3.5 text-pink-400" /> Akses Langsung di HP:
            </div>
            <p className="text-slate-300 leading-snug">
              Buka link admin ini di browser HP Anda. Anda bisa upload & ganti foto produk langsung dari kamera HP!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <Link
            href="/"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
          >
            <span className="flex items-center gap-2">
              <Store className="w-4 h-4 text-pink-400" />
              <span>Lihat Website Toko</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 font-bold text-xs transition border border-slate-700/80"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar Akun Admin</span>
          </button>
        </div>
      </aside>

      {/* =========================================================================
          4. MOBILE BOTTOM NAVIGATION BAR (Sticky footer bar on mobile phones)
          ========================================================================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-around text-slate-400">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold transition relative ${
                isActive ? 'text-pink-400 font-extrabold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400 scale-110' : ''} transition-transform`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                )}
              </div>
              <span className="mt-1 leading-none">{item.name.split(' ')[0]}</span>
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] font-bold text-slate-400 hover:text-slate-200"
        >
          <Store className="w-5 h-5 text-emerald-400" />
          <span className="mt-1 leading-none">Web Toko</span>
        </Link>
      </nav>
    </>
  );
}
