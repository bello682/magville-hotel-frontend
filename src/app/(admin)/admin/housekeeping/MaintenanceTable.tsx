// src/app/(admin)/components/admin/housekeeping/MaintenanceTable.tsx
"use client";
import { CheckCircle2, Loader2, Clock } from "lucide-react";
import {
  MaintenanceRequestItem,
  MaintenanceStatus,
} from "@/app/(admin)/types/housekeeping";

interface MaintenanceTableProps {
  requests: MaintenanceRequestItem[];
  onUpdateStatus: (id: string, status: MaintenanceStatus) => void;
  actionLoadingId: string | null;
}

const STATUS_STYLES: Record<MaintenanceStatus, string> = {
  PENDING: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  IN_PROGRESS: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  RESOLVED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
};

export default function MaintenanceTable({
  requests,
  onUpdateStatus,
  actionLoadingId,
}: MaintenanceTableProps) {
  if (requests.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500">
        No maintenance requests logged.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              {[
                "Room",
                "Description",
                "Reported By",
                "Status",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {requests.map((r) => (
              <tr
                key={r.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                  Room {r.room.roomNumber}
                </td>
                <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                  {r.description}
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                  {r.reportedBy?.name || "—"}
                </td>
                <td className="px-5 py-3.5">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase ${STATUS_STYLES[r.status]}`}
                  >
                    {r.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3.5">
                  {r.status !== "RESOLVED" && (
                    <div className="flex items-center gap-2">
                      {r.status === "PENDING" && (
                        <button
                          onClick={() => onUpdateStatus(r.id, "IN_PROGRESS")}
                          disabled={actionLoadingId === r.id}
                          className="p-1.5 rounded-lg text-sky-500 hover:bg-sky-500/10 transition disabled:opacity-50"
                          title="Mark In Progress"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => onUpdateStatus(r.id, "RESOLVED")}
                        disabled={actionLoadingId === r.id}
                        className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition disabled:opacity-50"
                        title="Mark Resolved"
                      >
                        {actionLoadingId === r.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
