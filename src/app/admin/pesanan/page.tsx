'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useOrderStore } from '@/store/useOrderStore';
import { Order, OrderStatus } from '@/lib/types';
import {
  Truck,
  CheckCircle2,
  Clock,
  Eye,
  Edit2,
  Search,
  Filter,
  X,
  Save,
  Sparkles,
  MapPin,
  Phone,
  Package,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function AdminPesananPage() {
  const [mounted, setMounted] = useState(false);
  const { orders, updateOrderStatus, updatePaymentStatus } = useOrderStore();

  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Diproses');
  const [newPaymentStatus, setNewPaymentStatus] = useState<'Lunas' | 'Belum Bayar' | 'Gagal'>('Lunas');
  const [trackingNumberInput, setTrackingNumberInput] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus =
      selectedStatusFilter === 'Semua' || ord.status === selectedStatusFilter;
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerPhone.includes(searchQuery);

    return matchesStatus && matchesSearch;
  });

  const handleOpenUpdateModal = (ord: Order) => {
    setSelectedOrder(ord);
    setNewStatus(ord.status);
    setNewPaymentStatus(ord.paymentStatus);
    setTrackingNumberInput(ord.trackingNumber || '');
    setIsUpdateModalOpen(true);
  };

  const handleSaveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, newStatus, trackingNumberInput);
    updatePaymentStatus(selectedOrder.id, newPaymentStatus);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 lg:pb-0">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 space-y-6 lg:space-y-8 overflow-y-auto w-full">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-pink-500/20 text-pink-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-pink-500/30 flex items-center gap-1">
                <Truck className="w-3 h-3 text-pink-400" /> Pengiriman & Resi Logistik
              </span>
              <span className="text-slate-400 text-xs hidden sm:inline">
                • {orders.length} Total Transaksi
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              Manajemen Pesanan & Resi Pengiriman
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Pantau transaksi pelanggan, update nomor resi kurir, dan verifikasi status pembayaran.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari No. Order / Nama / No. HP..."
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

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedStatusFilter === st
                      ? 'bg-pink-600 text-white shadow-pink-glow'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            1. MOBILE / TABLET VIEW (Cards)
            ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-mono font-bold text-pink-400 text-xs block">
                    {ord.orderNumber}
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">
                    {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    ord.paymentStatus === 'Lunas'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {ord.paymentStatus}
                </span>
              </div>

              {/* Customer Info */}
              <div className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-white">
                  <span>{ord.customerName}</span>
                  <span className="font-mono text-slate-300">{ord.customerPhone}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  {ord.shippingAddress.city} • {ord.courier.name}
                </div>
                {ord.trackingNumber ? (
                  <div className="text-[10px] font-mono text-emerald-400 font-bold pt-0.5">
                    Resi: {ord.trackingNumber}
                  </div>
                ) : (
                  <div className="text-[10px] text-amber-400 italic pt-0.5">
                    Belum input resi kurir
                  </div>
                )}
              </div>

              {/* Items summary */}
              <div className="text-[11px] text-slate-300 space-y-0.5">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="truncate">{it.productName} (x{it.quantity})</span>
                    <span className="font-mono text-slate-400 shrink-0">
                      Rp {(it.productPrice * it.quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Nominal:</span>
                  <span className="text-sm font-extrabold text-pink-400">
                    Rp {ord.totalAmount.toLocaleString('id-ID')}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenUpdateModal(ord)}
                  className="py-1.5 px-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-pink-glow flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Update Resi</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* =========================================================================
            2. DESKTOP VIEW (Data Table)
            ========================================================================= */}
        <div className="hidden lg:block bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3">No. Order</th>
                <th className="p-3">Waktu Transaksi</th>
                <th className="p-3">Pelanggan</th>
                <th className="p-3">Kurir & No. Resi</th>
                <th className="p-3">Total Nominal</th>
                <th className="p-3">Status Bayar</th>
                <th className="p-3">Status Pesanan</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/50 transition">
                  <td className="p-3 font-mono font-bold text-pink-400">{ord.orderNumber}</td>
                  <td className="p-3 text-slate-400">
                    {new Date(ord.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-3 font-semibold text-white">
                    <div>{ord.customerName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{ord.customerPhone}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-200">{ord.courier.name}</div>
                    {ord.trackingNumber ? (
                      <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        Resi: {ord.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-400 italic">Belum ada resi</span>
                    )}
                  </td>
                  <td className="p-3 font-extrabold text-white">
                    Rp {ord.totalAmount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        ord.paymentStatus === 'Lunas'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-200">{ord.status}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleOpenUpdateModal(ord)}
                      className="px-3 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-[11px] transition shadow-pink-glow flex items-center gap-1.5 ml-auto"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Update Status</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12 bg-slate-900 rounded-3xl border border-slate-800 p-8 space-y-3">
            <Package className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="font-extrabold text-base text-white">Tidak ada transaksi ditemukan</h3>
            <p className="text-xs text-slate-400">
              Coba sesuaikan filter status atau kata kunci pencarian.
            </p>
          </div>
        )}

        {/* =========================================================================
            MODAL UPDATE PESANAN, PEMBAYARAN & RESI
            ========================================================================= */}
        {isUpdateModalOpen && selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-slate-800 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-base">Update Status & Nomor Resi</h3>
                  <p className="text-[11px] text-pink-400 font-mono">
                    Order ID: {selectedOrder.orderNumber}
                  </p>
                </div>
                <button
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order items recap */}
              <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>
                    Pelanggan: <strong>{selectedOrder.customerName}</strong>
                  </span>
                  <span>
                    Kurir: <strong>{selectedOrder.courier.name}</strong>
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Alamat: {selectedOrder.shippingAddress.fullAddress}, {selectedOrder.shippingAddress.city}
                </div>
                <div className="pt-1 text-[11px] text-slate-300 border-t border-slate-700/60">
                  Total: <strong className="text-pink-400 font-mono">Rp {selectedOrder.totalAmount.toLocaleString('id-ID')}</strong> ({selectedOrder.paymentMethod.replace('_', ' ').toUpperCase()})
                </div>
              </div>

              <form onSubmit={handleSaveUpdate} className="space-y-4 text-xs">
                {/* 1. Payment Status */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Status Pembayaran *
                  </label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) =>
                      setNewPaymentStatus(e.target.value as 'Lunas' | 'Belum Bayar' | 'Gagal')
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  >
                    <option value="Lunas">Lunas (Uang Masuk Terverifikasi)</option>
                    <option value="Belum Bayar">Belum Bayar (Menunggu Transfer)</option>
                    <option value="Gagal">Gagal / Dibatalkan</option>
                  </select>
                </div>

                {/* 2. Order Fulfillment Status */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Status Transaksi *</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  >
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Diproses">Diproses (Dapur Sedang Memanggang Bolu)</option>
                    <option value="Dikirim">Dikirim Kurir Ekspedisi</option>
                    <option value="Selesai">Selesai (Sampai di Tangan Pelanggan)</option>
                    <option value="Batal">Batal</option>
                  </select>
                </div>

                {/* 3. Tracking Number */}
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Nomor Resi Pengiriman Kurir ({selectedOrder.courier.name})
                  </label>
                  <input
                    type="text"
                    value={trackingNumberInput}
                    onChange={(e) => setTrackingNumberInput(e.target.value)}
                    placeholder="Contoh: JNE-88902144, SCP-991204, GOSEND-882..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white font-semibold focus:outline-none focus:border-pink-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Resi ini otomatis dapat dilacak oleh pembeli di fitur Lacak Pesanan pada halaman utama.
                  </span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold hover:from-pink-600 hover:to-rose-700 shadow-pink-glow flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan</span>
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
