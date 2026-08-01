// src/app/(admin)/components/admin/overview/KpiCards.tsx
import { BedDouble, Users, Wallet, TrendingUp } from "lucide-react";
import { DashboardKpis } from "@/app/(admin)/types/dashboard";

interface KpiCardsProps {
  kpis: DashboardKpis;
}

export default function KpiCards({ kpis }: KpiCardsProps) {
  const cards = [
    {
      label: "Occupancy Rate",
      value: kpis.occupancyRate,
      icon: BedDouble,
    },
    {
      label: "Active Guests",
      value: kpis.activeGuests.toLocaleString(),
      icon: Users,
    },
    {
      label: "Today's Revenue",
      value: `₦${kpis.todayRevenue.toLocaleString()}`,
      icon: Wallet,
    },
    {
      label: "Month Revenue",
      value: `₦${kpis.monthRevenue.toLocaleString()}`,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {card.value}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Icon className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
