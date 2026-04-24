import Link from "next/link";

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Support
        </p>
        <h1 className="text-3xl md:text-4xl">Shipping & pickup</h1>
        <p className="text-sm text-black/60">
          Zeel Fashion offers in-store pickup and local delivery options to keep
          your wardrobe updates easy.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "In-store pickup",
            copy: "Reserve online and collect from Liberty Plaza within 48 hours.",
          },
          {
            title: "Local delivery",
            copy: "Same-week delivery in Colombo with curated packaging.",
          },
          {
            title: "Tracking updates",
            copy: "We confirm pickup windows and delivery times via SMS or email.",
          },
          {
            title: "Bulk orders",
            copy: "Dedicated support for group or corporate orders.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-black/60">{item.copy}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Need help?</h2>
        <p className="mt-2 text-sm text-black/60">
          Visit the shop or send us a message for delivery scheduling.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
        >
          Contact support
        </Link>
      </div>
    </div>
  );
}
