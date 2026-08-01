// src/app/(admin)/components/overview/RoomStatusChart.tsx
import { RoomStatusBreakdown } from "@/app/(admin)/types/dashboard";

interface RoomStatusChartProps {
  roomStatus: RoomStatusBreakdown;
}

const SEGMENTS = [
  { key: "occupied", label: "Occupied", color: "#f59e0b" }, // amber-500
  { key: "available", label: "Available", color: "#10b981" }, // emerald-500
  { key: "maintenance", label: "Maintenance", color: "#ef4444" }, // red-500
] as const;

export default function RoomStatusChart({ roomStatus }: RoomStatusChartProps) {
  const { total, occupied, available, maintenance } = roomStatus;
  const values: Record<string, number> = { occupied, available, maintenance };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  let offsetAccumulator = 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm transition-colors">
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-6">
        Room Status Breakdown
      </h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="relative w-40 h-40 shrink-0">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="18"
              className="text-slate-100 dark:text-slate-800"
            />
            {SEGMENTS.map((seg) => {
              const value = values[seg.key] || 0;
              const fraction = total > 0 ? value / total : 0;
              const dashLength = fraction * circumference;
              const dashArray = `${dashLength} ${circumference - dashLength}`;
              const dashOffset = -offsetAccumulator;
              offsetAccumulator += dashLength;

              if (value === 0) return null;

              return (
                <circle
                  key={seg.key}
                  cx="80"
                  cy="80"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="18"
                  strokeDasharray={dashArray}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="butt"
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              {total}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Rooms
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-3">
          {SEGMENTS.map((seg) => {
            const value = values[seg.key] || 0;
            return (
              <div
                key={seg.key}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="text-slate-600 dark:text-slate-400">
                    {seg.label}
                  </span>
                </div>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
