import { ShoppingBag, RefreshCw, Clock, CheckCircle } from "lucide-react";

export default function OrdersOverviewCards() {
  const stats = [
    { label: "New Orders", count: 0, icon: ShoppingBag, bg: "bg-purple-600" },
    { label: "In Progress", count: 751, icon: RefreshCw, bg: "bg-sky-500" },
    { label: "Waiting List", count: 107, icon: Clock, bg: "bg-amber-500" },
    { label: "Despatched", count: 0, icon: CheckCircle, bg: "bg-emerald-500" },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-bold text-white">Orders Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`${item.bg} text-white rounded-xl p-6 flex items-center justify-between shadow-lg`}
            >
              <div className="p-3 bg-white/10 rounded-xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold">{item.count}</p>
                <p className="text-xs uppercase tracking-wider font-semibold text-white/80 mt-1">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
