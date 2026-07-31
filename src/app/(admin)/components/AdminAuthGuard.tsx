"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Skip guard check on login route
    if (pathname === "/auth/login") {
      setIsAuthenticated(true);
      return;
    }

    const token =
      typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

    if (!token) {
      setIsAuthenticated(false);
      router.replace("/auth/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Loading spinner while verifying credentials
  if (isAuthenticated === null && pathname !== "/auth/login") {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-white gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Verifying Admin Session...
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
