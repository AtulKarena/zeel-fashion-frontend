"use client";

import { useState } from "react";
import { useCategory } from "../_servicecs/category-hooks";

export default function AddCategoryPage() {
  const { form, onSubmit, isPending } = useCategory();
  const [name, setName] = useState("");
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Category saved (demo only)");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Categories
        </p>
        <h1 className="mt-3 text-3xl">Add category</h1>
        <p className="mt-2 text-sm text-black/60">
          Create a new category for your catalog.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-[32px] border border-black/5 bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label className="text-sm font-semibold">Category name</label>
          <input
            type="text"
            {...form.register("name")}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
            placeholder="Accessories"
            required
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-3 text-sm font-semibold">
            <input
              type="checkbox"
              {...form.register("active")}
              className="h-4 w-4 rounded border-black/10 bg-black/5"
            />
            <span>Active</span>
          </label>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          {isPending ? "Saving..." : "Save category"}
        </button>
      </form>
    </div>
  );
}
