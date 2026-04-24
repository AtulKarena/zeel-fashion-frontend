"use client";
import { useContactSave } from "../_services/contact-hooks";
export default function ContactUs() {
  const { form, onSubmit, isPending } = useContactSave();
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Contact
        </p>
        <h1 className="text-3xl md:text-4xl">
          Let&apos;s style your next visit.
        </h1>
        <p className="text-sm text-black/60">
          Send us a note and our team will help with product availability or
          personal fittings.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 rounded-[32px] border border-black/5 bg-white p-8 shadow-sm"
        >
          <div className="space-y-2">
            <label className="text-sm font-semibold">Name</label>
            <input
              {...form.register("name")}
              type="text"
              placeholder="Your full name"
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
            <label className="text-sm font-semibold">Message</label>
            <textarea
              {...form.register("message")}
              rows={5}
              placeholder="Tell us what you're looking for"
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm focus:border-black/30 focus:outline-none"
            />
            {form.formState.errors.message && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {isPending ? "Saving..." : "Send message"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">Shop details</h3>
            <div className="mt-4 space-y-2 text-sm text-black/60">
              <p>Zeel Fashion, Liberty Plaza</p>
              <p>Colombo, Sri Lanka</p>
              <p>Daily 9:00 AM - 9:00 PM</p>
              <p>+94 11 555 2424</p>
              <p>hello@zeelfashion.lk</p>
            </div>
          </div>
          <div className="rounded-[28px] bg-black p-6 text-white shadow-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
              Group styling
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              Bulk or corporate orders
            </h3>
            <p className="mt-2 text-sm text-white/70">
              We can coordinate quantities for uniforms or large events. Contact
              us for timelines and pricing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
