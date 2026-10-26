'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

// Secret admin URL — tidak ada link ke halaman ini dari website publik
export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login('admin@bolugulungguling.com', password);
      if (success) {
        router.push('/admin/dashboard');
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        if (newAttempts >= 3) {
          setError(`Akses ditolak. Terlalu banyak percobaan. Hubungi owner via WhatsApp: 085764952471`);
        } else {
          setError(`Kata sandi salah. (${newAttempts}/3 percobaan)`);
        }
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Subtle background only */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#1e1b4b_0%,_#0f172a_70%)] pointer-events-none" />

      <div className="max-w-sm w-full bg-slate-900 rounded-3xl p-7 border border-slate-800 shadow-2xl space-y-6 relative z-10">

        {/* Minimal header — no store branding */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-7 h-7 text-slate-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white">Akses Terproteksi</h1>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              admin.panel // authorized only
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-950/80 border border-red-500/40 p-3.5 rounded-2xl text-red-200 text-xs font-semibold text-center leading-relaxed">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">
              Kata Sandi Admin
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={attempts >= 5}
                className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-slate-500 transition placeholder:text-slate-600 disabled:opacity-40"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || attempts >= 5}
            className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 font-bold text-sm text-slate-200 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 text-slate-400">
                <span className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Memverifikasi...
              </span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Masuk</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </>
            )}
          </button>
        </form>

        {/* WhatsApp confirmation note */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
            Akses terbatas hanya untuk pemilik toko.<br/>
            Konfirmasi via{' '}
            <a
              href="https://wa.me/6285764952471"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-500 font-bold"
            >
              WhatsApp 085764952471
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
