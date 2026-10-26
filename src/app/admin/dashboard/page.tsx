'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminSidebar from '@/components/AdminSidebar';
import { useOrderStore } from '@/store/useOrderStore';
import { useProductStore } from '@/store/useProductStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store/useUserStore';
import {
  DollarSign,
  ShoppingBag,
  CheckCircle,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
  Printer,
  AlertTriangle,
  ShieldCheck,
  UserCheck,
  Percent,
  Coins,
  Users,
  CreditCard,
  Package,
  Zap,
} from 'lucide-react';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  const orders = useOrderStore((state) => state.orders);
  const products = useProductStore((state) => state.products);
  const { adminUser, logout } = useAuthStore();
  const { users } = useUserStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const paidOrders = orders.filter((o) => o.paymentStatus === 'Lunas');
  const totalRevenue = paidOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const cogsExpenses = Math.round(totalRevenue * 0.55);
  const netProfit = totalRevenue - cogsExpenses;
  const netProfitMargin = totalRevenue > 0 ? ((netProfit / totalRevenue) * 100).toFixed(1) : '45.0';
  const totalSuccessOrders = paidOrders.length;
  const pendingOrders = orders.filter(
    (o) => o.status === 'Menunggu Pembayaran' || o.status === 'Diproses'
  ).length;
  const totalRollsSold = paidOrders.reduce(
    (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
    0
  );
  const lowStockProducts = products.filter((p) => p.stock <= 5);
  const totalUsers = users.length;
  const newUsersThisWeek = users.filter((u) => {
    const created = new Date(u.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return created >= weekAgo;
  }).length;

  const salesChartData = [
    { day: 'Sen', sales: 1250000, ordersCount: 8, profit: 562500 },
    { day: 'Sel', sales: 1800000, ordersCount: 12, profit: 810000 },
    { day: 'Rab', sales: 1450000, ordersCount: 10, profit: 652500 },
    { day: 'Kam', sales: 2100000, ordersCount: 15, profit: 945000 },
    { day: 'Jum', sales: 2950000, ordersCount: 22, profit: 1327500 },
    { day: 'Sab', sales: 3800000, ordersCount: 28, profit: 1710000 },
    { day: 'Min', sales: 4200000, ordersCount: 32, profit: 1890000 },
  ];

  const categoryData = [
    { name: 'Best Seller', value: 48, color: '#ec4899' },
    { name: 'Spesial', value: 24, color: '#f43f5e' },
    { name: 'Premium', value: 18, color: '#a855f7' },
    { name: 'Klasik', value: 10, color: '#3b82f6' },
  ];

  const paymentMethodData = [
    { method: 'QRIS', count: 45, color: '#10b981' },
    { method: 'Transfer Bank', count: 28, color: '#3b82f6' },
    { method: 'GoPay', count: 15, color: '#f59e0b' },
    { method: 'OVO', count: 8, color: '#8b5cf6' },
    { method: 'DANA', count: 4, color: '#ec4899' },
  ];

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans pb-16 lg:pb-0">
      <AdminSidebar />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 space-y-6 lg:space-y-8 overflow-y-auto w-full">

        {/* TOP HEADER */}
        <div className="bg-gradient-to-r from-slate-900 via-pink-950/40 to-slate-900 p-5 rounded-3xl border border-pink-500/20 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-pink-400">
                Live Store Monitoring
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dashboard Penjualan
            </h1>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Admin: </span>
              <strong className="text-white font-extrabold bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700">
                {adminUser.name}
              </strong>
              <span className="text-slate-500">•</span>
              <span className="text-pink-300 font-mono text-[11px]">{adminUser.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrintReport}
              className="py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700 flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-pink-400" />
              <span>Cetak Laporan</span>
            </button>

            <Link
              href="/admin/produk"
              className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-extrabold shadow-pink-glow transition flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Kelola Produk</span>
            </Link>
          </div>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <div className="bg-amber-950/60 border border-amber-500/40 p-4 rounded-3xl flex items-center justify-between gap-3 text-amber-200">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-100">
                  Peringatan Stok Kritis ({lowStockProducts.length} Varian):
                </p>
                <p className="text-[11px] text-amber-300/80">
                  {lowStockProducts.map((p) => `${p.name} (Sisa ${p.stock})`).join(', ')}
                </p>
              </div>
            </div>
            <Link
              href="/admin/produk"
              className="text-xs font-extrabold bg-amber-500 text-amber-950 px-3 py-1.5 rounded-xl hover:bg-amber-400 shrink-0 transition"
            >
              Isi Stok
            </Link>
          </div>
        )}

        {/* KEY METRICS — 5 cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

          <div className="bg-gradient-to-br from-slate-900 to-pink-950/50 p-5 rounded-3xl border border-pink-500/30 shadow-xl space-y-2 col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Omset</span>
              <div className="w-9 h-9 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              Rp {totalRevenue.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% bulan ini</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/40 p-5 rounded-3xl border border-emerald-500/30 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Laba Bersih</span>
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-300">
              Rp {netProfit.toLocaleString('id-ID')}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
              <Percent className="w-3 h-3" />
              <span>Margin {netProfitMargin}%</span>
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pesanan Lunas</span>
              <div className="w-9 h-9 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {totalSuccessOrders} Pesanan
            </div>
            <div className="text-[11px] text-slate-400">
              {totalRollsSold} Bolu terkirim
            </div>
          </div>

          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Antrian</span>
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {pendingOrders} Transaksi
            </div>
            <div className="text-[11px] text-amber-400 font-semibold">
              Butuh input resi
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-violet-950/40 p-5 rounded-3xl border border-violet-500/30 shadow-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total User</span>
              <div className="w-9 h-9 rounded-2xl bg-violet-500/20 text-violet-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-white">
              {totalUsers} User
            </div>
            <div className="text-[11px] text-violet-400 font-semibold">
              +{newUsersThisWeek} minggu ini
            </div>
          </div>

        </div>

        {/* CHARTS ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Area Chart */}
          <div className="lg:col-span-8 bg-slate-900 p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-lg text-white">Grafik Omset & Laba Penjualan</h3>
                <p className="text-xs text-slate-400">Tren pendapatan harian 7 hari terakhir</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-400 bg-pink-950 px-2.5 py-1 rounded-full border border-pink-500/30">
                  <span className="w-2 h-2 rounded-full bg-pink-500" /> Omset
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" /> Laba
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ec4899', borderRadius: '16px', color: '#fff' }}
                    formatter={(val: any, name: any) => [
                      `Rp ${Number(val).toLocaleString('id-ID')}`,
                      name === 'sales' ? 'Omset' : 'Laba',
                    ]}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={0.6} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="lg:col-span-4 bg-slate-900 p-5 sm:p-7 rounded-3xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-white">Distribusi Kategori</h3>
              <p className="text-xs text-slate-400">Pangsa penjualan per varian</p>
            </div>
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ec4899', borderRadius: '16px' }}
                    formatter={(val: any) => [`${val}%`, 'Kontribusi']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-800">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="text-slate-300 truncate">{cat.name}:</span>
                  <strong className="text-white">{cat.value}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAYMENT METHOD STATS */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-pink-400" />
                Statistik Metode Pembayaran
              </h3>
              <p className="text-xs text-slate-400">Distribusi penggunaan metode bayar pelanggan</p>
            </div>
            <Link href="/admin/pembayaran" className="text-xs text-pink-400 font-bold hover:underline flex items-center gap-1">
              Kelola Pembayaran <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {paymentMethodData.map((pm) => (
              <div key={pm.method} className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 space-y-2 text-center">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto" style={{ backgroundColor: pm.color + '25' }}>
                  <CreditCard className="w-4 h-4" style={{ color: pm.color }} />
                </div>
                <div className="font-extrabold text-white text-lg">{pm.count}%</div>
                <div className="text-[10px] text-slate-400 font-semibold">{pm.method}</div>
                <div className="w-full bg-slate-700 rounded-full h-1">
                  <div className="h-1 rounded-full transition-all" style={{ width: `${pm.count}%`, backgroundColor: pm.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FINANCIAL SUMMARY */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider block">
                Laporan Keuangan
              </span>
              <h3 className="font-extrabold text-lg text-white">Struktur Keuangan Bisnis</h3>
            </div>
            <span className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-xl border border-slate-700">
              Periode Aktif {new Date().getFullYear()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">1. Total Omset Kotor</span>
              <span className="text-xl font-extrabold text-white">Rp {totalRevenue.toLocaleString('id-ID')}</span>
              <p className="text-[10px] text-slate-400">100% dari transaksi pelanggan lunas</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">2. HPP & Bahan Baku (55%)</span>
              <span className="text-xl font-extrabold text-rose-400">Rp {cogsExpenses.toLocaleString('id-ID')}</span>
              <p className="text-[10px] text-slate-400">Tepung, telur, butter, keju & kemasan</p>
            </div>
            <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-xs text-slate-400 font-semibold block">3. Laba Bersih Usaha (45%)</span>
              <span className="text-xl font-extrabold text-emerald-400">Rp {netProfit.toLocaleString('id-ID')}</span>
              <p className="text-[10px] text-emerald-400/90 font-bold">Keuntungan bersih pengusaha</p>
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">Transaksi Terbaru</h3>
              <p className="text-xs text-slate-400">Pesanan dari website publik</p>
            </div>
            <Link href="/admin/pesanan" className="text-xs text-pink-400 font-bold hover:underline flex items-center gap-1">
              <span>Semua Pesanan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">No. Order</th>
                  <th className="p-3">Pelanggan</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Metode Bayar</th>
                  <th className="p-3">Status Bayar</th>
                  <th className="p-3">Status Kirim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/50 transition">
                    <td className="p-3 font-mono font-bold text-pink-400">{ord.orderNumber}</td>
                    <td className="p-3 font-semibold text-white">
                      <div>{ord.customerName}</div>
                      <span className="text-[10px] text-slate-400">{ord.shippingAddress.city}</span>
                    </td>
                    <td className="p-3 font-extrabold text-white">Rp {ord.totalAmount.toLocaleString('id-ID')}</td>
                    <td className="p-3 uppercase font-bold text-slate-400">{ord.paymentMethod.replace('_', ' ')}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        ord.paymentStatus === 'Lunas'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {ord.paymentStatus}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-200">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 font-semibold">
                      Belum ada transaksi masuk
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
