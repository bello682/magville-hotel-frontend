// src/app/(admin)/components/admin/marketing/AnnouncementsGrid.tsx
"use client";

import { Plus, Pencil, Trash2, ImageOff } from "lucide-react";
import { Announcement } from "@/app/(admin)/types/marketing";
import AnnouncementStatusBadge from "./AnnouncementStatusBadge";

interface AnnouncementsGridProps {
  announcements: Announcement[];
  onAdd: () => void;
  onEdit: (announcement: Announcement) => void;
  onDelete: (announcement: Announcement) => void;
}

export default function AnnouncementsGrid({
  announcements,
  onAdd,
  onEdit,
  onDelete,
}: AnnouncementsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {announcements.length} alert{announcements.length !== 1 ? "s" : ""}{" "}
          configured
        </p>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
        >
          <Plus className="w-3.5 h-3.5" /> New Alert
        </button>
      </div>

      {announcements.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center text-sm text-slate-400 dark:text-slate-500 transition-colors">
          No public alerts created yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-colors"
            >
              <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {a.imageUrl ? (
                  <img
                    src={a.imageUrl}
                    alt={a.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageOff className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">
                    {a.title}
                  </h3>
                  <AnnouncementStatusBadge status={a.status} />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {a.message}
                </p>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => onEdit(a)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 py-1.5 rounded-lg transition"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(a)}
                    className="flex-1 flex items-center justify-center gap-1.5 text-xs text-red-500 hover:bg-red-500/10 py-1.5 rounded-lg transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
