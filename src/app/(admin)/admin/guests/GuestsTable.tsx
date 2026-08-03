// src/app/(admin)/components/admin/guests/GuestsTable.tsx
"use client";
import { Eye } from "lucide-react";
import { GuestListItem } from "@/app/(admin)/types/guest";
import GuestTagBadge from "./GuestTagBadge";

interface GuestsTableProps {
  guests: GuestListItem[];
  onViewDetail: (guest: GuestListItem) => void;
}

export default function GuestsTable({
  guests,
  onViewDetail,
}: GuestsTableProps) {
  if (guests.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500">
        No guests found.
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              {["Name", "Contact", "Total Stays", "Total Spent", "Tag", ""].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {guests.map((g) => (
              <tr
                key={g.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                  {g.fullName}
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                  <p>{g.phone}</p>
                  {g.email && <p>{g.email}</p>}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                  {g.totalStays}
                </td>
                <td className="px-5 py-3.5 font-mono font-semibold text-slate-900 dark:text-white">
                  ₦{g.totalSpent.toLocaleString()}
                </td>
                <td className="px-5 py-3.5">
                  <GuestTagBadge tag={g.tag} />
                </td>
                <td className="px-5 py-3.5">
                  <button
                    onClick={() => onViewDetail(g)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
