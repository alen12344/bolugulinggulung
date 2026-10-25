'use client';

import React, { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import { Search, Sparkles, Filter, Cake } from 'lucide-react';

export default function ProdukPage() {
  const products = useProductStore((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Semua',
    ...Array.from(new Set(['Best Seller', 'Spesial', 'Klasik', 'Premium', ...products.map((p) => p.category)])),
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Semua' ||
      p.category === selectedCategory ||
      (selectedCategory === 'Best Seller' && p.isBestSeller);
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 rounded-3xl p-8 sm:p-12 text-white shadow-pink-glow relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold text-pink-100">
            <Cake className="w-4 h-4" /> Menu Spesial Bolu Gulung Guling
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Pilihan Rasa Bolu Lembut Terlengkap
          </h1>
          <p className="text-pink-100 text-sm sm:text-base leading-relaxed">
            Pilih varian rasa favorit Anda dari olahan keju lumer, cokelat Belgian, hingga durian Medan asli. Dipanggang secara khusus untuk Anda!
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-card p-4 sm:p-6 rounded-3xl border border-pink-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-gray-400 flex items-center gap-1 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Kategori:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-pink-600 text-white shadow-pink-glow'
                  : 'bg-pink-50 text-pink-800 hover:bg-pink-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari bolu keju, cokelat..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-pink-200 bg-white text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
          />
        </div>

      </div>

      {/* Product List Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-pink-200 space-y-3">
          <Sparkles className="w-10 h-10 text-pink-400 mx-auto animate-spin" />
          <h3 className="text-xl font-bold text-gray-800">Tidak Ada Produk Ditemukan</h3>
          <p className="text-xs text-gray-500">
            Coba ubah kata kunci pencarian atau pilih kategori lainnya.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('Semua');
              setSearchQuery('');
            }}
            className="mt-2 text-xs font-bold text-pink-600 underline"
          >
            Reset Filter
          </button>
        </div>
      )}

    </div>
  );
}
