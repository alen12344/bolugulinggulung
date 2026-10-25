'use client';

import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useProductStore } from '@/store/useProductStore';
import { Product } from '@/lib/types';
import {
  Plus,
  Edit3,
  Trash2,
  X,
  Sparkles,
  Camera,
  UploadCloud,
  Image as ImageIcon,
  Save,
  Check,
  Search,
  Filter,
  RefreshCw,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Scale,
  DollarSign,
  PackageCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

// Curated High-Definition Bakery Presets for Quick Selection on Phone
const PRESET_CAKE_PHOTOS = [
  {
    name: 'Keju Super Lumer',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    tag: 'Keju',
  },
  {
    name: 'Cokelat Belgian Nutella',
    url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800',
    tag: 'Cokelat',
  },
  {
    name: 'Pandan Srikaya Wangi',
    url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    tag: 'Pandan',
  },
  {
    name: 'Red Velvet Cream Cheese',
    url: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800',
    tag: 'Red Velvet',
  },
  {
    name: 'Mocha Meisjes Klasik',
    url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800',
    tag: 'Mocha',
  },
  {
    name: 'Durian Medan Royal',
    url: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?auto=format&fit=crop&q=80&w=800',
    tag: 'Durian',
  },
  {
    name: 'Strawberry Velvet Roll',
    url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    tag: 'Strawberry',
  },
  {
    name: 'Matcha Green Tea Roll',
    url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    tag: 'Matcha',
  },
];

export default function AdminProdukPage() {
  const [mounted, setMounted] = useState(false);
  const { products, addProduct, updateProduct, deleteProduct, updateStock, resetToDefault } = useProductStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Photo upload state
  const [isCompressing, setIsCompressing] = useState(false);
  const [showPresetGallery, setShowPresetGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Form State with complete controls
  const [formState, setFormState] = useState({
    name: '',
    price: 65000,
    originalPrice: 75000,
    category: 'Best Seller',
    customCategory: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    isBestSeller: true,
    stock: 25,
    weightGrams: 500,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  if (!mounted) return null;

  // Categories list
  const existingCategories = Array.from(
    new Set(['Best Seller', 'Spesial', 'Klasik', 'Premium', ...products.map((p) => p.category)])
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === 'Semua' || p.category === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormState({
      name: '',
      price: 65000,
      originalPrice: 75000,
      category: 'Best Seller',
      customCategory: '',
      description: 'Bolu gulung lembut dibuat fresh dengan bahan premium pilihan.',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
      isBestSeller: true,
      stock: 20,
      weightGrams: 500,
    });
    setShowPresetGallery(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      category: product.category,
      customCategory: '',
      description: product.description,
      image: product.image,
      isBestSeller: !!product.isBestSeller,
      stock: product.stock,
      weightGrams: product.weightGrams || 500,
    });
    setShowPresetGallery(false);
    setIsModalOpen(true);
  };

  // Process mobile camera or gallery file upload directly to Base64
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        // Create canvas to resize and compress image to avoid huge base64 strings
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 900;
        const MAX_HEIGHT = 900;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          setFormState((prev) => ({ ...prev, image: compressedDataUrl }));
          showNotification('Foto berhasil diambil & siap disimpan!');
        }
        setIsCompressing(false);
      };
      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
    // Reset file input
    e.target.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      alert('Nama produk tidak boleh kosong!');
      return;
    }

    const finalCategory =
      formState.category === 'CUSTOM'
        ? formState.customCategory.trim() || 'Spesial'
        : formState.category;

    const slug = formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formState.name,
        price: Number(formState.price),
        originalPrice: Number(formState.originalPrice),
        category: finalCategory,
        description: formState.description,
        image: formState.image,
        isBestSeller: formState.isBestSeller,
        stock: Number(formState.stock),
        weightGrams: Number(formState.weightGrams) || 500,
        slug,
      });
      showNotification(`Produk "${formState.name}" berhasil diperbarui!`);
    } else {
      addProduct({
        name: formState.name,
        slug,
        price: Number(formState.price),
        originalPrice: Number(formState.originalPrice),
        rating: 5.0,
        reviewsCount: 1,
        category: finalCategory,
        description: formState.description,
        image: formState.image,
        isBestSeller: formState.isBestSeller,
        stock: Number(formState.stock),
        weightGrams: Number(formState.weightGrams) || 500,
      });
      showNotification(`Produk "${formState.name}" berhasil ditambahkan!`);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus produk "${name}"?`)) {
      deleteProduct(id);
      showNotification(`Produk "${name}" telah dihapus.`);
    }
  };

  const handleResetCatalog = () => {
    if (confirm('Kembalikan semua produk ke data demo default awal?')) {
      resetToDefault();
      showNotification('Katalog bolu telah direset ke data awal.');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans pb-20 lg:pb-0">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 space-y-6 lg:space-y-8 overflow-y-auto w-full">
        
        {/* Toast alert notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header with Title and Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-pink-500/20 text-pink-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-pink-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-pink-400" /> Manajemen Produk Tanpa Koding
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">
                • {products.length} Varian Terdaftar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Katalog Produk Bolu Gulung
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Bisa langsung ganti foto kamera HP, ubah harga, sesuaikan berat pengiriman, dan atur stok real-time!
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleResetCatalog}
              className="p-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold transition flex items-center gap-1.5"
              title="Reset ke Data Demo Awal"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden md:inline">Reset Demo</span>
            </button>

            <button
              onClick={handleOpenAddModal}
              className="flex-1 sm:flex-none bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-pink-glow transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Produk Baru</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama bolu / kata kunci..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-pink-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['Semua', ...existingCategories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedCategoryFilter === cat
                      ? 'bg-pink-600 text-white shadow-pink-glow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            RESPONSIVE PRODUCT LIST:
            - Mobile & Tablet: High-Usability Cards with Big Touch Targets
            - Desktop: Full Data Table
            ========================================================================= */}

        {/* 1. MOBILE / TABLET VIEW (Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3 relative overflow-hidden"
            >
              {/* Top Row: Photo & Basic Info */}
              <div className="flex gap-3.5 items-start">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-700 bg-slate-800 shadow-md">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized={product.image.startsWith('data:')}
                    className="object-cover"
                  />
                  {product.isBestSeller && (
                    <span className="absolute top-1 left-1 bg-yellow-400 text-yellow-950 text-[9px] font-black px-1.5 py-0.2 rounded-md shadow">
                      BEST
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold text-pink-400 bg-pink-950/80 px-2 py-0.5 rounded-full border border-pink-500/30">
                      {product.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {product.weightGrams || 500}g
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-sm mt-1 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-pink-400 font-extrabold text-sm">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-slate-500 line-through text-[11px]">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Description preview */}
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {product.description}
              </p>

              {/* Bottom Row: Stock Stepper & Quick Action Buttons */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                {/* Stock Controls */}
                <div className="flex items-center gap-1 bg-slate-800/80 rounded-xl px-2 py-1 border border-slate-700/60">
                  <span className="text-[10px] text-slate-400 font-bold mr-1">Stok:</span>
                  <button
                    onClick={() => updateStock(product.id, -1)}
                    className="w-5 h-5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center text-xs"
                    title="Kurangi Stok"
                  >
                    -
                  </button>
                  <span
                    className={`font-mono text-xs font-black px-1.5 ${
                      product.stock <= 5 ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {product.stock}
                  </span>
                  <button
                    onClick={() => updateStock(product.id, 1)}
                    className="w-5 h-5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-bold flex items-center justify-center text-xs"
                    title="Tambah Stok"
                  >
                    +
                  </button>
                </div>

                {/* Edit & Delete Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEditModal(product)}
                    className="py-1.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-pink-glow flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Ubah</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800/40"
                    title="Hapus Produk"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. DESKTOP VIEW (Data Table) */}
        <div className="hidden lg:block bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3.5">Foto</th>
                <th className="p-3.5">Nama Produk Bolu</th>
                <th className="p-3.5">Kategori</th>
                <th className="p-3.5">Harga Jual</th>
                <th className="p-3.5">Stok Fisik</th>
                <th className="p-3.5">Berat (Gram)</th>
                <th className="p-3.5 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 shadow-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized={product.image.startsWith('data:')}
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-3.5 font-bold text-white max-w-xs">
                    <div className="text-sm">{product.name}</div>
                    <div className="text-[11px] text-slate-400 font-normal line-clamp-1 mt-0.5">
                      {product.description}
                    </div>
                    {product.isBestSeller && (
                      <span className="text-[9px] font-extrabold text-yellow-400 bg-yellow-950/80 px-2 py-0.5 rounded-full border border-yellow-500/40 inline-block mt-1">
                        BEST SELLER
                      </span>
                    )}
                  </td>
                  <td className="p-3.5">
                    <span className="bg-pink-950 text-pink-300 text-[10px] font-extrabold px-3 py-1 rounded-full border border-pink-500/30">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-extrabold text-pink-400 text-sm">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-[11px] text-slate-500 line-through">
                        Rp {product.originalPrice.toLocaleString('id-ID')}
                      </div>
                    )}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateStock(product.id, -1)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span
                        className={`font-mono font-bold px-1 ${
                          product.stock <= 5 ? 'text-rose-400 font-black' : 'text-slate-200'
                        }`}
                      >
                        {product.stock} Pcs
                      </span>
                      <button
                        onClick={() => updateStock(product.id, 1)}
                        className="w-5 h-5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-3.5 font-mono text-slate-300">
                    {product.weightGrams || 500}g
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEditModal(product)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-pink-600 hover:text-white text-slate-200 transition"
                      title="Edit Produk"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="p-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 transition"
                      title="Hapus Produk"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-3">
            <PackageCheck className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-extrabold text-base text-white">Tidak ada produk ditemukan</h3>
            <p className="text-xs text-slate-400">
              Coba ganti kata kunci pencarian atau tambahkan produk baru sekarang.
            </p>
          </div>
        )}

        {/* =========================================================================
            MODAL FORM: TAMBAH / EDIT PRODUK DARI HP
            ========================================================================= */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-5 sm:p-7 border border-slate-700 shadow-2xl space-y-5 text-white max-h-[92vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <h3 className="font-extrabold text-lg text-white">
                    {editingProduct ? 'Ubah Data Produk Bolu' : 'Tambah Produk Bolu Baru'}
                  </h3>
                  <p className="text-[11px] text-pink-400 font-medium">
                    Update langsung tersimpan di sistem & HP
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {/* 1. PHOTO UPLOADER SECTION (Mobile Friendly) */}
                <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-extrabold text-slate-200 block text-xs">
                      Foto Produk (Bisa dari HP / Kamera) *
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPresetGallery(!showPresetGallery)}
                      className="text-[11px] font-bold text-pink-400 hover:text-pink-300 underline"
                    >
                      {showPresetGallery ? 'Tutup Pustaka Foto' : 'Pilih dari Pustaka HD'}
                    </button>
                  </div>

                  {/* Photo Preview and Action Buttons */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-pink-500/50 bg-slate-900 shrink-0 shadow-lg">
                      <Image
                        src={formState.image}
                        alt="Preview Foto Bolu"
                        fill
                        unoptimized={formState.image.startsWith('data:')}
                        className="object-cover"
                      />
                      {isCompressing && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[10px] text-white">
                          Memproses...
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 flex-1">
                      {/* Hidden File Inputs */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        ref={cameraInputRef}
                        onChange={handleImageFileChange}
                        className="hidden"
                      />

                      <div className="grid grid-cols-2 gap-2">
                        {/* Button 1: Camera capture */}
                        <button
                          type="button"
                          onClick={() => cameraInputRef.current?.click()}
                          className="py-2.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-pink-glow"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Ambil Kamera HP</span>
                        </button>

                        {/* Button 2: File gallery */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="py-2.5 px-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5"
                        >
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>Galeri Foto HP</span>
                        </button>
                      </div>

                      <p className="text-[10px] text-slate-400 leading-tight">
                        Foto otomatis dikompres agar ringan & langsung tampil di menu website pembeli.
                      </p>
                    </div>
                  </div>

                  {/* Preset Cake Photos Gallery */}
                  {showPresetGallery && (
                    <div className="pt-3 border-t border-slate-700 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase">
                        Pilih Cepat Foto HD Siap Pakai:
                      </span>
                      <div className="grid grid-cols-4 gap-2">
                        {PRESET_CAKE_PHOTOS.map((cake, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setFormState((prev) => ({ ...prev, image: cake.url }));
                              showNotification(`Foto ${cake.name} dipilih!`);
                            }}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                              formState.image === cake.url
                                ? 'border-pink-500 ring-2 ring-pink-500'
                                : 'border-slate-700 hover:border-pink-400'
                            }`}
                          >
                            <Image src={cake.url} alt={cake.name} fill className="object-cover" />
                            <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[8px] text-white font-bold py-0.5 text-center truncate">
                              {cake.tag}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manual URL input option */}
                  <div className="pt-1">
                    <input
                      type="text"
                      placeholder="Atau tempel URL gambar langsung di sini..."
                      value={formState.image}
                      onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-[11px] focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* 2. PRODUCT NAME */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nama Bolu Gulung *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bolu Gulung Keju Super Lumer"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* 3. PRICES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Harga Jual (Rp) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={formState.price}
                      onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Harga Asli / Coret (Rp)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={500}
                      value={formState.originalPrice}
                      onChange={(e) =>
                        setFormState({ ...formState, originalPrice: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                    />
                  </div>
                </div>

                {/* 4. CATEGORY & WEIGHT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kategori Bolu *</label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                    >
                      <option value="Best Seller">Best Seller</option>
                      <option value="Spesial">Spesial</option>
                      <option value="Klasik">Klasik</option>
                      <option value="Premium">Premium</option>
                      <option value="CUSTOM">+ Tambah Kategori Baru</option>
                    </select>

                    {formState.category === 'CUSTOM' && (
                      <input
                        type="text"
                        placeholder="Ketik kategori baru..."
                        value={formState.customCategory}
                        onChange={(e) =>
                          setFormState({ ...formState, customCategory: e.target.value })
                        }
                        className="w-full mt-2 px-3 py-2 rounded-xl bg-slate-800 border border-pink-500 text-white text-xs"
                      />
                    )}
                  </div>

                  <div>
                    <label className="font-bold text-slate-300 block mb-1">
                      Berat Bolu (Gram) *
                    </label>
                    <input
                      type="number"
                      required
                      min={100}
                      value={formState.weightGrams}
                      onChange={(e) =>
                        setFormState({ ...formState, weightGrams: Number(e.target.value) })
                      }
                      placeholder="500"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Digunakan kurir JNE/SiCepat untuk hitung ongkir.
                    </span>
                  </div>
                </div>

                {/* 5. STOCK */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Stok Tersedia (Pcs) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formState.stock}
                    onChange={(e) => setFormState({ ...formState, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  />
                </div>

                {/* 6. DESCRIPTION */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Deskripsi Bolu *</label>
                  <textarea
                    rows={3}
                    required
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="Jelaskan kelembutan cake, isian cream, taburan keju/cokelat..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  ></textarea>
                </div>

                {/* 7. BEST SELLER BADGE */}
                <div className="flex items-center space-x-2.5 pt-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
                  <input
                    type="checkbox"
                    id="bestseller-checkbox"
                    checked={formState.isBestSeller}
                    onChange={(e) => setFormState({ ...formState, isBestSeller: e.target.checked })}
                    className="w-4 h-4 rounded border-slate-700 text-pink-600 focus:ring-pink-500"
                  />
                  <label htmlFor="bestseller-checkbox" className="font-bold text-slate-200 cursor-pointer">
                    Tampilkan sebagai Produk Best Seller di Beranda
                  </label>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="pt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 text-white font-extrabold hover:from-pink-600 hover:to-rose-700 shadow-pink-glow flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan & Tayang</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
