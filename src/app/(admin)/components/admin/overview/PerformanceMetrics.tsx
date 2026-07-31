import { TrendingUp, TrendingDown } from "lucide-react";

export default function PerformanceMetrics() {
  const metrics = [
    {
      label: "This Week",
      value: "458",
      subText: "£24,464.61 (-8%)",
      isDown: true,
    },
    {
      label: "Last Week",
      value: "2,905",
      subText: "£2,158,348.68 (90%)",
      isDown: false,
    },
    {
      label: "This Month",
      value: "6,776",
      subText: "£360,420.64 (58%)",
      isDown: false,
    },
    {
      label: "Last Month",
      value: "11,994",
      subText: "£674,243.08 (91%)",
      isDown: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-2 shadow-sm transition-colors"
        >
          <p className="text-3xl font-bold text-slate-900 dark:text-white">
            {m.value}
          </p>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span
              className={
                m.isDown
                  ? "text-red-500 dark:text-red-400"
                  : "text-emerald-600 dark:text-emerald-400"
              }
            >
              {m.subText}
            </span>
            {m.isDown ? (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 dark:text-red-400" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
          </div>
          <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold pt-1">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}
