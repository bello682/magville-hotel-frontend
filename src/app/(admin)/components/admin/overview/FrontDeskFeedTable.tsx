// src/app/(admin)/components/admin/overview/FrontDeskFeedTable.tsx
import { Phone, BedDouble } from "lucide-react";
import { FrontDeskEntry } from "@/app/(admin)/types/dashboard";

interface FrontDeskFeedTableProps {
  title: string;
  entries: FrontDeskEntry[];
  dateField: "checkInDate" | "checkOutDate";
  emptyLabel: string;
}

export default function FrontDeskFeedTable({
  title,
  entries,
  dateField,
  emptyLabel,
}: FrontDeskFeedTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm transition-colors">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </h3>
        <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-full">
          {entries.length} {entries.length === 1 ? "guest" : "guests"}
        </span>
      </div>

      {entries.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-slate-400 dark:text-slate-500">
          {emptyLabel}
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="px-5 py-3.5 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {entry.guest.fullName}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3 text-amber-500" />
                    Room {entry.room.roomNumber}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-amber-500" />
                    {entry.guest.phone}
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 shrink-0">
                {new Date(entry[dateField]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
