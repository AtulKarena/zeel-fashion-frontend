import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Curated to wear
          </p>
          <h1 className="text-4xl leading-tight md:text-5xl">
            Modern essentials curated for men, kids, and elevated accessories.
          </h1>
          <p className="text-base text-black/60 md:text-lg">
            Zeel Fashion curates premium fits, fresh drops, and everyday value
            inside our store.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Shop new arrivals
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/40"
            >
              Our story
            </Link>
          </div>
          <div className="grid gap-4 pt-4 text-sm text-black/60 sm:grid-cols-3">
            <div>
              <p className="text-xl font-semibold text-black">120+</p>
              <p>Weekly drops</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-black">4.9/5</p>
              <p>Customer rating</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-black">4 yrs</p>
              <p>Retail expertise</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-10 top-12 hidden h-40 w-40 rounded-full bg-[var(--accent-soft)] blur-2xl lg:block" />
          <div className="absolute -bottom-10 right-6 hidden h-32 w-32 rounded-full bg-black/5 blur-2xl lg:block" />
          <div className="relative overflow-hidden rounded-[32px] border border-white/40 bg-white shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
              alt="Menswear look from Zeel Fashion"
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="absolute -right-6 top-10 hidden w-44 rounded-2xl border border-white/60 bg-white/90 p-4 text-sm shadow-xl lg:block">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Today&apos;s offer
            </p>
            <p className="mt-2 text-lg font-semibold">Up to 30% off</p>
            <p className="text-xs text-black/60">
              On accessories and fragrances
            </p>
          </div>
         
          <div className="absolute -left-10 bottom-16 hidden w-40 overflow-hidden rounded-2xl border border-white/60 bg-white shadow-xl lg:block">
            <img
              src="/vecteezy_happy-kid-wearing-glasses-and-a-striped-shirt-in-a-cheerful_54560433.png"
              alt="Kidswear highlight"
              className="h-40 w-full object-cover"
            />
          </div> <div className="relative  bottom-6 left-6 w-48 rounded-2xl bg-white/95 px-4 py-3 text-sm shadow-lg">
            <p className="font-semibold">Premium menswear</p>
            <p className="text-xs text-black/60">
              Signature fits for every day
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
