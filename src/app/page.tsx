'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ArrowRight,
  Award,
  ShieldCheck,
  HeartHandshake,
  Utensils,
  Star,
  MapPin,
  Truck,
  ChevronRight,
  MessageCircle,
  Search,
  CheckCircle2,
  Package,
  Layers,
  Clock,
  Send,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useProductStore } from '@/store/useProductStore';
import { useOrderStore } from '@/store/useOrderStore';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const products = useProductStore((state) => state.products);
  const orders = useOrderStore((state) => state.orders);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  // Order tracking search state
  const [trackQuery, setTrackQuery] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [trackError, setTrackError] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackQuery.trim()) return;

    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === trackQuery.trim().toLowerCase() ||
        (o.trackingNumber && o.trackingNumber.toLowerCase() === trackQuery.trim().toLowerCase()) ||
        o.customerPhone.includes(trackQuery.trim())
    );

    if (found) {
      setTrackedOrder(found);
      setTrackError(false);
    } else {
      setTrackedOrder(null);
      setTrackError(true);
    }
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      'Halo Admin Bolu Gulung Guling! Saya ingin tanya varian bolu yang ready dan promo hari ini.'
    );
    window.open(`https://wa.me/6285764952471?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-20 pb-20 font-sans">
      
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-pink-100/90 via-pink-50 to-pink-100/40">
        
        {/* Background decorative Ornaments */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-pink-200/90 border border-pink-300 px-4 py-2 rounded-full text-pink-900 text-xs sm:text-sm font-extrabold shadow-sm">
                <Sparkles className="w-4 h-4 text-pink-600 animate-bounce" />
                <span>🎂 Fresh Oven Setiap Hari • Metro, Lampung</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Kelembutan Sempurna{' '}
                <span className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 bg-clip-text text-transparent block mt-2 pb-1" style={{ lineHeight: '1.2' }}>
                  Bolu Gulung Guling
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-700 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Dipanggang fresh oven setiap hari di Kota Metro dengan 100% mentega pilihan. Nikmati sensasi lumer buttercream gurih, limpahan keju cheddar parut, dan cokelat Belgian asli tanpa bahan pengawet!
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/produk"
                  className="w-full sm:w-auto bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-lg px-8 py-4 rounded-full shadow-pink-glow-lg hover:shadow-pink-glow transition transform hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  <Utensils className="w-5 h-5 text-yellow-300" />
                  <span>Pesan Sekarang Online</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={handleOpenWhatsApp}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base px-7 py-4 rounded-full shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat WhatsApp Dapur</span>
                </button>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0 border-t border-pink-200/80">
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-pink-600">100%</div>
                  <div className="text-xs text-gray-600 font-bold">Halal & Higienis</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-pink-600">15.000+</div>
                  <div className="text-xs text-gray-600 font-bold">Bolu Terjual</div>
                </div>
                <div className="text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                  <div className="flex items-center text-amber-500 font-extrabold text-xl sm:text-2xl">
                    <span>4.9</span> <Star className="w-5 h-5 fill-amber-500 ml-1" />
                  </div>
                  <div className="text-xs text-gray-600 font-bold">Rating Pelanggan</div>
                </div>
              </div>

            </div>

            {/* Hero Right Visual Banner */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:rotate-1 transition duration-500">
                <Image
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000"
                  alt="Bolu Gulung Guling Hero"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-2xl border border-white/60 flex items-center justify-between text-gray-800 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-extrabold text-base shadow">
                      👑
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Varian Favorit No. 1</h4>
                      <p className="text-xs text-pink-600 font-extrabold">Keju Super Lumer</p>
                    </div>
                  </div>
                  <span className="text-sm font-extrabold bg-pink-600 text-white px-3 py-1 rounded-full shadow">
                    Rp 65.000
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. TECHNOPRENEUR VALUE PROPOSITION & INNOVATION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-pink-500/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="bg-pink-500/20 text-pink-300 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-pink-500/40 inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-300" /> Model Bisnis & Inovasi Digital
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Platform E-Commerce Bolu Gulung Terintegrasi
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                Bolu Gulung Guling hadir sebagai toko kue online modern berbasis digital. Mengintegrasikan katalog produk lengkap, kalkulator ongkir otomatis per gram, payment gateway QRIS & berbagai metode bayar, serta sistem manajemen toko langsung dari HP.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-pink-300 font-extrabold text-xs">Direct HP Upload</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Kamera & Galeri HP</div>
                </div>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-pink-300 font-extrabold text-xs">Auto Payment</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">QRIS & VA Bank</div>
                </div>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-pink-300 font-extrabold text-xs">RajaOngkir Ready</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Tarif Akurat Logistik</div>
                </div>
                <div className="bg-white/10 p-3 rounded-2xl border border-white/10 text-center">
                  <div className="text-pink-300 font-extrabold text-xs">Live Analytics</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">Omset & Laba Bersih</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900/80 p-5 rounded-2xl border border-pink-500/30 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white mx-auto shadow-pink-glow">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-base text-white">Owner & Tim Pengembang</h3>
              <p className="text-xs text-pink-300 font-semibold">Alen • Technopreneur 2026</p>
              <p className="text-[11px] text-slate-400">
                Fakultas Bisnis & Teknologi Informasi<br />
                Store Resmi: Kota Metro, Lampung
              </p>
              <Link
                href="/admin/dashboard"
                className="inline-block w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-pink-glow transition"
              >
                Lihat Panel Monitoring Admin
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          3. KATALOG PRODUK TERFAVORIT (BEST SELLERS)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-pink-600 font-extrabold text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Varian Terfavorit
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mt-1">
              Katalog Bolu Best Seller
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Dipanggang fresh setiap pagi untuk menjamin kelezatan terbaik sampai ke tangan Anda.
            </p>
          </div>

          <Link
            href="/produk"
            className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-extrabold text-base group underline underline-offset-4"
          >
            <span>Lihat Semua Produk ({products.length} Varian)</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. LACAK PESANAN PELANGGAN (TRACK ORDER)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-200 shadow-xl space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <span className="text-pink-600 font-extrabold text-xs uppercase tracking-wider">
              Live Order Tracking
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Lacak Pesanan Bolu Anda
            </h3>
            <p className="text-xs text-gray-500">
              Masukkan Nomor Pesanan (contoh: <strong className="font-mono text-pink-600">BGG-20260924-001</strong>) atau nomor WhatsApp Anda.
            </p>

            <form onSubmit={handleTrackOrder} className="flex gap-2 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={trackQuery}
                  onChange={(e) => setTrackQuery(e.target.value)}
                  placeholder="Ketik Nomor Pesanan (BGG-...) atau No. HP..."
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-xs shadow-pink-glow hover:from-pink-600 hover:to-rose-700 transition"
              >
                Cek Status
              </button>
            </form>
          </div>

          {/* Tracked Order Result Card */}
          {trackedOrder && (
            <div className="max-w-2xl mx-auto bg-pink-50/80 p-5 rounded-2xl border border-pink-200 space-y-3 animate-fadeIn text-xs">
              <div className="flex justify-between items-center border-b border-pink-200 pb-2">
                <span className="font-mono font-bold text-pink-600 text-sm">
                  {trackedOrder.orderNumber}
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-full text-[10px]">
                  {trackedOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div>
                  <span className="text-gray-500 block text-[10px]">Nama Pemesan:</span>
                  <strong className="text-gray-900">{trackedOrder.customerName}</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Kurir Pengiriman:</span>
                  <strong>{trackedOrder.courier.name} ({trackedOrder.courier.service})</strong>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Alamat Tujuan:</span>
                  <span>{trackedOrder.shippingAddress.city}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Nomor Resi:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {trackedOrder.trackingNumber || 'Sedang dikemas di dapur'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {trackError && (
            <div className="max-w-2xl mx-auto bg-rose-50 border border-rose-200 p-4 rounded-2xl text-center text-xs text-rose-700 font-semibold">
              Pesanan tidak ditemukan. Pastikan Anda mengetik No. Pesanan dengan benar (contoh: BGG-20260924-001) atau hubungi kami di WhatsApp.
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          5. TESTIMONIALS & REVIEWS
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-pink-600 font-extrabold text-xs uppercase tracking-wider">
            Kepuasan Pelanggan
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Kata Mereka Tentang Bolu Gulung Guling
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
            Dipercaya oleh ribuan pecinta kue, mahasiswa, keluarga, hingga instansi di Kota Metro dan Lampung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              "Tekstur bolunya bener-bener kapas, gak bikin seret di tenggorokan. Isian kejunya melimpah banget sampe tumpah-tumpah. Buat oleh-oleh khas Metro wajib beli ini!"
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-pink-100">
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center text-xs">
                DN
              </div>
              <div>
                <h5 className="font-bold text-xs text-gray-900">Dina Novita</h5>
                <span className="text-[10px] text-gray-500">Pelanggan Setia Metro Pusat</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              "Bolu Cokelat Belgian Nutella nya parah sih, cokelatnya premium banget kayak cake hotel bintang lima. Sistem checkout websitenya juga canggih, ada QRIS otomatis!"
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-pink-100">
              <div className="w-8 h-8 rounded-full bg-rose-500 text-white font-bold flex items-center justify-center text-xs">
                RF
              </div>
              <div>
                <h5 className="font-bold text-xs text-gray-900">Reza Firmansyah</h5>
                <span className="text-[10px] text-gray-500">Bandar Lampung</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-gray-700 leading-relaxed italic">
              "Pesan 20 box untuk acara seminar kampus, packaging-nya rapi banget pake box tebal dan aman. Semua dosen dan tamu pada nanyain beli di mana. Mantap bolunya!"
            </p>
            <div className="flex items-center space-x-3 pt-2 border-t border-pink-100">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                AW
              </div>
              <div>
                <h5 className="font-bold text-xs text-gray-900">Angga Wicaksono</h5>
                <span className="text-[10px] text-gray-500">Panitia Acara Kampus</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FLOATING WHATSAPP BUTTON (Quick Support for Buyers)
          ========================================================================= */}
      <button
        type="button"
        onClick={handleOpenWhatsApp}
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl flex items-center gap-2.5 transition transform hover:scale-105 active:scale-95 group border-2 border-white"
        aria-label="Chat WhatsApp Admin"
        title="Chat WhatsApp Dapur Bolu"
      >
        <MessageCircle className="w-6 h-6 animate-pulse" />
        <span className="hidden sm:inline font-bold text-xs pr-1">Tanya Dapur (WA)</span>
      </button>

    </div>
  );
}
