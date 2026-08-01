// src/app/(admin)/components/admin/staff/StaffTable.tsx
"use client";

import { ShieldOff, ShieldCheck, UserCog } from "lucide-react";
import { StaffMember } from "@/app/(admin)/types/staff";
import StaffRoleBadge from "./StaffRoleBadge";

interface StaffTableProps {
  staff: StaffMember[];
  currentUserId: string;
  onChangeRole: (staff: StaffMember) => void;
  onToggleStatus: (staff: StaffMember) => void;
}

export default function StaffTable({
  staff,
  currentUserId,
  onChangeRole,
  onToggleStatus,
}: StaffTableProps) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
              {["Name", "Email", "Role", "Status", "Joined", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {staff.map((s) => {
              const isSelf = s.id === currentUserId;
              return (
                <tr
                  key={s.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white">
                    {s.name}{" "}
                    {isSelf && (
                      <span className="text-[10px] text-amber-500">(You)</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                    {s.email}
                  </td>
                  <td className="px-5 py-3.5">
                    <StaffRoleBadge role={s.role} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase ${
                        s.isActive
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-500/10 text-red-600 dark:text-red-400"
                      }`}
                    >
                      {s.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onChangeRole(s)}
                        disabled={isSelf}
                        title="Change Role"
                        className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <UserCog className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(s)}
                        disabled={isSelf}
                        title={s.isActive ? "Deactivate" : "Activate"}
                        className={`p-1.5 rounded-lg transition disabled:opacity-30 disabled:cursor-not-allowed ${
                          s.isActive
                            ? "text-red-500 hover:bg-red-500/10"
                            : "text-emerald-500 hover:bg-emerald-500/10"
                        }`}
                      >
                        {s.isActive ? (
                          <ShieldOff className="w-4 h-4" />
                        ) : (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
