import Link from "next/link";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `About - Zeel Fashion`,
  };
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          About Zeel Fashion
        </p>
        <h1 className="text-3xl md:text-4xl">Curated style, retail polish.</h1>
        <p className="text-sm text-black/60">
          Zeel Fashion is a clothing retailer built on curated collections and
          quality-first selection. We handpick the best pieces for men and kids
          and bring the collection to our in-store customers with a modern
          styling experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Curated selection",
            description:
              "We focus on quality fabrics, dependable sizing, and seasonal relevance.",
          },
          {
            title: "Curated drops",
            description:
              "Every delivery is reviewed to keep the shop floor fresh and cohesive.",
          },
          {
            title: "Retail care",
            description:
              "In-store fittings, styling support, and quick exchanges keep it effortless.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[28px] border border-black/5 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm text-black/60">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-8 shadow-sm">
        <h2 className="text-2xl">Visit our store</h2>
        <p className="mt-3 text-sm text-black/60">
          Our team is ready to help you create a complete look with men&apos;s
          clothing, kidswear, and accessories. Drop by for personal styling or
          call us for group orders.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Get in touch
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition hover:border-black/40"
          >
            Explore the shop
          </Link>
        </div>
      </div>
    </div>
  );
}
