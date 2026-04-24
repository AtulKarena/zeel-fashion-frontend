"use client";
import Link from "next/link";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
// import { products } from "@/lib/products";
import { useProductsByCategory } from "../admin/products/_services/product-hooks";
import Loading from "@/components/loading";
type Category = {
  _id: string;
  name: string;
  active: boolean;
};

type Product = {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  category: Category; // 👈 populated
  sizes?: string[];
  colors?: string[];
  stock?: number;
  images?: string[];
  ratings?: number;
  createdAt: string;
  updatedAt: string;
};

const shopCategories = [
  {
    title: "Men's clothing",
    description: "Tailored shirts, chinos, and seasonal layers.",
    href: "/shop?category=Men",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kids clothing",
    description: "Soft, durable fits built for every adventure.",
    href: "/shop?category=Kids",
    image:
      "/vecteezy_happy-kid-wearing-glasses-and-a-striped-shirt-in-a-cheerful_54560433.png",
  },
  {
    title: "Accessories",
    description: "Fragrance, belts, tracksuits, and shoes.",
    href: "/shop?category=Perfumes",
    image:
      "https://images.unsplash.com/photo-1519669556878-63bdad8a1a49?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Home() {
  const { products, isLoading } = useProductsByCategory();

  if (isLoading) return <Loading/>;
  /* const menFeatured = data.data.filter(
    (p: Product) => p.category.name === "Menswear",
  ); */

  /*   const kidsFeatured = data.data.filter(
    (p: Product) => p.category.name === "Kidswear",
  ); */
  /* const accessoriesFeatured = data.data.filter((p: Product) =>
    ["Belts", "Perfume"].includes(p.category.name),
  ); */
  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Shop by category
          </p>
          <h2 className="text-3xl">Everything in store, now clickable.</h2>
          <p className="text-sm text-black/60">
            Jump straight into the category you want, with curated favorites.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {shopCategories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-44 overflow-hidden bg-black/5">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="space-y-2 p-5">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-sm text-black/60">{category.description}</p>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 pb-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              Featured edits
            </p>
            <h2 className="text-3xl">Men&apos;s essentials, refined.</h2>
            <p className="text-sm text-black/60">
              Polished staples curated for elevated everyday style.
            </p>
          </div>
          <Link
            href="/shop?category=Men"
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold transition hover:border-black/40"
          >
            Shop men
          </Link>
        </div>
        <ProductGrid products={products.menswear} />
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              Kids picks
            </p>
            <h2 className="text-3xl">Comfort-forward for little ones.</h2>
            <p className="text-sm text-black/60">
              Soft textures and easy fits, ready for every adventure.
            </p>
          </div>
          <Link
            href="/shop?category=Kids"
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold transition hover:border-black/40"
          >
            Shop kids
          </Link>
        </div>
        <ProductGrid products={products.kidswear} />
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-6 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              Accessories
            </p>
            <h2 className="text-3xl">Finish strong with signature details.</h2>
            <p className="text-sm text-black/60">
              Fragrance, belts, tracksuits, and footwear curated for men.
            </p>
          </div>
          <Link
            href="/shop?category=Perfumes"
            className="rounded-full border border-black/10 px-5 py-2 text-sm font-semibold transition hover:border-black/40"
          >
            Shop accessories
          </Link>
        </div>
        <ProductGrid products={products.others} />
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 lg:grid-cols-2">
        <div className="rounded-[32px] bg-black p-10 text-white shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Promotions
          </p>
          <h3 className="mt-4 text-3xl">Wholesale deals, retail ready.</h3>
          <p className="mt-4 text-sm text-white/70">
            Enjoy weekly offers on curated menswear and accessories sourced at
            factory-direct pricing.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            See offers
          </Link>
        </div>
        <div className="rounded-[32px] border border-black/5 bg-white p-10 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            In-store only
          </p>
          <h3 className="mt-4 text-3xl">Styling sessions every weekend.</h3>
          <p className="mt-4 text-sm text-black/60">
            Book a private fitting to mix, match, and build a seasonal capsule.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full border border-black/10 px-6 py-3 text-sm font-semibold transition hover:border-black/40"
          >
            Reserve a slot
          </Link>
        </div>
      </section>
    </div>
  );
}
