// src/app/(admin)/components/admin/rooms/RoomStatusBadge.tsx
import { RoomStatus } from "@/app/(admin)/types/room";

const STATUS_CONFIG: Record<RoomStatus, { label: string; className: string }> =
  {
    AVAILABLE: {
      label: "Available",
      className:
        "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    },
    OCCUPIED: {
      label: "Occupied",
      className:
        "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
    },
    MAINTENANCE: {
      label: "Maintenance",
      className:
        "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
    },
    RESERVED: {
      label: "Reserved",
      className:
        "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400",
    },
  };

export default function RoomStatusBadge({ status }: { status: RoomStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 border rounded-full text-[11px] font-semibold uppercase tracking-wide ${config.className}`}
    >
      {config.label}
    </span>
  );
}
