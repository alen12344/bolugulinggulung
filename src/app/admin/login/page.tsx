'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Cake,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  Store,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export default function AdminLoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('admin@bolugulungguling.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        router.push('/admin/dashboard');
      } else {
        setError('Email atau password tidak sesuai. Gunakan tombol "Isi Kredensial Demo" di bawah.');
        setIsLoading(false);
      }
    }, 600);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@bolugulungguling.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-pink-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-600/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-rose-600/15 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-pink-500/30 shadow-2xl space-y-6 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 flex items-center justify-center text-white mx-auto shadow-pink-glow border-2 border-white/20">
            <Cake className="w-9 h-9" />
          </div>
          <div>
            <span className="bg-pink-500/20 text-pink-300 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-pink-500/30">
              Admin & Owner Access
            </span>
            <h1 className="text-2xl font-extrabold text-white mt-1.5">
              Portal Admin Bolu Gulung
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Sistem Manajemen Toko & Dashboard Technopreneur
            </p>
          </div>
        </div>

        {/* Quick Demo Access Box */}
        <div className="bg-pink-950/40 border border-pink-500/40 p-4 rounded-2xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-pink-300 font-bold">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Akses Cepat Demo Dosen & Penguji:</span>
            </div>
            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[10px] font-bold text-pink-300 bg-pink-600/40 hover:bg-pink-600 px-2 py-0.5 rounded-lg border border-pink-400/50 transition"
            >
              Isi Otomatis
            </button>
          </div>
          <div className="bg-slate-950/60 p-2 rounded-xl font-mono text-[11px] text-slate-300 space-y-0.5">
            <div>Email: <span className="text-pink-300">admin@bolugulungguling.com</span></div>
            <div>Password: <span className="text-pink-300">admin123</span></div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-2xl text-rose-200 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Email Administrator</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bolugulungguling.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">Password Keamanan</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-semibold focus:outline-none focus:border-pink-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 font-extrabold text-xs text-white shadow-pink-glow transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span>Memverifikasi Akses Admin...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Masuk ke Dashboard Admin</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Back to public web */}
        <div className="pt-2 text-center border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-pink-400 font-semibold transition"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Kembali ke Website Pembeli</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
