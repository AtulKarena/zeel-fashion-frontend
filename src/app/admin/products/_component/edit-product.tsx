"use client";

import { useEffect, useRef, useState } from "react";
import { useAllCategories } from "@/app/admin/categories/_servicecs/category-hooks";
import { useProductById } from "../_services/product-hooks";
import { useProductsEdit } from "../_services/product-hooks";
type Category = {
  _id: string;
  name: string;
  active: boolean;
};
type Props = {
  id: string;
};
export default function EditProductPage({ id }: Props) {
  const { form, onSubmit, isPending } = useProductsEdit(id);
  const { product, isLoading, error } = useProductById(id);
  const { categories } = useAllCategories();

  const sizes = form.watch("sizes") || [];
  const [sizeInput, setSizeInput] = useState("");

  const colors = form.watch("colors") || [];
  const [colorInput, setColorInput] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = images.map((f) => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, [images]);

  const isApparelCategory = (catOrId: string) => {
    if (!catOrId) return false;

    // If `catOrId` is an id, find the category name from state
    const matched = categories.find((c: Category) => c._id === catOrId);
    const nameToCheck = matched ? matched.name : catOrId;

    const s = nameToCheck.toLowerCase();

    // Keywords that indicate apparel-like categories (covers common variants)
    const apparelPattern =
      /(men|mens|menswear|man|kid|kids|kidswear|shoe|shoes|foot|footwear|tracksuit|tracksuits|track|shirt|trouser|pants|vest|jacket)/;
    return apparelPattern.test(s);
  };

  const addSize = () => {
    const v = sizeInput.trim();
    if (!v) return;
    form.setValue("sizes", [...(sizes || []), v]);
    setSizeInput("");
  };

  const removeSize = (val: string) => {
    form.setValue(
      "sizes",
      (sizes || []).filter((s) => s !== val),
    );
  };

  const addColor = () => {
    const v = colorInput.trim();
    if (!v) return;
    form.setValue("colors", [...(colors || []), v]);
    setColorInput("");
  };

  const removeColor = (val: string) => {
    const currentColors = form.getValues("colors") || [];
    form.setValue(
      "colors",
      currentColors.filter((c) => c !== val),
    );
  };

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?._id,
        stock: product.stock,
        reservedStock: product.reservedStock,
        sizes: product.sizes || [],
        colors: product.colors || [],
        images: [],
        ratings: product.ratings,
        offer: product.offer || {
          label: "",
          percentOff: 0,
        },
      });
    }
  }, [product]);

  useEffect(() => {
    if (product?.images?.length) {
      setPreviews(product.images); // 👈 existing image URLs
    }
  }, [product]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Products
        </p>
        <h1 className="mt-3 text-3xl">Edit product</h1>
        <p className="mt-2 text-sm text-black/60">
          Fill in details to create a new catalog item.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 rounded-[32px] border border-black/5 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Product name</label>
            <input
              {...form.register("name")}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="Heritage Linen Shirt"
              required
            />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Rating (0–5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              {...form.register("ratings")}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="4.5"
            />
            {form.formState.errors.ratings && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.ratings.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Price (₹)</label>
            <input
              type="number"
              {...form.register("price")}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="5200"
            />
            {form.formState.errors.price && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Category</label>
            <select
              {...form.register("category")}
              className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
            >
              <option value="">Select category</option>
              {categories.map((c: Category) => (
                <option key={c.name} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
            {form.formState.errors.category && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Stock</label>
            <input
              type="number"
              {...form.register("stock")}
              disabled
              className="w-full rounded-2xl border hover:cursor-not-allowed border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="12"
            />
            {form.formState.errors.stock && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.stock.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Reserved Stock</label>
            <input
              type="number"
              {...form.register("reservedStock")}
              disabled
              className="w-full rounded-2xl border hover:cursor-not-allowed border-black/10 bg-black/5 px-4 py-3 text-sm"
              placeholder="12"
            />
            {form.formState.errors.reservedStock && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.reservedStock.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            {...form.register("description")}
            rows={4}
            className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
            placeholder="Short description about the product"
          />
          {form.formState.errors.description && (
            <p className="text-red-500 text-xs">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        {isApparelCategory(form.watch("category")) && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">Sizes</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-black/5 px-4 py-2 text-sm"
                  placeholder="e.g. S, M, L or 40,41,42"
                />
                <button
                  type="button"
                  onClick={addSize}
                  className="rounded-full bg-black px-4 text-sm text-white"
                >
                  Add
                </button>
                {form.formState.errors.sizes && (
                  <p className="text-red-500 text-xs">
                    {form.formState.errors.sizes.message}
                  </p>
                )}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => removeSize(s)}
                      className="ml-1 text-xs text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold">Colors</label>
              <div className="mt-2 flex gap-2">
                <input
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="rounded-2xl border border-black/10 bg-black/5 px-4 py-2 text-sm"
                  placeholder="e.g. Red, Navy"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="rounded-full bg-black px-4 text-sm text-white"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {colors.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-sm"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => removeColor(c)}
                      className="ml-1 text-xs text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-semibold">Images</label>
          <input
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              setImages(files);
              form.setValue("images", files);
            }}
            multiple
            accept="image/*"
            type="file"
            className="w-full text-sm"
          />
          <div className="mt-2 flex gap-2">
            {previews.map((p, i) => (
              <div
                key={p}
                className="relative h-20 w-20 overflow-hidden rounded-md border"
              >
                <img
                  src={p}
                  className="h-full w-full object-cover"
                  alt={`preview-${i}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <label className="text-sm font-semibold">Offer (optional)</label>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <input
                {...form.register("offer.label")}
                className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
                placeholder="e.g. Summer Sale"
              />
              {form.formState.errors.offer?.label && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.offer.label.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="number"
                {...form.register("offer.percentOff")}
                className="w-full rounded-2xl border border-black/10 bg-black/5 px-4 py-3 text-sm"
                placeholder="e.g. 20"
              />
              {form.formState.errors.offer?.percentOff && (
                <p className="text-red-500 text-xs">
                  {form.formState.errors.offer.percentOff.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
        >
          {isPending ? "Edting..." : "Edit product"}
        </button>
      </form>
    </div>
  );
}
