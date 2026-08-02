// src/app/(admin)/components/admin/payments/OutstandingBalancesTable.tsx
"use client";

import { AlertTriangle, Phone, CreditCard } from "lucide-react";
import { OutstandingBooking } from "@/app/(admin)/types/payment";

interface OutstandingBalancesTableProps {
  bookings: OutstandingBooking[];
  loading: boolean;
  totalOutstanding: number;
  onRecordPayment: (booking: OutstandingBooking) => void;
}

export default function OutstandingBalancesTable({
  bookings,
  loading,
  totalOutstanding,
  onRecordPayment,
}: OutstandingBalancesTableProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-7 h-7 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Loading outstanding balances...
        </p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center transition-colors">
        <div className="inline-flex p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-600 dark:text-emerald-400 mb-3">
          <CreditCard className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No outstanding balances — every active guest is fully paid up.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-sm font-semibold text-red-700 dark:text-red-400">
            {bookings.length} guest{bookings.length !== 1 ? "s" : ""} with
            outstanding balance
          </span>
        </div>
        <span className="text-lg font-bold text-red-600 dark:text-red-400">
          ₦{totalOutstanding.toLocaleString()}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                {[
                  "Booking Ref",
                  "Guest",
                  "Room",
                  "Status",
                  "Paid / Total",
                  "Balance",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {bookings.map((b) => (
                <tr
                  key={b.id}
                  className="hover:bg-red-50/50 dark:hover:bg-red-950/10 transition-colors"
                >
                  <td className="px-5 py-3.5 font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {b.bookingRef}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-900 dark:text-white">
                      {b.guestName}
                    </p>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" /> {b.guestPhone}
                    </p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    Room {b.roomNumber}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400">
                      {b.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                    ₦{b.totalPaid.toLocaleString()} / ₦
                    {b.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-bold text-red-600 dark:text-red-400">
                    ₦{b.balanceRemaining.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      onClick={() => onRecordPayment(b)}
                      className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition"
                    >
                      Record Payment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
