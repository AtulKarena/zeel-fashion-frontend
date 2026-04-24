"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import CategoryFilter from "@/components/CategoryFilter";
import ProductGrid from "@/components/ProductGrid";
import { productCategories } from "@/lib/products";
import { useProducts } from "@/app/admin/products/_services/product-hooks";
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
  category: Category;
  sizes?: string[];
  colors?: string[];
  stock?: number;
  images?: string[];
  ratings?: number;
  createdAt: string;
  updatedAt: string;
};

const sortOptions = [
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price-asc", label: "Price Low-High" },
  { value: "price-desc", label: "Price High-Low" },
];

type SortValue = (typeof sortOptions)[number]["value"];

export default function Shop() {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState<
    (typeof productCategories)[number] | "All"
  >("All");

  const [sort, setSort] = useState<SortValue>("name-asc");

  // ✅ Debounce search (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // ✅ Fetch products
  const { data, isLoading } = useProducts(page, limit, debouncedSearch);

  // ✅ Handle URL category param
  useEffect(() => {
    const param = searchParams.get("category");
    if (!param) return;

    const normalized = param.trim().toLowerCase();

    const match = productCategories.find(
      (cat) => cat.toLowerCase() === normalized,
    );

    if (match) setActiveCategory(match);
  }, [searchParams]);

  // ✅ Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeCategory]);

  // ✅ Filter
  const getCategoryName = (category: any) => {
  if (!category) return "";
  if (typeof category === "string") return category;
  return category.name || "";
};
 const filtered = useMemo(() => {
  const term = debouncedSearch.trim().toLowerCase();

  const normalize = (str?: string) =>
    (str || "").toLowerCase().trim().replace(/\s+/g, "");

  return (data?.data || []).filter((product: Product) => {
    const categoryName = getCategoryName(product.category);

    const matchesCategory =
      activeCategory === "All" ||
      normalize(categoryName) === normalize(activeCategory);

    const matchesSearch =
      !term ||
      normalize(product.name).includes(term) ||
      normalize(product.description).includes(term);

    return matchesCategory && matchesSearch;
  });
}, [activeCategory, debouncedSearch, data]);

  // ✅ Sort (safe)
  const sorted = useMemo(() => {
    const items = [...(filtered || [])];
    switch (sort) {
      case "name-desc":
        return items.sort((a, b) => (b.name || "").localeCompare(a.name || ""));

      case "price-asc":
        return items.sort((a, b) => (a.price || 0) - (b.price || 0));

      case "price-desc":
        return items.sort((a, b) => (b.price || 0) - (a.price || 0));

      default:
        return items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }
  }, [filtered, sort]);

  // ✅ Pagination
  const totalPages = Math.ceil((data?.total || 0) / limit);

  if (isLoading) return <Loading/>;

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-12">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            Shop all
          </p>
          <h1 className="text-3xl md:text-4xl">Browse the Zeel Fashion edit</h1>
          <p className="text-sm text-black/60">{sorted.length} items found</p>
        </div>

        <button
          className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold hover:border-black/40"
          onClick={() => {
            setActiveCategory("All");
            setSearch("");
          }}
        >
          Reset filters
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          {/* Search */}
          <div>
            <label className="text-xs font-semibold uppercase text-black/50">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="text-xs font-semibold uppercase text-black/50">
              Sort by
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortValue)}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <CategoryFilter
            categories={productCategories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>
      </div>

      {/* Products */}
      <ProductGrid products={sorted} />

      {/* ✅ Pagination UI */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-xl border px-4 py-2 disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-xl px-4 py-2 ${
                page === p ? "bg-black text-white" : "border"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-xl border px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
