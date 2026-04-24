"use client";
import Link from "next/link";
import { useDeleteProducts, useProducts } from "../_services/product-hooks";
import AdminDataTable from "@/components/AdminDataTable";
import { useState, useEffect } from "react";
import Loading from "@/components/loading";
/* const products = [
  {
    sku: "MEN-001",
    name: "Heritage Linen Shirt",
    category: "Menswear",
    price: "LKR 5,200",
    stock: 18,
  },
  {
    sku: "KID-002",
    name: "Adventure Cargo Shorts",
    category: "Kidswear",
    price: "LKR 3,100",
    stock: 6,
  },
  {
    sku: "ACC-004",
    name: "Citrus Noir Cologne",
    category: "Accessories",
    price: "LKR 8,900",
    stock: 14,
  },
]; */

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

export default function ProductsList() {
  const deleteProduct = useDeleteProducts();
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // used in input

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on search
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const { data, isLoading } = useProducts(page, limit, search);
  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteProduct.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  if (isLoading) {
    return <Loading/>;
  }
  const pagination = data?.pagination;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/40">
              Products
            </p>
            <h1 className="mt-3 text-2xl font-bold">Product list</h1>
            <p className="mt-2 text-sm text-black/60">
              Manage your catalog items.
            </p>
          </div>
          <Link
            href="/admin/products/add"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Add product
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-lg">
        <AdminDataTable
          data={data?.data || []}
          columns={[
            { key: "_id", header: "SKU", sortable: true },
            { key: "name", header: "Product", sortable: true },
            {
              key: "category",
              header: "Category",
              sortable: true,
              render: (r) => r.category?.name,
            },
            { key: "price", header: "Price", sortable: true },
            { key: "stock", header: "Stock", sortable: true },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/admin/products/edit/${r._id}`}
                    className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(r._id)}
                    disabled={deleteProduct.isPending}
                    className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    {" "}
                    {deleteProduct.isPending && deleteConfirmId === r._id
                      ? "Removing..."
                      : "Remove"}
                  </button>
                </div>
              ),
            },
          ]}
          page={page}
          setPage={setPage}
          totalPages={pagination?.totalPages || 1}
          limit={limit}
          setLimit={setLimit}
          search={searchInput}
          setSearch={setSearchInput}
        />
      </div>
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Delete Product</h2>
            <p className="mt-3 text-sm text-black/60">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={deleteProduct.isPending}
                className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteProduct.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteProduct.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
