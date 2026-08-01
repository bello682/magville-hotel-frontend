// src/app/(admin)/components/admin/marketing/AnnouncementStatusBadge.tsx
import { AnnouncementStatus } from "@/app/(admin)/types/marketing";

const CONFIG: Record<AnnouncementStatus, { label: string; className: string }> =
  {
    DRAFT: {
      label: "Draft",
      className: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    },
    PUBLISHED: {
      label: "Published",
      className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    ARCHIVED: {
      label: "Archived",
      className: "bg-red-500/10 text-red-600 dark:text-red-400",
    },
  };

export default function AnnouncementStatusBadge({
  status,
}: {
  status: AnnouncementStatus;
}) {
  const config = CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}
