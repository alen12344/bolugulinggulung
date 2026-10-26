'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Cake,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  User,
  Sparkles,
  CheckCircle2,
  Chrome,
} from 'lucide-react';
import { useUserStore } from '@/store/useUserStore';

type Mode = 'login' | 'register';

export default function UserAuthPage() {
  const router = useRouter();
  const { register, loginUser, loginWithGoogle } = useUserStore();

  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    setTimeout(() => {
      if (mode === 'register') {
        const result = register(name, email, phone, password);
        if (result.success) {
          setSuccess(result.message);
          setTimeout(() => router.push('/'), 1000);
        } else {
          setError(result.message);
        }
      } else {
        const result = loginUser(email, password);
        if (result.success) {
          setSuccess(result.message);
          setTimeout(() => router.push('/'), 800);
        } else {
          setError(result.message);
        }
      }
      setIsLoading(false);
    }, 700);
  };

  const handleGoogleLogin = () => {
    // Simulate Google OAuth - in production, use NextAuth or Firebase
    const demoName = 'Pelanggan Google';
    const demoEmail = `google.user.${Date.now()}@gmail.com`;
    loginWithGoogle(demoName, demoEmail, 'https://lh3.googleusercontent.com/a/default-user=s96-c');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-950/20 to-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-600/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-pink-500/20 shadow-2xl space-y-6 relative z-10">

        {/* Brand */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-rose-500 to-pink-700 flex items-center justify-center text-white mx-auto shadow-2xl border-2 border-white/20 hover:scale-105 transition">
              <Cake className="w-9 h-9" />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Bolu Gulung Guling</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {mode === 'login' ? 'Masuk untuk mulai berbelanja 🛍️' : 'Daftar & nikmati bolu lumer! 🎂'}
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-slate-800 p-1 rounded-2xl gap-1">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              mode === 'login'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
              mode === 'register'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daftar Akun
          </button>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-white hover:bg-gray-50 text-gray-800 font-bold text-sm transition border border-gray-200 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Lanjutkan dengan Google</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-xs text-slate-500 font-semibold">atau</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* Error/Success */}
        {error && (
          <div className="bg-rose-950/80 border border-rose-500/50 p-3 rounded-2xl text-rose-200 text-xs font-bold text-center animate-fadeIn">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 p-3 rounded-2xl text-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Nama Lengkap *</label>
              <div className="relative">
                <User className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Email Google *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:border-pink-500 transition"
              />
            </div>
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Nomor HP (WhatsApp) *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="0812xxxxxxxx"
                  maxLength={13}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:border-pink-500 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">Kata Sandi *</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-pink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'register' ? 'Minimal 6 karakter' : '••••••••'}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm font-medium focus:outline-none focus:border-pink-500 transition"
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
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 hover:from-pink-600 hover:to-rose-700 font-extrabold text-sm text-white shadow-2xl transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memproses...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>{mode === 'login' ? 'Masuk & Belanja' : 'Buat Akun Sekarang'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center border-t border-slate-800">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-pink-400 font-semibold transition"
          >
            ← Kembali ke Toko
          </Link>
        </div>
      </div>
    </div>
  );
}
