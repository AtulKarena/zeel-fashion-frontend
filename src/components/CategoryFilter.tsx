"use client";

import type { category } from "@/lib/products";

type Props = {
  categories: category[];
  active: category | "All";
  onChange: (value: category | "All") => void;
};

export default function CategoryFilter({ categories, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
          active === "All"
            ? "border-black bg-black text-white"
            : "border-black/10 bg-white text-black/70 hover:border-black/40"
        }`}
        onClick={() => onChange("All")}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
            active === category
              ? "border-black bg-black text-white"
              : "border-black/10 bg-white text-black/70 hover:border-black/40"
          }`}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
