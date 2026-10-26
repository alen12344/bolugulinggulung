'use client';

import React from 'react';
import Link from 'next/link';
import { Cake, MapPin, Phone, Mail, Clock, Heart, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-gradient-to-b from-pink-900 via-pink-950 to-gray-950 text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-pink-500/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pink-800/40">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-pink-glow">
                <Cake className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold bg-gradient-to-r from-pink-200 to-pink-400 bg-clip-text text-transparent">
                  Bolu Gulung Guling
                </h3>
                <p className="text-xs text-pink-300 font-semibold tracking-wider">Toko Kue Resmi Metro</p>
              </div>
            </div>
            <p className="text-pink-200/80 text-sm leading-relaxed">
              Pilihan bolu gulung terbaik dengan tekstur ultra lembut, isian berlimpah, dan bahan premium 100% higienis & halal.
            </p>
            <div className="pt-2 flex items-center space-x-3">
              <span className="bg-pink-800/60 border border-pink-700/50 px-3 py-1 rounded-full text-xs text-pink-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-pink-400" /> 100% Halal
              </span>
              <span className="bg-pink-800/60 border border-pink-700/50 px-3 py-1 rounded-full text-xs text-pink-200 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-pink-400" /> Fresh Daily
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-pink-200 border-l-4 border-pink-500 pl-3">Navigasi Halaman</h4>
            <ul className="space-y-2.5 text-sm text-pink-200/80">
              <li>
                <Link href="/" className="hover:text-pink-400 transition flex items-center gap-2">
                  <span>›</span> Beranda Utama
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-pink-400 transition flex items-center gap-2">
                  <span>›</span> Katalog Produk Lengkap
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-pink-400 transition flex items-center gap-2">
                  <span>›</span> Sejarah & Lokasi Toko
                </Link>
              </li>
              <li>
                <Link href="/keranjang" className="hover:text-pink-400 transition flex items-center gap-2">
                  <span>›</span> Keranjang Belanja
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-pink-400 transition flex items-center gap-2 text-pink-300 font-semibold">
                  <span>›</span> Portal Login Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-pink-200 border-l-4 border-pink-500 pl-3">Kontak & Jam Buka</h4>
            <div className="space-y-3 text-sm text-pink-200/80">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
                <span>Jl. Ahmad Yani No. 88, Yosodadi, Kota Metro, Lampung 34111</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-pink-400 shrink-0" />
                <span>+62 857-6495-2471 (WhatsApp)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-pink-400 shrink-0" />
                <span>pesanan@bolugulungguling.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-pink-400 shrink-0" />
                <span>Buka Setiap Hari: 07.30 - 21.00 WIB</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-pink-200 border-l-4 border-pink-500 pl-3">Metode Pembayaran</h4>
            <p className="text-xs text-pink-300/80">
              Mendukung otomatisasi QRIS, Virtual Account BCA/BRI/BNI/SeaBank, dan E-Wallet GoPay/OVO/Dana (Powered by Midtrans/Xendit).
            </p>
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">QRIS</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">BCA</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">BRI</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">BNI</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">GOPAY</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">OVO</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">DANA</div>
              <div className="bg-white/10 p-2 rounded-lg text-center text-[10px] font-bold text-white border border-pink-500/30">SEABANK</div>
            </div>
          </div>

        </div>

        {/* Copyright & Academic Technopreneur Accreditation */}
        <div className="pt-8 text-center text-xs text-pink-400/80 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-pink-900/50 mt-4">
          <div>
            <p className="font-semibold text-white">© 2026 Bolu Gulung Guling • Kota Metro, Lampung</p>
            <p className="text-[11px] text-pink-300/80 mt-0.5">
              Toko Bolu Gulung Premium Online • Pengiriman Se-Indonesia
            </p>
          </div>
          <p className="flex items-center gap-1.5 justify-center text-[11px] text-pink-200 bg-pink-900/40 px-3 py-1.5 rounded-full border border-pink-800/40">
            <span>Dibuat dengan dedikasi</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
            <span>oleh Alen</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
