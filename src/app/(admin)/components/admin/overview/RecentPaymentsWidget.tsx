// src/app/(admin)/components/admin/overview/RecentPaymentsWidget.tsx
import { Receipt, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RecentPayment } from "@/app/(admin)/types/dashboard";

const METHOD_LABELS: Record<string, string> = {
  CASH: "Cash",
  CARD: "Card",
  BANK_TRANSFER: "Bank Transfer",
};

export default function RecentPaymentsWidget({
  payments,
}: {
  payments: RecentPayment[];
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Receipt className="w-4 h-4 text-amber-500" /> Recent Payments
        </h3>
        <Link
          href="/admin/payments"
          className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-0.5"
        >
          View all <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {payments.length === 0 ? (
        <p className="px-5 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
          No payments recorded yet.
        </p>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {payments.map((p) => (
            <div
              key={p.id}
              className="px-5 py-3 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {p.booking.guestName}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  {p.booking.bookingRef} • Room {p.booking.room.roomNumber} •{" "}
                  {METHOD_LABELS[p.method]}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  ₦{p.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  {new Date(p.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
