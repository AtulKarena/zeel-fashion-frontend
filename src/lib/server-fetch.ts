// src/lib/server-fetch.ts
"use server";
import { cookies } from "next/headers";

export async function serverFetch(path: string, options: RequestInit = {}) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  return res.json();
}