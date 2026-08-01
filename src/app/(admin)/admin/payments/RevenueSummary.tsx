// src/app/(admin)/components/admin/payments/RevenueSummary.tsx
import { Wallet, TrendingUp, Receipt } from "lucide-react";

interface RevenueSummaryProps {
  totalRevenue: number;
  paymentCount: number;
  averagePayment: number;
}

export default function RevenueSummary({
  totalRevenue,
  paymentCount,
  averagePayment,
}: RevenueSummaryProps) {
  const cards = [
    {
      label: "Total Revenue Recorded",
      value: `₦${totalRevenue.toLocaleString()}`,
      icon: Wallet,
    },
    {
      label: "Total Payments",
      value: paymentCount.toLocaleString(),
      icon: Receipt,
    },
    {
      label: "Average Payment",
      value: `₦${averagePayment.toLocaleString()}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex items-center justify-between shadow-sm transition-colors"
          >
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                {card.label}
              </p>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Icon className="w-5 h-5 text-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
