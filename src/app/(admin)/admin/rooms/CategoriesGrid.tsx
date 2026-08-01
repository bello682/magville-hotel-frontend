// src/app/(admin)/components/admin/rooms/CategoriesGrid.tsx
"use client";

import { Plus, Users, BedDouble } from "lucide-react";
import { RoomCategory } from "@/app/(admin)/types/room";

interface CategoriesGridProps {
  categories: RoomCategory[];
  onAddCategory: () => void;
}

export default function CategoriesGrid({
  categories,
  onAddCategory,
}: CategoriesGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          {categories.length} categor{categories.length !== 1 ? "ies" : "y"}{" "}
          configured
        </p>
        <button
          onClick={onAddCategory}
          className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition"
        >
          <Plus className="w-3.5 h-3.5" /> New Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 transition-colors"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {cat.name}
              </h3>
              <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
                {cat.roomCount ?? 0} rooms
              </span>
            </div>

            {cat.description && (
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                {cat.description}
              </p>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                <Users className="w-3.5 h-3.5 text-amber-500" />
                Up to {cat.capacity} guests
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                <BedDouble className="w-3.5 h-3.5 text-amber-500" />₦
                {cat.basePrice.toLocaleString()}/night
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
