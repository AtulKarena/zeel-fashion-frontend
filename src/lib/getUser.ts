// actions/getUser.ts
"use server";

import { getCurrentUser } from "@/lib/auth";

export async function getUserAction() {
  return await getCurrentUser();
}

export const checkUserLoggedInAction = async () => {
  const user = await getCurrentUser();
  return !!user; // true if user exists, false otherwise
};