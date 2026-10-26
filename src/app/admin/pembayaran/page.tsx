'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import {
  CreditCard,
  QrCode,
  Building2,
  Wallet,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sparkles,
  Smartphone,
  Copy,
  ExternalLink,
} from 'lucide-react';

interface PaymentConfig {
  id: string;
  type: 'qris' | 'bank' | 'ewallet';
  name: string;
  accountNumber?: string;
  accountName?: string;
  qrisImageUrl?: string;
  instructions?: string;
  isActive: boolean;
  icon: string;
}

const DEFAULT_PAYMENTS: PaymentConfig[] = [
  {
    id: 'qris-main',
    type: 'qris',
    name: 'QRIS Universal',
    qrisImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021126570011ID.DANA.WWW011893600915305764952471020210415040015303360540165802ID5912Bolu+Gulung6013Metro+Lampung6304ABCD',
    instructions: 'Scan QR menggunakan aplikasi apapun: GoPay, OVO, DANA, ShopeePay, Mobile Banking.',
    isActive: true,
    icon: '🔲',
  },
  {
    id: 'bca-va',
    type: 'bank',
    name: 'BCA Transfer',
    accountNumber: '1234567890',
    accountName: 'ALEN BOLU GULUNG',
    instructions: 'Transfer ke nomor rekening di atas, kirimkan bukti transfer ke WhatsApp.',
    isActive: true,
    icon: '🏦',
  },
  {
    id: 'bri-va',
    type: 'bank',
    name: 'BRI Transfer',
    accountNumber: '0987654321',
    accountName: 'ALEN BOLU GULUNG',
    instructions: 'Transfer ke nomor rekening BRI, kirimkan bukti transfer ke WhatsApp.',
    isActive: true,
    icon: '🏦',
  },
  {
    id: 'gopay',
    type: 'ewallet',
    name: 'GoPay',
    accountNumber: '085764952471',
    accountName: 'Alen',
    instructions: 'Transfer GoPay ke nomor di atas, kirimkan screenshot ke WhatsApp.',
    isActive: true,
    icon: '💚',
  },
  {
    id: 'ovo',
    type: 'ewallet',
    name: 'OVO',
    accountNumber: '085764952471',
    accountName: 'Alen',
    instructions: 'Transfer OVO ke nomor di atas, kirimkan screenshot ke WhatsApp.',
    isActive: true,
    icon: '💜',
  },
  {
    id: 'dana',
    type: 'ewallet',
    name: 'DANA',
    accountNumber: '085764952471',
    accountName: 'Alen',
    instructions: 'Transfer DANA ke nomor di atas, kirimkan screenshot ke WhatsApp.',
    isActive: true,
    icon: '💙',
  },
  {
    id: 'shopeepay',
    type: 'ewallet',
    name: 'ShopeePay',
    accountNumber: '085764952471',
    accountName: 'Alen',
    instructions: 'Transfer ShopeePay ke nomor di atas.',
    isActive: false,
    icon: '🧡',
  },
];

const PAYMENT_STORAGE_KEY = 'bolu-payment-config';

