"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import API from "@/services/api";
import { toast } from "sonner";
import {
  Package,
  LayoutDashboard,
  ListOrdered,
  BadgeIndianRupee,
  Grid2X2,
  CirclePile,
} from "lucide-react";
import { serverFetch } from "@/lib/server-fetch";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    activePath: ["/admin"],
    icon: LayoutDashboard,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    activePath: ["/admin/orders"],
    icon: ListOrdered,
  },
  {
    label: "Payments",
    href: "/admin/payments",
    activePath: ["/admin/payments", "/admin/refunds"],
    icon: BadgeIndianRupee,
  },
  {
    label: "Products",
    href: "/admin/products",
    activePath: ["/admin/products"], // 👈 just base path
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    activePath: ["/admin/categories"],
    icon: Grid2X2,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    activePath: ["/admin/inventory"],
    icon: CirclePile,
  },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    serverFetch("/auth/logout", { method: "POST" })
      .then(() => {
        router.replace("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f7f7fb] to-[#f3f6ff]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[220px_1fr]">
        <aside className="sticky top-6 h-fit rounded-2xl bg-white/60 p-4 shadow-md backdrop-blur-sm">
          <div className="px-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500" />
              <div>
                <div className="text-sm font-bold">Zeel Admin</div>
                <div className="text-xs text-black/50">Manage store</div>
              </div>
            </div>

            <nav className="mt-2 flex flex-col gap-2 text-sm">
              {menu.map((item) => {
                const active = item.activePath.some((path) => {
                  if (path === "/admin") {
                    return pathname === "/admin"; // exact match
                  }
                  return pathname.startsWith(path);
                });
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      active
                        ? "bg-indigo-600 text-white shadow"
                        : "text-black/70 hover:bg-black/5"
                    }`}
                  >
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-black/5">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <button
              onClick={handleLogout}
              className="mt-6 w-full rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-black shadow-sm hover:opacity-95"
            >
              Sign out
            </button>
          </div>
        </aside>

        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
