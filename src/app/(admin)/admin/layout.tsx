"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import AdminAuthGuard from "../components/AdminAuthGuard";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminThemeProvider from "../components/AdminThemeProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  if (pathname === "/auth/login") {
    return <AdminAuthGuard>{children}</AdminAuthGuard>;
  }

  return (
    <AdminThemeProvider>
      <AdminAuthGuard>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
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
      </AdminAuthGuard>
    </AdminThemeProvider>
  );
}
