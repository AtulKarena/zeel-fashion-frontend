"use client";

import { useState } from "react";
import API from "@/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useCarts } from "@/components/_services/cart-hooks";
import { useAuth } from "@/context/auth-context";
import { useProfile } from "../_services/account-hooks";
import { serverFetch } from "@/lib/server-fetch";

export default function Account() {
  // Mock user state (replace with real auth later)
  const { user, form, onSubmit, isPending } = useProfile();
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuth();

  const { data, isLoading, isError } = useCarts();
  const router = useRouter();

  const [editing, setEditing] = useState(false);

  const handleLogout = async () => {
    try {
      await serverFetch("/auth/logout", {
        method: "POST",
      });

      setIsLoggedIn(false);

      const safeItems = (data?.items || []).slice(0, 50);

      localStorage.setItem(
        "zeel-fashion-cart",
        JSON.stringify({
          items: safeItems,
          isSyncedFromServer: true,
        }),
      );

      queryClient.invalidateQueries({ queryKey: ["user"] });

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const handleSave = (e: any) => {
    e.preventDefault();
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">My Account</h1>

        {!editing ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{user?.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{user?.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{user?.phone}</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-4 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <input
                type="text"
                value={user.name}
                {...form.register("name")}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
              {form.formState.errors.name && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm text-gray-500">Email</label>
              <input
                type="email"
                {...form.register("email")}
                className="mt-1 w-full rounded-lg border border-black/10 cursor-not-allowed px-3 py-2"
              />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="text-sm text-gray-500">Phone</label>
              <input
                type="number"
                {...form.register("phone")}
                className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2"
              />
              {form.formState.errors.phone && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white"
              >
                {!isPending ? "Save" : "Saving"}
              </button>

              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-lg border px-5 py-2 text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Extra Section */}
        <div className="mt-8 border-t pt-6">
          <h2 className="mb-3 text-lg font-semibold">Account Actions</h2>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
