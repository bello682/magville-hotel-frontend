"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AdminAuthGuard from "../components/AdminAuthGuard";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminThemeProvider from "../components/AdminThemeProvider";
import { AdminToastProvider } from "../context/ToastContext";
import ToastContainer from "../context/ToastContainer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Safely record active admin path in client localStorage
  useEffect(() => {
    if (pathname && !pathname.startsWith("/auth/")) {
      localStorage.setItem("lastAdminPath", pathname);
    }
  }, [pathname]);
  // safe recording of last admin path, excluding auth routes

  if (pathname === "/auth/login") {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminThemeProvider>
      <AdminToastProvider>
        <AdminAuthGuard>
          <div className="h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 overflow-hidden">
            <AdminHeader
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
            />

            <div className="flex flex-1 relative overflow-hidden">
              <AdminSidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />

              <main className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 transition-colors">
                <div className="max-w-7xl mx-auto space-y-6">{children}</div>
              </main>
            </div>
          </div>

          <ToastContainer />
        </AdminAuthGuard>
      </AdminToastProvider>
    </AdminThemeProvider>
  );
}
