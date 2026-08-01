// src/app/(admin)/components/admin/bookings/BookingsFilterBar.tsx
"use client";

import { Search } from "lucide-react";
import { BookingStatus } from "@/app/(admin)/types/booking";

const STATUS_OPTIONS: (BookingStatus | "ALL")[] = [
  "ALL",
  "PENDING",
  "APPROVED",
  "REJECTED",
  "CHECKED_IN",
  "CHECKED_OUT",
  "CANCELLED",
];

interface BookingsFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: BookingStatus | "ALL";
  onStatusFilterChange: (value: BookingStatus | "ALL") => void;
}

export default function BookingsFilterBar({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: BookingsFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors">
      <div className="relative w-full sm:w-72">
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by guest name or ref..."
          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as BookingStatus | "ALL")
        }
        className="w-full sm:w-auto bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:border-amber-500/50 transition"
      >
        {STATUS_OPTIONS.map((status) => (
          <option key={status} value={status}>
            {status === "ALL" ? "All Statuses" : status.replace("_", " ")}
          </option>
        ))}
      </select>
    </div>
  );
}
