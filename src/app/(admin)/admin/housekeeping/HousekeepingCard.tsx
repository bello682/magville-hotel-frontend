// src/app/(admin)/components/admin/housekeeping/HousekeepingCard.tsx
"use client";
import { Sparkles, AlertTriangle, Wrench } from "lucide-react";
import {
  HousekeepingRoom,
  HousekeepingStatus,
} from "@/app/(admin)/types/housekeeping";

const STATUS_CONFIG: Record<
  HousekeepingStatus,
  { label: string; className: string }
> = {
  CLEAN: {
    label: "Clean",
    className:
      "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
  },
  DIRTY: {
    label: "Dirty",
    className: "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400",
  },
  CLEANING_IN_PROGRESS: {
    label: "Cleaning",
    className: "bg-sky-500/10 border-sky-500/30 text-sky-600 dark:text-sky-400",
  },
  OUT_OF_ORDER: {
    label: "Out of Order",
    className:
      "bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400",
  },
};

const CYCLE_ORDER: HousekeepingStatus[] = [
  "DIRTY",
  "CLEANING_IN_PROGRESS",
  "CLEAN",
];

interface HousekeepingCardProps {
  room: HousekeepingRoom;
  onCycleStatus: (room: HousekeepingRoom, next: HousekeepingStatus) => void;
  onReportIssue: (room: HousekeepingRoom) => void;
}

export default function HousekeepingCard({
  room,
  onCycleStatus,
  onReportIssue,
}: HousekeepingCardProps) {
  const config = STATUS_CONFIG[room.housekeepingStatus];
  const isOutOfOrder = room.housekeepingStatus === "OUT_OF_ORDER";

  const handleClick = () => {
    if (isOutOfOrder) return; // must resolve maintenance first, not cycle away
    const currentIdx = CYCLE_ORDER.indexOf(room.housekeepingStatus);
    const next = CYCLE_ORDER[(currentIdx + 1) % CYCLE_ORDER.length];
    onCycleStatus(room, next);
  };

  return (
    <div
      className={`relative rounded-xl border p-4 transition-colors ${config.className} bg-white dark:bg-slate-900`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-bold text-slate-900 dark:text-white">
            Room {room.roomNumber}
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400">
            {room.category.name}
          </p>
        </div>
        {room.openMaintenanceCount > 0 && (
          <div className="flex items-center gap-1 text-red-500">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold">
              {room.openMaintenanceCount}
            </span>
          </div>
        )}
      </div>

      <button
        onClick={handleClick}
        disabled={isOutOfOrder}
        className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wide transition ${config.className} ${
          isOutOfOrder
            ? "cursor-not-allowed opacity-70"
            : "hover:brightness-95 cursor-pointer"
        }`}
      >
        <Sparkles className="w-3 h-3" /> {config.label}
      </button>

      <button
        onClick={() => onReportIssue(room)}
        className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 text-[10px] font-semibold uppercase text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
      >
        <Wrench className="w-3 h-3" /> Report Issue
      </button>
    </div>
  );
}
