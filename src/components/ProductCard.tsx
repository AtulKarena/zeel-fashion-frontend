"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
// import { useAddToCart } from "./_services/cart-hooks";
const shorten = (str: string, maxLength = 20) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

type Category = {
  _id: string;
  name: string;
  active: boolean;
};

type Product = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  category: Category; // 👈 populated
  sizes?: string[];
  colors?: string[];
  stock?: number;
  images?: string[];
  ratings?: number;
  offer?: {
    label: string;
    percentOff: number;
  };
  createdAt: string;
  updatedAt: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  // const addToCart = useAddToCart();
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-[#f5f1ec]">
          <img
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
            {product.category?.name}
          </span>
        </div>
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-black">
            <Link
              href={`/product/${product._id}`}
              className="transition hover:text-black/70"
            >
              {product.name}
            </Link>
          </h3>
          <span className="text-sm font-semibold text-black">
            {formatPrice(product.price || 0)}
          </span>
        </div>
        <p className="text-sm text-black/60">
          {product.description ? shorten(product.description) : ""}
        </p>
        <button
          onClick={() => addItem(product)}
          className="w-full rounded-full bg-black px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
