"use client";

import Link from "next/link";
import { useLogin } from "../_services/auth-hooks";

export default function LoginForm() {
  const { form, onSubmit, isPending } = useLogin();

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--accent)">
          Welcome back
        </p>
        <h1 className="text-3xl md:text-4xl">Sign in to Zeel Fashion</h1>
        <p className="text-sm text-black/60">
          Access your saved styles, track orders, and manage your cart.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-4xl border border-black/5 bg-white p-8 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
            required
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            {...form.register("password")}
            placeholder="Enter your password"
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
            required
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-center text-sm text-black/60">
          New to Zeel Fashion?{" "}
          <Link href="/register" className="font-semibold text-black">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
