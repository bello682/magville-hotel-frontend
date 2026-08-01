// src/app/(admin)/components/admin/bookings/BookingStatusBadge.tsx
import { CheckCircle2, XCircle, Clock, LogIn, LogOut, Ban } from "lucide-react";
import { BookingStatus } from "@/app/(admin)/types/booking";

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  PENDING: {
    label: "Pending Approval",
    icon: Clock,
    className:
      "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    className:
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  },
  CHECKED_IN: {
    label: "Checked In",
    icon: LogIn,
    className: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
  },
  CHECKED_OUT: {
    label: "Checked Out",
    icon: LogOut,
    className:
      "bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: Ban,
    className: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  },
};

export default function BookingStatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}
