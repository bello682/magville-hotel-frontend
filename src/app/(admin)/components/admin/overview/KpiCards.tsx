// src/app/(admin)/components/admin/overview/KpiCards.tsx
"use client";

import { useRouter } from "next/navigation";
import {
  BedDouble,
  Users,
  Wallet,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { DashboardKpis } from "@/app/(admin)/types/dashboard";

interface KpiCardsProps {
  kpis: DashboardKpis;
}

export default function KpiCards({ kpis }: KpiCardsProps) {
  const router = useRouter();

  const cards = [
    {
      label: "Occupancy Rate",
      value: kpis.occupancyRate,
      icon: BedDouble,
      onClick: undefined,
      highlight: false,
    },
    {
      label: "Active Guests",
      value: kpis.activeGuests.toLocaleString(),
      icon: Users,
      onClick: undefined,
      highlight: false,
    },
    {
      label: "Pending Requests",
      value: kpis.pendingRequests.toLocaleString(),
      icon: AlertCircle,
      onClick: () => router.push("/admin/bookings?status=PENDING"),
      highlight: kpis.pendingRequests > 0,
    },
    {
      label: "Today's Revenue",
      value: `₦${kpis.todayRevenue.toLocaleString()}`,
      icon: Wallet,
      onClick: undefined,
      highlight: false,
    },
    {
      label: "Month Revenue",
      value: `₦${kpis.monthRevenue.toLocaleString()}`,
      icon: TrendingUp,
      onClick: undefined,
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isClickable = !!card.onClick;

        return (
          <div
            key={idx}
            onClick={card.onClick}
            className={`
              rounded-xl p-5 flex items-center justify-between shadow-sm transition-colors border
              ${isClickable ? "cursor-pointer hover:border-amber-500/50" : ""}
              ${
                card.highlight
                  ? "bg-amber-500/5 border-amber-500/30"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }
            `}
          >
            <div>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                {card.label}
              </p>
              <p
                className={`text-2xl font-bold ${
                  card.highlight
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {card.value}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl border ${
                card.highlight
                  ? "bg-amber-500/15 border-amber-500/30"
                  : "bg-amber-500/10 border-amber-500/20"
              }`}
            >
              <Icon className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
