"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import type { Product, ProductColor } from "@/lib/products";
import { useProductById } from "@/app/admin/products/_services/product-hooks";
import Loading from "./loading";
type SizeChart = {
  title: string;
  columns: string[];
  rows: string[][];
};

function getSizeChart(product: Product): SizeChart {
  if (product?.category.name === "Kidswear") {
    return {
      title: "Size chart",
      columns: ["Age", "Height (cm)", "Fit"],
      rows:
        product.sizes?.map((size, index) => {
          const range =
            ["92-98", "99-110", "111-122", "123-134"][index] ?? "90-120";
          return [size, range, "Comfort fit"];
        }) ?? [],
    };
  }

  if (product?.category.name === "Perfume") {
    return {
      title: "Volume guide",
      columns: ["Size", "Lasts", "Best for"],
      rows:
        product.sizes?.map((size) => [size, "6-10 hrs", "Daily wear"]) ?? [],
    };
  }

  if (product?.category.name === "Belts") {
    return {
      title: "Size chart",
      columns: ["Size", "Waist (cm)", "Fit"],
      rows: product.sizes?.map((size) => [size, "80-100", "Adjustable"]) ?? [],
    };
  }

  return {
    title: "Size chart",
    columns: ["Size", "Chest (cm)", "Fit"],
    rows:
      product?.sizes?.map((size, index) => {
        const range =
          ["92-98", "99-104", "105-110", "111-116"][index] ?? "92-110";
        return [size, range, "Tailored"];
      }) ?? [],
  };
}

export default function ProductDetail({ id }: { id: string }) {
  const { product, isLoading, error } = useProductById(id);
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] ?? "Black",
  );

  const [selectedImage, setSelectedImage] = useState<string>(
    product?.images?.[0] ?? "/placeholder.png",
  );

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] ?? "",
  );

  /*  useEffect(() => {
    setSelectedImage(selectedColor.images[0]);
  }, [selectedColor]); */
  const discounted = useMemo(() => {
    if (!product) return 0;

    if (!product.offer) return product.price ?? 0;

    return Math.round(
      (product.price ?? 0) * (1 - product.offer.percentOff / 100),
    );
  }, [product]); // ✅ only depend on product

  const savings = useMemo(() => {
    if (!product?.offer) return 0;
    return (product.price || 0) - (discounted || 0);
  }, [product, discounted]);

  const sizeChart = useMemo(() => getSizeChart(product), [product]);
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] ?? "Black");
      setSelectedImage(product.images?.[0] ?? "/placeholder.png");
      setSelectedSize(product.sizes?.[0] ?? "");
    }
  }, [product]);
  if (isLoading) {
    return <Loading/>;
  }

  if (error || !product) {
    return <p>Error loading product.</p>;
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-4xl border border-black/5 bg-white shadow-xl">
          <img
            src={selectedImage}
            alt={`${product.name} in ${selectedColor}`}
            className="h-auto aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {product.images?.map((image: string) => (
            <button
              key={image}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`h-20 w-20 overflow-hidden rounded-2xl border transition ${
                selectedImage === image
                  ? "border-black"
                  : "border-black/10 hover:border-black/40"
              }`}
              aria-label="Select product image"
            >
              <img
                src={image}
                alt="Product preview"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--accent)">
          Product Description
        </p>
        <p className="text-sm text-black/60">{product.description}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-(--accent)">
            {product.category.name}
          </p>
          <h1 className="text-3xl md:text-4xl">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-lg font-semibold">
              {formatPrice(discounted || 0)}
            </p>
            {product.offer&&product.offer.percentOff>0 && (
              <div className="flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold">
                <span className="text-black">{product.offer.label}</span>
                <span className="rounded-full bg-black px-2 py-0.5 text-white">
                  -{product.offer.percentOff}%
                </span>
                <span className="text-black/60">
                  Save {formatPrice(savings)}
                </span>
              </div>
            )}
            {product.offer&&product.offer.percentOff>0 && (
              <span className="text-sm text-black/40 line-through">
                {formatPrice(product.price || 0)}
              </span>
            )}
          </div>
        </div>
        {product.category.name !== "Perfume" && (
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                Choose color
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors?.map((color: string) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      selectedColor === color
                        ? "border-black"
                        : "border-black/10 hover:border-black/40"
                    }`}
                  >
                    <span
                      className="h-4 w-4 rounded-full border border-black/20"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                Choose size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size: string) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black/10 text-black/70 hover:border-black/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold">Product details</h3>
          <dl className="mt-4 grid gap-3 text-sm text-black/60">
            <div className="flex justify-between gap-4">
              <dt>Category</dt>
              <dd className="font-semibold text-black">
                {product.category.name}
              </dd>
            </div>
            {product.category.name !== "Perfume" && (
              <div className="flex justify-between gap-4">
                <dt>Color options</dt>
                <dd className="font-semibold text-black">
                  {product.colors?.map((c: string) => c).join(", ")}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <dt>Care</dt>
              <dd className="font-semibold text-black">
                Gentle wash / wipe clean
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Fit</dt>
              <dd className="font-semibold text-black">True to size</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Style code</dt>
              <dd className="font-semibold text-black">ZF-{product._id}</dd>
            </div>
          </dl>
        </div>
        {product.category.name !== "Perfume" && (
          <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">{sizeChart.title}</h3>
              <span className="text-xs text-black/50">
                Measurements are approximate
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-black/5">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/5 text-xs uppercase tracking-[0.2em] text-black/50">
                  <tr>
                    {sizeChart.columns.map((col) => (
                      <th key={col} className="px-4 py-3 font-semibold">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizeChart.rows.map((row, rowIndex) => (
                    <tr
                      key={`${row[0]}-${rowIndex}`}
                      className="border-t border-black/5"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${cell}-${cellIndex}`}
                          className="px-4 py-3 text-black/70"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-semibold">Why you&apos;ll love it</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-black/60">
            <li>Hand-checked for fit, quality, and durability.</li>
            <li>Designed for effortless styling and layering.</li>
            <li>Ready for in-store pickup or quick local delivery.</li>
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => addItem(product)}
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Add to Cart
          </button>
          <Link
            href="/cart"
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-black transition hover:border-black/40"
          >
            View Cart
          </Link>
        </div>
        {/*   <p className="text-xs text-black/50">
          Selected: {selectedColor} / {selectedSize}
        </p> */}
      </div>
    </section>
  );
}
