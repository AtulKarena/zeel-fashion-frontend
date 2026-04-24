import ProductCard from "@/components/ProductCard";

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

export default function ProductGrid({ products }: { products: Product[] }) {
  if (!products?.length) {
    return (
      <div className="rounded-3xl border border-dashed border-black/10 bg-white/70 p-12 text-center text-sm text-black/60">
        No products match your filters yet.
      </div>
    );
  }
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
