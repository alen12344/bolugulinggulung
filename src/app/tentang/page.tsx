'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Award, Sparkles, Navigation } from 'lucide-react';

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="bg-pink-100 text-pink-700 font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider">
          Mengenal Lebih Dekat
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
          Tentang Kami & Lokasi Toko Physical
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Dedikasi kami menyajikan bolu gulung terlembut dari Kota Metro untuk seluruh keluarga Indonesia.
        </p>
      </div>

      {/* History & Story Grid */}
      <div className="glass-pink rounded-3xl p-8 sm:p-12 border border-pink-200/80 shadow-xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Kisah di Balik Kelembutan Bolu Gulung Guling
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Bolu Gulung Guling lahir dari passion mendalam terhadap seni pembuatan kue tradisional yang dipadukan dengan teknik patisserie modern. Didirikan di Kota Metro, Lampung, kami berkomitmen untuk hanya menyajikan produk dengan bahan mentega murni tanpa perasa sintetis murahan.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Kunci utama kelembutan bolu kami ada pada komposisi adonan telur segar harian dan proses pemanggangan bertahap yang menjaga kelembaban (moisture) bolu agar tidak kering saat digulung. Isian krim dan keju kami diracik khusus agar memberikan keseimbangan rasa gurih dan manis yang pas.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="bg-white/80 p-4 rounded-2xl border border-pink-200">
                <h4 className="font-extrabold text-pink-700 text-base">Vision</h4>
                <p className="text-xs text-gray-600">Menjadi ikon oleh-oleh bolu gulung favorit nomor 1 di Lampung dan Sumatra.</p>
              </div>
              <div className="bg-white/80 p-4 rounded-2xl border border-pink-200">
                <h4 className="font-extrabold text-pink-700 text-base">Mission</h4>
                <p className="text-xs text-gray-600">Menjaga standar kualitas bahan premium, kebersihan higienis, dan pelayanan ramah.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1000"
              alt="Dapur Pembuatan Bolu Gulung Guling"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>

      {/* LOCATION & GOOGLE MAPS SECTION */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-pink-200 shadow-lg space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-pink-100 pb-6">
          <div>
            <div className="flex items-center gap-2 text-pink-600 font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" /> Titik Lokasi Fisik
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Outlet Utama Metro, Lampung
            </h2>
          </div>
          
          <a
            href="https://maps.google.com/?q=Metro+Lampung"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs px-5 py-3 rounded-full shadow-pink-glow transition"
          >
            <Navigation className="w-4 h-4" /> Buka di Google Maps
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Store Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-pink-50/80 p-5 rounded-2xl border border-pink-200 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">Alamat Lengkap Store:</h4>
                  <p className="text-xs text-gray-700 leading-relaxed mt-0.5">
                    Jl. Ahmad Yani No. 88, Yosodadi, Kecamatan Metro Timur, Kota Metro, Lampung 34111 (Dekat Lapangan Samber Metro).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-pink-50/80 p-5 rounded-2xl border border-pink-200 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">Jam Operasional Toko:</h4>
                  <p className="text-xs text-gray-700 mt-0.5">
                    Senin - Minggu (Buka Setiap Hari): <strong className="text-pink-700">07.30 - 21.00 WIB</strong>
                  </p>
                  <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                    ● BUKA SEKARANG
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-pink-50/80 p-5 rounded-2xl border border-pink-200 space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-gray-900">Layanan Pelanggan & WhatsApp:</h4>
                  <p className="text-xs text-gray-700 font-bold mt-0.5">+62 812-7890-9988</p>
                  <p className="text-[11px] text-gray-500">Menerima pesanan partai besar & katering pesanan khusus.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Map Visual */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md min-h-[300px] relative bg-slate-100">
            <iframe
              title="Lokasi Toko Bolu Gulung Guling Metro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63558.07727191316!2d105.28292855!3d-5.116667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40bd67a7608221%3A0x3039d80b220cc40!2sMetro%2C%20Metro%20City%2C%20Lampung!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '340px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  );
}
