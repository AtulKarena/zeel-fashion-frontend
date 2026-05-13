"use client";

import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";
import type { CartLine } from "@/context/cart-context";
import { useProductById } from "@/app/admin/products/_services/product-hooks";
export default function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();
  const { product, isLoading } = useProductById(line.productId);
  console.log("CartItem product:", product);
  if (isLoading || !product) {
    return (
      <div className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-2xl bg-gray-200" />
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }
  const price = product.price || 0;
  const percentOff = product.offer?.percentOff || 0;
  const discountAmount = (price * percentOff) / 100;
  const finalPrice = price - discountAmount;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <img
          src={product?.images?.[0] ?? "/placeholder.png"}
          alt={product.name}
          className="h-20 w-20 rounded-2xl object-cover"
        />
        <div>
          <h3 className="text-base font-semibold">{product.name}</h3>
          <p className="text-sm text-black/60">{product.category?.name}</p>
          <div className="flex items-center gap-2">
            {percentOff > 0 ? (
              <>
                <span className="text-sm font-semibold text-black">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-xs text-black/50 line-through">
                  {formatPrice(price)}
                </span>
              </>
            ) : (
              <span className="text-sm font-semibold text-black">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-2 text-sm">
          <button
            className={`${line.quantity <= 1 ? "bg-gray-50 cursor-not-allowed" : "bg-white"} h-6 w-6 rounded-full text-sm font-semibold`}
            onClick={() => updateQuantity(product._id, line.quantity - 1)}
            aria-label="Decrease quantity"
            disabled={line.quantity <= 1}
          >
            -
          </button>
          <span className="min-w-[24px] text-center font-semibold">
            {line.quantity}
          </span>
          <button
            className="h-6 w-6 rounded-full bg-white text-sm font-semibold"
            onClick={() => updateQuantity(product._id, line.quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          className="text-sm font-semibold text-[var(--accent-dark)]"
          onClick={() => removeItem(product._id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
