"use client";
import { useOrders } from "../_services/order-hooks";
import { useEffect, useState } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import { useDeleteOrders } from "../_services/order-hooks";
import Link from "next/link";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";
import { Order } from "@/lib/products";
import { useRouter } from "next/navigation";
import { Eye ,Trash} from "lucide-react";
import Loading from "@/components/loading";
const orders = [
  {
    id: "ZF-1024",
    customer: "Nimal Perera",
    items: 2,
    total: "LKR 14,500",
    status: "Ready for pickup",
  },
  {
    id: "ZF-1023",
    customer: "Maya Fernando",
    items: 1,
    total: "LKR 2,400",
    status: "Processing",
  },
  {
    id: "ZF-1022",
    customer: "Ravindu Silva",
    items: 3,
    total: "LKR 29,700",
    status: "Delivered",
  },
  {
    id: "ZF-1021",
    customer: "Shehan Jay",
    items: 2,
    total: "LKR 9,900",
    status: "Awaiting payment",
  },
];

export default function OrdersList() {
  const router = useRouter();
  const deleteOrder = useDeleteOrders();
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
  const { data, isLoading } = useOrders(page, limit, search);

  const handleConfirmDelete = async () => {
    if (deleteConfirmId) {
      await deleteOrder.mutateAsync(deleteConfirmId);
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
          Orders
        </p>
        <h1 className="mt-3 text-3xl">Customer order list</h1>
        <p className="mt-2 text-sm text-black/60">
          Track pickup, delivery, and processing statuses.
        </p>
      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <AdminDataTable<Order>
            data={data?.data || []}
            columns={[
              { key: "_id", header: "Order ID", sortable: true },

              {
                key: "customerName",
                header: "Customer Name",
                sortable: true,
                render: (r) => r?.contactInformation.name,
              },

              {
                key: "contact",
                header: "Contact",
                render: (r) =>
                  r?.contactInformation.email || r.contactInformation.email,
              },

              /* {
                key: "products",
                header: "Product Details",
                render: (r) => r.orderItems?.map((p) => p.name).join(", "),
              }, */

              {
                key: "quantity",
                header: "Qty",
                render: (r) =>
                  r.orderItems?.reduce((total, p) => total + p.quantity, 0),
              },

              {
                key: "paymentStatus",
                header: "Payment Status",
                sortable: true,
                render: (r) => (
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold"
                    style={{
                      color: r.isPaid ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {r.isPaid ? "Paid" : "Unpaid"}
                  </span>
                ),
              },
              {
                key: "deliveryStatus",
                header: "Delivery Status",
                sortable: true,
                render: (r) => (
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold"
                    style={{
                      color: r.isDelivered ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {r.isDelivered ? "Delivered" : "Pending"}
                  </span>
                ),
              },

              {
                key: "createdAt",
                header: "Order Date",
                sortable: true,
                render: (r) => new Date(r.createdAt).toLocaleDateString(),
              },

              {
                key: "actions",
                header: "Actions",
                render: (r) => (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => router.push(`/admin/orders/${r._id}`)}
                      className="rounded-md border px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                    >
                      <Eye size={15}/>
                    </button>

                    <button
                      onClick={() => handleDeleteClick(r._id)}
                      disabled={deleteOrder.isPending}
                      className="rounded-md border px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      <Trash size={15}/>
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
            title="Delete Order"
            message="Are you sure you want to delete this order? This action cannot be undone"
            isOpen={!!deleteConfirmId}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            isLoading={deleteOrder.isPending}
          />
        </div>
      </div>
    </div>
  );
}
