/* "use client";
import { useState } from "react"; */
import Link from "next/link";
import API from "@/services/api";
import { redirect } from "next/navigation";
import { serverFetch } from "@/lib/server-fetch";
async function verifySession(session_id: string) {
  try {
    const data = await serverFetch(`/payment/verify-session/${session_id}`, {
      method: "POST",
    });
    return data.data.valid;
  } catch (error) {
    console.error("Error verifying access to the success page:", error);
    return false;
  }
}

export default async function Preview({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  // const [view, setView] = useState("success");
  const session_id = searchParams.session_id;

  // ❌ No session → block
  if (!session_id) {
    redirect("/");
  }
  // 🔐 Verify from backend
  const isValid = await verifySession(session_id);

  if (!isValid) {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-[#f5f3ef] flex flex-col items-center justify-center gap-6 p-4">
      {/* Toggle Buttons */}
      {/* <div className="flex gap-3">
        <button
          onClick={() => setView("success")}
          className={`px-4 py-2 rounded-xl border ${view === "success" ? "bg-black text-white" : "bg-white"}`}
        >
          Success Page
        </button>
        <button
          onClick={() => setView("fail")}
          className={`px-4 py-2 rounded-xl border ${view === "fail" ? "bg-black text-white" : "bg-white"}`}
        >
          Fail Page
        </button>
      </div> */}

      {/* Preview Card */}
      <div className="w-full max-w-xl bg-white p-10 rounded-3xl shadow-sm text-center">
        {/* {view === "success" ? ( */}
        <>
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl font-serif mb-2">Payment Successful</h1>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          <div className="bg-gray-100 rounded-xl p-4 mb-6 text-sm">
            <p className="text-gray-600">Order ID</p>
            <p className="font-semibold">#123456</p>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-black text-white py-3 rounded-xl">
              View Orders
            </button>
            <Link
              href={"/shop"}
              className="w-full flex items-center justify-center border py-3 rounded-xl hover:border-black hover:shadow-sm transition"
            >
              Continue Shopping
            </Link>
          </div>
        </>
        {/* ) : (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="text-3xl font-serif mb-2">Payment Failed</h1>
            <p className="text-gray-500 text-sm mb-6">
              Something went wrong while processing your payment.
            </p>

            <div className="bg-gray-100 rounded-xl p-4 mb-6 text-sm">
              <p className="text-gray-600">Order ID</p>
              <p className="font-semibold">#123456</p>
            </div>

            <div className="space-y-3">
              <button className="w-full bg-black text-white py-3 rounded-xl">
                Try Again
              </button>
              <Link
                href="/"
                className="w-full flex items-center justify-center border py-3 rounded-xl hover:border-black hover:shadow-sm transition"
              >
                Go Home
              </Link>
            </div>
          </>
        )} */}
      </div>
    </div>
  );
}
