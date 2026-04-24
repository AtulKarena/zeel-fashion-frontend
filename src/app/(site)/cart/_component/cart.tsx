"use client";

import Link from "next/link";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { useRouter } from "next/navigation";
import API from "@/services/api";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";

export default function Cart({ isLoggedIn }: { isLoggedIn: boolean }) {
  const { items, total, clearCart } = useCart();
  const { setCheckoutToken } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      // Save intended page
      router.push(`/login?redirect=/checkout`);
      return;
    }

    API.post(
      "/checkout/session",
      { cart: items }, // body (empty if not needed)
      { withCredentials: true }, // ✅ correct place
    )
      .then((response) => {
        const token = response?.data?.checkoutToken;

        if (!token) {
          throw new Error("No checkout token received");
        }

        setCheckoutToken(token);
        router.push("/checkout");
      })
      .catch((error) => {
        console.error("Checkout session error:", error);
        toast.error("Failed to start checkout. Please try again.");
      });
  };
  
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Your cart
          </p>
          <h1 className="text-3xl md:text-4xl">Shopping bag</h1>
          <p className="text-sm text-black/60">
            Review your picks before checkout.
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold transition hover:border-black/40"
          >
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-[32px] border border-dashed border-black/10 bg-white/80 p-10 text-center">
          <p className="text-base font-semibold">Your cart is empty.</p>
          <p className="mt-2 text-sm text-black/60">
            Start building your look with menswear, kidswear, and accessories.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((line) => (
              <CartItem key={line.productId} line={line} />
            ))}
          </div>
          <div className="space-y-6 rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60">Subtotal</span>
              <span className="font-semibold">{formatPrice(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60">Store pickup</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Proceed to checkout
            </button>
            <p className="text-xs text-black/50">
              Checkout is simulated for demo purposes. Visit our store to
              complete your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
