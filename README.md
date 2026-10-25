# 🍰 Bolu Gulung Guling - E-Commerce & Management System
> **Proyek Usaha Digital - Mata Kuliah Technopreneurship 2026**  
> *Pelopor Bolu Gulung Ultra Lembut di Kota Metro, Lampung*

![Bolu Gulung Guling Banner](https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200)

---

## 🌟 Highlight Inovasi & Fitur Utama

### 📱 1. Manajemen Produk Mobile-Friendly (Bisa dari HP Tanpa Buka Kodingan)
- **Upload Foto Langsung dari HP**: Tombol *Ambil Kamera HP* (`capture="environment"`) & *Galeri Foto HP*.
- **Pustaka Foto HD Siap Pakai**: Pilihan 8 varian bolu kualitas tinggi (Keju, Cokelat Belgian, Pandan, Red Velvet, Mocha, Durian Medan, Strawberry, Matcha).
- **Pengaturan Lengkap**: Nama produk, Kategori (bisa tambah kategori kustom baru), Harga Jual (Rp), Harga Coret (Diskon), Stok Fisik (dengan tombol +/- cepat), Berat Bolu (Gram), dan Badge Best Seller.
- **Penyimpanan Permanen (Persistent LocalStorage)**: Semua foto dan data yang diupdate dari HP otomatis tersimpan di browser tanpa hilang saat di-refresh!

### 💳 2. Payment Gateway Modern (Midtrans & Xendit Style)
- **QRIS Dinamis Standar Nasional**: Dilengkapi logo QRIS resmi, NMID (`ID1020268899014`), hitung mundur 15 menit, dan panduan scan untuk semua bank & e-wallet.
- **Virtual Account Otomatis**: BCA, Mandiri Bill, BRIVA, BNI VA, SeaBank dengan tombol 1-klik salin nomor VA dan panduan m-Banking/ATM.
- **E-Wallets**: GoPay, ShopeePay, DANA, OVO.
- **Manual Transfer & Upload Bukti Transfer**: Mendukung upload resi screenshot bukti transfer.
- **Simulasi Instant Webhook (Lunas)**: Meniru webhook payment gateway secara real-time dengan animasi confetti dan struk resmi otomatis.

### 📊 3. Dashboard Keuangan & Penjualan (Technopreneur Grade)
- **Sesi Admin Terverifikasi**: Menampilkan nama admin/owner (`Alen - Founder & Technopreneur`), status online, dan tombol logout.
- **Metrik Finansial**:
  - Total Omset Kotor (Gross Revenue)
  - Estimasi Laba Bersih (Net Profit Margin ~45%)
  - Biaya Bahan Baku & HPP (COGS ~55%)
  - Volume Bolu Terjual & Rata-rata Nilai Keranjang (AOV)
- **Grafik Interaktif Recharts**: Tren omset & laba mingguan, volume pesanan, dan kontribusi kategori kue.
- **Peringatan Stok Kritis**: Notifikasi otomatis jika stok bolu sisa <= 5 pcs.
- **Cetak Laporan Keuangan (PDF / Print-Ready)** untuk materi presentasi ujian Technopreneurship.

### 🌐 4. Website Publik Profesional & Interaktif
- **Lacak Pesanan (Track Order)**: Pelanggan dapat memasukkan Nomor Order (contoh: `BGG-20260924-001`) untuk melacak status proses dan resi kurir.
- **Floating WhatsApp Support**: Tombol chat langsung dengan dapur bolu (+62 812-7890-9988).
- **Review & Ulasan Pelanggan**: Testimoni terpercaya dengan rating bintang 5.
- **Kalkulasi Ongkir RajaOngkir Real-Time**: Dihitung otomatis per gram berat bolu ke Kota Metro, Bandar Lampung, Jakarta, dan seluruh Indonesia.

---

## 🗺️ Rute & Navigasi Halaman

### 🛒 Halaman Publik (Pembeli)
- `/` - **Beranda Utama** (Hero banner, Best Seller, Value proposition, Lacak Pesanan, Testimoni, CTA WhatsApp)
- `/produk` - **Katalog Produk** (Filter kategori dinamis, pencarian live, kartu produk interaktif)
- `/tentang` - **Tentang Kami & Lokasi Fisik** (Sejarah resep 2018, Google Maps Kota Metro, jam operasional)
- `/keranjang` - **Keranjang Belanja** (Review kuantitas, estimasi berat kg, subtotal harga)
- `/checkout` - **Formulir Checkout & Struk** (Integrasi kurir logistik, popup modal Midtrans/Xendit, struk pembayaran & cetak PDF)

### 🔐 Halaman Admin Store Owner
- `/admin/login` - **Portal Login Admin** (Kredensial Demo: `admin@bolugulungguling.com` / `admin123` dengan tombol Isi Cepat)
- `/admin/dashboard` - **Dashboard Keuangan & Penjualan** (Grafik omset, laba rugi, identitas owner Alen)
- `/admin/produk` - **Manajemen Produk HP** (Upload foto kamera HP, ubah harga, stok, berat, kategori)
- `/admin/pesanan` - **Manajemen Pesanan & Resi** (Update status pengiriman & nomor resi kurir)

---

## 🚀 Panduan Menjalankan Project

```bash
# 1. Pastikan Node.js (v18+) terinstall di komputer
node -v

# 2. Install dependensi
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda atau di browser HP (melalui IP WiFi lokal).

---

## 👨‍💼 Kredensial Akses Admin Demo
- **URL**: `/admin/login` atau klik *Portal Admin* di sudut kanan atas website.
- **Email**: `admin@bolugulungguling.com`
- **Password**: `admin123`

---
© 2026 Bolu Gulung Guling • Kota Metro, Lampung. Proyek Mata Kuliah Technopreneurship.
