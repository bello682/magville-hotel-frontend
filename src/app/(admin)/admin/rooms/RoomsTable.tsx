// src/app/(admin)/components/admin/rooms/RoomsTable.tsx
"use client";

import { Eye, Pencil, ImageOff } from "lucide-react";
import { Room, RoomStatus } from "@/app/(admin)/types/room";
import RoomStatusBadge from "./RoomStatusBadge";

interface RoomsTableProps {
  rooms: Room[];
  statusFilter: RoomStatus | "ALL";
  onStatusFilterChange: (status: RoomStatus | "ALL") => void;
  onViewDetail: (room: Room) => void;
  onEdit: (room: Room) => void;
}

const STATUS_OPTIONS: (RoomStatus | "ALL")[] = [
  "ALL",
  "AVAILABLE",
  "OCCUPIED",
  "MAINTENANCE",
  "RESERVED",
];

export default function RoomsTable({
  rooms,
  statusFilter,
  onStatusFilterChange,
  onViewDetail,
  onEdit,
}: RoomsTableProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing {rooms.length} room{rooms.length !== 1 ? "s" : ""}
        </p>
        <select
          value={statusFilter}
          onChange={(e) =>
            onStatusFilterChange(e.target.value as RoomStatus | "ALL")
          }
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:border-amber-500/50 transition"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors">
          No rooms match this filter.
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  {[
                    "",
                    "Room",
                    "Category",
                    "Price / Night",
                    "Status",
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
                {rooms.map((room) => (
                  <tr
                    key={room.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                        {room.images[0] ? (
                          <img
                            src={room.images[0]}
                            alt={room.roomNumber}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageOff className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                      Room {room.roomNumber}
                    </td>
                    <td className="px-5 py-3.5 text-slate-600 dark:text-slate-400">
                      {room.category.name}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-slate-900 dark:text-white">
                      ₦{room.pricePerNight.toLocaleString()}
                    </td>
                    <td className="px-5 py-3.5">
                      <RoomStatusBadge status={room.status} />
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onViewDetail(room)}
                          title="View Details"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(room)}
                          title="Edit Room"
                          className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-500/10 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
