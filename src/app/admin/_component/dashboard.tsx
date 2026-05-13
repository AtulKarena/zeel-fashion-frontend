"use client";
import Link from "next/link";
import { useDashboard } from "../_services/dashboard-hooks";
import { useLatestOrders } from "../_services/dashboard-hooks";
import { Order } from "@/lib/products";
import Loading from "@/components/loading";
/* const stats = [
  { label: "Today’s sales", value: "LKR 184,200", note: "+12% vs. yesterday" },
  { label: "Orders", value: "48", note: "8 awaiting pickup" },
  { label: "Low stock", value: "6", note: "Reorder soon" },
  { label: "New inquiries", value: "11", note: "Last 24 hours" },
]; */

const recentOrders = [
  {
    id: "ZF-1024",
    customer: "Nimal Perera",
    items: "Linen Shirt, Leather Belt",
    status: "Ready for pickup",
  },
  {
    id: "ZF-1023",
    customer: "Maya Fernando",
    items: "Kids Stripe Tee",
    status: "Processing",
  },
  {
    id: "ZF-1022",
    customer: "Ravindu Silva",
    items: "Urban Runner Sneakers",
    status: "Delivered",
  },
];

export default function AdminDashboard() {
  const { data, isLoading, error } = useDashboard();
  const { latestOrders, isLoad } = useLatestOrders();

  if (isLoading) {
    return <Loading/>;
  }
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 p-6 text-white shadow-md">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-80">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Zeel Fashion — Admin</h1>
          <p className="mt-1 text-sm text-white/80">
            Overview of store performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-white/20 px-3 py-2 text-sm">
            Search
          </div>
          <div className="h-10 w-10 rounded-full bg-white/20" />
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data?.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
              {stat.label}
            </p>
            <div className="mt-3 flex items-baseline justify-between">
              <p className="text-2xl font-extrabold text-black">{stat.value}</p>
              <p className="text-sm text-green-500">{stat.note}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="col-span-2 rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent orders</h2>
            <button className="text-sm font-semibold text-indigo-600">
              View all
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {isLoad
              ? [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border p-4 animate-pulse"
                  >
                    <div>
                      <div className="h-4 w-32 rounded bg-gray-200 mb-2"></div>
                      <div className="h-3 w-24 rounded bg-gray-200"></div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="h-5 w-20 rounded-full bg-gray-200"></div>
                      <div className="mt-2 h-3 w-16 rounded bg-gray-200"></div>
                    </div>
                  </div>
                ))
              : latestOrders.map((order: Order) => {
                  console.log("order:-", order);
                  return (
                    <div
                      key={order._id}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p className="text-sm font-semibold">
                          {order.contactInformation.name}
                        </p>
                        <p className="text-xs text-black/60">
                          {order.orderItems.map((item) => item.name).join(", ")}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                          {order.isDelivered ? "Delivered" : "Pending"}
                        </span>
                        <p className="mt-2 text-xs text-black/40">
                          {order._id}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-sm font-semibold">Quick actions</h3>
          <div className="mt-4 grid gap-3">
            <Link
              href={"/admin/products/add"}
              className="rounded-lg text-center border border-black/5 px-4 py-2 text-sm font-medium hover:bg-black/5"
            >
              Add product
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
