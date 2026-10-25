'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Cake, Menu, X, Sparkles, MapPin, UserCheck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Menu Produk', path: '/produk' },
    { name: 'Tentang Kami & Lokasi', path: '/tentang' },
  ];

  const isAdminArea = pathname.startsWith('/admin');

  if (isAdminArea) return null; // Admin has dedicated layout

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-pink-700 via-pink-600 to-rose-600 text-white text-xs font-medium py-1.5 px-4 text-center flex justify-between items-center max-w-7xl mx-auto rounded-b-xl shadow-sm">
        <div className="hidden sm:flex items-center space-x-2">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Bolu Gulung Fresh Oven Setiap Hari • Area Metro & Pengiriman Se-Indonesia</span>
          <span className="bg-white/20 text-[10px] font-extrabold px-2 py-0.2 rounded-full">
            Technopreneur 2026
          </span>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto space-x-4">
          <span className="flex items-center gap-1 text-[11px] text-pink-100">
            <MapPin className="w-3 h-3 text-pink-200" /> Store Metro, Lampung
          </span>
          <Link
            href="/admin/dashboard"
            className="hover:text-yellow-200 transition font-bold flex items-center gap-1.5 text-[11px] bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/20"
            title="Portal Administrator & Owner"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-pink-200" />
            <span>Portal Admin</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-pink-700 flex items-center justify-center text-white shadow-pink-glow transform group-hover:rotate-6 group-hover:scale-105 transition-all duration-300 border-2 border-white/60">
              <Cake className="w-7 h-7" />
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-pink-700 via-pink-600 to-rose-600 bg-clip-text text-transparent tracking-tight">
                Bolu Gulung Guling
              </span>
              <p className="text-[10px] font-semibold tracking-wider text-pink-600 uppercase">
                Sensasi Soft & Melting
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-pink-glow'
                      : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Cart Icon & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/keranjang"
              className="relative p-3 rounded-full bg-pink-100/80 hover:bg-pink-200/80 text-pink-700 transition transform active:scale-95 shadow-sm border border-pink-200"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-6 h-6 text-pink-600" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-pink-glow animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* CTA Button */}
            <Link
              href="/produk"
              className="hidden lg:inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold px-5 py-2.5 rounded-full shadow-pink-glow hover:shadow-pink-glow-lg transition transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              Pesan Sekarang
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-pink-100 text-pink-700 hover:bg-pink-200 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-pink border-t border-pink-200/50 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl font-bold text-base transition ${
                pathname === link.path
                  ? 'bg-pink-500 text-white shadow-pink-glow'
                  : 'text-gray-700 hover:bg-pink-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/keranjang"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl font-bold text-pink-700 bg-pink-100 hover:bg-pink-200"
          >
            <span>Keranjang Belanja</span>
            <span className="bg-pink-600 text-white text-xs px-2.5 py-1 rounded-full">
              {mounted ? totalItems : 0} Item
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
