"use client";

import React, { useMemo, useState } from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};

export default function AdminDataTable<T extends Record<string, any>>({
  columns,
  data,
  defaultPageSize = 10,
  page,
  setPage,
  totalPages,
  limit,
  setLimit,
  search,
  setSearch,
}: {
  columns: Column<T>[];
  data: T[];
  defaultPageSize?: number;
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
  limit: number;
  setLimit: (n: number) => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageIndex, setPageIndex] = useState(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = data.slice();
    if (q) {
      rows = rows.filter((r) =>
        columns.some((col) => {
          const key = col.key as string;
          const val = col.render ? String(col.render(r)) : String(r[key]);
          return val?.toLowerCase().includes(q);
        }),
      );
    }
    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey as string];
        const bv = b[sortKey as string];
        if (av == null && bv == null) return 0;
        if (av == null) return sortDir === "asc" ? -1 : 1;
        if (bv == null) return sortDir === "asc" ? 1 : -1;
        if (typeof av === "number" && typeof bv === "number") {
          return sortDir === "asc" ? av - bv : bv - av;
        }
        return sortDir === "asc"
          ? String(av).localeCompare(String(bv))
          : String(bv).localeCompare(String(av));
      });
    }
    return rows;
  }, [data, query, sortKey, sortDir, columns]);

  const pageData = useMemo(() => {
    const start = pageIndex * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, pageIndex, pageSize]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPageIndex(0);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="rounded-md border border-black/10 px-3 py-2 text-sm shadow-sm"
        />
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-black/60">Per page</label>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1); // reset
            }}
            className="rounded-md border border-black/10 px-2 py-1 text-sm"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-black/10 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs text-black/60">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`py-3 px-3 ${col.sortable ? "cursor-pointer" : ""}`}
                  onClick={() => col.sortable && toggleSort(String(col.key))}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{col.header}</span>
                    {col.sortable && sortKey === String(col.key) && (
                      <span className="text-xs text-black/40">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {pageData.map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={String(col.key)} className="py-3 px-3 align-top">
                    {col.render
                      ? col.render(row)
                      : String(row[col.key as string] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
            {pageData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-sm text-black/60"
                >
                  No records
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-black/60">
          Showing {filtered.length === 0 ? 0 : pageIndex * pageSize + 1} -{" "}
          {Math.min((pageIndex + 1) * pageSize, filtered.length)} of{" "}
          {filtered.length}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Prev
          </button>
          <div className="text-sm">
            Page {page} / {totalPages}
          </div>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="rounded-md border px-3 py-1 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
