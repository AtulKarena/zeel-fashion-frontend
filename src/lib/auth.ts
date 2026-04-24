// lib/auth.ts
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export const getCurrentUser = async () => {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
    return decoded;
  } catch {
    return null;
  }
};

export const isUserLoggedIn = async () => {
  const token = (await cookies()).get("token")?.value;
  return !!token; // true if token exists, false otherwise
};
