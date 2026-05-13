"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import CategoryEditModal from "@/components/CategoryEditModal";
import { useCategories, useDeleteCategory } from "../_servicecs/category-hooks";
import Loading from "@/components/loading";

type Category = {
  _id: string;
  name: string;
  active: boolean;
};

export default function CategoriesList() {
  const deleteCategory = useDeleteCategory();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // used in input
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on search
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);
  const { data, isLoading } = useCategories(page, limit, search);
console.log("Categories data:", data); // Debug log to inspect the fetched categories data
  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteCategory.mutateAsync(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
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
              Categories
            </p>
            <h1 className="mt-3 text-2xl font-bold">Product category list</h1>
            <p className="mt-2 text-sm text-black/60">
              Manage category visibility and product counts.
            </p>
          </div>
          <Link
            href="/admin/categories/add"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
          >
            Add category
          </Link>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-4 shadow-lg">
        <AdminDataTable<Category>
          data={data?.data || []}
          columns={[
            { key: "name", header: "Category", sortable: true },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {r.active ? "Active" : "Inactive"}
                </span>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEditClick(r)}
                    className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold hover:bg-black/5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(r._id)}
                    disabled={deleteCategory.isPending}
                    className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleteCategory.isPending && deleteConfirmId === r._id
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

      <CategoryEditModal
        category={selectedCategory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">Delete Category</h2>
            <p className="mt-3 text-sm text-black/60">
              Are you sure you want to delete this category? This action cannot
              be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCancelDelete}
                disabled={deleteCategory.isPending}
                className="rounded-lg border border-black/10 px-4 py-2 text-sm font-semibold hover:bg-black/5 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteCategory.isPending}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleteCategory.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
