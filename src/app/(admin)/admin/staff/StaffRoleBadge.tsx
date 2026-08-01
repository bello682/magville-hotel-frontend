// src/app/(admin)/components/admin/staff/StaffRoleBadge.tsx
import { StaffRole } from "@/app/(admin)/types/staff";

const CONFIG: Record<StaffRole, { label: string; className: string }> = {
  GENERAL_MANAGER: {
    label: "General Manager",
    className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  MANAGER: {
    label: "Manager",
    className: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  },
  RECEPTIONIST: {
    label: "Receptionist",
    className: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
};

export default function StaffRoleBadge({ role }: { role: StaffRole }) {
  const config = CONFIG[role];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}
