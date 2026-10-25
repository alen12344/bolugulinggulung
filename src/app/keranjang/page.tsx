'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function KeranjangPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeFromCart, clearCart, getTotalPrice, getTotalItems, getTotalWeightGrams } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const totalItems = getTotalItems();
  const totalWeightGrams = getTotalWeightGrams();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex items-center justify-between border-b border-pink-200 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Keranjang Belanja
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review ulang daftar pesanan bolu pilihan Anda sebelum checkout.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200 transition"
          >
            <Trash2 className="w-3.5 h-3.5" /> Kosongkan Keranjang
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-white rounded-3xl p-12 text-center border border-pink-200 shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto text-pink-500">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">Keranjang Masih Kosong</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Belum ada bolu gulung yang ditambahkan. Yuk pilih rasa terfavoritmu sekarang!
          </p>
          <Link
            href="/produk"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-pink-glow transition transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Jelajahi Menu Produk</span>
          </Link>
        </div>
      ) : (
        /* Cart List & Summary Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition hover:shadow-pink-glow"
              >
                {/* Product Image & Info */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-pink-50 shrink-0 border border-pink-200">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      unoptimized={product.image.startsWith('data:')}
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="bg-pink-100 text-pink-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      {product.category}
                    </span>
                    <h4 className="font-extrabold text-base text-gray-900 leading-tight">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-pink-600">
                      Rp {product.price.toLocaleString('id-ID')} / pcs
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Item Total */}
                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-pink-100">
                  
                  {/* Quantity buttons */}
                  <div className="flex items-center space-x-2 bg-pink-50 p-1 rounded-xl border border-pink-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white text-pink-600 flex items-center justify-center font-bold shadow-sm transition hover:bg-pink-100 active:scale-90"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-6 text-center font-extrabold text-xs text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white text-pink-600 flex items-center justify-center font-bold shadow-sm transition hover:bg-pink-100 active:scale-90"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Subtotal Item */}
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-semibold">Total</span>
                    <span className="text-base font-extrabold text-pink-700">
                      Rp {(product.price * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </div>
            ))}

            <Link
              href="/produk"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-pink-600 hover:text-pink-700 pt-2"
            >
              <ArrowLeft className="w-4 h-4" /> Tambah Varian Rasa Lainnya
            </Link>
          </div>

          {/* Cart Summary Side Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-lg space-y-5 sticky top-28">
              <h3 className="font-extrabold text-lg text-gray-900 border-b border-pink-100 pb-3">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-3 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Total Kuantitas Bolu:</span>
                  <strong className="text-gray-900">{totalItems} Pcs</strong>
                </div>

                <div className="flex justify-between">
                  <span>Estimasi Total Berat:</span>
                  <strong className="text-gray-900">{(totalWeightGrams / 1000).toFixed(1)} Kg</strong>
                </div>

                <div className="flex justify-between border-t border-dashed border-pink-200 pt-3">
                  <span className="text-sm font-bold text-gray-800">Subtotal Harga:</span>
                  <span className="text-lg font-extrabold text-pink-600">
                    Rp {subtotal.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200 text-[11px] text-pink-800 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                <span>Ongkos kirim akan dihitung secara otomatis saat mengisi alamat tujuan checkout.</span>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-pink-glow hover:shadow-pink-glow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
