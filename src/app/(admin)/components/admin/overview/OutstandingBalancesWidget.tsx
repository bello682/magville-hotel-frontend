// src/app/(admin)/components/admin/overview/OutstandingBalancesWidget.tsx
import Link from "next/link";
import { AlertTriangle, ArrowUpRight } from "lucide-react";

interface OutstandingBooking {
  id: string;
  bookingRef: string;
  guestName: string;
  guestPhone: string;
  balanceRemaining: number;
}

export default function OutstandingBalancesWidget({
  bookings = [],
  totalOutstanding = 0,
}: {
  bookings?: OutstandingBooking[];
  totalOutstanding?: number;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-900/40 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="px-5 py-4 border-b border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> Outstanding Balances
        </h3>
        <Link
          href="/admin/payments?tab=outstanding"
          className="text-[11px] text-red-600 dark:text-red-400 hover:underline flex items-center gap-0.5"
        >
          View all <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="px-5 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
          No outstanding balances — all guests are paid up.
        </p>
      ) : (
        <>
          <div className="px-5 py-3 bg-red-50/50 dark:bg-red-950/10 flex justify-between items-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Total Owed
            </span>
            <span className="text-lg font-bold text-red-600 dark:text-red-400">
              ₦{totalOutstanding.toLocaleString()}
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {bookings.map((b) => (
              <Link
                key={b.id}
                href={`/admin/payments?tab=outstanding&highlight=${b.id}`}
                className="flex items-center justify-between gap-3 px-5 py-3 hover:bg-red-50/50 dark:hover:bg-red-950/10 transition"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                    {b.guestName}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500">
                    {b.bookingRef} • {b.guestPhone}
                  </p>
                </div>
                <span className="text-sm font-bold text-red-600 dark:text-red-400 shrink-0">
                  ₦{b.balanceRemaining.toLocaleString()}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
