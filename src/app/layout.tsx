import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Bolu Gulung Guling - Toko Bolu Lembut & Melting Premium | Metro, Lampung',
  description: 'Toko kue bolu gulung terbaik di Kota Metro, Lampung. Dibuat dengan mentega premium, isian melimpah, checkout otomatis dengan QRIS & berbagai metode pembayaran. Pengiriman ke seluruh Indonesia.',
  keywords: ['Bolu Gulung', 'Kue Bolu Metro', 'Bolu Gulung Guling', 'Bolu Keju Lumer', 'Bolu Cokelat Nutella', 'Kue Lampung', 'Toko Kue Online Metro'],
  openGraph: {
    title: 'Bolu Gulung Guling - Bolu Lembut & Melting Premium',
    description: 'Pesan Bolu Gulung Keju & Cokelat Best Seller Online. Pengiriman ke seluruh Indonesia dengan QRIS, Transfer Bank & E-Wallet.',
    url: 'https://bolugulungguling.com',
    siteName: 'Bolu Gulung Guling',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-pink-50 text-gray-800 antialiased selection:bg-pink-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
