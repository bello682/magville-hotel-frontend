"use client";

import Link from "next/link";
import { Menu, X, ShieldAlert } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import NotificationBell from "./NotificationBell";
import { useAdminUser } from "../../hooks/useAdminUser";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const ROLE_LABELS: Record<string, string> = {
  GENERAL_MANAGER: "General Manager",
  MANAGER: "Manager",
  RECEPTIONIST: "Receptionist",
};

export default function AdminHeader({
  isSidebarOpen,
  onToggleSidebar,
}: AdminHeaderProps) {
  const currentUser = useAdminUser();

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur px-4 lg:px-8 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        <Link href="/admin" className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-amber-500" />
          <span className="font-bold tracking-wider text-lg uppercase bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent hidden sm:inline">
            Hotel Control Center
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <NotificationBell />
        <ThemeToggle />

        <div className="hidden sm:flex items-center gap-2.5 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
              {currentUser?.email ? currentUser.email[0].toUpperCase() : "?"}
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[140px]">
              {currentUser?.email || "—"}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {currentUser?.role
                ? ROLE_LABELS[currentUser.role] || currentUser.role
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
