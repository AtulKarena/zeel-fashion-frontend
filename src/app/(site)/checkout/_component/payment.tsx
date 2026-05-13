"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import API from "@/services/api";
import { toast } from "sonner";
import Script from "next/script";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";

export default function Payment() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const router = useRouter();
  const { total, setItems } = useCart();
  const { paymentToken, checkoutToken } = useAuth();

  useEffect(() => {
    if (!paymentToken || !checkoutToken) {
      redirect("/cart");
    }
  }, [paymentToken, checkoutToken]);

  const handleCOD = async () => {
    await fetch(`/api/orders/${orderId}/confirm`, {
      method: "POST",
    });
    setItems([]);
    router.push(`/checkout/success?orderId=${orderId}`);
  };

  const handleOnlinePayment = async () => {
    console.log("Initiating online payment for order:", orderId, "with total:", total); // Debug log to inspect the order details
    serverFetch("/payment/create-order", {
      method: "POST",
      body: JSON.stringify({ orderId, amount: total }),
    })
      .then((data) => {
        setItems([]);
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: data.data.amount,
          currency: "INR",
          order_id: data.data.razorpayOrderId,

          name: "Zeel Fashion",
          description: "Order Payment",

          handler: async function (response: any) {
            serverFetch("/payment/verify", {
              method: "POST",
              body: JSON.stringify({ ...response, orderId }),
            })
              .then((data) => {
                router.push(
                  `/checkout/success?session_id=${data.data.session_id}`,
                );
              })
              .catch((error) => {
                console.error("Payment varify error:", error);
                toast.error("Something went wrong. Please try again.");
              });
          },

          prefill: {
            name: "Customer Name",
            email: "customer@email.com",
          },

          theme: {
            color: "#000",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open(); // 🔥 THIS shows payment UI
      })
      .catch((error) => {
        console.error("Checkout error:", error);
        toast.error("Something went wrong. Please try again.");
      });

    // redirect to payment gateway
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white p-8 rounded-3xl shadow-sm">
          <h2 className="text-3xl font-serif mb-2 text-center">
            Choose Payment Method
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8">
            Select how you'd like to pay for your order
          </p>

          <div className="space-y-4">
            {/* COD */}
            <button
              onClick={handleCOD}
              className="w-full flex items-center justify-between p-5 border rounded-2xl hover:border-black hover:shadow-md transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">💵</div>
                <div className="text-left">
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-sm text-gray-500">
                    Pay when your order arrives
                  </p>
                </div>
              </div>

              <span className="text-gray-400 group-hover:text-black">→</span>
            </button>

            {/* Online Payment */}
            <button
              onClick={handleOnlinePayment}
              className="w-full flex items-center justify-between p-5 border rounded-2xl hover:border-black hover:shadow-md transition group"
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">💳</div>
                <div className="text-left">
                  <p className="font-semibold">Pay Online</p>
                  <p className="text-sm text-gray-500">
                    UPI, Cards, Net Banking
                  </p>
                </div>
              </div>

              <span className="text-gray-400 group-hover:text-black">→</span>
            </button>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mt-6 w-full text-sm text-gray-500 hover:text-black transition"
          >
            ← Go Back
          </button>
        </div>
      </div>
    </>
  );
}