export default function AdminPembayaranPage() {
  const [mounted, setMounted] = useState(false);
  const [payments, setPayments] = useState<PaymentConfig[]>(DEFAULT_PAYMENTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PaymentConfig>>({});
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'qris' | 'bank' | 'ewallet'>('qris');

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(PAYMENT_STORAGE_KEY);
      if (stored) setPayments(JSON.parse(stored));
    } catch {}
  }, []);

  const savePayments = (updated: PaymentConfig[]) => {
    setPayments(updated);
    localStorage.setItem(PAYMENT_STORAGE_KEY, JSON.stringify(updated));
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  if (!mounted) return null;

  const handleEdit = (payment: PaymentConfig) => {
    setEditingId(payment.id);
    setEditForm({ ...payment });
  };

  const handleSaveEdit = () => {
    const updated = payments.map((p) => (p.id === editingId ? { ...p, ...editForm } : p));
    savePayments(updated);
    setEditingId(null);
    showToast('Metode pembayaran berhasil diperbarui!');
  };

  const handleToggleActive = (id: string) => {
    const updated = payments.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p));
    savePayments(updated);
    showToast('Status pembayaran diperbarui.');
  };

  const handleCopyNumber = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(`Disalin: ${text}`);
  };

  const tabs = [
    { id: 'qris' as const, label: 'QRIS', icon: QrCode, count: payments.filter(p => p.type === 'qris').length },
    { id: 'bank' as const, label: 'Bank Transfer', icon: Building2, count: payments.filter(p => p.type === 'bank').length },
    { id: 'ewallet' as const, label: 'E-Wallet', icon: Wallet, count: payments.filter(p => p.type === 'ewallet').length },
  ];

  const displayPayments = payments.filter((p) => p.type === activeTab);

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 lg:pb-0">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 space-y-6 overflow-y-auto w-full">

        {/* Toast */}
        {toast && (
          <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            {toast}
          </div>
        )}

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 p-5 rounded-3xl border border-emerald-500/20 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
              Payment Gateway Config
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Kelola Metode Pembayaran
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Atur QRIS, nomor rekening bank, dan e-wallet. Aktif/nonaktifkan sesuai kebutuhan.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'QRIS Aktif', value: payments.filter(p => p.type === 'qris' && p.isActive).length, icon: QrCode, color: 'emerald' },
            { label: 'Bank Transfer', value: payments.filter(p => p.type === 'bank' && p.isActive).length, icon: Building2, color: 'blue' },
            { label: 'E-Wallet Aktif', value: payments.filter(p => p.type === 'ewallet' && p.isActive).length, icon: Wallet, color: 'violet' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">metode aktif</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 rounded-full ${activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Payment Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayPayments.map((payment) => (
            <div key={payment.id} className={`bg-slate-900 rounded-2xl border shadow-xl overflow-hidden ${
              payment.isActive ? 'border-slate-700' : 'border-slate-800 opacity-60'
            }`}>

              {/* Card Header */}
              <div className={`p-4 flex items-center justify-between ${
                payment.isActive
                  ? 'bg-gradient-to-r from-slate-800 to-slate-800'
                  : 'bg-slate-800/40'
              }`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{payment.icon}</span>
                  <div>
                    <h3 className="font-extrabold text-white text-sm">{payment.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      payment.isActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-700 text-slate-500 border border-slate-600'
                    }`}>
                      {payment.isActive ? '✓ Aktif' : '✗ Nonaktif'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleActive(payment.id)}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    payment.isActive ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all ${
                    payment.isActive ? 'left-6' : 'left-0.5'
                  }`} />
                </button>
              </div>

              {/* Card Body */}
              {editingId === payment.id ? (
                <div className="p-4 space-y-3">
                  {payment.type === 'qris' && (
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">URL Gambar QRIS</label>
                      <input
                        type="text"
                        value={editForm.qrisImageUrl || ''}
                        onChange={(e) => setEditForm({ ...editForm, qrisImageUrl: e.target.value })}
                        className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                        placeholder="https://... atau upload URL gambar QRIS"
                      />
                    </div>
                  )}
                  {(payment.type === 'bank' || payment.type === 'ewallet') && (
                    <>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Nomor Rekening / HP</label>
                        <input
                          type="text"
                          value={editForm.accountNumber || ''}
                          onChange={(e) => setEditForm({ ...editForm, accountNumber: e.target.value })}
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Atas Nama</label>
                        <input
                          type="text"
                          value={editForm.accountName || ''}
                          onChange={(e) => setEditForm({ ...editForm, accountName: e.target.value })}
                          className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Instruksi Pembayaran</label>
                    <textarea
                      value={editForm.instructions || ''}
                      onChange={(e) => setEditForm({ ...editForm, instructions: e.target.value })}
                      rows={3}
                      className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <Save className="w-3.5 h-3.5" /> Simpan
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="py-2 px-3 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {payment.type === 'qris' && payment.qrisImageUrl && (
                    <div className="flex justify-center">
                      <div className="bg-white p-2 rounded-xl w-32 h-32 flex items-center justify-center overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={payment.qrisImageUrl} alt="QRIS" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  )}

                  {payment.accountNumber && (
                    <div className="bg-slate-800/60 p-3 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400">Nomor</span>
                        <p className="font-mono font-bold text-white text-sm">{payment.accountNumber}</p>
                        {payment.accountName && (
                          <p className="text-[11px] text-slate-400">{payment.accountName}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopyNumber(payment.accountNumber!)}
                        className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white transition"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {payment.instructions && (
                    <p className="text-[11px] text-slate-400 leading-relaxed">{payment.instructions}</p>
                  )}

                  <button
                    onClick={() => handleEdit(payment)}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-700 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                    Edit Data Pembayaran
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl text-xs text-emerald-200 space-y-1">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <Smartphone className="w-4 h-4" />
            Tips Update QRIS:
          </div>
          <p className="text-emerald-400/80">
            Untuk update gambar QRIS, upload foto QRIS Anda ke{' '}
            <a href="https://imgbb.com" target="_blank" rel="noopener noreferrer" className="underline font-bold">imgbb.com</a>
            {' '}atau{' '}
            <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="underline font-bold">postimages.org</a>
            , lalu copy URL gambar dan tempel di form edit QRIS.
          </p>
        </div>

      </main>
    </div>
  );
}
