'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, Plus, Minus, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="glass-card rounded-3xl overflow-hidden hover:shadow-pink-glow-lg transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group border border-pink-200/70">
      <div>
        {/* Image & Badges */}
        <div className="relative h-60 w-full overflow-hidden bg-pink-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            unoptimized={product.image.startsWith('data:')}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

          {/* Best Seller / Category Tag */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isBestSeller && (
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-yellow-200">
                <Sparkles className="w-3 h-3 fill-slate-950" /> BEST SELLER
              </span>
            )}
            <span className="bg-pink-600/90 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
              {product.category}
            </span>
          </div>

          {/* Rating */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-gray-800 font-bold text-xs px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="font-extrabold text-lg text-gray-800 line-clamp-1 group-hover:text-pink-600 transition">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl font-extrabold text-pink-600">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="px-5 pb-5 pt-2 border-t border-pink-100 space-y-3">
        {/* Quantity selector (+ / -) */}
        <div className="flex items-center justify-between bg-pink-50/80 rounded-2xl p-1.5 border border-pink-200">
          <span className="text-xs font-semibold text-gray-600 pl-2">Jumlah:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="w-8 h-8 rounded-xl bg-white text-pink-600 hover:bg-pink-100 flex items-center justify-center font-bold shadow-sm transition active:scale-90"
              aria-label="Kurangi kuantitas"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center font-extrabold text-sm text-gray-800">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="w-8 h-8 rounded-xl bg-white text-pink-600 hover:bg-pink-100 flex items-center justify-center font-bold shadow-sm transition active:scale-90"
              aria-label="Tambah kuantitas"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 px-4 rounded-2xl font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-md active:scale-95 ${
            added
              ? 'bg-emerald-500 text-white shadow-emerald-200'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-glow'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-white animate-bounce" />
              <span>Berhasil Ditambahkan!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>+ Tambah ke Keranjang</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
