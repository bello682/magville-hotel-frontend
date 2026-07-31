"use client";

import Link from "next/link";
import { Menu, X, User, ShieldAlert } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function AdminHeader({
  isSidebarOpen,
  onToggleSidebar,
}: AdminHeaderProps) {
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
          <span className="font-bold tracking-wider text-lg uppercase bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">
            Hotel Control Center
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 transition">
          <User className="w-3.5 h-3.5 text-amber-500" />
          <span>Admin User</span>
        </div>
      </div>
    </header>
  );
}
