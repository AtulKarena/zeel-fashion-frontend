import Link from "next/link";

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--accent)">
          Support
        </p>
        <h1 className="text-3xl md:text-4xl">Return policy</h1>
        <p className="text-sm text-black/60">
          We want every piece to feel right. Eligible items can be exchanged or
          moved to store credit within 7 days of purchase.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">At a glance</h2>
          <div className="mt-4 grid gap-3 text-sm text-black/60">
            <div className="flex items-center justify-between">
              <span>Return window</span>
              <span className="font-semibold text-black">7 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Condition</span>
              <span className="font-semibold text-black">Unworn, tags on</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Receipt</span>
              <span className="font-semibold text-black">Required</span>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">What qualifies</h2>
          <div className="mt-4 space-y-2 text-sm text-black/60">
            <p>Men&apos;s and kidswear in original condition.</p>
            <p>Accessories must be unopened for hygiene standards.</p>
            <p>Items should be returned in store during open hours.</p>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">How to return</h2>
        <div className="mt-4 grid gap-3 text-sm text-black/60 md:grid-cols-3">
          <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Step 1
            </p>
            <p className="mt-2 font-semibold text-black">Bring the item</p>
            <p className="mt-1">
              Keep tags attached and pack the item neatly.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Step 2
            </p>
            <p className="mt-2 font-semibold text-black">Show your receipt</p>
            <p className="mt-1">We can use printed or digital receipts.</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-black/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Step 3
            </p>
            <p className="mt-2 font-semibold text-black">Choose your option</p>
            <p className="mt-1">Exchange in-store or take store credit.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {[
          {
            title: "Exchange in-store",
            copy: "Swap sizes or styles during store hours with our styling team.",
          },
          {
            title: "Store credit",
            copy: "Receive credit for future purchases if a replacement isn’t available..",
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

      <Link
        href="/contact"
        className="inline-flex rounded-full border border-black/10 px-5 py-2 text-sm font-semibold transition hover:border-black/40"
      >
        Ask about a return
      </Link>
    </div>
  );
}
