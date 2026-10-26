'use client';

import React, { useState, useEffect } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { useUserStore, User } from '@/store/useUserStore';
import {
  Users,
  Search,
  X,
  Ban,
  CheckCircle2,
  Trash2,
  ShoppingBag,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
  UserCheck,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

export default function AdminPenggunaPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState<'semua' | 'aktif' | 'blokir'>('semua');
  const { users, blockUser, unblockUser, deleteUser } = useUserStore();

  useEffect(() => { setMounted(true); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  if (!mounted) return null;

  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search);
    const matchFilter =
      filter === 'semua' ? true :
      filter === 'aktif' ? !u.isBlocked :
      u.isBlocked;
    return matchSearch && matchFilter;
  });

  const totalSpent = users.reduce((acc, u) => acc + (u.totalSpent || 0), 0);
  const activeUsers = users.filter((u) => !u.isBlocked).length;
  const blockedUsers = users.filter((u) => u.isBlocked).length;

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

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
        <div className="bg-gradient-to-r from-slate-900 via-violet-950/30 to-slate-900 p-5 rounded-3xl border border-violet-500/20 shadow-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-violet-400">
              User Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manajemen Pengguna
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Kelola akun pembeli, blokir pengguna bermasalah, dan pantau aktivitas.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Pengguna', value: users.length, icon: Users, color: 'violet', suffix: 'Akun' },
            { label: 'Pengguna Aktif', value: activeUsers, icon: UserCheck, color: 'emerald', suffix: 'Aktif' },
            { label: 'Diblokir', value: blockedUsers, icon: Ban, color: 'rose', suffix: 'User' },
            { label: 'Total Belanja', value: `Rp ${totalSpent.toLocaleString('id-ID')}`, icon: TrendingUp, color: 'pink', suffix: '' },
          ].map((stat, i) => {
            const Icon = stat.icon;
            const colorMap: Record<string, string> = {
              violet: 'text-violet-400 bg-violet-500/20 border-violet-500/30',
              emerald: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30',
              rose: 'text-rose-400 bg-rose-500/20 border-rose-500/30',
              pink: 'text-pink-400 bg-pink-500/20 border-pink-500/30',
            };
            return (
              <div key={i} className="bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${colorMap[stat.color]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-xl font-extrabold text-white">
                  {typeof stat.value === 'number' ? stat.value : stat.value}
                  {stat.suffix && <span className="text-xs text-slate-400 font-normal ml-1">{stat.suffix}</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter & Search */}
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, email, atau nomor HP..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-800 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-violet-500"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex gap-1.5">
            {(['semua', 'aktif', 'blokir'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition ${
                  filter === f
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* User Cards — Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {filteredUsers.map((user) => (
            <div key={user.id} className={`bg-slate-900 rounded-2xl p-4 border shadow-lg space-y-3 ${user.isBlocked ? 'border-rose-800/40 opacity-75' : 'border-slate-800'}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm ${user.isBlocked ? 'bg-slate-700' : 'bg-gradient-to-br from-violet-500 to-pink-500'}`}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">{user.name}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{user.email}</p>
                  </div>
                </div>
                {user.isBlocked && (
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-full border border-rose-800/40 shrink-0">
                    Diblokir
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Phone className="w-3 h-3 text-pink-400" />
                  <span>{user.phone || '-'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <ShoppingBag className="w-3 h-3 text-violet-400" />
                  <span>{user.totalOrders || 0} pesanan</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Calendar className="w-3 h-3 text-blue-400" />
                  <span>{formatDate(user.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <TrendingUp className="w-3 h-3" />
                  <span>Rp {(user.totalSpent || 0).toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                {user.phone && (
                  <a
                    href={`https://wa.me/62${user.phone.replace(/^0/, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl bg-emerald-900/50 hover:bg-emerald-900 text-emerald-400 text-xs font-bold text-center border border-emerald-800/40 flex items-center justify-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WA
                  </a>
                )}
                <button
                  onClick={() => {
                    if (user.isBlocked) {
                      unblockUser(user.id);
                      showToast(`${user.name} berhasil diaktifkan kembali.`);
                    } else {
                      blockUser(user.id);
                      showToast(`${user.name} telah diblokir.`);
                    }
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border flex items-center justify-center gap-1 ${
                    user.isBlocked
                      ? 'bg-emerald-950/40 hover:bg-emerald-900 text-emerald-400 border-emerald-800/40'
                      : 'bg-amber-950/40 hover:bg-amber-900 text-amber-400 border-amber-800/40'
                  }`}
                >
                  {user.isBlocked ? <><CheckCircle2 className="w-3.5 h-3.5" /> Aktifkan</> : <><Ban className="w-3.5 h-3.5" /> Blokir</>}
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Hapus akun ${user.name}?`)) {
                      deleteUser(user.id);
                      showToast(`Akun ${user.name} dihapus.`);
                    }
                  }}
                  className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 text-rose-400 border border-rose-800/40"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Table — Desktop */}
        <div className="hidden lg:block bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-4">Pengguna</th>
                <th className="p-4">Kontak</th>
                <th className="p-4">Bergabung</th>
                <th className="p-4">Pesanan</th>
                <th className="p-4">Total Belanja</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className={`hover:bg-slate-800/40 transition ${user.isBlocked ? 'opacity-60' : ''}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm ${user.isBlocked ? 'bg-slate-700' : 'bg-gradient-to-br from-violet-500 to-pink-500'}`}>
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-white">{user.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-slate-300"><Mail className="w-3 h-3 text-pink-400" /> {user.email}</div>
                      <div className="flex items-center gap-1.5 text-slate-400"><Phone className="w-3 h-3 text-emerald-400" /> {user.phone || '-'}</div>
                    </div>
                  </td>
                  <td className="p-4 text-slate-400">{formatDate(user.createdAt)}</td>
                  <td className="p-4 font-bold text-white">{user.totalOrders || 0} pesanan</td>
                  <td className="p-4 font-extrabold text-emerald-400">Rp {(user.totalSpent || 0).toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      user.isBlocked
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {user.isBlocked ? 'Diblokir' : 'Aktif'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {user.phone && (
                      <a
                        href={`https://wa.me/62${user.phone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400"
                        title="Hubungi via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => {
                        if (user.isBlocked) {
                          unblockUser(user.id);
                          showToast(`${user.name} diaktifkan kembali.`);
                        } else {
                          blockUser(user.id);
                          showToast(`${user.name} telah diblokir.`);
                        }
                      }}
                      className={`inline-flex p-2 rounded-xl transition ${
                        user.isBlocked
                          ? 'bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400'
                          : 'bg-amber-950/60 hover:bg-amber-900 text-amber-400'
                      }`}
                      title={user.isBlocked ? 'Aktifkan User' : 'Blokir User'}
                    >
                      {user.isBlocked ? <CheckCircle2 className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus akun ${user.name}?`)) {
                          deleteUser(user.id);
                          showToast(`Akun ${user.name} dihapus.`);
                        }
                      }}
                      className="inline-flex p-2 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-400"
                      title="Hapus Akun"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-500">
                    <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold">Belum ada pengguna terdaftar</p>
                    <p className="text-xs mt-1">Pengguna akan muncul setelah mendaftar di website</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
