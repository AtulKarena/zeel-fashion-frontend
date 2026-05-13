"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderById, useUpdateOrder } from "../_services/order-hooks";
import Loading from "@/components/loading";
interface Props {
  orderId: string;
}

export default function OrderView({ orderId }: Props) {
  const router = useRouter();
  const { order, isLoading } = useOrderById(orderId);
  const { mutate, isPending } = useUpdateOrder();
  const [showConfirm, setShowConfirm] = useState(false);

  if (isLoading) return <Loading />;

  if (!order)
    return <div className="p-6 text-center text-gray-500">No data found</div>;

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>

            <button
              onClick={() => router.back()}
              className="px-4 py-2 rounded-xl border bg-white shadow-sm hover:shadow transition"
            >
              ← Back
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer Info */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">
                Customer Info
              </h2>
              <p>
                <span className="text-gray-500">Name:</span>{" "}
                {order.contactInformation.name}
              </p>
              <p>
                <span className="text-gray-500">Email:</span>{" "}
                {order.contactInformation.email}
              </p>
              <p>
                <span className="text-gray-500">Phone:</span>{" "}
                {order.contactInformation.phone}
              </p>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">
                Shipping Address
              </h2>
              <p>{order.shippingAddress.address}</p>
              <p className="text-gray-600">
                {order.shippingAddress.city}, {order.shippingAddress.zip}
              </p>
              <p className="text-gray-600">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Products
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="text-left py-2">Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-none hover:bg-gray-50 transition"
                    >
                      <td className="py-3 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-center font-medium">₹{item.price}</td>
                      <td className="text-center">{item.size || "-"}</td>
                      <td className="text-center">{item.color || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3">
            <h2 className="text-lg font-semibold text-gray-700">
              Order Summary
            </h2>

            <div className="flex justify-between">
              <span>Total</span>
              <span className="font-semibold text-lg">₹{order.totalPrice}</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Payment</span>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  order.isPaid
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span>Status</span>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  order.isDelivered
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Processing"}
              </span>
            </div>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Order Date</span>
              <span>{new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>

          {/* Actions */}
          {!order.isDelivered && (
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isPending || order.isDelivered}
                className="px-5 py-2 rounded-xl bg-green-600 text-white shadow hover:bg-green-700 transition disabled:opacity-50"
              >
                {isPending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Updating...
                  </span>
                ) : (
                  "Mark as Delivered"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Mark as Delivered</h2>

            <p className="mt-3 text-sm text-black/60">
              Are you sure you want to mark this order as delivered?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              {/* Cancel */}
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
                className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5 disabled:opacity-50"
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                onClick={() => {
                  mutate(
                    { id: order._id, isDelivered: true },
                    {
                      onSuccess: () => setShowConfirm(false),
                    },
                  );
                }}
                disabled={isPending}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isPending && (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                )}
                {isPending ? "Updating..." : "Yes, Deliver"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
