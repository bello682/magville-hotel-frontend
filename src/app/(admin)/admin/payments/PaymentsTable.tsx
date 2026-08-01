// src/app/(admin)/components/admin/payments/PaymentsTable.tsx
"use client";

import { Eye } from "lucide-react";
import { Payment, PaymentMethod } from "@/app/(admin)/types/payment";
import PaymentMethodBadge from "./PaymentMethodBadge";

interface PaymentsTableProps {
  payments: Payment[];
  methodFilter: PaymentMethod | "ALL";
  onMethodFilterChange: (method: PaymentMethod | "ALL") => void;
  onViewBooking: (bookingId: string) => void;
}

const METHOD_OPTIONS: (PaymentMethod | "ALL")[] = [
  "ALL",
  "CASH",
  "CARD",
  "BANK_TRANSFER",
];

export default function PaymentsTable({
  payments,
  methodFilter,
  onMethodFilterChange,
  onViewBooking,
}: PaymentsTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {payments.length} payment{payments.length !== 1 ? "s" : ""}
        </p>
        <select
          value={methodFilter}
          onChange={(e) =>
            onMethodFilterChange(e.target.value as PaymentMethod | "ALL")
          }
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:border-amber-500/50 transition"
        >
          {METHOD_OPTIONS.map((m) => (
            <option key={m} value={m}>
              {m === "ALL" ? "All Methods" : m.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors">
          No payments match this filter.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {[
                    "Booking Ref",
                    "Guest",
                    "Amount",
                    "Method",
                    "Transaction Ref",
                    "Date",
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
                {payments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                      {p.booking?.bookingRef || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-slate-900 dark:text-white">
                      {p.booking?.guestName || "—"}
                    </td>
                    <td className="px-5 py-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                      ₦{p.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <PaymentMethodBadge method={p.method} />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {p.transactionRef || "—"}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => onViewBooking(p.bookingId)}
                        title="View Booking Payment History"
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
      )}
    </div>
  );
}
