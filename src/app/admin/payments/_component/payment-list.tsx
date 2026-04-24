"use client";
import { usePayments, useDeletePayment } from "../_services/payment-hooks";
import { useState, useEffect } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import Link from "next/link";
import { Payment, capitalize } from "@/lib/products";
import Loading from "@/components/loading";

export default function PaymentsList() {
  const deletePayment = useDeletePayment();
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

  const { data, isLoading } = usePayments(page, limit, search);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deletePayment.mutateAsync(deleteConfirmId);
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
      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
          Payments
        </p>
        <h1 className="mt-3 text-3xl">Payment transactions</h1>
        <p className="mt-2 text-sm text-black/60">
          Monitor paid, pending, and cash-on-pickup entries.
        </p>
      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <AdminDataTable<Payment>
            data={data?.data || []}
            columns={[
              { key: "transactionId", header: "Transaction", sortable: true },
              {
                key: "user",
                header: "Customer",
                sortable: true,
                render: (r) => r.user.name,
              },
              {
                key: "paymentMethod",
                header: "Method",
                sortable: true,
                render: (r) => capitalize(r.paymentMethod),
              },
              { key: "amount", header: "Amount", sortable: true },
              {
                key: "paymentStatus",
                header: "Status",
                sortable: true,
                render: (r) => (
                  <span
                    className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold"
                    style={{
                      color:
                        r.paymentStatus === "success"
                          ? "green"
                          : r.paymentStatus === "pending"
                            ? "yellow"
                            : "red",
                      fontWeight: 600,
                    }}
                  >
                    {r.paymentStatus === "success"
                      ? "Success"
                      : r.paymentStatus === "pending"
                        ? "Pending"
                        : "Failed"}
                  </span>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                render: (r) => (
                  <div className="flex flex-wrap gap-2">
                    {/* <Link
                    href={`/admin/products/edit/${r._id}`}
                    className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-50"
                  >
                    Edit
                  </Link> */}
                    <button
                      onClick={() => handleDeleteClick(r._id)}
                      disabled={deletePayment.isPending}
                      className="rounded-md border border-black/10 px-3 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      {" "}
                      {deletePayment.isPending && deleteConfirmId === r._id
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
          <DeleteConfirmModal
            title="Delete Payment"
            message="Are you sure you want to delete this payment? This action cannot be undone"
            isOpen={!!deleteConfirmId}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            isLoading={deletePayment.isPending}
          />
        </div>
      </div>
    </div>
  );
}
