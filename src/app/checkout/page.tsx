'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { useOrderStore } from '@/store/useOrderStore';
import { calculateShippingCosts } from '@/lib/courierData';
import { CourierOption, ShippingAddress, Order } from '@/lib/types';
import PaymentModal from '@/components/PaymentModal';
import { Truck, ShieldCheck, MapPin, User, Phone, Mail, CheckCircle2, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, clearCart, getTotalPrice, getTotalWeightGrams } = useCartStore();
  const createOrder = useOrderStore((state) => state.createOrder);

  // Form State
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: 'Ahmad Sopian',
    phone: '081278901234',
    email: 'ahmad.sopian@gmail.com',
    province: 'Lampung',
    city: 'Kota Metro',
    district: 'Metro Pusat',
    postalCode: '34111',
    fullAddress: 'Jl. Jendral Sudirman No. 12, Kel. Imopuro, Metro Pusat',
    notes: 'Tolong kirim dengan packaging rapi untuk kado.',
  });

  const [couriers, setCouriers] = useState<CourierOption[]>([]);
  const [selectedCourier, setSelectedCourier] = useState<CourierOption | null>(null);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update couriers whenever city changes
  useEffect(() => {
    if (formData.city) {
      const weight = getTotalWeightGrams() || 500;
      const options = calculateShippingCosts(weight, formData.city);
      setCouriers(options);
      if (options.length > 0 && !selectedCourier) {
        setSelectedCourier(options[0]);
      }
    }
  }, [formData.city, items]);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  if (items.length === 0 && !createdOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-extrabold text-gray-800">Keranjang Belanja Kosong</h2>
        <p className="text-xs text-gray-500">Silakan pilih produk terlebih dahulu sebelum checkout.</p>
        <button
          onClick={() => router.push('/produk')}
          className="bg-pink-600 text-white font-bold text-xs px-6 py-3 rounded-full"
        >
          Ke Katalog Produk
        </button>
      </div>
    );
  }

  const subtotal = getTotalPrice();
  const shippingCost = selectedCourier ? selectedCourier.cost : 0;
  const totalAmount = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrderAndPay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCourier) {
      alert('Pilih kurir pengiriman terlebih dahulu!');
      return;
    }

    // Process order creation
    const orderItems = items.map((i) => ({
      productId: i.product.id,
      productName: i.product.name,
      productPrice: i.product.price,
      quantity: i.quantity,
      image: i.product.image,
    }));

    const newOrder = createOrder({
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      shippingAddress: formData,
      items: orderItems,
      courier: selectedCourier,
      paymentMethod: 'qris',
      paymentStatus: 'Belum Bayar',
      subtotal,
      shippingCost,
      totalAmount,
      status: 'Menunggu Pembayaran',
      notes: formData.notes,
    });

    setCreatedOrder(newOrder);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setIsSuccess(true);
    clearCart();
  };

  // SUCCESS RECEIPT SCREEN
  if (isSuccess && createdOrder) {
    const handleShareWhatsApp = () => {
      const msg = encodeURIComponent(
        `Halo Admin Bolu Gulung Guling!\nSaya telah menyelesaikan pembayaran untuk pesanan:\n• No. Order: ${createdOrder.orderNumber}\n• Pelanggan: ${createdOrder.customerName}\n• Total: Rp ${createdOrder.totalAmount.toLocaleString('id-ID')}\n• Kurir: ${createdOrder.courier.name} (${createdOrder.courier.service})\n\nMohon dicek dan dikirimkan resinya. Terima kasih!`
      );
      window.open(`https://wa.me/6281278909988?text=${msg}`, '_blank');
    };

    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-fadeIn font-sans">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-2xl text-center space-y-6">
          
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-emerald-200 shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="bg-emerald-100 text-emerald-800 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              Pembayaran Terverifikasi Lunas
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
              Pesanan Berhasil Diproses!
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Nomor Invoice: <strong className="text-pink-600 font-mono text-sm">{createdOrder.orderNumber}</strong>
            </p>
          </div>

          {/* Receipt detail invoice card */}
          <div className="bg-gradient-to-b from-pink-50/90 to-pink-50/40 p-5 rounded-2xl border border-pink-200 text-left space-y-3.5 text-xs">
            <div className="flex justify-between items-center border-b border-pink-200 pb-2.5">
              <span className="text-gray-500 font-bold uppercase text-[10px]">Penerima & Kontak</span>
              <span className="font-extrabold text-gray-900">{createdOrder.customerName} ({createdOrder.customerPhone})</span>
            </div>
            
            <div className="space-y-1">
              <span className="text-gray-500 font-bold uppercase text-[10px] block">Alamat Pengiriman:</span>
              <p className="text-gray-800 font-semibold leading-relaxed">
                {createdOrder.shippingAddress.fullAddress}, {createdOrder.shippingAddress.district}, {createdOrder.shippingAddress.city}, {createdOrder.shippingAddress.province} {createdOrder.shippingAddress.postalCode}
              </p>
            </div>

            <div className="space-y-1 border-t border-pink-200/80 pt-2">
              <span className="text-gray-500 font-bold uppercase text-[10px] block">Ekspedisi Logistik:</span>
              <div className="flex justify-between items-center font-bold text-gray-800">
                <span>{createdOrder.courier.name} - {createdOrder.courier.service}</span>
                <span className="text-pink-600 font-mono">Rp {createdOrder.shippingCost.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Purchased Items List */}
            <div className="border-t border-pink-200/80 pt-2 space-y-1.5">
              <span className="text-gray-500 font-bold uppercase text-[10px] block">Daftar Bolu Dipesan:</span>
              {createdOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-gray-800 font-medium">
                  <span>{it.productName} (x{it.quantity})</span>
                  <span className="font-mono font-bold">Rp {(it.productPrice * it.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-dashed border-pink-200 pt-3 flex justify-between items-center text-sm">
              <span className="font-extrabold text-gray-900">Total Tagihan Lunas:</span>
              <span className="text-xl sm:text-2xl font-black text-pink-600">
                Rp {createdOrder.totalAmount.toLocaleString('id-ID')}
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-600 leading-relaxed">
            Dapur bolu kami sedang menyiapkan kue fresh oven untuk pesanan Anda. Kami akan memperbarui nomor resi pengiriman di dashboard sistem.
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            <button
              onClick={() => window.print()}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300 transition"
            >
              Cetak Nota (PDF)
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition"
            >
              Kirim ke WhatsApp
            </button>
            <button
              onClick={() => router.push('/produk')}
              className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-pink-glow transition"
            >
              Belanja Lagi
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-pink-200 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Formulir Checkout & Pembayaran
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Lengkapi data alamat dan pilih pengiriman otomatis RajaOngkir.
        </p>
      </div>

      <form onSubmit={handleCreateOrderAndPay} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Data Diri */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2 border-b border-pink-100 pb-3">
              <User className="w-5 h-5 text-pink-600" /> Data Diri Pemesan
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">No. WhatsApp / HP *</label>
                  <input
                    type="text"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Alamat Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Alamat Pengiriman */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2 border-b border-pink-100 pb-3">
              <MapPin className="w-5 h-5 text-pink-600" /> Alamat Pengiriman
            </h3>

            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Provinsi *</label>
                  <input
                    type="text"
                    name="province"
                    required
                    value={formData.province}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Kota / Kabupaten *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kota Metro, Bandar Lampung..."
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Kecamatan *</label>
                  <input
                    type="text"
                    name="district"
                    required
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">Kode Pos *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Alamat Lengkap (Nama Jalan, No. Rumah, RT/RW) *</label>
                <textarea
                  name="fullAddress"
                  rows={3}
                  required
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Catatan Tambahan (Opsional)</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Contoh: Titip di satpam, kartu ucapan..."
                  className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-xs font-semibold focus:ring-2 focus:ring-pink-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3. Pilihan Kurir (API RajaOngkir Simulator) */}
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-lg text-gray-900 flex items-center gap-2 border-b border-pink-100 pb-3">
              <Truck className="w-5 h-5 text-pink-600" /> Pilih Kurir Pengiriman (RajaOngkir)
            </h3>

            <div className="space-y-2.5">
              {couriers.map((courier) => {
                const isSelected = selectedCourier?.code === courier.code;
                return (
                  <label
                    key={courier.code}
                    onClick={() => setSelectedCourier(courier)}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-pink-500 bg-pink-50/90 shadow-sm'
                        : 'border-pink-200 bg-white hover:bg-pink-50/40'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="courier"
                        checked={isSelected}
                        onChange={() => setSelectedCourier(courier)}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <div>
                        <span className="font-extrabold text-xs text-gray-900 block">{courier.name} - {courier.service}</span>
                        <span className="text-[11px] text-gray-500">Estimasi Tiba: {courier.etd}</span>
                      </div>
                    </div>
                    <span className="font-extrabold text-xs text-pink-700">
                      Rp {courier.cost.toLocaleString('id-ID')}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-pink-200 shadow-lg space-y-5 sticky top-28">
            <h3 className="font-extrabold text-lg text-gray-900 border-b border-pink-100 pb-3">
              Ringkasan Pembayaran
            </h3>

            {/* Items summary */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-pink-200">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized={product.image.startsWith('data:')}
                        className="object-cover"
                      />
                    </div>
                    <span className="font-bold text-gray-800 line-clamp-1">{product.name} (x{quantity})</span>
                  </div>
                  <span className="font-extrabold text-gray-900">
                    Rp {(product.price * quantity).toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotals */}
            <div className="space-y-2 text-xs border-t border-pink-100 pt-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal Produk:</span>
                <strong className="text-gray-900">Rp {subtotal.toLocaleString('id-ID')}</strong>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim ({selectedCourier ? selectedCourier.name : '-'}):</span>
                <strong className="text-gray-900">
                  {selectedCourier ? `Rp ${selectedCourier.cost.toLocaleString('id-ID')}` : 'Pilih Kurir'}
                </strong>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-gray-900 border-t border-dashed border-pink-200 pt-3">
                <span>Total Tagihan:</span>
                <span className="text-xl font-extrabold text-pink-600">
                  Rp {totalAmount.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-pink-600 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-sm shadow-pink-glow hover:shadow-pink-glow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Bayar Sekarang</span>
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              Pop-up Midtrans/Xendit Payment Gateway akan muncul secara otomatis.
            </p>
          </div>
        </div>

      </form>

      {/* Payment Gateway Modal Popup */}
      {createdOrder && (
        <PaymentModal
          order={createdOrder}
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

    </div>
  );
}
