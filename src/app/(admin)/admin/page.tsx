import PerformanceMetrics from "../components/admin/overview/PerformanceMetrics";
import OrdersOverviewCards from "../components/admin/overview/OrdersOverviewCards";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Dashboard
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Operational Overview
          </h1>
        </div>
      </div>

      <PerformanceMetrics />
      <OrdersOverviewCards />
    </div>
  );
}
