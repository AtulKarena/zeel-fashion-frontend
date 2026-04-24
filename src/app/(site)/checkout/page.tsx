"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { useOrderAdd } from "./_services/checkout-hooks";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";

export default function CheckoutPage() {
  const { form, onSubmit, isPending } = useOrderAdd();
  const { checkoutToken } = useAuth();
  const { total } = useCart();

  useEffect(() => {
    if (!checkoutToken) {
      redirect("/cart");
    }
    form.setValue("checkoutToken", checkoutToken);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f3ef]">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:col-span-2 space-y-8"
        >
          <div>
            <h2 className="text-3xl font-serif mb-2">Checkout</h2>
            <p className="text-gray-500 text-sm">
              Enter your details to complete your order.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold">Contact Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                {...form.register("fullName")}
                className="input"
                required
              />
              {form.formState.errors.fullName && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.fullName.message}
                </p>
              )}
              <input
                placeholder="Phone"
                {...form.register("phone")}
                className="input"
                required
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <input
              {...form.register("email")}
              type="email"
              placeholder="Email"
              className="input"
              required
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-semibold">Shipping Address</h3>

            <input
              {...form.register("address")}
              placeholder="Address"
              className="input"
              required
            />
            {form.formState.errors.address && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.address.message}
              </p>
            )}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                {...form.register("city")}
                placeholder="City"
                className="input"
                required
              />
              {form.formState.errors.city && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.city.message}
                </p>
              )}
              <input
                {...form.register("zip")}
                placeholder="ZIP Code"
                className="input"
                required
              />
              {form.formState.errors.zip && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.zip.message}
                </p>
              )}
              <input
                {...form.register("country")}
                placeholder="Country"
                className="input"
                required
              />
              {form.formState.errors.country && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.country.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-full"
          >
            {isPending ? "Processing..." : "Complete Order"}
          </button>
        </form>

        {/* RIGHT - SUMMARY */}
        <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between font-semibold text-lg border-t pt-4">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 12px;
          border-radius: 12px;
          outline: none;
        }

        .input:focus {
          border-color: black;
        }
      `}</style>
    </div>
  );
}
