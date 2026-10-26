'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  QrCode,
  CreditCard,
  Wallet,
  CheckCircle2,
  Copy,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Sparkles,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  Download,
  Phone,
  FileText,
  Clock,
  Banknote,
  Send
} from 'lucide-react';
import { Order, PaymentMethod } from '@/lib/types';
import { useOrderStore } from '@/store/useOrderStore';
import confetti from 'canvas-confetti';

interface PaymentModalProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

const VA_BANKS = [
  { code: 'bca_va', name: 'BCA Virtual Account', prefix: '88012', color: 'border-blue-500 text-blue-700 bg-blue-50' },
  { code: 'mandiri_va', name: 'Mandiri Bill', prefix: '89022', color: 'border-amber-500 text-amber-700 bg-amber-50' },
  { code: 'bri_va', name: 'BRIVA', prefix: '12808', color: 'border-sky-600 text-sky-700 bg-sky-50' },
  { code: 'bni_va', name: 'BNI Virtual Account', prefix: '98811', color: 'border-teal-600 text-teal-700 bg-teal-50' },
  { code: 'seabank_va', name: 'SeaBank Virtual', prefix: '77001', color: 'border-orange-500 text-orange-700 bg-orange-50' },
];

export default function PaymentModal({ order, isOpen, onClose, onPaymentSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(order.paymentMethod || 'qris');
  const [selectedVaBank, setSelectedVaBank] = useState('bca_va');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(899); // 14:59 countdown
  const [expandedInstruction, setExpandedInstruction] = useState<'mbanking' | 'atm' | 'ibanking' | null>('mbanking');
  const [proofFile, setProofFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const updatePaymentStatus = useOrderStore((state) => state.updatePaymentStatus);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getVaNumber = (prefix: string) => {
    const numPart = order.id.replace(/\D/g, '').slice(-7) || '8839120';
    return `${prefix}${numPart}`;
  };

  const activeVaNumber = getVaNumber(
    VA_BANKS.find((b) => b.code === selectedVaBank)?.prefix || '88012'
  );

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleSimulateWebhookSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      updatePaymentStatus(order.id, 'Lunas');
      setIsProcessing(false);

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f43f5e', '#10b981', '#3b82f6', '#fbbf24'],
        });
      } catch {
        // Fallback
      }

      onPaymentSuccess();
    }, 1400);
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProofFile(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendWhatsAppNotification = () => {
    const message = encodeURIComponent(
      `Halo Admin Bolu Gulung Guling, saya sudah memesan dengan No. Order: ${order.orderNumber}.\nTotal: Rp ${order.totalAmount.toLocaleString('id-ID')}.\nNama: ${order.customerName}.\nMohon diproses, terima kasih!`
    );
    window.open(`https://wa.me/6285764952471?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-pink-100 flex flex-col max-h-[92vh] animate-slideUp">
        
        {/* =========================================================================
            GATEWAY HEADER (Midtrans / Xendit Style)
            ========================================================================= */}
        <div className="bg-gradient-to-r from-pink-600 via-pink-500 to-rose-600 p-4 sm:p-5 text-white flex justify-between items-center shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base leading-tight">
                  Midtrans & Xendit Gateway
                </h3>
                <span className="bg-white/20 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                  256-Bit SSL
                </span>
              </div>
              <p className="text-[11px] text-pink-100">Bolu Gulung Guling Merchant Resmi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* =========================================================================
            MODAL CONTENT BODY
            ========================================================================= */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          
          {/* Bill summary & Countdown card */}
          <div className="bg-pink-50/80 rounded-2xl p-4 border border-pink-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gray-500 block">Total Pembayaran:</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-pink-600">
                Rp {order.totalAmount.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-gray-500 block font-mono mt-0.5">
                No. Order: <strong>{order.orderNumber}</strong>
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Batas Bayar
              </span>
              <div className="inline-flex items-center gap-1 bg-pink-600 text-white font-mono font-extrabold text-xs px-2.5 py-1 rounded-xl shadow-sm mt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timerSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 block">
              Pilih Kanal Pembayaran Digital:
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedMethod('qris')}
                className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition ${
                  selectedMethod === 'qris'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-400'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <QrCode className="w-4 h-4 text-pink-600" />
                <span>QRIS</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('bca_va')}
                className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition ${
                  selectedMethod.includes('va')
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-400'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <CreditCard className="w-4 h-4 text-pink-600" />
                <span>Virtual Acc</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('gopay')}
                className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition ${
                  selectedMethod === 'gopay' || selectedMethod === 'ovo' || selectedMethod === 'dana' || selectedMethod === 'shopeepay'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-400'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Wallet className="w-4 h-4 text-pink-600" />
                <span>E-Wallet</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('transfer_manual')}
                className={`py-2 px-1 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition ${
                  selectedMethod === 'transfer_manual'
                    ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm ring-1 ring-pink-400'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Banknote className="w-4 h-4 text-pink-600" />
                <span>Manual / COD</span>
              </button>
            </div>
          </div>

          {/* =========================================================================
              METHOD 1: QRIS ALL INDONESIAN BANKS & E-WALLETS
              ========================================================================= */}
          {selectedMethod === 'qris' && (
            <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-4 text-center">
              {/* QRIS Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="text-left">
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider block">
                    Standar Pembayaran Nasional
                  </span>
                  <span className="text-xs font-black text-white">QRIS DINAMIS MIDTRANS</span>
                </div>
                <div className="bg-white px-2 py-0.5 rounded text-[10px] font-black text-black">
                  QRIS
                </div>
              </div>

              {/* QR Code Container */}
              <div className="bg-white p-3.5 rounded-2xl inline-block mx-auto shadow-2xl border-4 border-pink-400 relative">
                {/* Simulated Real Indonesian QRIS SVG */}
                <svg className="w-48 h-48 mx-auto" viewBox="0 0 120 120">
                  <rect width="120" height="120" fill="white" />
                  {/* Outer corner blocks */}
                  <rect x="8" y="8" width="32" height="32" fill="#000" rx="3" />
                  <rect x="13" y="13" width="22" height="22" fill="#fff" rx="2" />
                  <rect x="18" y="18" width="12" height="12" fill="#000" rx="1" />

                  <rect x="80" y="8" width="32" height="32" fill="#000" rx="3" />
                  <rect x="85" y="13" width="22" height="22" fill="#fff" rx="2" />
                  <rect x="90" y="18" width="12" height="12" fill="#000" rx="1" />

                  <rect x="8" y="80" width="32" height="32" fill="#000" rx="3" />
                  <rect x="13" y="85" width="22" height="22" fill="#fff" rx="2" />
                  <rect x="18" y="90" width="12" height="12" fill="#000" rx="1" />

                  {/* Matrix modules */}
                  <path
                    d="M48 10h6v12h-6z M60 10h8v6h-8z M48 26h14v6h-14z M70 20h8v12h-8z M8 48h12v6h-12z M26 48h8v14h-8z M40 44h10v10h-10z M56 44h8v8h-8z M72 44h12v6h-12z M90 44h10v8h-10z M104 48h8v12h-8z M48 60h6v14h-6z M60 62h10v8h-10z M76 56h8v14h-8z M88 58h14v8h-14z M48 80h10v6h-10z M64 78h8v12h-8z M80 78h14v6h-14z M50 92h8v14h-8z M64 96h12v12h-12z M82 90h8v8h-8z M96 86h14v14h-14z M86 104h10v8h-10z M102 104h10v8h-10z"
                    fill="#111827"
                  />

                  {/* Central QRIS / Bolu Gulung Emblem */}
                  <rect x="46" y="46" width="28" height="28" fill="#ec4899" rx="6" />
                  <circle cx="60" cy="60" r="10" fill="#ffffff" />
                  <path d="M56 58h8v4h-8z M58 54h4v12h-4z" fill="#ec4899" />
                </svg>

                <div className="text-[10px] text-gray-800 font-bold mt-1 text-center font-mono">
                  NMID: ID1020268899014
                </div>
              </div>

              {/* Supported apps */}
              <div className="space-y-1.5">
                <p className="text-xs text-slate-300">
                  Scan dengan GoPay, OVO, DANA, ShopeePay, BCA Mobile, Livin' Mandiri, BRImo, atau m-Banking apapun.
                </p>
                <div className="flex flex-wrap justify-center gap-1.5 text-[9px] font-bold text-slate-400">
                  <span className="bg-slate-800 px-2 py-0.5 rounded">BCA</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">Mandiri</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">BRI</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">BNI</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">GoPay</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">DANA</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded">ShopeePay</span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              METHOD 2: VIRTUAL ACCOUNT
              ========================================================================= */}
          {selectedMethod.includes('va') && (
            <div className="space-y-4">
              {/* Bank Selector pills */}
              <div className="grid grid-cols-3 gap-2">
                {VA_BANKS.map((b) => (
                  <button
                    key={b.code}
                    type="button"
                    onClick={() => {
                      setSelectedVaBank(b.code);
                      setSelectedMethod(b.code as PaymentMethod);
                    }}
                    className={`p-2.5 rounded-xl border text-xs font-bold text-center transition ${
                      selectedVaBank === b.code
                        ? `${b.color} shadow-sm font-extrabold border-2`
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {b.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* VA Display Box */}
              <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 space-y-2">
                <span className="text-xs text-gray-600 font-semibold block">
                  Nomor Virtual Account ({VA_BANKS.find((b) => b.code === selectedVaBank)?.name}):
                </span>

                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-pink-300 shadow-sm">
                  <span className="font-mono text-lg sm:text-xl font-black text-gray-900 tracking-wider">
                    {activeVaNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(activeVaNumber)}
                    className="flex items-center gap-1 text-xs font-bold text-pink-600 hover:text-pink-700 bg-pink-100 px-3 py-1.5 rounded-lg transition"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedText ? 'Tersalin!' : 'Salin VA'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-gray-500">
                  Pembayaran akan terverifikasi secara otomatis dalam 5-10 detik setelah transfer.
                </p>
              </div>

              {/* Expandable Transfer Guide */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    setExpandedInstruction(expandedInstruction === 'mbanking' ? null : 'mbanking')
                  }
                  className="w-full p-3 text-left font-bold text-gray-800 flex items-center justify-between hover:bg-gray-50"
                >
                  <span>Cara Bayar via Mobile Banking</span>
                  {expandedInstruction === 'mbanking' ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {expandedInstruction === 'mbanking' && (
                  <div className="p-3.5 bg-gray-50 text-gray-600 text-[11px] space-y-1">
                    <p>1. Buka aplikasi m-Banking Anda (BCA Mobile, Livin', BRImo, dll).</p>
                    <p>2. Pilih menu <strong>Transfer</strong> &gt; <strong>Virtual Account</strong>.</p>
                    <p>3. Masukkan nomor VA: <strong className="font-mono text-pink-600">{activeVaNumber}</strong>.</p>
                    <p>4. Tagihan Rp {order.totalAmount.toLocaleString('id-ID')} akan muncul otomatis.</p>
                    <p>5. Masukkan PIN Anda untuk menyelesaikan transaksi.</p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() =>
                    setExpandedInstruction(expandedInstruction === 'atm' ? null : 'atm')
                  }
                  className="w-full p-3 text-left font-bold text-gray-800 flex items-center justify-between hover:bg-gray-50"
                >
                  <span>Cara Bayar via ATM</span>
                  {expandedInstruction === 'atm' ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {expandedInstruction === 'atm' && (
                  <div className="p-3.5 bg-gray-50 text-gray-600 text-[11px] space-y-1">
                    <p>1. Masukkan kartu ATM & PIN Anda.</p>
                    <p>2. Pilih menu <strong>Transaksi Lainnya</strong> &gt; <strong>Transfer</strong> &gt; <strong>Ke Rek Virtual Account</strong>.</p>
                    <p>3. Masukkan nomor VA dan konfirmasi nominal pembayaran.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              METHOD 3: E-WALLET (GoPay, ShopeePay, DANA, OVO)
              ========================================================================= */}
          {(selectedMethod === 'gopay' ||
            selectedMethod === 'ovo' ||
            selectedMethod === 'dana' ||
            selectedMethod === 'shopeepay') && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'gopay', label: 'GoPay' },
                  { id: 'shopeepay', label: 'ShopeePay' },
                  { id: 'dana', label: 'DANA' },
                  { id: 'ovo', label: 'OVO' },
                ].map((ew) => (
                  <button
                    key={ew.id}
                    type="button"
                    onClick={() => setSelectedMethod(ew.id as PaymentMethod)}
                    className={`py-2 px-1 text-xs font-bold rounded-xl border text-center transition ${
                      selectedMethod === ew.id
                        ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-sm font-extrabold'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {ew.label}
                  </button>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-50 via-pink-50 to-rose-50 p-4 rounded-2xl border border-pink-200 text-center space-y-2">
                <span className="text-xs font-bold text-gray-800 block">
                  Bayar Instan dengan Aplikasi {selectedMethod.toUpperCase()}
                </span>
                <p className="text-[11px] text-gray-600">
                  Notifikasi konfirmasi akan dikirim langsung ke smartphone Anda. Klik tombol simulasi di bawah untuk verifikasi otomatis.
                </p>
              </div>
            </div>
          )}

          {/* =========================================================================
              METHOD 4: MANUAL TRANSFER & UPLOAD BUKTI TRANSFER
              ========================================================================= */}
          {selectedMethod === 'transfer_manual' && (
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-2xl border border-pink-200 space-y-2 text-xs">
                <span className="text-gray-500 font-bold block">Rekening Bank Resmi Toko:</span>
                <div className="bg-white p-3 rounded-xl border border-pink-200 flex justify-between items-center">
                  <div>
                    <span className="font-extrabold text-gray-900 block">Bank BCA Metro</span>
                    <span className="font-mono text-base font-bold text-pink-600">117-092-8819</span>
                    <span className="text-[10px] text-gray-500 block">a.n. Bolu Gulung Guling Metro</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopyText('1170928819')}
                    className="p-2 rounded-lg bg-pink-100 text-pink-700 text-xs font-bold"
                  >
                    {copiedText ? 'Disalin' : 'Salin'}
                  </button>
                </div>
              </div>

              {/* Upload Bukti Transfer */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 block">
                  Unggah Bukti Transfer / Resi ATM:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProofUpload}
                  className="hidden"
                />

                {proofFile ? (
                  <div className="bg-emerald-50 border border-emerald-300 p-3 rounded-2xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-emerald-800">Bukti transfer terlampir</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setProofFile(null)}
                      className="text-[11px] text-rose-600 font-bold hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-pink-300 hover:border-pink-500 bg-pink-50/40 text-pink-700 text-xs font-bold flex items-center justify-center gap-2 transition"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload Screenshot Bukti Bayar</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              ACTION: SIMULATE INSTANT WEBHOOK (LUNAS) & WHATSAPP NOTIFICATION
              ========================================================================= */}
          <div className="pt-3 border-t border-gray-100 space-y-2.5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-900 leading-tight">
                <strong>Simulasi Webhook Midtrans/Xendit:</strong> Klik tombol di bawah untuk meniru penerimaan webhook pembayaran sukses secara real-time!
              </p>
            </div>

            <button
              type="button"
              onClick={handleSimulateWebhookSuccess}
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold text-sm shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Memverifikasi Webhook Pembayaran...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Simulasi Bayar Sekarang (Trigger Webhook Lunas)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Direct WhatsApp button */}
            <button
              type="button"
              onClick={sendWhatsAppNotification}
              className="w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-emerald-600" />
              <span>Konfirmasi Otomatis ke WhatsApp Admin</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
