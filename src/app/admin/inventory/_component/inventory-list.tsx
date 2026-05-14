"use client";
import { useEffect, useState } from "react";
import AdminDataTable from "@/components/AdminDataTable";
import { Inventory } from "@/lib/products";
import { useInventory, useUpdateStock } from "../_service/inventory-hooks";
import { toast } from "sonner";
import Loading from "@/components/loading";

const getStockStatus = (stock: number, reserved: number) => {
  const available = stock - reserved;

  if (available <= 0) {
    return "OUT_OF_STOCK";
  } else if (available <= 10) {
    return "LOW_STOCK";
  } else {
    return "IN_STOCK";
  }
};

const STATUS_CONFIG = {
  IN_STOCK: {
    label: "In Stock",
    color: "green",
    bg: "#dcfce7",
  },
  LOW_STOCK: {
    label: "Low Stock",
    color: "#b45309",
    bg: "#fef3c7",
  },
  OUT_OF_STOCK: {
    label: "Out of Stock",
    color: "red",
    bg: "#fee2e2",
  },
};

export default function InventoryList() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // used in input
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [actionType, setActionType] = useState<"add" | "reduce">("add");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const { updateStock, isUpdating } = useUpdateStock();
  useEffect(() => {
    const delay = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); // reset to first page on search
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);
  const { data, isLoading } = useInventory(page, limit, search);
console.log("Inventory data:", data); // Debug log to inspect the fetched inventory data structure
  useEffect(() => {
    if (!isUpdating) {
      setIsModalOpen(false);
    }
  }, [isUpdating]);

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
        <h1 className="mt-3 text-3xl">Inventory</h1>
        <p className="mt-2 text-sm text-black/60">
          Track pickup, delivery, and processing statuses.
        </p>
      </div>

      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-sm">
        <div className="overflow-x-auto">
          <AdminDataTable<Inventory>
            data={data?.data || []}
            columns={[
              { key: "name", header: "Product", sortable: true },

              {
                key: "stock",
                header: "Stock",
                sortable: true,
              },

              {
                key: "reserved",
                header: "Reserved",
                sortable: true,
              },

              {
                key: "available",
                header: "Available",
                sortable: true,
              },

              {
                key: "status",
                header: "Status",
                sortable: true,
                render: (r) => {
                  const status = getStockStatus(r.stock, r.reserved);
                  const config = STATUS_CONFIG[status];

                  return (
                    <span
                      className="rounded-full px-3 py-1 text-xs font-semibold"
                      style={{
                        color: config.color,
                        backgroundColor: config.bg,
                      }}
                    >
                      {config.label} ({r.stock - r.reserved} left)
                    </span>
                  );
                },
              },

              {
                key: "actions",
                header: "Actions",
                render: (r) => (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(r);
                        setActionType("add");
                        setIsModalOpen(true);
                      }}
                      className="rounded-md border px-2 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50"
                    >
                      +
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProduct(r);
                        setActionType("reduce");
                        setIsModalOpen(true);
                      }}
                      className="rounded-md border px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
                    >
                      -
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
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-semibold">
                  {actionType === "add" ? "Add Stock" : "Reduce Stock"}
                </h2>

                <p className="mb-2 text-sm text-gray-600">
                  Product: <strong>{selectedProduct?.name}</strong>
                </p>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mb-4 w-full rounded-md border px-3 py-2"
                  placeholder="Enter quantity"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="rounded-md border px-4 py-2 text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await updateStock({
                          productId: selectedProduct.productId,
                          quantity,
                          type: actionType,
                        });
                      } catch (err: any) {
                        toast.error(err.message);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="rounded-md bg-black px-4 py-2 text-sm text-white"
                  >
                    {loading ? "Updating..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
