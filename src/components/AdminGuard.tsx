"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkAdminAccess = async () => {

    const token = await getCurrentUser();
    if (!token) {
      router.replace("/login");
      return;
    }
    setReady(true);};
    
    checkAdminAccess();
  }, [router]);

  if (!ready) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-6 text-sm text-black/60">
        Checking access...
      </div>
    );
  }

  return <>{children}</>;
}
