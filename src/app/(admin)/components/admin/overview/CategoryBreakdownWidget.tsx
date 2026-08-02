// src/app/(admin)/components/admin/overview/CategoryBreakdownWidget.tsx
import { Layers } from "lucide-react";
import { CategoryBreakdown } from "@/app/(admin)/types/dashboard";

export default function CategoryBreakdownWidget({
  categories = [],
}: {
  categories: CategoryBreakdown[];
}) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm transition-colors">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
        <Layers className="w-4 h-4 text-amber-500" /> Occupancy by Category
      </h3>

      {categories.length === 0 ? (
        <p className="text-center text-sm text-slate-400 dark:text-slate-500 py-6">
          No room categories yet.
        </p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => {
            const percent =
              cat.total > 0 ? Math.round((cat.occupied / cat.total) * 100) : 0;
            return (
              <div key={cat.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {cat.name}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {cat.occupied}/{cat.total} occupied
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
