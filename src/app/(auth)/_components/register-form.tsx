"use client";

import Link from "next/link";
import { useSignup } from "../_services/auth-hooks";

export default function RegisterForm() {
  const { form, onSubmit, isPending } = useSignup();

  return (
    <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Join the style list
        </p>
        <h1 className="text-3xl md:text-4xl">
          Create your Zeel Fashion account
        </h1>
        <p className="text-sm text-black/60">
          Save your cart, get early access to new drops, and track your in-store
          pickups.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold">Full name</label>
          <input
            type="text"
            {...form.register("name")}
            placeholder="Your name"
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="you@email.com"
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
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
            placeholder="Create a password"
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...form.register("agree", {
                required: "You must agree to the terms",
              })}
              className="h-4 w-4 border border-black/10"
            />
            <label className="text-sm font-semibold">
              I agree to the{" "}
              <Link href="/terms-of-service" className="text-primary underline">
                Terms and Privacy
              </Link>
            </label>
          </div>

          {form.formState.errors.agree && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.agree.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          {isPending ? "Creating account..." : "Create account"}
        </button>
        <p className="text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
