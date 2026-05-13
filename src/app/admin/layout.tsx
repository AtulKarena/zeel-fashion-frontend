import AdminGuard from "@/components/AdminGuard";
import AdminShell from "@/components/AdminShell";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Dashboard`,
  };
}
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/login");
  }

  try {
    const user: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (user.role !== "admin") {
      redirect("/admin");
    }
  } catch(error) {
    console.error("Error verifying token:", error);
    redirect("/login");
  }
  return (
    /*    <AdminGuard> */
    <AdminShell>{children}</AdminShell>
    /* </AdminGuard> */
  );
}
